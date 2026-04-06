/**
 * Geolocation Service
 * Handles browser-native geolocation API for location retrieval
 */

class GeolocationService {
    constructor() {
        this.isSupported = 'geolocation' in navigator;
        this.currentPosition = null;
        this.watchId = null;
        
        // Error messages for different scenarios
        this.errorMessages = {
            en: {
                notSupported: 'Geolocation is not supported by your browser',
                permissionDenied: 'Location access was denied. Please enable location services.',
                positionUnavailable: 'Location information is unavailable.',
                timeout: 'Location request timed out. Please try again.',
                unknown: 'An unknown error occurred while retrieving location.'
            },
            ar: {
                notSupported: 'المتصفح لا يدعم تحديد الموقع الجغرافي',
                permissionDenied: 'تم رفض الوصول إلى الموقع. يرجى تمكين خدمات الموقع.',
                positionUnavailable: 'معلومات الموقع غير متوفرة.',
                timeout: 'انتهت مهلة طلب الموقع. يرجى المحاولة مرة أخرى.',
                unknown: 'حدث خطأ غير معروف أثناء استرداد الموقع.'
            },
            fr: {
                notSupported: 'La géolocalisation n\'est pas supportée par votre navigateur',
                permissionDenied: 'L\'accès à la localisation a été refusé. Veuillez activer les services de localisation.',
                positionUnavailable: 'Les informations de localisation ne sont pas disponibles.',
                timeout: 'La demande de localisation a expiré. Veuillez réessayer.',
                unknown: 'Une erreur inconnue s\'est produite lors de la récupération de la localisation.'
            }
        };
    }

    /**
     * Check if geolocation is supported
     * @returns {boolean} - Support status
     */
    isGeolocationSupported() {
        return this.isSupported;
    }

    /**
     * Get current position with browser-native API
     * @param {object} options - Geolocation options
     * @returns {Promise} - Promise that resolves with position data
     */
    getCurrentPosition(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isSupported) {
                reject(new Error(this.errorMessages.en.notSupported));
                return;
            }

