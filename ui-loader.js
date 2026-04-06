import RESTAURANT_DATA from './data.js';
import validationService from './validation-service.js';
import OrderInputComponent from './order-input-component.js';

class RestaurantUI {
    constructor() {
        this.data = RESTAURANT_DATA;
        this.currentLang = this.data.settings.lang;
        this.currentTheme = this.data.settings.theme;
        this.currentCategory = 'all';
        this.currentModalItem = null;
        this.selectedExtras = new Set();
        this.selectedRemovals = new Set();
        this.cart = [];
        this.orderInputComponent = new OrderInputComponent(validationService, this.data.translations[this.currentLang]);
        this.orderCounter = parseInt(localStorage.getItem('orderCounter') || '1000');
    }

    init() {
        try {
            console.log('Initializing Restaurant UI...');
            
            // Wrap initialization in window.onload to ensure all resources are loaded
            window.onload = () => {
                try {
                    this.detectLanguage();
                    this.setDirection();
                    this.applyTheme();
                    this.translatePage();
                    this.injectRestaurantInfo();
                    this.renderMenuItems();
                    this.setupEventListeners();
                    
                    // Ensure document.title is set correctly
                    const translations = this.data.translations[this.currentLang];
                    if (translations && translations.homeTitle) {
                        document.title = translations.homeTitle;
                    }
                    
                    // Hide preloader after everything is loaded
                    this.hidePreloader();
                    
                    console.log('Restaurant UI initialized successfully');
                } catch (error) {
                    console.error('Error in window.onload initialization:', error);
                    this.hidePreloader();
                }
            };
            
        } catch (error) {
            console.error('Error initializing Restaurant UI:', error);
            this.hidePreloader();
        }
        
        // Safety timeout - forces preloader to hide after 3 seconds no matter what
        setTimeout(() => {
            const preloader = document.querySelector('.preload') || document.querySelector('#preloader');
            if (preloader) {
                preloader.classList.add('loaded');
                preloader.style.display = 'none';
                console.log('Preloader forced to hide via Safety Timeout');
            }
        }, 3000);
    }

    hidePreloader() {
        // Hide any preloader elements
        const preloaders = document.querySelectorAll('.preloader, .loader, [class*="preloader"], [class*="loader"]');
        preloaders.forEach(preloader => {
            preloader.style.display = 'none';
            preloader.classList.add('loaded');
        });
        
        // Also try to remove preloader from body
        document.body.classList.add('loaded');
    }

