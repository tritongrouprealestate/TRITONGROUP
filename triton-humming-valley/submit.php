<?php
/**
 * Enquiry form endpoint for Triton Humming Valley.
 *
 * The browser posts here; this file adds the API key and forwards the lead
 * to Leadi5. The key stays on the server — putting it in js/site.js would
 * publish it to every visitor and let anyone write leads into the CRM.
 *
 * Requires: PHP 7.4+ with cURL (standard on cPanel).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/** Reply and stop. */
function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'Use POST.']);
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    error_log('submit.php: config.php is missing. Copy config.sample.php to config.php.');
    reply(500, ['ok' => false, 'error' => 'The form is not configured yet.']);
}
$config = require $configPath;

$raw = file_get_contents('php://input');
$in  = json_decode($raw ?: '', true);
if (!is_array($in)) {
    reply(400, ['ok' => false, 'error' => 'Could not read the submission.']);
}

/* ── Spam gate ──────────────────────────────────────────────────────────
   A public form with no check collects bot traffic within days. Two cheap
   filters that cost a real visitor nothing:
   1. A honeypot field that is hidden from people and filled by bots.
   2. A minimum time on the form — bots submit in well under two seconds. */
if (!empty($in['company'])) {                    // honeypot; real people never see it
    reply(200, ['ok' => true]);                  // answer as if accepted, drop silently
}
$elapsed = (int)($in['elapsed'] ?? 0);
if ($elapsed > 0 && $elapsed < 2000) {
    reply(200, ['ok' => true]);
}

/* ── Server-side validation ─────────────────────────────────────────────
   The browser checks these too, but browser checks are a convenience for
   the visitor, not a control — anything can post here directly. */
$name  = trim((string)($in['name'] ?? ''));
$phone = trim((string)($in['phone'] ?? ''));
$email = trim((string)($in['email'] ?? ''));

$errors = [];
if (mb_strlen($name) < 2)                                  $errors['name']  = 'Enter your name.';
if (strlen(preg_replace('/\D/', '', $phone)) < 10)         $errors['phone'] = 'Enter a phone number of at least 10 digits.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))            $errors['email'] = 'Enter a valid email address.';
if ($errors) {
    reply(422, ['ok' => false, 'error' => 'Some details need correcting.', 'fields' => $errors]);
}

/* ── Build the Leadi5 payload ───────────────────────────────────────────
   Shape taken from the "Expected Lead Payload" panel on the integration
   screen: a `leads` array, each entry carrying the contact fields plus a
   free-form additionalProperties bag.

   ⚠ DATE FORMAT. The sample shows "28-03-18 22:22:32", which is ambiguous:
   it reads as either DD-MM-YY or YY-MM-DD. DD-MM-YY is used below, matching
   the usual Indian convention. If leads land in Leadi5 with the wrong date,
   change LEAD_DATE_FORMAT to 'y-m-d H:i:s' — that is the only edit needed. */
const LEAD_DATE_FORMAT = 'd-m-y H:i:s';

$now = new DateTimeImmutable('now', new DateTimeZone('Asia/Kolkata'));

$extra = array_filter([
    'villaType'     => trim((string)($in['villa'] ?? '')),
    'preferredDate' => trim((string)($in['date'] ?? '')),
    'note'          => mb_substr(trim((string)($in['note'] ?? '')), 0, 2000),
    'sourcePage'    => trim((string)($in['source'] ?? '')),
], static fn($v) => $v !== '');

$payload = ['leads' => [[
    'name'                 => mb_substr($name, 0, 200),
    'phone'                => mb_substr($phone, 0, 40),
    'email'                => mb_substr($email, 0, 200),
    'property'             => (string)($config['property'] ?? 'Triton Humming Valley'),
    'DateAndTime'          => $now->format(LEAD_DATE_FORMAT),
    'additionalProperties' => (object)$extra,   // object, so an empty bag is {} not []
    'leadStatus'           => 'New Lead',
]]];