            // Default options for high accuracy
            const defaultOptions = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            const finalOptions = { ...defaultOptions, ...options };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentPosition = position;
                    resolve(this.formatPositionData(position));
                },
                (error) => {
                    reject(this.handleGeolocationError(error));
                },
                finalOptions
            );
        });
    }

    /**
     * Watch position changes (for real-time tracking)
     * @param {function} callback - Success callback
     * @param {function} errorCallback - Error callback
     * @param {object} options - Geolocation options
     * @returns {number} - Watch ID
     */
    watchPosition(callback, errorCallback, options = {}) {
        if (!this.isSupported) {
            errorCallback(new Error(this.errorMessages.en.notSupported));
            return null;
        }

        const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5000
        };

        const finalOptions = { ...defaultOptions, ...options };

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.currentPosition = position;
                callback(this.formatPositionData(position));
            },
            (error) => {
                errorCallback(this.handleGeolocationError(error));
            },
            finalOptions
        );

        return this.watchId;
    }

    /**
     * Stop watching position changes
     */
    clearWatch() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    /**
     * Format position data into usable format
     * @param {GeolocationPosition} position - Raw position object
     * @returns {object} - Formatted position data
     */
    formatPositionData(position) {
        const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = position.coords;
        const timestamp = position.timestamp;

        return {
            latitude,
            longitude,
            accuracy,
            altitude: altitude || null,
            altitudeAccuracy: altitudeAccuracy || null,
            heading: heading || null,
            speed: speed || null,
            timestamp,
            // Formatted representations
            coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            mapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
            readableAddress: this.generateReadableAddress(latitude, longitude),
            accuracyDescription: this.describeAccuracy(accuracy)
        };
    }

    /**
     * Generate a readable address from coordinates
     * @param {number} latitude - Latitude
     * @param {number} longitude - Longitude
     * @returns {string} - Readable address description
     */
    generateReadableAddress(latitude, longitude) {
        const latDir = latitude >= 0 ? 'N' : 'S';
        const lonDir = longitude >= 0 ? 'E' : 'W';
        
        const latAbs = Math.abs(latitude).toFixed(4);
        const lonAbs = Math.abs(longitude).toFixed(4);
        
        return `${latAbs}°${latDir}, ${lonAbs}°${lonDir}`;
    }

    /**
     * Describe accuracy in human-readable terms
     * @param {number} accuracy - Accuracy in meters
     * @returns {string} - Accuracy description
     */
    describeAccuracy(accuracy) {
        if (accuracy < 10) return 'Excellent (within 10m)';
        if (accuracy < 50) return 'Good (within 50m)';
        if (accuracy < 100) return 'Fair (within 100m)';
        if (accuracy < 500) return 'Poor (within 500m)';
        return 'Very Poor (over 500m)';
    }

    /**
     * Handle geolocation errors with proper error types
     * @param {GeolocationPositionError} error - Geolocation error object
     * @returns {Error} - Formatted error with message
     */
    handleGeolocationError(error) {
        let message;
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = this.errorMessages.en.permissionDenied;
                break;
            case error.POSITION_UNAVAILABLE:
                message = this.errorMessages.en.positionUnavailable;
                break;
            case error.TIMEOUT:
                message = this.errorMessages.en.timeout;
                break;
            default:
                message = this.errorMessages.en.unknown;
                break;
        }

        const formattedError = new Error(message);
        formattedError.code = error.code;
        formattedError.originalError = error;
        
        return formattedError;
    }

    /**
     * Get localized error messages
     * @param {string} lang - Language code
     * @returns {object} - Localized error messages
     */
    getLocalizedErrors(lang = 'en') {
        return this.errorMessages[lang] || this.errorMessages.en;
    }

    /**
     * Check permission state (modern browsers only)
     * @returns {Promise} - Promise that resolves with permission state
     */
    async checkPermissionState() {
        if ('permissions' in navigator && 'geolocation' in navigator.permissions) {
            try {
                const permission = await navigator.permissions.query({ name: 'geolocation' });
                return permission.state; // 'granted', 'denied', 'prompt'
            } catch (error) {
                console.warn('Permission API not available:', error);
                return 'unknown';
            }
        }
        return 'unknown';
    }

    /**
     * Request high-accuracy position with retry logic
     * @param {number} maxRetries - Maximum number of retries
     * @param {number} retryDelay - Delay between retries in ms
     * @returns {Promise} - Promise that resolves with position data
     */
    async getPositionWithRetry(maxRetries = 3, retryDelay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const position = await this.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                });
                
                // If accuracy is poor, try again for better results
                if (position.accuracy > 100 && attempt < maxRetries) {
                    console.log(`Attempt ${attempt}: Poor accuracy (${position.accuracy}m), retrying...`);
                    await this.delay(retryDelay);
                    continue;
                }
                
                return position;
            } catch (error) {
                lastError = error;
                console.warn(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt < maxRetries) {
                    await this.delay(retryDelay);
                }
            }
        }
        
        throw lastError;
    }

    /**
     * Utility function for delays
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise} - Promise that resolves after delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get current position with comprehensive error handling
     * @param {string} language - Language for error messages
     * @returns {Promise} - Promise that resolves with position data
     */
    async getCurrentPositionSafe(language = 'en') {
        try {
            // Check if geolocation is supported
            if (!this.isSupported) {
                throw new Error(this.getLocalizedErrors(language).notSupported);
            }

            // Check permission state (if available)
            const permissionState = await this.checkPermissionState();
            
            if (permissionState === 'denied') {
                throw new Error(this.getLocalizedErrors(language).permissionDenied);
            }

            // Get position with retry logic
            const position = await this.getPositionWithRetry();
            
            return {
                success: true,
                position,
                permissionState,
                message: 'Location retrieved successfully'
            };
            
        } catch (error) {
            return {
                success: false,
                position: null,
                permissionState: await this.checkPermissionState(),
                error: error.message,
                message: error.message
            };
        }
    }
}

// Export singleton instance
const geolocationService = new GeolocationService();

export default geolocationService;
