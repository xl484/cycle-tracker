import os

# Define SVG Content for Home Dashboard Screen
home_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5D1F7"/>
      <stop offset="40%" stop-color="#E1D4F9"/>
      <stop offset="100%" stop-color="#FCDCE2"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.65)"/>
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.35)"/>
    </linearGradient>
    <radialGradient id="bubble-grad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.85)"/>
      <stop offset="30%" stop-color="rgba(235, 205, 255, 0.6)"/>
      <stop offset="70%" stop-color="rgba(195, 215, 255, 0.5)"/>
      <stop offset="95%" stop-color="rgba(254, 215, 225, 0.65)"/>
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.3)"/>
    </radialGradient>
    <linearGradient id="btn-pink" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F498B7"/>
      <stop offset="100%" stop-color="#E5BAF5"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#A2ACD8" flood-opacity="0.2"/>
    </filter>
    <filter id="bubble-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#BAC5F4" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="390" height="844" rx="40" fill="url(#bg-grad)"/>

  <text x="32" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#ffffff" opacity="0.95">9:41</text>
  <path d="M325 28 h12 v9 h-12 z" fill="#ffffff" opacity="0.8" rx="2"/>
  <path d="M308 31 h3 v6 h-3 z M313 28 h3 v9 h-3 z M318 25 h3 v12 h-3 z" fill="#ffffff" opacity="0.8"/>

  <text x="24" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="#ffffff" opacity="0.85">Hi, Luna</text>
  <text x="24" y="114" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="0.5">了解周期，</text>
  <text x="24" y="145" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="0.5">更好地照顾自己</text>

  <g transform="translate(332, 68)" opacity="0.9">
     <rect width="32" height="32" rx="10" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
     <rect x="8" y="9" width="16" height="15" rx="2" fill="none" stroke="#ffffff" stroke-width="1.5"/>
     <line x1="12" y1="6" x2="12" y2="10" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
     <line x1="20" y1="6" x2="20" y2="10" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
     <circle cx="12" cy="14" r="1" fill="#ffffff"/>
     <circle cx="16" cy="14" r="1" fill="#ffffff"/>
     <circle cx="20" cy="14" r="1" fill="#ffffff"/>
     <circle cx="12" cy="18" r="1" fill="#ffffff"/>
     <circle cx="16" cy="18" r="1" fill="#ffffff"/>
  </g>

  <circle cx="195" cy="275" r="95" fill="url(#bubble-grad)" filter="url(#bubble-shadow)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
  <circle cx="195" cy="275" r="90" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  
  <text x="195" y="248" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="21" font-weight="700" fill="#ffffff" text-anchor="middle" shadow="0 2px 4px rgba(0,0,0,0.1)">排卵期</text>
  <text x="195" y="278" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="500" fill="#ffffff" opacity="0.95" text-anchor="middle">第 12 天 / 共 28 天</text>
  
  <g transform="translate(130, 302)">
    <rect width="130" height="28" rx="14" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
    <text x="65" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#ffffff" text-anchor="middle">查看阶段详情 &gt;</text>
  </g>

  <circle cx="70" cy="190" r="14" fill="url(#bubble-grad)" opacity="0.7"/>
  <circle cx="340" cy="205" r="10" fill="url(#bubble-grad)" opacity="0.6"/>
  <circle cx="335" cy="355" r="16" fill="url(#bubble-grad)" opacity="0.5"/>

  <text x="24" y="420" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#5E6472">今日状态概览</text>
  
  <rect x="24" y="435" width="342" height="84" rx="22" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
  
  <g transform="translate(45, 452)">
    <circle cx="20" cy="20" r="15" fill="rgba(244,152,183,0.18)"/>
    <path d="M20 11 L14 21 L19 21 L18 29 L26 18 L21 18 Z" fill="#F498B7"/>
    <text x="20" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">精力较高</text>
  </g>
  <g transform="translate(125, 452)">
    <circle cx="20" cy="20" r="15" fill="rgba(186,197,244,0.18)"/>
    <circle cx="16" cy="18" r="1.5" fill="#BAC5F4"/>
    <circle cx="24" cy="18" r="1.5" fill="#BAC5F4"/>
    <path d="M14 24 Q20 28 26 24" stroke="#BAC5F4" stroke-width="2" fill="none" stroke-linecap="round"/>
    <text x="20" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">情绪平稳</text>
  </g>
  <g transform="translate(205, 452)">
    <circle cx="20" cy="20" r="15" fill="rgba(168,230,207,0.18)"/>
    <path d="M20 12 C24 16 26 20 20 27 C14 20 16 16 20 12 Z" fill="#76C8A9"/>
    <text x="20" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">身体轻盈</text>
  </g>
  <g transform="translate(285, 452)">
    <circle cx="20" cy="20" r="15" fill="rgba(255,211,182,0.18)"/>
    <path d="M22 14 A 5 5 0 1 0 24 22 A 7 7 0 1 1 22 14 Z" fill="#FFAAA6"/>
    <text x="20" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">睡眠良好</text>
  </g>

  <rect x="24" y="542" width="342" height="78" rx="22" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="44" y="572" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#5E6472">记录经期</text>
  
  <text x="44" y="595" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#9CA3AF" font-weight="500">开始日期</text>
  <text x="44" y="612" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#4B5563">5月20日</text>

  <text x="150" y="595" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#9CA3AF" font-weight="500">周期长度</text>
  <text x="150" y="612" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#4B5563">28 天</text>

  <circle cx="322" cy="581" r="22" fill="url(#btn-pink)" filter="url(#shadow)"/>
  <line x1="313" y1="581" x2="331" y2="581" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  <line x1="322" y1="572" x2="322" y2="590" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>

  <text x="24" y="648" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#5E6472">周期阶段总览</text>
  <rect x="24" y="663" width="342" height="74" rx="22" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
  
  <g transform="translate(50, 690)">
    <circle cx="0" cy="0" r="5" fill="#F498B7"/>
    <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#6B7280" text-anchor="middle">经期</text>
    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle">1-5天</text>
  </g>
  <line x1="55" y1="690" x2="115" y2="690" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
  
  <g transform="translate(125, 690)">
    <circle cx="0" cy="0" r="5" fill="#BAC5F4"/>
    <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#6B7280" text-anchor="middle">卵泡期</text>
    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle">6-13天</text>
  </g>
  <line x1="130" y1="690" x2="200" y2="690" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>

  <g transform="translate(210, 690)">
    <circle cx="0" cy="0" r="8" fill="none" stroke="#F498B7" stroke-width="2"/>
    <circle cx="0" cy="0" r="4" fill="#F498B7"/>
    <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700" fill="#4B5563" text-anchor="middle">排卵期</text>
    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="600" fill="#6B7280" text-anchor="middle">14-16天</text>
  </g>
  <line x1="220" y1="690" x2="285" y2="690" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>

  <g transform="translate(295, 690)">
    <circle cx="0" cy="0" r="5" fill="#FFD3B6"/>
    <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#6B7280" text-anchor="middle">黄体期</text>
    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" fill="#9CA3AF" text-anchor="middle">17-28天</text>
  </g>

  <rect x="0" y="765" width="390" height="79" fill="rgba(255,255,255,0.88)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
  <g transform="translate(48, 778)">
    <path d="M12 4 L4 11 L4 20 L9 20 L9 14 L15 14 L15 20 L20 20 L20 11 Z" fill="#F498B7"/>
    <text x="12" y="33" font-family="-apple-system, sans-serif" font-size="10" font-weight="700" fill="#F498B7" text-anchor="middle">首页</text>
  </g>
  <g transform="translate(136, 778)" opacity="0.4">
    <rect x="5" y="4" width="14" height="15" rx="2" fill="none" stroke="#4B5563" stroke-width="2"/>
    <line x1="9" y1="9" x2="15" y2="9" stroke="#4B5563" stroke-width="2"/>
    <line x1="9" y1="13" x2="13" y2="13" stroke="#4B5563" stroke-width="2"/>
    <text x="12" y="33" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#4B5563" text-anchor="middle">记录</text>
  </g>
  <g transform="translate(224, 778)" opacity="0.4">
    <path d="M4 18 L9 11 L14 14 L20 6" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="12" y="33" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#4B5563" text-anchor="middle">洞察</text>
  </g>
  <g transform="translate(312, 778)" opacity="0.4">
    <circle cx="12" cy="8" r="4" fill="none" stroke="#4B5563" stroke-width="2"/>
    <path d="M4 20 C4 16 8 14 12 14 C16 14 20 16 20 20" fill="none" stroke="#4B5563" stroke-width="2"/>
    <text x="12" y="33" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#4B5563" text-anchor="middle">我的</text>
  </g>
