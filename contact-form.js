// Initialize EmailJS
emailjs.init('Yy5b31Vtwwg0SSOwq');

document.addEventListener('DOMContentLoaded', () => {
  // Toggle form visibility
  const expandBtn = document.getElementById('expandFormBtn');
  const formWrapper = document.getElementById('formWrapper');
  
  if (expandBtn && formWrapper) {
    expandBtn.addEventListener('click', () => {
      formWrapper.classList.toggle('expanded');
      if (formWrapper.classList.contains('expanded')) {
        expandBtn.textContent = 'Close Form';
        // Smooth scroll to form
        setTimeout(() => {
          formWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        expandBtn.textContent = 'Or...';
      }
    });
  }
  
  // Original contact form code
  
  const form = document.querySelector('.contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  // Custom validation messages
  const validateForm = () => {
    const fields = [
      { element: form.firstName, name: 'first name', message: 'Hey! We\'d love to know your first name 😊' },
      { element: form.lastName, name: 'last name', message: 'Don\'t forget your last name!' },
      { element: form.businessName, name: 'business name', message: 'What\'s the name of your business?' },
      { element: form.businessPhone, name: 'business phone', message: 'We\'ll need a phone number to reach you 📞' },
      { element: form.extension, name: 'extension', message: 'Extension field is required (use 0 if none)' },
      { element: form.businessEmail, name: 'business email', message: 'We need your email to get back to you 📧' },
      { element: form.projectType, name: 'project type', message: 'What type of project are you planning? 🎬' },
      { element: form.projectDetails, name: 'project details', message: 'Tell us a bit about your vision! ✨' }
    ];

    for (const field of fields) {
      if (!field.element.value || (field.element.tagName === 'SELECT' && field.element.value === '')) {
        // Show custom message
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Starting...';

    // Prepare template parameters
    const templateParams = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      businessName: form.businessName.value,
      businessPhone: form.businessPhone.value,
      extension: form.extension.value,
      businessEmail: form.businessEmail.value,
      mobilePhone: form.mobilePhone.value || 'Not provided',
      projectType: form.projectType.options[form.projectType.selectedIndex].text,
      projectDetails: form.projectDetails.value,
    };

    // Send notification email to you
    emailjs.send('service_i6lophc', 'template_xjkqbf8', templateParams)
      .then(() => {
        // Send auto-reply to customer
        return emailjs.send('service_i6lophc', 'template_mgc21gd', {
          firstName: templateParams.firstName,
          businessEmail: templateParams.businessEmail,
          projectType: templateParams.projectType,
          from_name: 'Focus Visuals'
        });
      })
      .then(() => {
        // Success
        submitBtn.textContent = '✓ Started Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
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
