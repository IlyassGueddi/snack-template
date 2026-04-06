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
        favicon: './assets/images/logo.webp',
        logo: './assets/images/logo.webp'
    },
    
    translations: {
        en: {
            restaurantName: 'My Restaurant',
            tagline: 'Fine Dining Experience',
            homeTitle: 'Bistro Premium | Luxury Dining Experience',
            home: 'Home',
            about: 'About',
            menu: 'Menu',
            contact: 'Contact',
            addons: 'Add-ons',
            welcome: 'Welcome to our restaurant',
            description: 'Experience culinary excellence with our carefully crafted dishes',
            phone: '+212 710388625',
            email: 'gueddiilyass99@gmail.com',
            address: 'Al Salam District, Agadir, Morocco',
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
                total: 'Total',
                cartTitle: 'Your Order',
                whatsappMessage: 'Hello! I would like to place an order:',
                placeOrder: 'Place Order',
                emptyCart: 'Your cart is empty',
                name: 'Name',
                location: 'Location',
                namePlaceholder: 'Enter your name',
                locationPlaceholder: 'Enter your delivery address',
                priceIntegrityWarning: 'Price is fixed upon order generation'
            }
        },
        ar: {
            restaurantName: 'مطعمي',
            tagline: 'تجربة طهي فاخرة',
            homeTitle: 'بريميوم | تجربة طعام فاخرة',
            home: 'الرئيسية',
            about: 'قصتنا',
            menu: 'قائمة الطعام',
            contact: 'اتصل بنا',
            addons: 'إضافات',
            welcome: 'تجربة طهي استثنائية',
            description: 'استمتعوا بالتميز الطهوي مع أطباقنا المصممة بعناية فائقة',
            phone: '+212 710388625',
            email: 'gueddiilyass99@gmail.com',
            address: 'حي السلام، أكادير، المغرب',
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
                total: 'الإجمالي',
                cartTitle: 'طلبك',
                whatsappMessage: 'مرحباً! أود أن أطلب:',
                placeOrder: 'إرسال الطلب',
                emptyCart: 'السلة فارغة',
                name: 'الاسم',
                location: 'الموقع',
                namePlaceholder: 'أدخل اسمك',
                locationPlaceholder: 'أدخل عنوان التوصيل',
                priceIntegrityWarning: 'السعر ثابت عند إنشاء الطلب'
            }
        },
        fr: {
            restaurantName: 'Mon restaurant',
            tagline: 'Expérience Gastronomique',
            homeTitle: 'Bistro Premium | Expérience Gastronomique Luxe',
            home: 'Accueil',
            about: 'À Propos',
            menu: 'Menu',
            contact: 'Contact',
            addons: 'Suppléments',
            welcome: 'Bienvenue dans notre restaurant',
            description: 'Découvrez l\'excellence culinaire avec nos plats soigneusement préparés',
            phone: '+212 710388625',
            email: 'gueddiilyass99@gmail.com',
            address: 'Quartier Al Salam, Agadir, Maroc',
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
                total: 'Total',
                cartTitle: 'Votre Commande',
                whatsappMessage: 'Bonjour! Je souhaiterais passer une commande:',
                placeOrder: 'Passer la Commande',
                emptyCart: 'Votre panier est vide',
                name: 'Nom',
                location: 'Emplacement',
                namePlaceholder: 'Entrez votre nom',
                locationPlaceholder: 'Entrez votre adresse de livraison',
                priceIntegrityWarning: 'Le prix est fixé lors de la génération de la commande'
            }
        }
    },
    
    menuItems: [
        {
            id: 'app01',
            category: 'mains', // قمت بتغيير التصنيف إلى mains لأنه طاجين
            name: {
                en: 'Chicken Tagine',
                ar: 'طاجين دجاج',
                fr: 'Tajine de Poulet'
            },
            price: 85, // سعر تقديري، يمكنك تعديله
            image: 'assets/images/app01.webp',
            customization: {
                extras: [
                    { id: 'extra13', name: { en: 'Extra Olives', ar: 'زيتون إضافي', fr: 'Olives Supplémentaires' }, price: 5 },
                    { id: 'extra14', name: { en: 'Preserved Lemon', ar: 'حامض مصير', fr: 'Citron Confit' }, price: 5 }
                ],
                removals: [
                    { id: 'rem11', name: { en: 'Onions', ar: 'بصل', fr: 'Oignons' }, price: 0 },
                    { id: 'rem12', name: { en: 'Saffron', ar: 'زعفران', fr: 'Safran' }, price: 0 }
                ]
            }
        },
        {
            id: 'app02',
            category: 'mains',
            name: {
                en: 'Royal Couscous',
                ar: 'كسكس ملكي',
                fr: 'Couscous Royal'
            },
            price: 120, 
            image: 'assets/images/app02.webp',
            customization: {
                extras: [
                    { id: 'extra15', name: { en: 'Extra Tfaya', ar: 'تفاية إضافية', fr: 'Tfaya Supplémentaire' }, price: 15 },
                    { id: 'extra16', name: { en: 'Lben (Buttermilk)', ar: 'لبن', fr: 'Lait de Beurre' }, price: 10 }
                ],
                removals: [
                    { id: 'rem13', name: { en: 'Chickpeas', ar: 'حمص', fr: 'Pois Chiches' }, price: 0 },
                    { id: 'rem14', name: { en: 'Raisins', ar: 'زبيب', fr: 'Raisins Secs' }, price: 0 }
                ]
            }
        },
        {
            id: 'app03',
            category: 'appetizers',
            name: {
                en: 'Moroccan Harira',
                ar: 'حريرة مغربية',
                fr: 'Harira Marocaine'
            },
            price: 35,
            image: 'assets/images/app03.webp',
            customization: {
                extras: [
                    { id: 'extra17', name: { en: 'Dates & Chebakia', ar: 'تمر وشباكية', fr: 'Dattes et Chebakia' }, price: 15 },
                    { id: 'extra18', name: { en: 'Boiled Egg', ar: 'بيض مسلوق', fr: 'Oeuf Bouilli' }, price: 5 }
                ],
                removals: [
                    { id: 'rem15', name: { en: 'Cilantro', ar: 'كزبرة', fr: 'Coriandre' }, price: 0 },
                    { id: 'rem16', name: { en: 'Celery', ar: 'كرفس', fr: 'Céleri' }, price: 0 }
                ]
            }
        },
        {
            id: 'app04',
            category: 'mains',
            name: {
                en: 'Mixed Grill',
                ar: 'مشاوي مشكلة',
                fr: 'Grillades Mixtes'
            },
            price: 150,
            image: 'assets/images/app04.webp',
            customization: {
                extras: [
                    { id: 'extra19', name: { en: 'Extra Kofta', ar: 'كفتة إضافية', fr: 'Kofta Supplémentaire' }, price: 30 },
                    { id: 'extra20', name: { en: 'Garlic Sauce', ar: 'صلصة ثوم', fr: 'Sauce Toum' }, price: 10 }
                ],
                removals: [
                    { id: 'rem17', name: { en: 'Onions', ar: 'بصل', fr: 'Oignons' }, price: 0 },
                    { id: 'rem18', name: { en: 'Spicy Sauce', ar: 'صلصة حارة', fr: 'Sauce Piquante' }, price: 0 }
                ]
            }
        },
        {
            id: 'app05',
            category: 'appetizers',
            name: {
                en: 'Moroccan Salad',
                ar: 'سلطة مغربية',
                fr: 'Salade Marocaine'
            },
            price: 25,
            image: 'assets/images/app05.webp',
            customization: {
                extras: [
                    { id: 'extra21', name: { en: 'Tuna', ar: 'طون', fr: 'Thon' }, price: 15 },
                    { id: 'extra22', name: { en: 'Boiled Egg', ar: 'بيض مسلوق', fr: 'Oeuf Bouilli' }, price: 5 }
                ],
                removals: [
                    { id: 'rem19', name: { en: 'Onions', ar: 'بصل', fr: 'Oignons' }, price: 0 },
                    { id: 'rem20', name: { en: 'Vinegar', ar: 'خل', fr: 'Vinaigre' }, price: 0 }
                ]
            }
        },
        {
            id: 'app06',
            category: 'mains',
            name: {
                en: 'Soussia Beef Tagine',
                ar: 'طاجين سوسي باللحم',
                fr: 'Tajine Soussia au Boeuf'
            },
            price: 95,
            image: 'assets/images/app06.webp',
            customization: {
                extras: [
                    { id: 'extra23', name: { en: 'Argan Oil Drizzle', ar: 'زيت أركان', fr: 'Filet d\'Huile d\'Argan' }, price: 20 },
                    { id: 'extra24', name: { en: 'Extra Almonds', ar: 'لوز إضافي', fr: 'Amandes Supplémentaires' }, price: 15 }
                ],
                removals: [
                    { id: 'rem21', name: { en: 'Prunes', ar: 'برقوق', fr: 'Pruneaux' }, price: 0 },
                    { id: 'rem22', name: { en: 'Apricots', ar: 'مشمش', fr: 'Abricots' }, price: 0 }
                ]
            }
        },
        // 07 - Seafood Pastilla (Mains)
        {
            id: 'app07',
            category: 'mains',
            name: { en: 'Seafood Pastilla', ar: 'بسطيلة سمك', fr: 'Pastilla aux Fruits de Mer' },
            price: 180,
            image: 'assets/images/app07.webp',
            customization: {
                extras: [{ id: 'extra25', name: { en: 'Extra Shrimp', ar: 'قيمرون إضافي', fr: 'Crevettes Supplémentaires' }, price: 40 }],
                removals: [{ id: 'rem23', name: { en: 'Mushrooms', ar: 'فطر', fr: 'Champignons' }, price: 0 }]
            }
        },
        // 08 - Grilled Sardines (Mains - Agadir Style)
        {
            id: 'app08',
            category: 'mains',
            name: { en: 'Agadir Grilled Sardines', ar: 'سردين مشوي أكادير', fr: 'Sardines Grillées d\'Agadir' },
            price: 45,
            image: 'assets/images/app08.webp',
            customization: {
                extras: [{ id: 'extra26', name: { en: 'Chermoula Sauce', ar: 'شرمولة إضافية', fr: 'Sauce Chermoula' }, price: 5 }],
                removals: [{ id: 'rem24', name: { en: 'Lemon', ar: 'ليمون', fr: 'Citron' }, price: 0 }]
            }
        },
        // 09 - Zaalouk (Appetizers)
        {
            id: 'app09',
            category: 'appetizers',
            name: { en: 'Zaalouk', ar: 'زعلوك مغربي', fr: 'Zaalouk d\'Aubergines' },
            price: 20,
            image: 'assets/images/app09.webp',
            customization: {
                extras: [{ id: 'extra27', name: { en: 'Olive Oil', ar: 'زيت زيتون', fr: 'Huile d\'Olive' }, price: 5 }],
                removals: [{ id: 'rem25', name: { en: 'Garlic', ar: 'ثوم', fr: 'Ail' }, price: 0 }]
            }
        },
        // 10 - Briouates Mix (Appetizers)
        {
            id: 'app10',
            category: 'appetizers',
            name: { en: 'Mixed Briouates', ar: 'بريوات مشكلة', fr: 'Briouates Mixtes' },
            price: 40,
            image: 'assets/images/app10.webp',
            customization: {
                extras: [{ id: 'extra28', name: { en: 'Honey Dip', ar: 'عسل جانبي', fr: 'Miel à côté' }, price: 10 }],
                removals: [{ id: 'rem26', name: { en: 'Cheese', ar: 'جبن', fr: 'Fromage' }, price: 0 }]
            }
        },
        // 11 - Fruit Salad (Desserts)
        {
            id: 'app11',
            category: 'desserts',
            name: { en: 'Fresh Fruit Salad', ar: 'سلطة فواكه طازجة', fr: 'Salade de Fruits Frais' },
            price: 30,
            image: 'assets/images/app11.webp',
            customization: {
                extras: [{ id: 'extra29', name: { en: 'Orange Juice Base', ar: 'عصير برتقال', fr: 'Jus d\'Orange' }, price: 5 }],
                removals: [{ id: 'rem27', name: { en: 'Sugar', ar: 'سكر', fr: 'Sucre' }, price: 0 }]
            }
        },
        // 12 - Moroccan Pastries (Desserts)
        {
            id: 'app12',
            category: 'desserts',
            name: { en: 'Moroccan Pastries', ar: 'حلويات مغربية', fr: 'Pâtisseries Marocaines' },
            price: 50,
            image: 'assets/images/app12.webp',
            customization: {
                extras: [{ id: 'extra30', name: { en: 'Almond Paste', ar: 'عقدة اللوز', fr: 'Pâte d\'Amande' }, price: 15 }],
                removals: [{ id: 'rem28', name: { en: 'Peanuts', ar: 'كاوكاو', fr: 'Cacahuètes' }, price: 0 }]
            }
        },
        // 13 - Mint Tea (Beverages)
        {
            id: 'app13',
            category: 'beverages',
            name: { en: 'Moroccan Mint Tea', ar: 'شاي بالنعناع', fr: 'Thé à la Menthe' },
            price: 15,
            image: 'assets/images/app13.webp',
            customization: {
                extras: [{ id: 'extra31', name: { en: 'Extra Mint', ar: 'نعناع إضافي', fr: 'Menthe Supplémentaire' }, price: 2 }],
                removals: [{ id: 'rem29', name: { en: 'Sugar', ar: 'بدون سكر', fr: 'Sans Sucre' }, price: 0 }]
            }
        },
        // 14 - Avocado Smoothie (Beverages)
        {
            id: 'app14',
            category: 'beverages',
            name: { en: 'Avocado Smoothie', ar: 'عصير لافوكا', fr: 'Jus d\'Avocat' },
            price: 35,
            image: 'assets/images/app14.webp',
            customization: {
                extras: [{ id: 'extra32', name: { en: 'Dried Fruits Mix', ar: 'فواكه جافة', fr: 'Fruits Secs' }, price: 10 }],
                removals: [{ id: 'rem30', name: { en: 'Milk', ar: 'حليب', fr: 'Lait' }, price: 0 }]
            }
        },
        // 15 - Orange Juice (Beverages)
        {
            id: 'app15',
            category: 'beverages',
            name: { en: 'Fresh Orange Juice', ar: 'عصير برتقال طازج', fr: 'Jus d\'Orange Frais' },
            price: 20,
            image: 'assets/images/app15.webp',
            customization: {
                extras: [{ id: 'extra33', name: { en: 'Ice Cubes', ar: 'ثلج', fr: 'Glaçons' }, price: 0 }],
                removals: [{ id: 'rem31', name: { en: 'Pulp', ar: 'بدون لب', fr: 'Sans Pulpe' }, price: 0 }]
            }
        },
        // 16 - Panaché (Beverages)
        {
            id: 'app16',
            category: 'beverages',
            name: { en: 'Mixed Panaché', ar: 'باناشي فواكه', fr: 'Jus Panaché' },
            price: 30,
            image: 'assets/images/app16.webp',
            customization: {
                extras: [{ id: 'extra34', name: { en: 'Whipped Cream', ar: 'كريمة', fr: 'Crème Chantilly' }, price: 10 }],
                removals: [{ id: 'rem32', name: { en: 'Sugar', ar: 'سكر', fr: 'Sucre' }, price: 0 }]
            }
        }
    ]
};

export default RESTAURANT_DATA;
