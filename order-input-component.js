/**
 * Order Input Component
 * Handles UI for name and location input with real-time validation
 */

import validationService from './validation-service.js';

class OrderInputComponent {
    constructor(validationService, translations = {}) {
        this.validationService = validationService;
        this.translations = translations;
        this.container = null;
        this.onSubmit = null;
        this.formData = { name: '', location: '' };
        this.validationResults = { name: { isValid: false }, location: { isValid: false } };
        this.isFormValid = false;
    }

    /**
     * Initialize the component
     * @param {HTMLElement} container - Container element
     * @param {Function} onSubmit - Submit callback
     */
    init(container, onSubmit) {
        this.onSubmit = onSubmit;
        this.render(container);
        this.attachEventListeners();
    }

    /**
     * Render the component HTML
     * @param {HTMLElement} container - Container element
     */
    render(container) {
        container.innerHTML = `
            <div class="order-input-modal">
                <div class="order-input-content">
                    <div class="order-input-header">
                        <h3 class="order-input-title">${this.translations.cartTitle || 'Order Details'}</h3>
                        <button class="order-input-close" aria-label="Close">&times;</button>
                    </div>
                    
                    <div class="order-input-body">
                        <div class="price-integrity-notice">
                            <p class="integrity-warning">
                                ⚠️ ${this.translations.priceIntegrityWarning || 'Price is fixed upon order generation'}
                            </p>
                        </div>
                        
                        <div class="input-group">
                            <label for="order-name" class="input-label">
                                ${this.translations.name || 'Name'} *
                            </label>
                            <input 
                                type="text" 
                                id="order-name" 
                                class="order-input-field" 
                                placeholder="${this.translations.namePlaceholder || 'Enter your name'}"
                                maxlength="50"
                                autocomplete="name"
                            >
                            <div class="validation-message" id="name-validation"></div>
                        </div>
                        
                        <div class="input-group">
                            <label for="order-location" class="input-label">
                                ${this.translations.location || 'Location'} *
                            </label>
                            <input 
                                type="text" 
                                id="order-location" 
                                class="order-input-field" 
                                placeholder="${this.translations.locationPlaceholder || 'Enter your delivery address'}"
                                maxlength="200"
                                autocomplete="street-address"
                            >
                            <div class="validation-message" id="location-validation"></div>
                        </div>
                    </div>
                    
                    <div class="order-input-footer">
                        <button 
                            type="button" 
                            id="order-submit-btn" 
                            class="order-submit-btn" 
                            disabled
                        >
                            ${this.translations.placeOrder || 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const nameInput = document.getElementById('order-name');
        const locationInput = document.getElementById('order-location');
        const submitBtn = document.getElementById('order-submit-btn');
        const closeBtn = document.querySelector('.order-input-close');

        // Real-time validation for name
        nameInput.addEventListener('input', (e) => {
            this.handleNameInput(e.target.value);
        });

        // Real-time validation for location
        locationInput.addEventListener('input', (e) => {
            this.handleLocationInput(e.target.value);
        });

        // Submit button
        submitBtn.addEventListener('click', () => {
            this.handleSubmit();
        });

        // Close button
        closeBtn.addEventListener('click', () => {
            this.close();
        });

        // Close on outside click
        document.querySelector('.order-input-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.close();
            }
        });

        // Enter key submission
        [nameInput, locationInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.isFormValid) {
                    this.handleSubmit();
                }
            });
        });
    }

    /**
     * Handle name input with validation
     * @param {string} value - Input value
     */
    handleNameInput(value) {
        this.formData.name = value;
        this.validationResults.name = this.validationService.validateName(value);
        this.updateValidationUI('name', this.validationResults.name);
        this.updateSubmitButton();
        
        console.log('Name input updated:', {
            value,
            validationResults: this.validationResults.name,
            formData: this.formData,
            isFormValid: this.isFormValid
        });
    }

    /**
     * Handle location input with validation
     * @param {string} value - Input value
     */
    handleLocationInput(value) {
        this.formData.location = value;
        this.validationResults.location = this.validationService.validateLocation(value);
        this.updateValidationUI('location', this.validationResults.location);
        this.updateSubmitButton();
        
        console.log('Location input updated:', {
            value,
            validationResults: this.validationResults.location,
            formData: this.formData,
            isFormValid: this.isFormValid
        });
    }

    /**
     * Update validation UI feedback
     * @param {string} field - Field name
     * @param {object} result - Validation result
     */
    updateValidationUI(field, result) {
        const input = document.getElementById(`order-${field}`);
        const message = document.getElementById(`${field}-validation`);
        
        // Remove previous classes
        input.classList.remove('valid', 'invalid');
        message.classList.remove('error', 'success');
        
        if (result.isValid) {
            input.classList.add('valid');
            message.textContent = '';
            message.classList.add('success');
        } else {
            input.classList.add('invalid');
            message.textContent = result.error;
            message.classList.add('error');
        }
    }

    /**
     * Update submit button state
     */
    updateSubmitButton() {
        // Check if name is valid
        const nameValid = this.validationResults.name.isValid && this.formData.name.trim().length > 0;
        
        // Check if location is valid
        const locationValid = this.validationResults.location.isValid;
        
        this.isFormValid = nameValid && locationValid;
        
        const submitBtn = document.getElementById('order-submit-btn');
        
        if (this.isFormValid) {
            submitBtn.disabled = false;
            submitBtn.classList.add('enabled');
            console.log('Submit button enabled - Name valid:', nameValid, 'Location valid:', locationValid);
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('enabled');
            console.log('Submit button disabled - Name valid:', nameValid, 'Location valid:', locationValid);
        }
    }

    /**
     * Handle form submission
     */
    handleSubmit() {
        if (!this.isFormValid) {
            console.log('Form not valid, cannot submit');
            return;
        }
        
        // Prepare order data
        const orderData = {
            name: this.formData.name.trim(),
            location: this.formData.location.trim()
        };
        
        console.log('Submitting order with data:', orderData);
        
        // Validate final data
        const completeValidation = this.validationService.validateOrderForm({
            name: orderData.name,
            location: orderData.location
        });
        
        if (this.onSubmit) {
            this.onSubmit(orderData);
            this.close();
        } else {
            console.error('No submit handler provided');
        }
    }

    /**
     * Show the modal
     */
    show() {
        const modal = document.querySelector('.order-input-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('order-name').focus();
        }, 100);
    }

    /**
     * Close the modal
     */
    close() {
        const modal = document.querySelector('.order-input-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        this.reset();
    }

    /**
     * Reset the form
     */
    reset() {
        this.formData = { name: '', location: '' };
        this.validationResults = { name: { isValid: false }, location: { isValid: false } };
        this.isFormValid = false;
        
        // Clear inputs
        document.getElementById('order-name').value = '';
        document.getElementById('order-location').value = '';
        
        // Clear validation states
        document.querySelectorAll('.order-input-field').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Clear validation messages
        document.querySelectorAll('.validation-message').forEach(message => {
            message.textContent = '';
            message.classList.remove('error', 'success');
        });
        
        this.updateSubmitButton();
    }

    /**
     * Update translations
     * @param {object} translations - New translations
     */
    updateTranslations(translations) {
        this.translations = translations;
        
        // Update UI text if modal exists
        const title = document.querySelector('.order-input-title');
        const submitBtn = document.getElementById('order-submit-btn');
        
        if (title) title.textContent = translations.cartTitle || 'Order Details';
        if (submitBtn) submitBtn.textContent = translations.placeOrder || 'Place Order';
    }
}

export default OrderInputComponent;