    detectLanguage() {
        // Check browser language or use saved preference
        const browserLang = navigator.language.split('-')[0];
        const supportedLangs = ['en', 'ar', 'fr'];
        
        if (supportedLangs.includes(browserLang)) {
            this.currentLang = browserLang;
        } else {
            this.currentLang = this.data.settings.lang;
        }
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    setDirection() {
        const html = document.documentElement;
        const lang = this.currentLang;
        
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', lang);
        }
        
        // Update body class for RTL styling
        document.body.classList.toggle('rtl', lang === 'ar');
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    translatePage() {
        const translations = this.data.translations[this.currentLang];
        
        // Update dynamic tab title
        document.title = translations.homeTitle;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedValue(translations, key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title fallback
        const titleElement = document.querySelector('title[data-i18n="restaurantName"]');
        if (titleElement) {
            titleElement.textContent = translations.restaurantName;
        }

        // Set favicon with fallback
        this.setFavicon();
    }

    setFavicon() {
        const faviconLink = document.getElementById('faviconLink');
        if (faviconLink) {
            // Try to set configured favicon
            if (this.data.config.favicon) {
                faviconLink.href = this.data.config.favicon;
            } else {
                // Fallback to restaurant logo
                faviconLink.href = this.data.config.logo;
            }
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    injectRestaurantInfo() {
        const translations = this.data.translations[this.currentLang];
        
        // Update meta tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations.description;
        }
    }

    renderMenuItems(category = 'all') {
        const menuGrid = document.getElementById('menuGrid');
        if (!menuGrid) return;
        
        menuGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? this.data.menuItems 
            : this.data.menuItems.filter(item => item.category === category);
        
        filteredItems.forEach((item, index) => {
            // Check for missing or invalid image URLs
            if (!item.image || item.image === '' || item.image === 'undefined') {
                console.warn(`Missing image URL for item: ${item.name.en || item.id}`);
                // Set a default image or handle gracefully
                item.image = './assets/images/default-dish.jpg';
            }
            
            const menuItemElement = this.createMenuItemElement(item, index);
            menuGrid.appendChild(menuItemElement);
        });
    }

    createMenuItemElement(item, index) {
        const translations = this.data.translations[this.currentLang];
        const itemName = item.name[this.currentLang];
        const price = `${item.price} ${this.data.settings.currency}`;
        
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);
        menuItem.style.setProperty('--item-index', index);
        
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${itemName}" class="menu-item-image" 
                 onerror="this.src='https://via.placeholder.com/300x200/cccccc/666666?text=${encodeURIComponent(itemName)}'">
            <div class="menu-item-content">
                <h3 class="menu-item-name">${itemName}</h3>
                <p class="menu-item-price">${price}</p>
                <div class="menu-item-actions">
                    <button class="btn btn-primary" onclick="restaurantUI.addToCart('${item.id}')">
                        ${translations.actions.addToCart}
                    </button>
                    <button class="btn btn-secondary" onclick="restaurantUI.showCustomization('${item.id}')">
                        ${translations.actions.customize}
                    </button>
                </div>
            </div>
        `;
        
        return menuItem;
    }

    setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Category filter
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterMenu(category);
            });
        });

        // Theme toggle (optional enhancement)
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T for theme toggle
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    switchLanguage(lang) {
        if (this.data.translations[lang]) {
            this.currentLang = lang;
            this.data.settings.lang = lang;
            
            // Update active language button
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
            
            this.setDirection();
            this.translatePage();
            this.renderMenuItems(this.currentCategory);
        }
    }

    filterMenu(category) {
        this.currentCategory = category;
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.renderMenuItems(category);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.data.settings.theme = this.currentTheme;
        this.applyTheme();
    }

    addToCart(itemId) {
        const item = this.data.menuItems.find(i => i.id === itemId);
        if (!item) return;

        const itemName = item.name[this.currentLang];
        
        // Create cart item object with default settings
        const cartItem = {
            id: item.id,
            name: itemName,
            basePrice: item.price,
            extras: [],
            removals: [],
            finalPrice: item.price,
            quantity: 1
        };
        
        // Add to cart
        this.cart.push(cartItem);
        this.updateCartBadge();
        
        // Show confirmation
        this.showNotification(`${itemName} added to cart!`);
    }

    updateCartBadge() {
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            const badge = cartButton.querySelector('.cart-badge');
            const itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
            badge.textContent = itemCount;
            badge.style.display = itemCount > 0 ? 'flex' : 'none';
        }
    }

    showCartSummary() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty');
            return;
        }

        const modal = document.getElementById('cartModal');
        const translations = this.data.translations[this.currentLang];
        
        // Render cart items
        this.renderCartItems();
        
        // Calculate grand total
        const grandTotal = this.cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
        document.querySelector('.grand-total').textContent = `${grandTotal} ${this.data.settings.currency}`;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    renderCartItems() {
        const container = document.getElementById('cartItems');
        const translations = this.data.translations[this.currentLang];
        container.innerHTML = '';
        
        this.cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            // Build extras/removals text
            const extrasText = item.extras.length > 0 ? 
                `${translations.actions.extras}: ${item.extras.map(e => e.name).join(', ')}` : '';
            const removalsText = item.removals.length > 0 ? 
                `${translations.actions.removals}: ${item.removals.map(r => r.name).join(', ')}` : '';
            
            cartItemElement.innerHTML = `
                <div class="cart-item-header">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <button class="remove-item" onclick="restaurantUI.removeFromCart(${index})">×</button>
                </div>
                <div class="cart-item-details">
                    <p class="cart-item-price">${item.finalPrice} ${this.data.settings.currency}</p>
                    ${extrasText ? `<p class="cart-item-extras">${extrasText}</p>` : ''}
                    ${removalsText ? `<p class="cart-item-removals">${removalsText}</p>` : ''}
                </div>
            `;
            
            container.appendChild(cartItemElement);
        });
    }

    removeFromCart(index) {
        const item = this.cart[index];
        this.cart.splice(index, 1);
        this.updateCartBadge();
        this.renderCartItems();
        
        // Update grand total
        const grandTotal = this.cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
        document.querySelector('.grand-total').textContent = `${grandTotal} ${this.data.settings.currency}`;
        
        // Show confirmation
        this.showNotification(`${item.name} removed from cart`);
        
        // Close modal if cart is empty
        if (this.cart.length === 0) {
            this.closeCartModal();
        }
    }

    closeCartModal() {
        const modal = document.getElementById('cartModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Generate unique order ID
     * @returns {string} - Unique order ID
     */
    generateOrderId() {
        this.orderCounter++;
        localStorage.setItem('orderCounter', this.orderCounter.toString());
        return `Order-#${this.orderCounter}`;
    }

    /**
     * Create order summary for data integrity
     * @param {object} orderData - Order data
     * @param {number} grandTotal - Order total
     * @returns {object} - Order summary
     */
    createOrderSummary(orderData, grandTotal) {
        const orderId = this.generateOrderId();
        const timestamp = new Date().toISOString();
        
        const summary = {
            orderId,
            timestamp,
            customerName: orderData.name,
            location: orderData.location,
            coordinates: orderData.coordinates,
            mapsUrl: orderData.mapsUrl,
            items: this.cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                basePrice: item.basePrice,
                finalPrice: item.finalPrice,
                extras: item.extras,
                removals: item.removals
            })),
            grandTotal,
            currency: this.data.settings.currency,
            status: 'pending'
        };
        
