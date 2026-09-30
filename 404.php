<?php
$active = '';
http_response_code(404);

// Base URL of the site folder, so every relative link and asset still works
// when the missing URL is nested (e.g. /services/old-page/).
$base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/') . '/';

// The address the visitor asked for, and the closest real page to it.
$requested = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
$slug = strtolower(preg_replace('/\.(php|html?)$/i', '', basename(rawurldecode($requested))));
$pages = [
    'index.php' => 'Home',
    'about.php' => 'About Us',
    'services.php' => 'Our Services',
    'erp-implementation.php' => 'ERP Implementation',
    'erp-implementation-odoo.php' => 'Odoo ERP Implementation',
    'erp-implementation-zoho.php' => 'Zoho Implementation',
    'custom-software-development.php' => 'Custom Software Development',
    'it-consulting.php' => 'IT Consulting',
    'iso-certification-support.php' => 'ISO Certification Services',
    'managed-services.php' => 'Managed Services',
    'case-studies.php' => 'Case Studies',
    'faq.php' => 'FAQ',
    'contact.php' => 'Contact Us',
    'privacy-policy.php' => 'Privacy Policy',
    'terms-conditions.php' => 'Terms & Conditions',
];
$suggest = null;
if ($slug !== '') {
    $best = 0;
    foreach ($pages as $file => $label) {
        similar_text($slug, basename($file, '.php'), $pct);
        if ($pct > $best) { $best = $pct; $suggest = $file; }
    }
    if ($best < 55) { $suggest = null; }
}
$h = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="<?= $h($base) ?>">
<title>Page Not Found (404) | AiVORA Techlabs Global Pvt. Ltd.</title>
<meta name="description" content="The page you are looking for could not be found. Explore ERP implementation, custom software, IT consulting and ISO certification services from AiVORA Techlabs.">
<meta name="robots" content="noindex, follow">
<meta name="theme-color" content="#070D18">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css?v=<?php echo @filemtime(__DIR__.'/assets/css/style.css') ?: time(); ?>">
<script>document.documentElement.classList.remove('no-js');</script>
<link rel="icon" type="image/webp" href="assets/images/favicons.webp">
</head>
<body>
<?php include __DIR__.'/includes/header.php'; include __DIR__.'/includes/menu.php'; ?>

<main id="main">
<section class="phero nf-hero">
  <div class="shell">
    <div class="rv nf-in">
      <div class="nf-code" aria-hidden="true">404</div>
      <h1>Oops! This page doesn&rsquo;t exist</h1>
      <p class="phero-sub">The page you are looking for may have been moved, renamed, or the address may have been typed incorrectly.</p>
      <?php if ($requested !== ''): ?>
      <p class="nf-url">You tried: <code><?= $h($requested) ?></code></p>
      <?php endif; ?>
      <?php if ($suggest): ?>
      <p class="nf-suggest">Did you mean <a href="<?= $h($suggest) ?>"><?= $h($pages[$suggest]) ?></a>?</p>
      <?php endif; ?>
      <div class="phero-acts nf-acts">
        <a class="btn btn-primary" href="index.php">Back to Home</a>
        <a class="btn btn-ghost" href="contact.php">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="rv mw-60ch mx-auto text-center">
      <h2 class="sec-head mx-auto">Looking for one of these?</h2>
      <p class="lead m-18-auto-0">Here are the most visited pages on our website.</p>
    </div>
    <div class="nf-links rv">
      <a href="erp-implementation.php"><strong>ERP Implementation</strong><span>Odoo &amp; Zoho ERP set up around your business</span></a>
      <a href="custom-software-development.php"><strong>Custom Software</strong><span>Business, enterprise &amp; AI-powered applications</span></a>
      <a href="it-consulting.php"><strong>IT Consulting</strong><span>Technology strategy, roadmaps &amp; architecture</span></a>
      <a href="iso-certification-support.php"><strong>ISO Certification</strong><span>Done-for-you ISO 27001, 9001, 14001 &amp; more</span></a>
      <a href="managed-services.php"><strong>Managed Services</strong><span>IT support, training &amp; development support</span></a>
      <a href="about.php"><strong>About Us</strong><span>Who we are and how we work</span></a>
    </div>
  </div>
</section>
</main>

<?php include __DIR__.'/includes/footer.php'; ?>
</body>
</html>
