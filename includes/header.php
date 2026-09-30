<?php
// Expects $active to be set by the including page (e.g. $active = 'about.php';)
// to the current page's filename, so the matching nav link/button can be
// marked active. Falls back to nothing highlighted if it isn't set.
$active = $active ?? '';

$service_pages = [
    'services.php',
    'erp-implementation.php',
    'erp-implementation-odoo.php',
    'erp-implementation-zoho.php',
    'custom-software-development.php',
    'it-consulting.php',
    'iso-certification-support.php',
    'managed-services.php',
];
$services_open = in_array($active, $service_pages, true) ? ' class="on"' : '';
$resources_pages = ['case-studies.php', 'faq.php'];
$resources_open = in_array($active, $resources_pages, true) ? ' class="on"' : '';

$cur = function (string $page) use ($active): string {
    return $active === $page ? ' aria-current="page"' : '';
};

$pf_links = [
    'erp-implementation.php' => 'https://calendly.com/aivora-techlabs/erp-software-service',
    'erp-implementation-odoo.php' => 'https://calendly.com/aivora-techlabs/erp-software-service',
    'erp-implementation-zoho.php' => 'https://calendly.com/aivora-techlabs/erp-software-service',
    'custom-software-development.php' => 'https://calendly.com/aivora-techlabs/erp-software-service',
    'it-consulting.php' => 'https://calendly.com/aivora-techlabs/it-consultation-service',
    'iso-certification-support.php' => 'https://calendly.com/aivora-techlabs/iso-certification-done-for-you',
];
$pf_link = $pf_links[$active] ?? 'https://calendly.com/aivora-techlabs/talk-to-our-expert';
?>
<a class="skip" href="#main">Skip to main content</a>
<a class="pf-trigger" id="pfTrigger" href="<?= $pf_link ?>" target="_blank" rel="noopener">Talk to Our<br>Experts</a>
<header class="hdr" id="hdr">
  <div class="shell hdr-in">
    <a class="brand" href="index.php" aria-label="AiVORA Techlabs home">
      <img class="brand-mark brand-mark-full" src="assets/images/aivora-logo-dark.webp" alt="AiVORA Techlabs Global Pvt. Ltd. logo, IT and software company in Hubballi">
    </a>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M78PZ8SPE3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M78PZ8SPE3');
</script>

    <nav class="nav" aria-label="Primary">
      <a href="index.php"<?= $cur('index.php') ?>>Home</a>
      <a href="about.php"<?= $cur('about.php') ?>>About Us</a>
      <div class="nav-drop" id="drop">
        <button type="button" aria-expanded="false" aria-controls="dropmenu" id="dropbtn"<?= $services_open ?>>
          Services
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="drop" id="dropmenu" role="menu" aria-labelledby="dropbtn">
          <a href="erp-implementation.php" role="menuitem"><strong>ERP Implementation</strong><em>Connect finance, sales, inventory, HR and reporting</em></a>
          <div class="drop-sub">
            <a href="erp-implementation-odoo.php" role="menuitem">Odoo</a>
            <a href="erp-implementation-zoho.php" role="menuitem">Zoho</a>
          </div>
          <a href="custom-software-development.php" role="menuitem"><strong>Custom Software Development</strong><em>Applications built around your workflows</em></a>
          <a href="it-consulting.php" role="menuitem"><strong>IT Consulting</strong><em>Strategy, architecture and technology roadmaps</em></a>
          <a href="managed-services.php" role="menuitem"><strong>Managed Services</strong><em>Training, marketing and development support</em></a>
        </div>
      </div>
      <a href="iso-certification-support.php"<?= $cur('iso-certification-support.php') ?>>ISO Certification</a>
      <div class="nav-drop" id="dropResources">
        <button type="button" aria-expanded="false" aria-controls="dropmenuResources" id="dropResourcesBtn"<?= $resources_open ?>>
          Resources
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="drop" id="dropmenuResources" role="menu" aria-labelledby="dropResourcesBtn">
          <a href="case-studies.php" role="menuitem"><strong>Case Study</strong><em>Real client engagements and outcomes</em></a>
          <a href="faq.php" role="menuitem"><strong>FAQ</strong><em>Answers to common questions</em></a>
        </div>
      </div>
      <a href="contact.php"<?= $cur('contact.php') ?>>Contact Us</a>
    </nav>

    <div class="hdr-cta">
      <a class="btn btn-primary btn-sm" href="tel:+918951734760">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2.4"/><path d="M11 18.3h2" stroke-linecap="round"/></svg>
        +91 89517 34760
      </a>
    </div>

    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">
      <i></i><i></i><i></i>
    </button>
  </div>
</header>