/* ── Deliver ────────────────────────────────────────────────────────────
   Two destinations, and the enquiry counts as delivered if EITHER accepts
   it. A CRM outage must not cost a lead that the inbox would have caught,
   and vice versa. Whatever fails is logged with the full lead so nothing is
   ever only half-recorded. */
$delivered = [];
$failed    = [];

/* 1 · Email. This is the one that has to work.

   The From address MUST be on this site's own domain. Sending "From:
   someone@gmail.com" through your host's mail server fails Gmail's SPF check
   and the message is binned or spam-foldered — the single most common reason
   a contact form appears to work and delivers nothing. Reply-To carries the
   enquirer's address instead, so hitting reply in the inbox answers them
   directly. */
if (!empty($config['notify_email'])) {
    $host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
    /* ?: not ?? — the config documents an EMPTY string as "use the default",
       and ?? only falls back on null, so the header went out as "From: <>".
       An empty envelope sender gets a message refused by most receivers. */
    $from = !empty($config['mail_from']) ? $config['mail_from'] : ('no-reply@' . $host);

    $subject = 'Viewing enquiry — ' . $name;
    $lines = "New viewing enquiry from the website\n"
           . str_repeat('=', 44) . "\n\n"
           . "Name    : $name\n"
           . "Phone   : $phone\n"
           . "Email   : $email\n"
           . 'Villa   : ' . ($extra['villaType']     ?? '—') . "\n"
           . 'Date    : ' . ($extra['preferredDate'] ?? '—') . "\n"
           . 'Page    : ' . ($extra['sourcePage']    ?? '—') . "\n\n"
           . "Message :\n" . ($extra['note'] ?? '—') . "\n\n"
           . str_repeat('-', 44) . "\n"
           . 'Received ' . $now->format('d M Y, H:i') . " IST\n";

    /* Header injection guard: a newline in either field would let a crafted
       submission append its own headers and use this form as a relay. */
    $safeName  = preg_replace('/[\r\n]+/', ' ', $name);
    $safeEmail = preg_replace('/[\r\n]+/', '', $email);

    $headers  = 'From: Triton Humming Valley <' . $from . ">\r\n";
    $headers .= 'Reply-To: ' . $safeName . ' <' . $safeEmail . ">\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    /* The fifth argument sets the envelope sender, which is what an SPF check
       actually inspects — so it is worth having. But some hosts disable that
       parameter, and there mail() simply returns false. Falling back to a
       plain call means a restrictive host costs us SPF alignment rather than
       the entire enquiry. */
    $sent = @mail($config['notify_email'], $subject, $lines, $headers, '-f' . $from);
    if (!$sent) {
        $sent = @mail($config['notify_email'], $subject, $lines, $headers);
        if ($sent) error_log('submit.php: envelope sender rejected; sent without -f');
    }

    if ($sent) {
        $delivered[] = 'email';
    } else {
        $failed[] = 'email';
        error_log('submit.php: mail() failed to ' . $config['notify_email']);
    }
}

/* 2 · Leadi5, when a webhook is configured. */
if (!empty($config['webhook_url']) && !empty($config['api_key'])
    && strpos($config['webhook_url'], '...') === false) {
    $ch = curl_init($config['webhook_url']);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json',
                                   'X-API-Key: ' . $config['api_key']],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 8,
    ]);
    $response = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr === '' && $httpCode >= 200 && $httpCode < 300) {
        $delivered[] = 'leadi5';
    } else {
        $failed[] = 'leadi5';
        error_log("submit.php: Leadi5 responded $httpCode $curlErr $response");
    }
}

/* Anything that did not arrive is written to disk with the whole lead, so a
   failure is recoverable rather than merely reported. */
if ($failed) {
    @file_put_contents(
        __DIR__ . '/leads-failed.log',
        $now->format('c') . '  FAILED[' . implode(',', $failed) . ']'
        . '  OK[' . implode(',', $delivered) . ']  '
        . json_encode($payload, JSON_UNESCAPED_UNICODE) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

if (!$delivered) {
    reply(502, ['ok' => false, 'error' =>
        'We could not send that just now. Please call us on the number above, or try again shortly.']);
}

reply(200, ['ok' => true]);
