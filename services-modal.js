// Modal content for each service
const serviceContent = {
  corporate: {
    title: 'Corporate Video Production',
    icon: 'videography.png',
    body: `
      <p>Corporate videos are more than just polished visuals — they're a reflection of your brand's identity and values. At Focus Visuals, we believe that every corporate video should tell a story that resonates deeply with its audience. That's why we start by understanding your brand inside and out: your mission, your goals, and the message you want to share.</p>
      <p>Our process is collaborative and strategic. From initial concept development to scripting, filming, and post-production, we ensure every detail aligns with your objectives. We use cinematic techniques to create videos that feel authentic yet professional, blending creativity with clarity. Whether it's an internal communication piece, a brand showcase, or a corporate announcement, we craft content that strengthens your presence and builds trust.</p>
      <p>The result? A video that doesn't just inform — it inspires. It becomes a tool for connection, helping you engage employees, partners, and customers in a way that feels genuine and memorable.</p>
    `
  },
  promotional: {
    title: 'Promotional & Marketing Videos',
    icon: 'marketing.png',
    body: `
      <p>Marketing is about attention — and attention is earned through impact. Our promotional and marketing videos are designed to do exactly that. We create content that not only highlights your products or services but also inspires action. Every video is built with a clear purpose: to captivate, connect, and convert.</p>
      <p>We start by understanding your campaign objectives and audience. Then, we craft a narrative that blends strategic messaging with cinematic visuals. Every shot, every transition, every piece of music is chosen to amplify your message and make it unforgettable. Whether you're launching a new product, running a seasonal campaign, or building brand awareness, our videos are tailored to stand out in a crowded digital space.</p>
      <p>Our goal is simple: to create marketing content that doesn't just look good but delivers measurable results. With Focus Visuals, your marketing isn't just effective — it's unforgettable.</p>
    `
  },
  training: {
    title: 'Training & Internal Communication Videos',
    icon: 'training.png',
    body: `
      <p>Clear communication is essential for any organization, and video is one of the most effective ways to achieve it. Our training and internal communication videos simplify complex ideas and deliver them in a format that's easy to understand, engaging, and memorable.</p>
      <p>We work closely with your team to identify learning objectives and communication goals. From onboarding new employees to explaining processes or sharing company updates, we create videos that make information accessible and actionable. Our content combines professional visuals with storytelling techniques that keep viewers engaged, ensuring better retention and understanding.</p>
      <p>These videos aren't just tools — they're investments in your team's success. They help build alignment, improve efficiency, and foster a stronger company culture.</p>
    `
  },
  strategy: {
    title: 'Strategy & Consulting',
    icon: 'body-organ.png',
    body: `
      <p>Before the cameras roll, clarity matters. Many brands know they need video, but they're unsure where to start. That's where our Strategy & Consulting service comes in. We help you define your message, identify your audience, and choose the right approach for maximum impact.</p>
      <p>Our consulting process covers everything from creative direction to distribution planning. We analyze your goals, your market, and your existing content to develop a roadmap that ensures your video works as hard as possible for your brand. This means avoiding costly missteps and creating content that aligns perfectly with your objectives.</p>
      <p>With Focus Visuals, you don't just get a video — you get a strategy. A plan that turns your investment into measurable success.</p>
    `
  },
  social: {
    title: 'Social Media Content',
    icon: 'advertising.png',
    body: `
      <p>Social media is where conversations happen — and video is the language of those conversations. We're developing a service dedicated to creating short, dynamic videos optimized for platforms like Instagram, LinkedIn, and TikTok. These videos will be designed to grab attention in seconds, spark engagement, and keep your brand relevant in the fast-moving digital space.</p>
      <p>Our goal is to combine creativity with platform-specific strategies, ensuring your content performs where it matters most. From vertical formats to trending styles, we'll help you stay ahead of the curve. Stay tuned for a service that will transform your social presence.</p>
    `
  },
  event: {
    title: 'Event Coverage',
    icon: 'red-carpet.png',
    body: `
      <p>Events are powerful moments for connection — and we want to help you make them last. Soon, we'll offer professional event coverage that captures the energy, highlights, and key messages of your conferences, launches, and celebrations. These videos will allow you to share your event internally and across your marketing channels, extending its impact long after the day ends.</p>
      <p>Our approach will focus on storytelling, ensuring your event isn't just documented but brought to life through polished, cinematic visuals. Because every event deserves to be remembered.</p>
    `
  }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('serviceModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.querySelector('.modal-close');
  const serviceLinks = document.querySelectorAll('.service-link');

  // Open modal
  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const service = link.getAttribute('data-service');
      const content = serviceContent[service];
      
      if (content) {
        modalIcon.innerHTML = `<img src="${content.icon}" alt="" />`;
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.body;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
