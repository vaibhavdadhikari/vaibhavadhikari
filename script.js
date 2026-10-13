/**
 * VAIBHAV ADHIKARI - PORTFOLIO INTERACTIVITY & BATTLE SCENARIO SIMULATOR
 * Enterprise Infrastructure Architect & IT Team Lead
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING EFFECT IN HERO SECTION
  const phrases = [
    "Enterprise Infrastructure Architect",
    "IT Team Lead @ Technocraft Industries",
    "Defender of 99.9% Production Uptime",
    "Sophos XG/XGS Firewall Specialist",
    "Cisco & Aruba Switching Backbone Engineer",
    "Disaster Immunity & Azure Cloud Pioneer"
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;
  const typedTextEl = document.getElementById('typed-text');

  function typeEffect() {
    if (!typedTextEl) return;

    if (phraseIndex >= phrases.length) {
      phraseIndex = 0;
    }

    currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
    }

    let typeSpeed = isDeleting ? 25 : 60;

    if (!isDeleting && letterIndex === currentPhrase.length) {
      typeSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 2. THEME TOGGLE (DARK / LIGHT)
  const themeToggle = document.getElementById('theme-toggle');
  const rootHtml = document.documentElement;

  const savedTheme = localStorage.getItem('va-theme') || 'dark';
  rootHtml.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', newTheme);
      localStorage.setItem('va-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // 3. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 4. SCROLL PROGRESS INDICATOR & ACTIVE NAV HIGHLIGHT
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0.5';
      }
    }
  });

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. INTERACTIVE BATTLE SCENARIO SIMULATOR
  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const scenarioTerminal = document.getElementById('scenario-terminal');
  const triggerScenarioBtn = document.getElementById('trigger-scenario-btn');
  const terminalTitle = document.getElementById('terminal-title');

  let activeScenario = 'breach';

  const scenarioScripts = {
    breach: {
      title: "SOPHOS-XG-IPS: INTRUSION ATTEMPT BLOCKED",
      execute: (term) => {
        term.innerHTML = `
          <p class="term-line danger">[ALERT 03:14:22] External Port Scan Detected from 185.220.101.42 targeting Port 3389 (RDP) & 445 (SMB)</p>
          <p class="term-line command">&gt; sophos-engine# evaluate perimeter-policy --zone WAN --src 185.220.101.42</p>
        `;

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line warning">[ACTION 1] Sophos Deep Packet Inspection: Flagged as High-Risk Threat (Brute Force Exploit signature: TROJAN-RDP-SCAN-v4).</p>
            <p class="term-line success">[ACTION 2] Automatic NAT Droplist triggered: Source IP 185.220.101.42 blacklisted for 72 hours.</p>
          `;
        }, 500);

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line command">&gt; sophos-central# broadcast endpoint-alert --scope "VLAN 10, VLAN 20"</p>
            <p class="term-line success">[COMPLIANCE] Sophos Central: All 500+ Endpoints verified secure. Zero lateral movement. Incident Log #8849 logged.</p>
          `;
          term.scrollTop = term.scrollHeight;
        }, 1200);
      }
    },
    'hardware-crash': {
      title: "DISASTER RECOVERY: HOST CRASH & ARCSERVE REPLICATION",
      execute: (term) => {
        term.innerHTML = `
          <p class="term-line danger">[CRITICAL 14:02:11] Hyper-V Host 02 (Production ERP Engine) suffered Dual PSU Hardware Failure.</p>
          <p class="term-line command">&gt; failover-cluster# check-heartbeat --node Host-02</p>
          <p class="term-line warning">[HEARTBEAT TIMEOUT] Host-02 unresponsive. Initiating Disaster Recovery Runbook...</p>
        `;

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line command">&gt; arcserve-udp-cli# mount-snapshot --target Host-03 --timestamp "14:00:00 (RPO: 2 mins)"</p>
            <p class="term-line info">[REPLICATION] Arcserve UDP verified block-level image integrity (0 corruption errors).</p>
            <p class="term-line success">[SPIN-UP] Replica VM ERP-PROD-2025 booted on standby VMware/Hyper-V node in 3 minutes 42 seconds.</p>
          `;
        }, 600);

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line success">[RESULT] Total Factory Downtime: &lt; 5 minutes. Full database consistency verified. DR SLA maintained.</p>
          `;
          term.scrollTop = term.scrollHeight;
        }, 1300);
      }
    },
    'rf-link': {
      title: "WIRELESS BACKHAUL: UBIQUITI RF POINT-TO-POINT LINK",
      execute: (term) => {
        term.innerHTML = `
          <p class="term-line command">&gt; ubiquiti-dish-link# show link-status --p2p "Division-A-to-Division-B"</p>
          <p class="term-line info">[RF SPECTRUM CHECK] Frequency: 5.8 GHz | Channel Width: 40 MHz | Distance: 2.4 Kilometers</p>
        `;

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line success">[SIGNAL STRENGTH] Local RSSI: -54 dBm | Remote RSSI: -55 dBm | Link Quality: 99.4% (AirMax)</p>
            <p class="term-line command">&gt; ping -c 10 -s 1472 192.168.30.1 (Cisco L3 Switch at Plant B)</p>
            <p class="term-line system">10 packets transmitted, 10 packets received, 0.0% packet loss, min/avg/max = 2.1 / 3.4 / 4.2 ms</p>
          `;
        }, 500);

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line success">[802.1Q TRUNK] VLAN 10 (Mgmt), VLAN 20 (ERP), VLAN 30 (Factory CCTV) traversing wireless bridge at wire speed.</p>
          `;
          term.scrollTop = term.scrollHeight;
        }, 1100);
      }
    },
    'hybrid-sync': {
      title: "MICROSOFT ENTRA ID & HYBRID IDENTITY GUARD",
      execute: (term) => {
        term.innerHTML = `
          <p class="term-line command">PS C:\\&gt; Start-ADSyncSyncCycle -PolicyType Delta</p>
          <p class="term-line info">[ENTRA ID CONNECT] Syncing on-premises Active Directory (Windows Server 2025) with Azure Cloud...</p>
        `;

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line success">[SYNC STATUS] 420 User Accounts & 18 OUs evaluated. 0 password hash conflicts.</p>
            <p class="term-line command">&gt; az entra conditional-access policy evaluate --user "finance_exec@technocraft.com"</p>
            <p class="term-line warning">[SUSPICIOUS LOCATION] Login attempt from non-compliant VPN gateway. Conditional Access evaluated.</p>
          `;
        }, 600);

        setTimeout(() => {
          term.innerHTML += `
            <p class="term-line success">[ENFORCEMENT] Step-up MFA challenge issued -> FIDO2 / Microsoft Authenticator required. Unauthorized access denied.</p>
          `;
          term.scrollTop = term.scrollHeight;
        }, 1300);
      }
    }
  };

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeScenario = btn.getAttribute('data-scenario');
      const data = scenarioScripts[activeScenario];
      if (data && terminalTitle) {
        terminalTitle.textContent = data.title;
      }
      if (scenarioTerminal) {
        scenarioTerminal.innerHTML = `
          <p class="term-line system">[SELECTED] ${data.title}</p>
          <p class="term-line info">Click "Trigger Scenario" above to run live incident simulation.</p>
        `;
      }
    });
  });

  if (triggerScenarioBtn && scenarioTerminal) {
    triggerScenarioBtn.addEventListener('click', () => {
      const data = scenarioScripts[activeScenario];
      if (data) {
        data.execute(scenarioTerminal);
      }
    });
  }

  // 6. ONE-CLICK COPY
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });

  // 7. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'Infrastructure Leadership Inquiry';
      const message = document.getElementById('message').value;

      showToast(`Thank you, ${name}! Preparing email transmission to Vaibhav...`);

      const mailtoUrl = `mailto:vaibhav.d.adhikari@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 700);
    });
  }

  // 8. TOAST NOTIFICATION UTILITY
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-shield-halved" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 9. HIGH-TECH NETWORK MESH CANVAS BACKGROUND
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const nodes = [];
    const nodeCount = Math.min(Math.floor(width / 34), 45);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1.2
      });
    }

    function animateNetwork() {
      ctx.clearRect(0, 0, width, height);
      const isDark = rootHtml.getAttribute('data-theme') !== 'light';
      const strokePrefix = isDark ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, ';
      const nodeColor = isDark ? 'rgba(56, 189, 248, 0.65)' : 'rgba(2, 132, 199, 0.65)';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const alpha = (1 - dist / 135) * 0.22;
            ctx.strokeStyle = `${strokePrefix}${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateNetwork);
    }

    animateNetwork();
  }
});