        // Save to local storage for data integrity
        this.saveOrderSummary(summary);
        
        return summary;
    }

    /**
     * Save order summary to local storage
     * @param {object} summary - Order summary
     */
    saveOrderSummary(summary) {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('orderSummaries') || '[]');
            existingOrders.push(summary);
            
            // Keep only last 100 orders to prevent storage bloat
            if (existingOrders.length > 100) {
                existingOrders.splice(0, existingOrders.length - 100);
            }
            
            localStorage.setItem('orderSummaries', JSON.stringify(existingOrders));
            console.log('Order summary saved:', summary);
        } catch (error) {
            console.error('Failed to save order summary:', error);
        }
    }

    /**
     * Get all saved order summaries
     * @returns {array} - Array of order summaries
     */
    getOrderSummaries() {
        try {
            return JSON.parse(localStorage.getItem('orderSummaries') || '[]');
        } catch (error) {
            console.error('Failed to get order summaries:', error);
            return [];
        }
    }

    placeFinalOrder() {
        if (this.cart.length === 0) return;
        
        // Show order input modal
        this.showOrderInputModal();
    }

    showOrderInputModal() {
        // Create container for order input modal
        const modalContainer = document.createElement('div');
        modalContainer.id = 'order-input-container';
        document.body.appendChild(modalContainer);
        
        // Initialize order input component
        this.orderInputComponent.updateTranslations(this.data.translations[this.currentLang]);
        this.orderInputComponent.init(modalContainer, (orderData) => {
            this.processOrder(orderData);
        });
        
        // Show modal
        this.orderInputComponent.show();
    }

    processOrder(orderData) {
        const translations = this.data.translations[this.currentLang];
        const grandTotal = this.cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
        
        // Create order summary for data integrity
        const orderSummary = this.createOrderSummary(orderData, grandTotal);
        
        // Build detailed order message using dynamic translations
        let message = `${translations.actions.whatsappMessage}\n\n`;
        message += `${translations.actions.name}: ${orderData.name}\n`;
        message += `${translations.actions.location}: ${orderData.location}\n`;
        message += `Order ID: ${orderSummary.orderId}\n\n`;
        message += `${translations.actions.cartTitle}:\n\n`;
        
        this.cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.finalPrice} ${this.data.settings.currency}\n`;
            
            if (item.extras.length > 0) {
                message += `   ${translations.actions.extras}: ${item.extras.map(e => e.name).join(', ')}\n`;
            }
            
            if (item.removals.length > 0) {
                message += `   ${translations.actions.removals}: ${item.removals.map(r => r.name).join(', ')}\n`;
            }
            
            message += '\n';
        });
        
        message += `\n${translations.actions.total}: ${grandTotal} ${this.data.settings.currency}`;
        
        console.log('Final order message:', message);
        console.log('Order summary saved:', orderSummary);
        
        // Create WhatsApp link
        const whatsappUrl = `https://wa.me/${this.data.config.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Clear cart and close modal
        this.cart = [];
        this.updateCartBadge();
        this.closeCartModal();
        
        // Remove modal container
        const modalContainer = document.getElementById('order-input-container');
        if (modalContainer) {
            document.body.removeChild(modalContainer);
        }
        
        // Show confirmation
        this.showNotification(`Order ${orderSummary.orderId} sent to WhatsApp!`);
    }

    showCustomization(itemId) {
        const item = this.data.menuItems.find(i => i.id === itemId);
        if (!item) return;

        this.currentModalItem = item;
        this.selectedExtras.clear();
        this.selectedRemovals.clear();

        const modal = document.getElementById('customizationModal');
        const translations = this.data.translations[this.currentLang];
        
        // Update modal content
        document.querySelector('.dish-name').textContent = item.name[this.currentLang];
        document.querySelector('.dish-price').textContent = `${item.price} ${this.data.settings.currency}`;
        
        // Render extras
        this.renderOptions('extrasOptions', item.customization.extras, 'extra');
        
        // Render removals
        this.renderOptions('removalsOptions', item.customization.removals, 'removal');
        
        // Update total
        this.updateTotal();
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    renderOptions(containerId, options, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            optionElement.innerHTML = `
                <input type="checkbox" 
                       class="option-checkbox" 
                       id="${option.id}" 
                       data-type="${type}"
                       data-price="${option.price}">
                <div class="option-details">
                    <div class="option-name">${option.name[this.currentLang]}</div>
                    <div class="option-price">${option.price > 0 ? `+${option.price} ${this.data.settings.currency}` : ''}</div>
                </div>
            `;
            
            // Add event listener to the checkbox
            const checkbox = optionElement.querySelector('.option-checkbox');
            checkbox.addEventListener('change', (e) => {
                this.handleOptionChange(option.id, type, e.target.checked);
            });
            
            container.appendChild(optionElement);
        });
    }

    handleOptionChange(optionId, type, isChecked) {
        if (type === 'extra') {
            if (isChecked) {
                this.selectedExtras.add(optionId);
            } else {
                this.selectedExtras.delete(optionId);
            }
        } else if (type === 'removal') {
            if (isChecked) {
                this.selectedRemovals.add(optionId);
            } else {
                this.selectedRemovals.delete(optionId);
            }
        }
        
        this.updateTotal();
    }

    updateTotal() {
        if (!this.currentModalItem) return;
        
        let total = this.currentModalItem.price;
        
        // Add extras
        this.selectedExtras.forEach(extraId => {
            const extra = this.currentModalItem.customization.extras.find(e => e.id === extraId);
            if (extra) total += extra.price;
        });
        
        document.querySelector('.total-price').textContent = `${total} ${this.data.settings.currency}`;
    }

    closeModal() {
        const modal = document.getElementById('customizationModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentModalItem = null;
        this.selectedExtras.clear();
        this.selectedRemovals.clear();
    }

    confirmOrder() {
        if (!this.currentModalItem) return;
        
        const translations = this.data.translations[this.currentLang];
        const itemName = this.currentModalItem.name[this.currentLang];
        
        // Calculate final price
        let finalPrice = this.currentModalItem.price;
        this.selectedExtras.forEach(extraId => {
            const extra = this.currentModalItem.customization.extras.find(e => e.id === extraId);
            if (extra) finalPrice += extra.price;
        });
        
        // Create cart item object
        const cartItem = {
            id: this.currentModalItem.id,
            name: itemName,
            basePrice: this.currentModalItem.price,
            extras: Array.from(this.selectedExtras).map(extraId => {
                const extra = this.currentModalItem.customization.extras.find(e => e.id === extraId);
                return extra ? {
                    id: extra.id,
                    name: extra.name[this.currentLang],
                    price: extra.price
                } : null;
            }).filter(item => item),
            removals: Array.from(this.selectedRemovals).map(removalId => {
                const removal = this.currentModalItem.customization.removals.find(r => r.id === removalId);
                return removal ? {
                    id: removal.id,
                    name: removal.name[this.currentLang],
                    price: removal.price
                } : null;
            }).filter(item => item),
            finalPrice: finalPrice,
            quantity: 1
        };
        
        // Add to cart
        this.cart.push(cartItem);
        this.updateCartBadge();
        
        // Close modal
        this.closeModal();
        
        // Show confirmation
        this.showNotification(`${itemName} added to cart!`);
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: var(--shadow);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Public methods for external access
    getCurrentLanguage() {
        return this.currentLang;
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getMenuItems() {
        return this.data.menuItems;
    }

    getTranslations() {
        return this.data.translations[this.currentLang];
    }
}

// Initialize the restaurant UI
const restaurantUI = new RestaurantUI();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    restaurantUI.init();
});

// Make restaurantUI globally accessible for onclick handlers
window.restaurantUI = restaurantUI;

export default restaurantUI;
