const RESTAURANT_DATA = {
    settings: {
        lang: 'en',
        theme: 'dark',
        currency: 'DH'
    },
    
    config: {
        contact: {
            whatsapp: '+212 710388625'
        },
        favicon: './assets/images/favicon.png',
        logo: './assets/images/logo.png'
    },
    
    translations: {
        en: {
            restaurantName: 'Bistro Premium',
            tagline: 'Fine Dining Experience',
            homeTitle: 'Bistro Premium | Luxury Dining Experience',
            home: 'Home',
            about: 'About',
            menu: 'Menu',
            contact: 'Contact',
            addons: 'Add-ons',
            welcome: 'Welcome to our restaurant',
            description: 'Experience culinary excellence with our carefully crafted dishes',
            phone: '+212 5XX-XXX-XXX',
            email: 'info@bistropremium.ma',
            address: '123 Avenue Hassan II, Casablanca, Morocco',
            hours: 'Open Daily: 11:00 AM - 11:00 PM',
            categories: {
                appetizers: 'Appetizers',
                mains: 'Main Courses',
                desserts: 'Desserts',
                beverages: 'Beverages'
            },
            actions: {
                order: 'Order Now',
                customize: 'Customize',
                addToCart: 'Add to Cart',
                viewDetails: 'View Details',
                confirmOrder: 'Confirm Order',
                extras: 'Extras',
                removals: 'Removals',
                close: 'Close',
                total: 'Total'
            }
        },
        ar: {
            restaurantName: 'مطعم بريميوم',
            tagline: 'تجربة طهي فاخرة',
            homeTitle: 'بريميوم | تجربة طعام فاخرة',
            home: 'الرئيسية',
            about: 'قصتنا',
            menu: 'قائمة الطعام',
            contact: 'اتصل بنا',
            addons: 'إضافات',
            welcome: 'تجربة طهي استثنائية',
            description: 'استمتعوا بالتميز الطهوي مع أطباقنا المصممة بعناية فائقة',
            phone: '+212 5XX-XXX-XXX',
            email: 'info@bistropremium.ma',
            address: '123 شارع الحسن الثاني، الدار البيضاء، المغرب',
            hours: 'مفتوح يومياً: 11:00 صباحاً - 11:00 مساءً',
            categories: {
                appetizers: 'مقبلات',
                mains: 'الأطباق الرئيسية',
                desserts: 'حلويات',
                beverages: 'مشروبات'
            },
            actions: {
                order: 'اطلب الآن',
                customize: 'تخصيص الطلب',
                addToCart: 'إضافة للطلب',
                viewDetails: 'عرض التفاصيل',
                confirmOrder: 'تأكيد الطلب',
                extras: 'إضافات',
                removals: 'حذف',
                close: 'إغلاق',
                total: 'الإجمالي'
            }
        },
        fr: {
            restaurantName: 'Bistro Premium',
            tagline: 'Expérience Gastronomique',
            homeTitle: 'Bistro Premium | Expérience Gastronomique Luxe',
            home: 'Accueil',
            about: 'À Propos',
            menu: 'Menu',
            contact: 'Contact',
            addons: 'Suppléments',
            welcome: 'Bienvenue dans notre restaurant',
            description: 'Découvrez l\'excellence culinaire avec nos plats soigneusement préparés',
            phone: '+212 5XX-XXX-XXX',
            email: 'info@bistropremium.ma',
            address: '123 Avenue Hassan II, Casablanca, Maroc',
            hours: 'Ouvert tous les jours: 11:00 - 23:00',
            categories: {
                appetizers: 'Entrées',
                mains: 'Plats Principaux',
                desserts: 'Desserts',
                beverages: 'Boissons'
            },
            actions: {
                order: 'Commander',
                customize: 'Personnaliser',
                addToCart: 'Ajouter au Panier',
                viewDetails: 'Voir les Détails',
                confirmOrder: 'Confirmer la Commande',
                extras: 'Suppléments',
                removals: 'Retraits',
                close: 'Fermer',
                total: 'Total'
            }
        }
    },
    
    menuItems: [
        {
            id: 'app01',
            category: 'appetizers',
            name: {
                en: 'Mediterranean Bruschetta',
                ar: 'بروشيتا متوسطية',
                fr: 'Bruschetta Méditerranéenne'
            },
            price: 45,
            image: 'images/bruschetta.jpg',
            customization: {
                extras: [
                    { id: 'extra1', name: { en: 'Extra Cheese', ar: 'جبن إضافي', fr: 'Fromage Supplémentaire' }, price: 10 },
                    { id: 'extra2', name: { en: 'Prosciutto', ar: 'بروشوتو', fr: 'Prosciutto' }, price: 25 }
                ],
                removals: [
                    { id: 'rem1', name: { en: 'Garlic', ar: 'ثوم', fr: 'Ail' }, price: 0 },
                    { id: 'rem2', name: { en: 'Basil', ar: 'ريحان', fr: 'Basilic' }, price: 0 }
                ]
            }
        },
        {
            id: 'main01',
            category: 'mains',
            name: {
                en: 'Grilled Lamb Chops',
                ar: 'كبد مشوي',
                fr: 'Côtelettes d\'Agneau Grillées'
            },
            price: 185,
            image: 'images/lamb-chops.jpg',
            customization: {
                extras: [
                    { id: 'extra3', name: { en: 'Extra Sauce', ar: 'صلصة إضافية', fr: 'Sauce Supplémentaire' }, price: 15 },
                    { id: 'extra4', name: { en: 'Side Salad', ar: 'سلطة جانبية', fr: 'Salade d\'Accompagnement' }, price: 35 }
                ],
                removals: [
                    { id: 'rem3', name: { en: 'Herbs', ar: 'أعشاب', fr: 'Herbes' }, price: 0 },
                    { id: 'rem4', name: { en: 'Spices', ar: 'بهارات', fr: 'Épices' }, price: 0 }
                ]
            }
        },
        {
            id: 'dess01',
            category: 'desserts',
            name: {
                en: 'Chocolate Fondant',
                ar: 'فوندانت شوكولاتة',
                fr: 'Fondant au Chocolat'
            },
            price: 65,
            image: 'images/chocolate-fondant.jpg',
            customization: {
                extras: [
                    { id: 'extra5', name: { en: 'Vanilla Ice Cream', ar: 'آيس كريم فانيليا', fr: 'Glace Vanille' }, price: 20 },
                    { id: 'extra6', name: { en: 'Berry Sauce', ar: 'صلصة التوت', fr: 'Sauce aux Baies' }, price: 15 }
                ],
                removals: [
                    { id: 'rem5', name: { en: 'Powdered Sugar', ar: 'سكر بودرة', fr: 'Sucre Glacé' }, price: 0 }
                ]
            }
        },
        {
            id: 'bev01',
            category: 'beverages',
            name: {
                en: 'Fresh Mint Tea',
                ar: 'شاي نعناع طازج',
                fr: 'Thé à la Menthe Frais'
            },
            price: 25,
            image: 'images/mint-tea.jpg',
            customization: {
                extras: [
                    { id: 'extra7', name: { en: 'Extra Sugar', ar: 'سكر إضافي', fr: 'Sucre Supplémentaire' }, price: 5 },
                    { id: 'extra8', name: { en: 'Lemon Slice', ar: 'شريحة ليمون', fr: 'Tranche de Citron' }, price: 10 }
                ],
                removals: [
                    { id: 'rem6', name: { en: 'Mint Leaves', ar: 'أوراق نعناع', fr: 'Feuilles de Menthe' }, price: 0 }
                ]
            }
        },
        {
            id: 'app02',
            category: 'appetizers',
            name: {
                en: 'Moroccan Salad',
                ar: 'سلطة مغربية',
                fr: 'Salade Marocaine'
            },
            price: 55,
            image: 'images/moroccan-salad.jpg',
            customization: {
                extras: [
                    { id: 'extra9', name: { en: 'Feta Cheese', ar: 'جبن فيتا', fr: 'Fromage Feta' }, price: 20 },
                    { id: 'extra10', name: { en: 'Olives', ar: 'زيتون', fr: 'Olives' }, price: 15 }
                ],
                removals: [
                    { id: 'rem7', name: { en: 'Onions', ar: 'بصل', fr: 'Oignons' }, price: 0 },
                    { id: 'rem8', name: { en: 'Tomatoes', ar: 'طماطم', fr: 'Tomates' }, price: 0 }
                ]
            }
        },
        {
            id: 'main02',
            category: 'mains',
            name: {
                en: 'Seafood Tagine',
                ar: 'طاجين بحر',
                fr: 'Tajine de Fruits de Mer'
            },
            price: 220,
            image: 'images/seafood-tagine.jpg',
            customization: {
                extras: [
                    { id: 'extra11', name: { en: 'Extra Fish', ar: 'سمك إضافي', fr: 'Poisson Supplémentaire' }, price: 45 },
                    { id: 'extra12', name: { en: 'Shrimp', ar: 'روبيان', fr: 'Crevettes' }, price: 35 }
                ],
                removals: [
                    { id: 'rem9', name: { en: 'Peppers', ar: 'فلفل', fr: 'Poivrons' }, price: 0 },
                    { id: 'rem10', name: { en: 'Cilantro', ar: 'كزبرة', fr: 'Coriandre' }, price: 0 }
                ]
            }
        }
    ]
};

export default RESTAURANT_DATA;
