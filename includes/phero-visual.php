<svg class="phero-viz" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
  <defs>
    <radialGradient id="pvBgL"><stop stop-color="#2456F0" stop-opacity=".22"/><stop offset="1" stop-color="#2456F0" stop-opacity="0"/></radialGradient>
    <radialGradient id="pvBgR"><stop stop-color="#3BC9E0" stop-opacity=".18"/><stop offset="1" stop-color="#3BC9E0" stop-opacity="0"/></radialGradient>
    <radialGradient id="pvHubBlue"><stop stop-color="#7DA0FF"/><stop offset="1" stop-color="#2456F0"/></radialGradient>
    <radialGradient id="pvHubCyan"><stop stop-color="#9AF0FF"/><stop offset="1" stop-color="#2AA8C4"/></radialGradient>
    <linearGradient id="pvLine" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#3BC9E0" stop-opacity="0"/><stop offset=".15" stop-color="#3BC9E0" stop-opacity=".55"/>
      <stop offset=".85" stop-color="#2456F0" stop-opacity=".55"/><stop offset="1" stop-color="#2456F0" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <circle cx="180" cy="210" r="200" fill="url(#pvBgL)"/>
  <circle cx="1040" cy="160" r="220" fill="url(#pvBgR)"/>

  <path d="M20 300 C 220 300 260 340 460 300 C 660 260 700 200 900 230 C 1000 245 1050 200 1180 180"
        fill="none" stroke="url(#pvLine)" stroke-width="1.6" class="flow"/>

  <circle r="3" fill="#fff" opacity=".8">
    <animateMotion dur="6s" repeatCount="indefinite"
      path="M20 300 C 220 300 260 340 460 300 C 660 260 700 200 900 230 C 1000 245 1050 200 1180 180"/>
  </circle>

  <g>
    <circle cx="20" cy="300" r="3.5" fill="#6EE0F2"/>

    <circle cx="460" cy="300" r="24" fill="url(#pvHubBlue)" opacity=".2" class="pulse"/>
    <circle cx="460" cy="300" r="11" fill="url(#pvHubBlue)"/>
    <circle cx="460" cy="300" r="11" fill="none" stroke="#fff" stroke-opacity=".3"/>

    <circle cx="680" cy="215" r="4" fill="#6EE0F2" opacity=".85"/>

    <circle cx="900" cy="230" r="22" fill="url(#pvHubCyan)" opacity=".2" class="pulse" style="animation-delay:-1.8s"/>
    <circle cx="900" cy="230" r="10" fill="url(#pvHubCyan)"/>
    <circle cx="900" cy="230" r="10" fill="none" stroke="#fff" stroke-opacity=".3"/>

    <circle cx="1180" cy="180" r="3.5" fill="#7DA0FF"/>
  </g>

  <g fill="#fff">
    <circle cx="140" cy="120" r="1.6" opacity=".35" class="pulse"/>
    <circle cx="760" cy="90" r="1.6" opacity=".3" class="pulse" style="animation-delay:-1.4s"/>
    <circle cx="1080" cy="300" r="1.6" opacity=".3" class="pulse" style="animation-delay:-2.6s"/>
  </g>
</svg>

