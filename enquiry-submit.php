<?php
// Receives the contact form (via fetch), verifies reCAPTCHA and stores the entry in Google Forms.
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Invalid request.']);
    exit;
}

$name     = trim($_POST['name'] ?? '');
$mobile   = trim($_POST['phone'] ?? '');
$email    = trim($_POST['email'] ?? '');
$service  = trim($_POST['service'] ?? '');
$message  = trim($_POST['message'] ?? '');
$checkbox = isset($_POST['consent']) ? 'Yes' : '';
$token    = $_POST['token_generate'] ?? '';

if ($name === '' || $mobile === '' || $email === '' || $service === '' || $message === '' || $checkbox === '') {
    echo json_encode(['ok' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

function post_url($url, $fields) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$code, $body];
}

if (!preg_match('/^(\+91)?\d{10}$/', preg_replace('/[\s-]/', '', $mobile))) {
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid 10-digit mobile number.']);
    exit;
}

// reCAPTCHA v3 check
$secret = '6LcKZ9ctAAAAALrU_p8OO9WMTA_GMla5DIWbK0V8';
list(, $verifyBody) = post_url('https://www.google.com/recaptcha/api/siteverify', [
    'secret'   => $secret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
]);
$captcha = json_decode($verifyBody);
if (!$captcha || empty($captcha->success) || (isset($captcha->score) && $captcha->score < 0.5)) {
    echo json_encode(['ok' => false, 'error' => 'Verification failed. Please try again.']);
    exit;
}

// google form entry fields
$formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYw_pQfLa4qIkFRMl1-6V94vdqVi9kvLj5w-NxUkVG4EAGmg/formResponse';
list($code) = post_url($formUrl, [
    'entry.1597219838' => $name,
    'entry.1079056680' => $mobile,
    'entry.2114972470' => $email,
    'entry.1370493752' => $service,
    'entry.363188901'  => $message,
    'entry.1554450916' => $checkbox,
]);

if ($code >= 200 && $code < 400) {
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false, 'error' => 'Could not send your enquiry. Please try again.']);
}
