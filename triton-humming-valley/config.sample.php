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

    // Optional: also send a copy to this address. Leave empty to skip.
    // Uses PHP mail(); if your host does not have it configured this fails
    // silently and the lead still reaches Leadi5.
    'notify_email' => '',
];
