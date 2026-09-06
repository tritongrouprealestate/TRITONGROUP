<?php
/**
 * Copy this file to  config.php  and fill in the real values.
 *
 * config.php holds a live credential. Keep it out of version control and
 * never move these values into anything under js/ or css/ — those are
 * served to the browser and readable by every visitor.
 */

return [
    // From the Leadi5 integration screen, "API Key for test Integration".
    'api_key' => 'custom_xxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    // From the same screen, "Your webhook URL".
    'webhook_url' => 'https://api.retconsoft.com/api/webhooks/.../leads',

    // Written into every lead's "property" field so Leadi5 can tell which
    // project an enquiry came from.
    'property' => 'Triton Humming Valley',

    // Where enquiries are emailed. This is the primary destination.
    'notify_email' => 'you@example.com',

    // The address enquiries are sent FROM. It must be on this domain —
    // sending from a gmail.com address fails SPF and Gmail bins the message.
    // Leave empty and no-reply@<your domain> is used automatically.
    'mail_from' => '',
];
