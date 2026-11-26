/**
 * ============================================================================
 * SEA SHARK IMPORT AND EXPORT PRIVATE LIMITED
 * Business Enquiry Form Validation & Handler (contact.js)
 * Frontend validation with accessible feedback & clear backend integration point
 * ============================================================================
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('businessEnquiryForm');
    if (!form) return;

    const statusBox = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Pre-populate product if passed via query params (e.g. ?product=grapes)
    const urlParams = new URLSearchParams(window.location.search);
    const prefillProduct = urlParams.get('product');
    const prefillEnquiry = urlParams.get('type');

    if (prefillProduct) {
      const productSelect = document.getElementById('productOfInterest');
      if (productSelect) {
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value.toLowerCase().includes(prefillProduct.toLowerCase())) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    if (prefillEnquiry) {
      const enquirySelect = document.getElementById('enquiryType');
      if (enquirySelect) {
        for (let i = 0; i < enquirySelect.options.length; i++) {
          if (enquirySelect.options[i].value.toLowerCase().includes(prefillEnquiry.toLowerCase())) {
            enquirySelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s+\-()]{7,20}$/;

    function validateField(field) {
      const value = field.value.trim();
      let isValid = true;

      if (field.hasAttribute('required') && !value) {
        isValid = false;
      } else if (field.type === 'email' && value && !emailRegex.test(value)) {
        isValid = false;
      } else if (field.id === 'phoneNumber' && value && !phoneRegex.test(value)) {
        isValid = false;
      }

      if (!isValid) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
      } else {
        field.classList.remove('is-invalid');
        if (value) field.classList.add('is-valid');
      }

      return isValid;
    }

    // Live validation on blur & input
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let formIsValid = true;
      let firstInvalid = null;

      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!formIsValid) {
        if (firstInvalid) firstInvalid.focus();
        showStatus('Please fill in all required fields accurately.', 'error');
        return;
      }

      // Collect verified form payload
      const formData = {
        fullName: form.fullName.value.trim(),
        companyName: form.companyName ? form.companyName.value.trim() : '',
        email: form.email.value.trim(),
        phoneNumber: form.phoneNumber.value.trim(),
        country: form.country.value.trim(),
        enquiryType: form.enquiryType.value,
        productOfInterest: form.productOfInterest.value,
        message: form.message.value.trim(),
        submittedAt: new Date().toISOString()
      };

      // Set button to loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Processing Enquiry...
      `;

      /**
       * BACKEND INTEGRATION POINT:
       * Replace this simulation with your actual API endpoint or form submission handler
       * e.g., fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
       */
      setTimeout(() => {
        console.info('SEA SHARK Enquiry Form Payload Prepared for Backend Service:', formData);

        // Show Success Feedback
        showStatus(
          `Thank you, ${formData.fullName}! Your business enquiry regarding "${formData.enquiryType}" has been recorded. Our trade coordination team will connect with you via ${formData.email} shortly.`,
          'success'
        );

        form.reset();
        inputs.forEach(input => input.classList.remove('is-valid'));
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Scroll smoothly to status message
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });

    function showStatus(message, type) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.className = `form-status ${type}`;
    }
  }

  document.addEventListener('DOMContentLoaded', initContactForm);
})();