</svg>"""

# Define SVG Content for Phase Details Screen
details_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5D1F7"/>
      <stop offset="40%" stop-color="#E1D4F9"/>
      <stop offset="100%" stop-color="#FCDCE2"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.7)"/>
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.4)"/>
    </linearGradient>
    <radialGradient id="bubble-pink" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.9)"/>
      <stop offset="50%" stop-color="rgba(244, 152, 183, 0.4)"/>
      <stop offset="100%" stop-color="rgba(229, 186, 245, 0.1)"/>
    </radialGradient>
    <linearGradient id="btn-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BAC5F4"/>
      <stop offset="100%" stop-color="#E5BAF5"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#A2ACD8" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="390" height="844" rx="40" fill="url(#bg-grad)"/>

  <g transform="translate(24, 56)">
    <path d="M10 5 L2 13 L10 21 M2 13 L22 13" fill="none" stroke="#5E6472" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="171" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="17" font-weight="700" fill="#5E6472" text-anchor="middle">阶段详情</text>
    <path d="M315 8 A 3 3 0 1 1 312 5 M315 8 A 3 3 0 1 1 312 11 M315 8 L327 14 M327 14 A 3 3 0 1 1 330 11" fill="none" stroke="#5E6472" stroke-width="2" opacity="0.8"/>
    <circle cx="328" cy="5" r="2.5" fill="#5E6472"/>
    <circle cx="314" cy="12" r="2.5" fill="#5E6472"/>
    <circle cx="328" cy="19" r="2.5" fill="#5E6472"/>
    <line x1="325" y1="7" x2="317" y2="10" stroke="#5E6472" stroke-width="1.5"/>
    <line x1="317" y1="14" x2="325" y2="17" stroke="#5E6472" stroke-width="1.5"/>
  </g>

  <rect x="24" y="110" width="342" height="660" rx="28" fill="url(#card-grad)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" filter="url(#shadow)"/>

  <g transform="translate(48, 145)">
    <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="16" fill="rgba(186,197,244,0.3)"/>
    <path d="M21 17 C25 20 27 23 24 29 C21 23 22 20 21 17 Z" fill="#BAC5F4" transform="rotate(-30 24 24)"/>
    
    <text x="60" y="20" font-family="-apple-system, sans-serif" font-size="20" font-weight="700" fill="#4B5563">排卵期</text>
    <text x="60" y="38" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#9CA3AF">第 12 天 / 共 28 天</text>
  </g>

  <circle cx="310" cy="175" r="35" fill="url(#bubble-pink)" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>

  <g transform="translate(48, 220)">
    <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#6B7280" width="294">
      <tspan x="0" dy="18">这是你魅力四射、能量较高的阶段。身体状态</tspan>
      <tspan x="0" dy="20">和情绪通常较为稳定，是拓展社交、推进计划的</tspan>
      <tspan x="0" dy="20">好时机。</tspan>
    </text>
  </g>

  <g transform="translate(48, 310)">
    <rect width="294" height="64" rx="18" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="26" cy="32" r="14" fill="rgba(244,152,183,0.15)"/>
    <path d="M26 24 L21 32 L25 32 L25 38 L31 30 L27 30 Z" fill="#F498B7"/>
    <text x="54" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#4B5563">精力水平</text>
    <text x="245" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#F498B7" text-anchor="end">较高</text>
    <path d="M255 32 L260 37 L255 42" fill="none" stroke="#F498B7" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g transform="translate(48, 390)">
    <rect width="294" height="64" rx="18" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="26" cy="32" r="14" fill="rgba(186,197,244,0.15)"/>
    <path d="M20 32 L32 32 M20 28 L20 36 M32 28 L32 36" fill="none" stroke="#BAC5F4" stroke-width="2.5" stroke-linecap="round"/>
    <text x="54" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#4B5563">适合运动</text>
    <text x="268" y="37" font-family="-apple-system, sans-serif" font-size="12" font-weight="500" fill="#6B7280" text-anchor="end">有氧运动 / 舞蹈 / 户外活动</text>
  </g>

  <g transform="translate(48, 470)">
    <rect width="294" height="64" rx="18" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="26" cy="32" r="14" fill="rgba(168,230,207,0.15)"/>
    <rect x="21" y="26" width="10" height="12" rx="1" fill="none" stroke="#76C8A9" stroke-width="2"/>
    <line x1="24" y1="29" x2="28" y2="29" stroke="#76C8A9" stroke-width="1.5"/>
    <text x="54" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#4B5563">工作建议</text>
    <text x="268" y="37" font-family="-apple-system, sans-serif" font-size="12" font-weight="500" fill="#6B7280" text-anchor="end">创意工作 / 团队协作 / 演讲展示</text>
  </g>

  <g transform="translate(48, 550)">
    <rect width="294" height="64" rx="18" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="26" cy="32" r="14" fill="rgba(255,211,182,0.15)"/>
    <circle cx="23" cy="30" r="1" fill="#FFAAA6"/>
    <circle cx="29" cy="30" r="1" fill="#FFAAA6"/>
    <path d="M21 34 Q25 38 29 34" stroke="#FFAAA6" stroke-width="2" fill="none" stroke-linecap="round"/>
    <text x="54" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#4B5563">情绪倾向</text>
    <text x="268" y="37" font-family="-apple-system, sans-serif" font-size="12" font-weight="500" fill="#6B7280" text-anchor="end">自信 / 积极 / 社交欲增强</text>
  </g>

  <g transform="translate(48, 680)" filter="url(#shadow)">
    <rect width="294" height="46" rx="23" fill="url(#btn-grad)" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <text x="147" y="27" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">记录今日状态 &gt;</text>
  </g>
</svg>"""

