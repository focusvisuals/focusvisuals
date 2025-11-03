document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('visitModal');
  const requestBtn = document.querySelector('.request-visit-btn');
  const closeBtn = document.querySelector('.visit-modal-close');
  const form = document.getElementById('visitForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  // Open modal
  if (requestBtn) {
    requestBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

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

  // Custom validation messages
  const validateForm = () => {
    const fields = [
      { element: form.fullName, name: 'full name', message: 'Hey! We\'d love to know your name 😊' },
      { element: form.email, name: 'email', message: 'We need your email to confirm your visit 📧' },
      { element: form.phone, name: 'phone', message: 'A phone number helps us reach you 📞' }
    ];

    for (const field of fields) {
      if (!field.element.value) {
        showValidationMessage(field.element, field.message);
        field.element.focus();
        return false;
      }
    }
    return true;
  };

  const showValidationMessage = (element, message) => {
    // Remove any existing message
    const existingMsg = document.querySelector('.custom-validation-message');
    if (existingMsg) existingMsg.remove();

    // Get element position
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Create custom message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'custom-validation-message';
    msgDiv.innerHTML = `
      <div class="validation-content">
        <span class="validation-icon">👋</span>
        <span class="validation-text">${message}</span>
      </div>
    `;
    
    // Add to body and position over the field
    document.body.appendChild(msgDiv);
    
    // Position it above the field
    msgDiv.style.top = (rect.top + scrollTop - msgDiv.offsetHeight - 15) + 'px';
    msgDiv.style.left = rect.left + 'px';
    msgDiv.style.width = rect.width + 'px';
    
    // Highlight the field
    element.style.borderColor = 'var(--primary)';
    element.style.boxShadow = '0 0 0 3px rgba(234,10,140,.2)';
    
    // Remove message when user starts typing
    const removeMessage = () => {
      if (msgDiv && msgDiv.parentNode) {
        msgDiv.remove();
      }
      element.style.borderColor = '';
      element.style.boxShadow = '';
      element.removeEventListener('input', removeMessage);
      element.removeEventListener('change', removeMessage);
    };
    
    element.addEventListener('input', removeMessage);
    element.addEventListener('change', removeMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (msgDiv && msgDiv.parentNode) {
        msgDiv.style.opacity = '0';
        setTimeout(() => msgDiv.remove(), 300);
      }
    }, 5000);
  };

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Prepare template parameters matching main contact form
    const templateParams = {
      firstName: form.fullName.value.split(' ')[0] || form.fullName.value,
      lastName: form.fullName.value.split(' ').slice(1).join(' ') || '',
      businessName: 'N/A',
      businessPhone: form.phone.value,
      extension: '0',
      businessEmail: form.email.value,
      mobilePhone: 'N/A',
      projectType: 'Visit Request',
      projectDetails: 'Customer has requested an in-person visit to discuss their project.'
    };

    // Send email using EmailJS
    emailjs.send('service_i6lophc', 'template_xjkqbf8', templateParams)
      .then(() => {
        // Success
        submitBtn.textContent = '✓ Request Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset and close after 2 seconds
        setTimeout(() => {
          closeModal();
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = '';
        }, 2000);
      })
      .catch((error) => {
        // Error
        console.error('EmailJS error:', error);
        submitBtn.textContent = '✗ Failed to Send';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
      });
  });
});
