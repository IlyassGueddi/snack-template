/**
 * Validation Service for Order Input
 * Handles input sanitization and validation logic
 */

class ValidationService {
    constructor() {
        // Regex patterns for validation
        this.patterns = {
            name: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
            location: /^[a-zA-Z0-9\u0600-\u06FF\s,.\-\/]{10,200}$/
        };
        
        // Error messages
        this.errors = {
            name: {
                empty: 'Name is required',
                invalid: 'Name must be 2-50 characters and contain only letters'
            },
            location: {
                empty: 'Location is required',
                tooShort: 'Location must be at least 10 characters',
                invalid: 'Location must contain valid address format'
            }
        };
    }

    /**
     * Sanitize input to prevent injection
     * @param {string} input - Raw input string
     * @returns {string} - Sanitized string
     */
    sanitize(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .trim()                           // Remove whitespace
            .replace(/[<>]/g, '')             // Remove HTML tags
            .replace(/javascript:/gi, '')     // Remove javascript protocol
            .replace(/on\w+=/gi, '')          // Remove event handlers
            .replace(/['"]/g, '')             // Remove quotes
            .substring(0, 200);                // Limit length
    }

    /**
     * Validate name input
     * @param {string} name - Name to validate
     * @returns {object} - Validation result
     */
    validateName(name) {
        const sanitizedName = this.sanitize(name);
        
        if (!sanitizedName) {
            return {
                isValid: false,
                error: this.errors.name.empty,
                sanitized: sanitizedName
            };
        }
        
        if (!this.patterns.name.test(sanitizedName)) {
            return {
                isValid: false,
                error: this.errors.name.invalid,
                sanitized: sanitizedName
            };
        }
        
        return {
            isValid: true,
            error: null,
            sanitized: sanitizedName
        };
    }

    /**
     * Validate location input
     * @param {string} location - Location to validate
     * @returns {object} - Validation result
     */
    validateLocation(location) {
        const sanitizedLocation = this.sanitize(location);
        
        if (!sanitizedLocation) {
            return {
                isValid: false,
                error: this.errors.location.empty,
                sanitized: sanitizedLocation
            };
        }
        
        if (sanitizedLocation.length < 10) {
            return {
                isValid: false,
                error: this.errors.location.tooShort,
                sanitized: sanitizedLocation
            };
        }
        
        if (!this.patterns.location.test(sanitizedLocation)) {
            return {
                isValid: false,
                error: this.errors.location.invalid,
                sanitized: sanitizedLocation
            };
        }
        
        return {
            isValid: true,
            error: null,
            sanitized: sanitizedLocation
        };
    }

    /**
     * Validate complete order form
     * @param {object} formData - Form data object
     * @returns {object} - Complete validation result
     */
    validateOrderForm(formData) {
        const nameResult = this.validateName(formData.name);
        const locationResult = this.validateLocation(formData.location);
        
        return {
            isValid: nameResult.isValid && locationResult.isValid,
            name: nameResult,
            location: locationResult,
            sanitized: {
                name: nameResult.sanitized,
                location: locationResult.sanitized
            }
        };
    }

    /**
     * Get error messages for current language
     * @param {string} lang - Language code
     * @returns {object} - Localized error messages
     */
    getLocalizedErrors(lang = 'en') {
        const errorMessages = {
            en: this.errors,
            ar: {
                name: {
                    empty: 'الاسم مطلوب',
                    invalid: 'يجب أن يكون الاسم 2-50 حرفاً ويحتوي على أحرف فقط'
                },
                location: {
                    empty: 'الموقع مطلوب',
                    tooShort: 'يجب أن يكون الموقع 10 أحرف على الأقل',
                    invalid: 'يجب أن يحتوي الموقع على تنسيق عنوان صحيح'
                }
            },
            fr: {
                name: {
                    empty: 'Le nom est requis',
                    invalid: 'Le nom doit contenir 2-50 caractères et seulement des lettres'
                },
                location: {
                    empty: 'L\'emplacement est requis',
                    tooShort: 'L\'emplacement doit contenir au moins 10 caractères',
                    invalid: 'L\'emplacement doit contenir un format d\'adresse valide'
                }
            }
        };
        
        return errorMessages[lang] || errorMessages.en;
    }
}

// Export singleton instance
const validationService = new ValidationService();

export default validationService;