# Define SVG Content for Calendar and Insights Widgets Screen
widgets_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5D1F7"/>
      <stop offset="40%" stop-color="#E1D4F9"/>
      <stop offset="100%" stop-color="#FCDCE2"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.65)"/>
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.35)"/>
    </linearGradient>
    <linearGradient id="btn-blue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BAC5F4"/>
      <stop offset="100%" stop-color="#E5BAF5"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#A2ACD8" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="390" height="844" rx="40" fill="url(#bg-grad)"/>

  <text x="195" y="45" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#5E6472" text-anchor="middle">数据组件及日历</text>

  <g transform="translate(24, 70)">
    <rect width="342" height="260" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="20" y="30" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#5E6472">周期日历</text>
    
    <g transform="translate(20, 60)" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#9CA3AF" text-anchor="middle">
      <text x="15">日</text><text x="55">一</text><text x="95">二</text><text x="135">三</text><text x="175">四</text><text x="215">五</text><text x="255">六</text>
    </g>

    <g transform="translate(20, 90)" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#6B7280" text-anchor="middle">
      <text x="15" fill="#D1D5DB">28</text><text x="55" fill="#D1D5DB">29</text><text x="95" fill="#D1D5DB">30</text><text x="135">1</text><text x="175">2</text><text x="215">3</text><text x="255">4</text>
      <g transform="translate(0, 30)">
        <text x="15">5</text><text x="55">6</text><text x="95">7</text><text x="135">8</text><text x="175">9</text><text x="215">10</text><text x="255">11</text>
      </g>
      <g transform="translate(0, 60)">
        <circle cx="15" cy="-4" r="11" fill="#BAC5F4" opacity="0.5"/>
        <text x="15" fill="#4B5563">12</text>
        
        <text x="55">13</text>
        
        <circle cx="95" cy="-4" r="11" fill="#F498B7" opacity="0.4"/>
        <text x="95" fill="#4B5563">14</text>
        
        <circle cx="135" cy="-4" r="11" fill="#F498B7" opacity="0.6"/>
        <text x="135" fill="#ffffff">15</text>
        
        <circle cx="175" cy="-4" r="11" fill="#F498B7" opacity="0.4"/>
        <text x="175" fill="#4B5563">16</text>
        
        <circle cx="215" cy="-4" r="11" fill="#FFD3B6" opacity="0.5"/>
        <text x="215" fill="#4B5563">17</text>
        
        <circle cx="255" cy="-4" r="11" fill="#FFD3B6" opacity="0.5"/>
        <text x="255" fill="#4B5563">18</text>
      </g>
    </g>

    <g transform="translate(20, 230)" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#7F848C">
      <circle cx="5" cy="-3" r="4" fill="#F498B7"/>
      <text x="14">经期</text>

      <circle cx="55" cy="-3" r="4" fill="#BAC5F4"/>
      <text x="64">卵泡期</text>

      <circle cx="110" cy="-3" r="4" fill="#F498B7"/>
      <circle cx="110" cy="-3" r="2" fill="#ffffff"/>
      <text x="120">排卵期</text>

      <circle cx="165" cy="-3" r="4" fill="#FFD3B6"/>
      <text x="174">黄体期</text>
    </g>
  </g>

  <g transform="translate(24, 350)">
    <rect width="342" height="210" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="20" y="30" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#5E6472">记录状态</text>
    <text x="20" y="52" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#9CA3AF">今天感觉如何？</text>

    <g transform="translate(20, 65)">
      <circle cx="15" cy="15" r="14" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)"/>
      <text x="15" y="20" font-size="14" text-anchor="middle">😊</text>
      
      <circle cx="65" cy="15" r="14" fill="#BAC5F4" opacity="0.3"/>
      <circle cx="65" cy="15" r="14" fill="none" stroke="#BAC5F4" stroke-width="1.5"/>
      <text x="65" y="20" font-size="14" text-anchor="middle">😌</text>

      <circle cx="115" cy="15" r="14" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)"/>
      <text x="115" y="20" font-size="14" text-anchor="middle">😴</text>

      <circle cx="165" cy="15" r="14" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)"/>
      <text x="165" y="20" font-size="14" text-anchor="middle">😟</text>
    </g>

    <g transform="translate(20, 115)">
      <text x="0" y="12" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#6B7280">精力水平</text>
      <rect x="0" y="22" width="260" height="6" rx="3" fill="rgba(255,255,255,0.5)"/>
      <rect x="0" y="22" width="180" height="6" rx="3" fill="#BAC5F4"/>
      <circle cx="180" cy="25" r="7" fill="#ffffff" stroke="#BAC5F4" stroke-width="2" filter="url(#shadow)"/>
      <text x="290" y="27" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#BAC5F4" text-anchor="end">7</text>
    </g>

    <g transform="translate(100, 165)">
      <rect width="142" height="32" rx="16" fill="url(#btn-blue)"/>
      <text x="71" y="20" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">保存</text>
    </g>
  </g>

  <g transform="translate(24, 580)">
    <rect width="342" height="220" rx="24" fill="url(#card-grad)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="20" y="30" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#5E6472">数据洞察</text>
    
    <text x="20" y="55" font-family="-apple-system, sans-serif" font-size="11" fill="#9CA3AF">本周时长</text>
    <text x="20" y="75" font-family="-apple-system, sans-serif" font-size="18" font-weight="700" fill="#4B5563">28 天</text>

    <text x="322" y="55" font-family="-apple-system, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="end">周期趋势</text>
    <text x="322" y="75" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#76C8A9" text-anchor="end">稳定 &gt;</text>

    <path d="M40 140 Q 80 110, 120 130 T 200 100 T 300 125" fill="none" stroke="#BAC5F4" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="120" cy="130" r="4" fill="#F498B7"/>
    <circle cx="200" cy="100" r="4" fill="#BAC5F4"/>
    <circle cx="300" cy="125" r="4" fill="#BAC5F4"/>
    
    <g transform="translate(40, 165)" font-family="-apple-system, sans-serif" font-size="10" font-weight="500" fill="#9CA3AF" text-anchor="middle">
      <text x="0">3/25</text>
      <text x="100">4/22</text>
      <text x="220">5/20</text>
    </g>
  </g>
</svg>"""

# Save out the high-quality SVGs
with open("period_tracker_home.svg", "w", encoding="utf-8") as f:
    f.write(home_svg)

with open("period_tracker_details.svg", "w", encoding="utf-8") as f:
    f.write(details_svg)

with open("period_tracker_widgets.svg", "w", encoding="utf-8") as f:
    f.write(widgets_svg)

print("Files generated successfully.")