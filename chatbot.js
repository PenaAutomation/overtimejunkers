(function() {
  // ── CONFIG ──────────────────────────────────────────────────────────────
  const NOTIFY_EMAIL = 'info@overtimejunkers.com';
  const BUSINESS_NAME = 'Overtime Junkers';
  const PHONE = '713-906-2389';

  // ── STYLES ──────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #oj-chat-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #D01B00;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(208,27,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #oj-chat-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(208,27,0,0.7);
    }
    #oj-chat-btn svg { width: 28px; height: 28px; fill: #F9F6F2; }

    @media (max-width: 480px) {
      #oj-chat-btn { bottom: 160px; right: 16px; width: 52px; height: 52px; }
      #oj-chat-bubble { bottom: 225px; right: 16px; font-size: 12px; }
      #oj-chat-window { bottom: 0 !important; right: 0 !important; left: 0 !important; width: 100% !important; max-width: 100% !important; height: 80vh !important; max-height: 80vh !important; border-radius: 20px 20px 0 0 !important; border-left: none !important; border-right: none !important; border-bottom: none !important; }
    }

    @media (max-width: 480px) {
      #oj-chat-btn { bottom: 160px; right: 16px; width: 52px; height: 52px; }
      #oj-chat-bubble { bottom: 225px; right: 16px; font-size: 12px; }
      #oj-chat-window { bottom: 0 !important; right: 0 !important; left: 0 !important; width: 100% !important; max-width: 100% !important; height: 80vh !important; max-height: 80vh !important; border-radius: 20px 20px 0 0 !important; border-left: none !important; border-right: none !important; border-bottom: none !important; }
    }

    #oj-chat-bubble {
      position: fixed;
      bottom: 96px;
      right: 24px;
      z-index: 9998;
      background: #D01B00;
      color: #F9F6F2;
      font-family: 'Barlow', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 20px 20px 4px 20px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      animation: oj-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events: none;
    }
    @keyframes oj-pop {
      from { opacity: 0; transform: scale(0.7) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    #oj-chat-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      z-index: 9998;
      width: 360px;
      max-width: calc(100vw - 48px);
      height: 500px;
      max-height: calc(100vh - 120px);
      background: #141414;
      border-radius: 16px;
      border: 1px solid rgba(208,27,0,0.3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.7);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Barlow', sans-serif;
      animation: oj-slide 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes oj-slide {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    #oj-chat-header {
      background: #D01B00;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #oj-chat-header .oj-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    #oj-chat-header .oj-title {
      flex: 1;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #F9F6F2;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    #oj-chat-header .oj-subtitle {
      font-size: 11px;
      color: rgba(249,246,242,0.7);
      font-weight: 400;
    }
    #oj-close-btn {
      background: none;
      border: none;
      color: #F9F6F2;
      cursor: pointer;
      font-size: 20px;
      opacity: 0.7;
      padding: 4px;
      line-height: 1;
    }
    #oj-close-btn:hover { opacity: 1; }

    #oj-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: #333 transparent;
    }

    .oj-msg {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.45;
      animation: oj-msg-in 0.25s ease;
    }
    @keyframes oj-msg-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .oj-msg.bot {
      background: #1E1E1E;
      color: #F9F6F2;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .oj-msg.user {
      background: #D01B00;
      color: #F9F6F2;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }
    .oj-typing {
      background: #1E1E1E;
      color: #888884;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      padding: 10px 16px;
      font-size: 20px;
      letter-spacing: 2px;
      align-self: flex-start;
      animation: oj-msg-in 0.25s ease;
    }

    #oj-input-area {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      background: #141414;
    }
    #oj-input {
      flex: 1;
      background: #1E1E1E;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 24px;
      color: #F9F6F2;
      font-family: 'Barlow', sans-serif;
      font-size: 14px;
      padding: 10px 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    #oj-input:focus { border-color: rgba(208,27,0,0.6); }
    #oj-input::placeholder { color: #555; }
    #oj-send-btn {
      background: #D01B00;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s;
    }
    #oj-send-btn:hover { background: #FF2200; }
    #oj-send-btn svg { width: 18px; height: 18px; fill: #F9F6F2; }

    .oj-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .oj-qr {
      background: transparent;
      border: 1px solid rgba(208,27,0,0.5);
      color: #D01B00;
      border-radius: 20px;
      padding: 5px 12px;
      font-family: 'Barlow', sans-serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .oj-qr:hover { background: #D01B00; color: #F9F6F2; }
  `;
  document.head.appendChild(style);

  // ── HTML ────────────────────────────────────────────────────────────────
  const bubble = document.createElement('div');
  bubble.id = 'oj-chat-bubble';
  bubble.textContent = 'Get a free quote! 💬';
  document.body.appendChild(bubble);
  setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 5000);

  const btn = document.createElement('button');
  btn.id = 'oj-chat-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'oj-chat-window';
  win.style.display = 'none';
  win.innerHTML = `
    <div id="oj-chat-header">
      <div class="oj-avatar"><img src="brand_assets/logo.png" style="width:32px;height:32px;object-fit:contain;border-radius:50%;" /></div>
      <div>
        <div class="oj-title">Overtime Junkers</div>
        <div class="oj-subtitle">Typically replies in minutes</div>
      </div>
      <button id="oj-close-btn">✕</button>
    </div>
    <div id="oj-messages"></div>
    <div id="oj-input-area">
      <input id="oj-input" type="text" placeholder="Type a message…" autocomplete="off" />
      <button id="oj-send-btn" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(win);

  // ── STATE ───────────────────────────────────────────────────────────────
  let isOpen = false;
  let conversationHistory = [];
  let leadData = { name: null, phone: null, service: null, location: null };
  let leadSent = false;

  const SYSTEM_PROMPT = `You are a friendly, helpful chat assistant for ${BUSINESS_NAME}, a junk removal and demolition company in Houston, TX. Your job is to help potential customers get a free quote.

Services offered: Junk Removal, Garage Cleanout, Demolition, Hauling, Dumpster Rental, Siding, Remodeling, Flooring.

Your goal is to naturally collect in this order:
1. What service they need
2. Their location (city or neighborhood in the Houston area)
3. Their first name
4. Their phone number

Rules:
- Be conversational and friendly, not robotic
- Keep responses SHORT (1-3 sentences max)
- Once you have name, phone, service, and location, confirm their info and tell them the team will reach out shortly
- If they ask about pricing, say pricing depends on the job size and the team will give an exact quote when they call
- Phone number: ${PHONE}
- Do NOT make up prices or guarantees
- If they seem ready to book, push them to call/text ${PHONE} directly for fastest service

When you have collected name, phone, service, AND location, include this exact JSON at the END of your response on its own line:
LEAD_CAPTURED:{"name":"[name]","phone":"[phone]","service":"[service]","location":"[location]"}`;

  // ── FUNCTIONS ────────────────────────────────────────────────────────────
  function messagesEl() { return document.getElementById('oj-messages'); }
  function inputEl() { return document.getElementById('oj-input'); }

  function scrollBottom() {
    const el = messagesEl();
    el.scrollTop = el.scrollHeight;
  }

  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = 'oj-msg ' + role;
    div.textContent = text;
    messagesEl().appendChild(div);
    scrollBottom();
    return div;
  }

  function addQuickReplies(options, onSelect) {
    const wrap = document.createElement('div');
    wrap.className = 'oj-quick-replies';
    options.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'oj-qr';
      b.textContent = opt;
      b.onclick = () => { wrap.remove(); onSelect(opt); };
      wrap.appendChild(b);
    });
    messagesEl().appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'oj-typing';
    div.id = 'oj-typing';
    div.textContent = '•••';
    messagesEl().appendChild(div);
    scrollBottom();
    return div;
  }

  function removeTyping() {
    const t = document.getElementById('oj-typing');
    if (t) t.remove();
  }

  async function sendToAI(userMessage) {
    conversationHistory.push({ role: 'user', content: userMessage });

    const typing = showTyping();

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      const fullText = data.content?.[0]?.text || "Sorry, I'm having trouble connecting. Please call us at " + PHONE;

      // Check for lead capture
      const leadMatch = fullText.match(/LEAD_CAPTURED:(\{.*?\})/s);
      let displayText = fullText.replace(/\nLEAD_CAPTURED:\{.*?\}/, '').trim();

      removeTyping();
      addMessage(displayText, 'bot');

      if (leadMatch && !leadSent) {
        try {
          const lead = JSON.parse(leadMatch[1]);
          leadData = lead;
          submitLead(lead);
          leadSent = true;
        } catch(e) {}
      }

      conversationHistory.push({ role: 'assistant', content: fullText });

    } catch (err) {
      removeTyping();
      addMessage("I'm having a connection issue. Please call or text us at " + PHONE + " for the fastest service!", 'bot');
    }
  }

  function submitLead(lead) {
    // Submit to Netlify forms
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'chatbot-lead',
        'name': lead.name || '',
        'phone': lead.phone || '',
        'service': lead.service || '',
        'location': lead.location || '',
        'source': 'chatbot'
      }).toString()
    }).catch(() => {});

    // Send SMS to owner via Twilio
    fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'notify',
        lead: {
          name: lead.name || '',
          phone: lead.phone || '',
          service: lead.service || '',
          location: lead.location || 'Not provided',
          photos: []
        }
      })
    }).catch(() => {});
  }

  function handleSend() {
    const input = inputEl();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, 'user');
    sendToAI(text);
  }

  // ── OPEN / CLOSE ─────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    win.style.display = 'flex';
    if (bubble.parentNode) bubble.remove();
    if (conversationHistory.length === 0) {
      setTimeout(() => {
        addMessage("Hey! 👋 I'm here to help you get a free quote from Overtime Junkers. What kind of job do you need done?", 'bot');
        addQuickReplies(
          ['Junk Removal', 'Garage Cleanout', 'Demolition', 'Hauling', 'Other'],
          (opt) => {
            addMessage(opt, 'user');
            sendToAI(opt);
          }
        );
      }, 300);
    }
    setTimeout(() => inputEl().focus(), 400);
  }

  function closeChat() {
    isOpen = false;
    win.style.display = 'none';
  }

  // ── EVENTS ───────────────────────────────────────────────────────────────
  btn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  document.getElementById('oj-close-btn').addEventListener('click', closeChat);
  document.getElementById('oj-send-btn').addEventListener('click', handleSend);
  document.getElementById('oj-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

})();
