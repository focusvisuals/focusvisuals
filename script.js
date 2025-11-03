// Chat popup toggle with localStorage persistence
(function(){
  const bubble = document.getElementById('chatBubble');
  const popup = document.getElementById('chatPopup');
  const close = document.getElementById('chatPopupClose');

  if (!bubble || !popup || !close) return;

  // Restore state from localStorage
  const chatOpen = localStorage.getItem('chatPopupOpen') === 'true';
  if (chatOpen) {
    popup.classList.add('active');
  }

  bubble.addEventListener('click', () => {
    popup.classList.add('active');
    localStorage.setItem('chatPopupOpen', 'true');
  });

  close.addEventListener('click', () => {
    popup.classList.remove('active');
    localStorage.setItem('chatPopupOpen', 'false');
    resetChat();
  });

  // Reset chat to initial state
  const resetChat = () => {
    const chatActions = document.getElementById('chatActions');
    const chatInputWrapper = document.getElementById('chatInputWrapper');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    
    if (chatActions && chatInputWrapper && chatMessages && chatInput) {
      // Show action buttons, hide input
      chatActions.style.display = 'flex';
      chatInputWrapper.style.display = 'none';
      
      // Clear input field
      chatInput.value = '';
      
      // Reset messages to initial state
      chatMessages.innerHTML = '<div class="chat-message chat-message-received"><div class="chat-message-text">Hi! 👋 Ready to bring your vision to life?</div></div>';
      
      // Scroll to top
      chatMessages.scrollTop = 0;
    }
  };

  // Start conversation
  const startBtn = document.getElementById('startConversation');
  const chatActions = document.getElementById('chatActions');
  const chatInputWrapper = document.getElementById('chatInputWrapper');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  if (startBtn && chatActions && chatInputWrapper && chatMessages && chatInput && chatSendBtn) {
    startBtn.addEventListener('click', () => {
      chatActions.style.display = 'none';
      chatInputWrapper.style.display = 'flex';
      
      // Clear all previous messages
      chatMessages.innerHTML = '';
      
      // Add a response message
      const responseMsg = document.createElement('div');
      responseMsg.className = 'chat-message chat-message-received';
      responseMsg.innerHTML = '<div class="chat-message-text">Great! What would you like to discuss? Feel free to share your ideas.</div>';
      chatMessages.appendChild(responseMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Focus input
      setTimeout(() => chatInput.focus(), 100);
    });

    // Virtual Assistant Response Logic
    const getAssistantResponse = (userMessage) => {
      const msg = userMessage.toLowerCase();
      
      // Specific service: Corporate Video Production
      if (msg.includes('corporate') || (msg.includes('corporate video') && (msg.includes('tell') || msg.includes('more') || msg.includes('about') || msg.includes('info')))) {
        return '<strong>Corporate Video Production</strong><br><br>Your brand deserves more than just a video — it deserves a story that resonates. Our corporate video production service transforms your message into a visual experience that connects with your audience.<br><br>From concept development to final delivery, we focus on clarity, creativity, and precision. Every frame is designed to reflect your values and engage viewers in a way that strengthens your brand identity.<br><br>Want to discuss your corporate video project? Just let me know!';
      }
      
      // Specific service: Promotional & Marketing
      if (msg.includes('promotional') || msg.includes('marketing') || (msg.includes('promo') && (msg.includes('tell') || msg.includes('more') || msg.includes('about') || msg.includes('info')))) {
        return '<strong>Promotional & Marketing Videos</strong><br><br>When it comes to marketing, attention is everything. We create promotional videos that not only showcase your products or services but also inspire action.<br><br>By blending strategic messaging with cinematic storytelling, we craft content that stands out in a crowded digital space and leaves a lasting impression. Whether for campaigns, product launches, or brand awareness, our videos are designed to captivate, connect, and convert.<br><br>Ready to elevate your marketing? Tell me more about your campaign!';
      }
      
      // Specific service: Training & Internal Communication
      if (msg.includes('training') || msg.includes('internal') || (msg.includes('communication') && (msg.includes('tell') || msg.includes('more') || msg.includes('about') || msg.includes('info')))) {
        return '<strong>Training & Internal Communication Videos</strong><br><br>Clear communication is the backbone of any successful organization. Our training and internal communication videos simplify complex ideas and deliver them in a format that’s easy to understand and retain.<br><br>From onboarding new employees to sharing company updates, we create content that informs, educates, and aligns your team.<br><br>Need training videos for your team? I\'d love to hear about your needs!';
      }
      
      // Specific service: Strategy & Consulting
      if (msg.includes('strategy') || msg.includes('consulting') || msg.includes('consult')) {
        return '<strong>Strategy & Consulting</strong><br><br>Before the cameras roll, clarity matters. Our Strategy & Consulting service helps you define your message, identify your audience, and choose the right approach for maximum impact.<br><br>From concept development to distribution planning, we guide you through every decision to ensure your video isn’t just beautiful — it’s effective.<br><br>Looking for strategic guidance? Share your goals and let\'s build a plan together!';
      }
      
      // Specific service: Social Media (coming soon)
      if (msg.includes('social media') || (msg.includes('social') && msg.includes('content'))) {
        return '<strong>Social Media Content</strong> (Coming Soon)<br><br>We’re working on something dynamic for your social platforms. Soon, we’ll offer short, engaging videos optimized for Instagram, LinkedIn, TikTok, and more — designed to grab attention and spark conversation.<br><br>Stay tuned for content that’s creative, strategic, and built for impact. Want to be notified when we launch? Let me know!';
      }
      
      // Specific service: Event Coverage (coming soon)
      if (msg.includes('event') && (msg.includes('coverage') || msg.includes('video'))) {
        return '<strong>Event Coverage</strong> (Coming Soon)<br><br>Capturing the energy and highlights of your events is next on our horizon. We’re developing a service that will bring conferences, launches, and celebrations to life through polished, professional video coverage.<br><br>These videos will help you share key moments internally and across your marketing channels, extending the value of your event long after it ends. Interested? Let me know!';
      }
      
      // General services questions
      if (msg.includes('service') || msg.includes('what do you') || msg.includes('what can you') || msg.includes('do you offer')) {
        return 'We specialize in:<br><br>• <strong>Corporate Video Production</strong><br>• <strong>Promotional & Marketing Videos</strong><br>• <strong>Training & Internal Communication</strong><br>• <strong>Strategy & Consulting</strong><br><br>Would you like to know more about any specific service? Just ask! Or <a href="services.html" style="color: var(--primary); font-weight: 600;">explore all services</a>.';
      }
      
      // Pricing questions
      if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('pricing') || msg.includes('budget')) {
        return 'Our pricing is customized based on your specific needs and project scope. Every project is unique!<br><br>Factors include: video length, complexity, location, and turnaround time.<br><br>We\'d love to discuss your project and provide a tailored quote. <a href="contact.html" style="color: var(--primary); font-weight: 600;">Get in touch</a> or share more details here!';
      }
      
      // Timeline/turnaround questions
      if (msg.includes('how long') || msg.includes('turnaround') || msg.includes('timeline') || msg.includes('time') || msg.includes('when')) {
        return 'Project timelines vary based on complexity and scope. Typical timelines:<br><br>• <strong>Simple projects:</strong> 1-2 weeks<br>• <strong>Standard projects:</strong> 2-4 weeks<br>• <strong>Complex projects:</strong> 4-8 weeks<br><br>Rush delivery is available for urgent needs. Let\'s discuss your timeline!';
      }
      
      // Contact questions
      if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone') || msg.includes('call')) {
        return 'You can reach us:<br><br>📧 <a href="mailto:info@focusvisuals.pro" style="color: var(--primary); font-weight: 600;">info@focusvisuals.pro</a><br>📞 <a href="tel:+15858536287" style="color: var(--primary); font-weight: 600;">58585-FOCUS</a><br>📍 1083 Ave Van Horne, Montreal, QC H2V 1J7<br><br>Or continue chatting here!';
      }
      
      // Location questions
      if (msg.includes('where') || msg.includes('location') || msg.includes('based') || msg.includes('address')) {
        return 'We\'re based in Montreal, Quebec!<br><br>📍 <strong>1083 Ave Van Horne<br>Montreal, QC H2V 1J7</strong><br><br>We serve clients locally and remotely across North America.';
      }
      
      // Process/workflow questions
      if (msg.includes('process') || msg.includes('how it works') || msg.includes('workflow') || msg.includes('steps')) {
        return 'Our process is simple:<br><br>1️⃣ <strong>Discovery</strong> - We understand your vision and goals<br>2️⃣ <strong>Strategy</strong> - We develop a creative approach<br>3️⃣ <strong>Production</strong> - We capture and create<br>4️⃣ <strong>Refinement</strong> - We edit and perfect<br>5️⃣ <strong>Delivery</strong> - You receive your final video<br><br>Ready to get started?';
      }
      
      // Portfolio/examples questions
      if (msg.includes('portfolio') || msg.includes('work') || msg.includes('example') || msg.includes('sample') || msg.includes('see your')) {
        return 'We\'d love to show you our work! <a href="portfolio.html" style="color: var(--primary); font-weight: 600;">Check out our portfolio</a> to see examples of our video production.<br><br>Want to discuss a specific type of project? Let me know!';
      }
      
      // About/story questions
      if (msg.includes('about') || msg.includes('who are you') || msg.includes('your story') || msg.includes('company')) {
        return 'We\'re <strong>Focus Visuals</strong> - a creative video production studio driven by observation, emotion, and precision.<br><br>We believe video is the most powerful tool to deliver a message. Every frame we create is designed to connect, inspire, and perform.<br><br><a href="our-story.html" style="color: var(--primary); font-weight: 600;">Read our full story</a>';
      }
      
      // Greeting responses
      if (msg.includes('hello') || msg.includes('hi') || msg === 'hey' || msg.includes('good morning') || msg.includes('good afternoon')) {
        return 'Hello! 👋 How can I help you today? Feel free to ask about our services, pricing, process, or anything else!';
      }
      
      // Thanks responses
      if (msg.includes('thank') || msg.includes('thanks')) {
        return 'You\'re welcome! Is there anything else I can help you with? 😊';
      }
      
      // Default response
      return 'I\'m here to help! You can ask me about:<br><br>• Our services<br>• Pricing & quotes<br>• Project timelines<br>• Our process<br>• Contact information<br><br>Or feel free to share details about your project, and I\'ll guide you from there!';
    };

    // Send message function
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message chat-message-sent';
      userMsg.innerHTML = `<div class="chat-message-text">${message}</div>`;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Clear input
      chatInput.value = '';

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.id = 'typingIndicator';
      typingIndicator.innerHTML = '<div class="typing-indicator-content"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Get AI response after a delay
      setTimeout(() => {
        // Remove typing indicator
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        // Add response
        const response = getAssistantResponse(message);
        const responseMsg = document.createElement('div');
        responseMsg.className = 'chat-message chat-message-received';
        responseMsg.innerHTML = `<div class="chat-message-text">${response}</div>`;
        chatMessages.appendChild(responseMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1200);
    };

    // Send on button click
    chatSendBtn.addEventListener('click', sendMessage);

    // Send on Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu overlay (only on non-home pages)
  const menuWrapper = document.querySelector('.menu-wrapper');
  const isPageTemplate = document.body.classList.contains('page-template');
  
  if (menuWrapper && isPageTemplate) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    menuWrapper.addEventListener('mouseenter', () => {
      overlay.classList.add('active');
    });

    menuWrapper.addEventListener('mouseleave', () => {
      overlay.classList.remove('active');
    });
  }

// Background video playlist with smooth crossfade (bgvideos/bg1.mp4 ... bg7.mp4)
  const vA = document.getElementById('bgVideoA');
  const vB = document.getElementById('bgVideoB');
  if (vA && vB) {
    const sources = Array.from({ length: 7 }, (_, i) => `bgvideos/bg${i + 1}.mp4`);
    let index = 0;
    let active = vA;
    let idle = vB;
    let preloading = false;

    const ensurePlay = (el) => {
      el.muted = true; el.playsInline = true;
      const p = el.play(); if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const attachMonitors = (video) => {
      if (video._onTimeupdate) video.removeEventListener('timeupdate', video._onTimeupdate);
      if (video._onEnded) video.removeEventListener('ended', video._onEnded);
      const onTimeupdate = () => {
        const d = video.duration || 0; if (!d) return;
        if (d - video.currentTime < 0.7 && !preloading) cueNext();
      };
      const onEnded = () => cueNext();
      video._onTimeupdate = onTimeupdate;
      video._onEnded = onEnded;
      video.addEventListener('timeupdate', onTimeupdate);
      video.addEventListener('ended', onEnded);
    };

    const cueNext = () => {
      if (preloading) return; preloading = true;
      const nextIndex = (index + 1) % sources.length;
      idle.src = sources[nextIndex];
      idle.currentTime = 0; idle.load(); ensurePlay(idle);
      const onReady = () => {
        idle.removeEventListener('loadeddata', onReady);
        // Crossfade
        idle.classList.add('is-active');
        active.classList.remove('is-active');
        setTimeout(() => {
          // Cleanup old
          active.pause(); active.removeAttribute('src'); active.load();
          index = nextIndex;
          const tmp = active; active = idle; idle = tmp;
          attachMonitors(active);
          ensurePlay(active);
          preloading = false;
        }, 650);
      };
      idle.addEventListener('loadeddata', onReady);
    };

    // Initialize first video
    active.src = sources[index]; active.load(); ensurePlay(active); active.classList.add('is-active');
    attachMonitors(active);
  }

  // Scroll-driven animation elements
  const headline = document.querySelector('.hero-headline');
  const subheadline = document.querySelector('.hero-subheadline');
  const links = document.querySelectorAll('.hero-link');
  const brand = document.querySelector('.brand');
  const footer = document.querySelector('.site-footer');
  const scrollArrow = document.getElementById('scrollArrow');

  // Animation ranges (in pixels of scroll)
  const headlineEnd = 400;
  const subheadlineEnd = 600;
  const linksEnd = 1000;
  const footerStart = 1100;

  // Play button click handler
  const playButton = document.getElementById('playButton');
  if (playButton) {
    playButton.addEventListener('click', () => {
      window.scrollTo({
        top: headlineEnd,
        behavior: 'smooth'
      });
      // Fade out and hide play button
      playButton.style.opacity = '0';
      setTimeout(() => {
        playButton.style.display = 'none';
      }, 400);
    });
  }

  // Scroll arrow click handler
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      window.scrollTo({
        top: headlineEnd,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Phase 1: Headline fade in + move up (0-400px)
    if (scrolled <= headlineEnd) {
      const progress = Math.min(scrolled / headlineEnd, 1);
      if (headline) {
        headline.style.opacity = progress.toString();
        headline.style.transform = `translateY(${60 * (1 - progress)}px)`;
      }
    } else {
      if (headline) {
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
      }
    }

    // Phase 2: Subheadline fade in + move up (400-600px)
    if (scrolled > headlineEnd && scrolled <= subheadlineEnd) {
      const progress = (scrolled - headlineEnd) / (subheadlineEnd - headlineEnd);
      if (subheadline) {
        subheadline.style.opacity = progress.toString();
        subheadline.style.transform = `translateY(${60 * (1 - progress)}px)`;
      }
    } else if (scrolled > subheadlineEnd) {
      if (subheadline) {
        subheadline.style.opacity = '1';
        subheadline.style.transform = 'translateY(0)';
      }
    } else {
      if (subheadline) {
        subheadline.style.opacity = '0';
        subheadline.style.transform = 'translateY(60px)';
      }
    }

    // Phase 3: Links fade in one by one + move up (600-1000px)
    const linkScrollRange = linksEnd - subheadlineEnd;
    const scrollPerLink = linkScrollRange / links.length;
    
    links.forEach((link, index) => {
      const linkStart = subheadlineEnd + (scrollPerLink * index);
      const linkEnd = linkStart + scrollPerLink;
      
      if (scrolled >= linkStart && scrolled <= linkEnd) {
        const progress = (scrolled - linkStart) / scrollPerLink;
        link.style.opacity = progress.toString();
        link.style.transform = `translateY(${60 * (1 - progress)}px)`;
      } else if (scrolled > linkEnd) {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      } else {
        link.style.opacity = '0';
        link.style.transform = 'translateY(60px)';
      }
    });

    // Phase 4: Footer fade in after links (1100px+)
    if (scrolled >= footerStart && footer) {
      const progress = Math.min((scrolled - footerStart) / 200, 1);
      footer.style.opacity = progress.toString();
      footer.style.transform = `translateY(${30 * (1 - progress)}px)`;
    } else if (footer) {
      footer.style.opacity = '0';
      footer.style.transform = 'translateY(30px)';
    }

    // Hide/show play button based on scroll position
    if (playButton) {
      if (scrolled > 50) {
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
      } else {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
        playButton.style.display = 'block';
      }
    }

    // Hide scroll arrow when scrolling starts
    if (scrollArrow) {
      if (scrolled > 50) {
        scrollArrow.classList.add('hidden');
      } else {
        scrollArrow.classList.remove('hidden');
      }
    }
  });
});
