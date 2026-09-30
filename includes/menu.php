<?php
// Mobile slide-out menu. Expects $active to be set by the including page
// (e.g. $active = 'about.php';) so the matching link is marked active.
$active = $active ?? '';

$cur = function (string $page) use ($active): string {
    return $active === $page ? ' aria-current="page"' : '';
};
?>
<div class="scrim" id="scrim"></div>

<aside class="mnav" id="mnav" aria-label="Mobile navigation" aria-hidden="true">
  <div class="mnav-top">
    <span class="brand-txt">AiVORA<span>Techlabs Global</span></span>
    <button class="mnav-close" id="mclose" aria-label="Close menu">&#10005;</button>
  </div>
  <div class="mnav-body">
    <a href="index.php"<?= $cur('index.php') ?>>Home</a>
    <a href="about.php"<?= $cur('about.php') ?>>About Us</a>
    <div class="macc" id="macc">
      <button type="button" aria-expanded="false" aria-controls="maccp">
        Services
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="macc-panel" id="maccp">
        <a href="erp-implementation.php"<?= $cur('erp-implementation.php') ?>>ERP Implementation</a>
        <div class="macc-sub">
          <a href="erp-implementation-odoo.php"<?= $cur('erp-implementation-odoo.php') ?>>Odoo</a>
          <a href="erp-implementation-zoho.php"<?= $cur('erp-implementation-zoho.php') ?>>Zoho</a>
        </div>
        <a href="custom-software-development.php"<?= $cur('custom-software-development.php') ?>>Custom Software Development</a>
        <a href="it-consulting.php"<?= $cur('it-consulting.php') ?>>IT Consulting</a>
        <a href="managed-services.php"<?= $cur('managed-services.php') ?>>Managed Services</a>
      </div>
    </div>
    <a href="iso-certification-support.php">ISO Certification</a>
    <div class="macc" id="maccResources">
      <button type="button" aria-expanded="false" aria-controls="maccpResources">
        Resources
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="macc-panel" id="maccpResources">
        <a href="case-studies.php"<?= $cur('case-studies.php') ?>>Case Study</a>
        <a href="faq.php"<?= $cur('faq.php') ?>>FAQ</a>
      </div>
    </div>
    <a href="contact.php"<?= $cur('contact.php') ?>>Contact Us</a>
    <div class="mnav-foot">
      <a class="btn btn-primary" href="https://calendly.com/aivora-techlabs/talk-to-our-expert" target="_blank" rel="noopener">Talk to Our Experts</a>
      <div class="mnav-meta">
        <a href="tel:+918951734760">+91 89517 34760</a>
        <a href="mailto:info@aivoratechlabs.com">info@aivoratechlabs.com</a>
      </div>
    </div>
  </div>
</aside>

