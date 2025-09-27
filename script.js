// Estado global de la aplicación
class EcommerceApp {
    constructor() {
        this.cart = [];
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentFilter = 'all';
        this.favorites = new Set();
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
        this.updateCartBadge();
        this.setupScrollToTop();
    }

    // Datos de productos usando solo imágenes disponibles en la carpeta
    loadProducts() {
        this.products = [
            {
                id: 1,
                title: 'SmartWatch Pro',
                category: 'accesorios',
                price: 299,
                originalPrice: 349,
                discount: 14,
                rating: 4.8,
                reviews: 156,
                image: 'images/SmartWatch.webp',
                badge: 'Nuevo',
                description: 'Reloj inteligente con todas las funciones que necesitas para tu día a día.'
            },
            {
                id: 2,
                title: 'Audífonos Premium',
                category: 'auriculares',
                price: 199,
                originalPrice: 249,
                discount: 20,
                rating: 4.7,
                reviews: 203,
                image: 'images/Audifonos.webp',
                badge: 'Popular',
                description: 'Calidad de sonido excepcional con cancelación de ruido activa.'
            },
            {
                id: 3,
                title: 'Smart TV 4K Ultra HD',
                category: 'electronica',
                price: 799,
                originalPrice: 899,
                discount: 11,
                rating: 4.9,
                reviews: 89,
                image: 'images/tv.webp',
                badge: 'Oferta',
                description: 'Televisor inteligente 4K con HDR y sistema operativo avanzado.'
            },
            {
                id: 4,
                title: 'Mochila Ejecutiva Premium',
                category: 'accesorios',
                price: 89,
                originalPrice: 120,
                discount: 26,
                rating: 4.6,
                reviews: 127,
                image: 'images/Mochila.webp',
                badge: 'Bestseller',
                description: 'Mochila profesional con compartimento acolchado para laptop y tablet.'
            },
            {
                id: 5,
                title: 'Camisa Negra Elegante',
                category: 'ropa',
                price: 79,
                originalPrice: 99,
                discount: 20,
                rating: 4.8,
                reviews: 92,
                image: 'images/camisa negra.webp',
                badge: 'Moda',
                description: 'Camisa elegante de algodón premium para ocasiones especiales.'
            },
            {
                id: 6,
                title: 'iPhone 14',
                category: 'smartphones',
                price: 899,
                originalPrice: 999,
                discount: 10,
                rating: 4.9,
                reviews: 345,
                image: 'images/Iphone14.webp',
                badge: 'Oferta',
                description: 'El iPhone más avanzado con cámara profesional y chip A16 Bionic.'
            }
        ];

        this.filteredProducts = [...this.products];
        this.renderProducts();
    }

    // Vinculación de eventos
    bindEvents() {
        // Menu hamburguesa
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.toggleDrawer();
        });

        // Cerrar drawer
        document.getElementById('closeDrawer').addEventListener('click', () => {
            this.closeDrawer();
        });

        // Overlay del drawer
        document.getElementById('drawerOverlay').addEventListener('click', () => {
            this.closeDrawer();
        });

        // Búsqueda
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.toggleSearch();
        });

        document.getElementById('closeSearch').addEventListener('click', () => {
            this.closeSearch();
        });

        // Input de búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Carrito
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.openCartModal();
        });

        document.getElementById('closeCartModal').addEventListener('click', () => {
            this.closeCartModal();
        });

        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeCartModal();
            this.closeAboutModal();
        });

        // Acciones del carrito
        document.getElementById('clearCart').addEventListener('click', () => {
            this.clearCart();
        });

        document.getElementById('checkout').addEventListener('click', () => {
            this.checkout();
        });

        // Navegación por categorías
        document.querySelectorAll('.navigation-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectCategory(item.dataset.category);
            });
        });

        // Filtros
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.selectFilter(chip.dataset.filter);
            });
        });

        // CTA del hero
        document.querySelector('.hero-cta').addEventListener('click', () => {
            document.querySelector('.products-section').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Snackbar
        document.getElementById('snackbarAction').addEventListener('click', () => {
            this.hideSnackbar();
        });

        // FAB scroll to top
        document.getElementById('scrollToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Botón "Acerca de"
        document.getElementById('aboutBtn').addEventListener('click', () => {
            this.openAboutModal();
        });

        document.getElementById('closeAboutModal').addEventListener('click', () => {
            this.closeAboutModal();
        });

        document.getElementById('closeAboutModalFooter').addEventListener('click', () => {
            this.closeAboutModal();
        });

        // Escape key para cerrar modales
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDrawer();
                this.closeSearch();
                this.closeCartModal();
                this.closeAboutModal();
            }
        });
    }

    // Navegación lateral
    toggleDrawer() {
        const drawer = document.getElementById('navigationDrawer');
        const overlay = document.getElementById('drawerOverlay');
        
        drawer.classList.toggle('open');
        overlay.classList.toggle('show');
    }

    closeDrawer() {
        const drawer = document.getElementById('navigationDrawer');
        const overlay = document.getElementById('drawerOverlay');
        
        drawer.classList.remove('open');
        overlay.classList.remove('show');
    }

    // Búsqueda
    toggleSearch() {
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        
        searchBar.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }

    closeSearch() {
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        
        searchBar.classList.remove('active');
        searchInput.value = '';
        this.searchProducts('');
    }

    searchProducts(query) {
        if (!query) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.applyFilters();
    }

    // Categorías
    selectCategory(category) {
        this.currentCategory = category;
        
        // Actualizar navegación
        document.querySelectorAll('.navigation-item').forEach(item => {
            item.classList.toggle('active', item.dataset.category === category);
        });

        this.applyFilters();
        this.closeDrawer();
    }

    // Filtros
    selectFilter(filter) {
        this.currentFilter = filter;
        
        // Actualizar chips de filtro
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.filter === filter);
        });

        this.applyFilters();
    }

    applyFilters() {
        let products = [...this.filteredProducts];

        // Filtrar por categoría
        if (this.currentCategory !== 'all') {
            products = products.filter(product => product.category === this.currentCategory);
        }

        // Aplicar filtro de ordenamiento
        switch (this.currentFilter) {
            case 'precio-bajo':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'precio-alto':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'populares':
                products.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'nuevos':
                products.sort((a, b) => b.id - a.id);
                break;
            default:
                // Sin orden específico
                break;
        }

        this.renderProducts(products);
    }

    // Renderizar productos
    renderProducts(products = this.products) {
        const grid = document.getElementById('productsGrid');
        
        if (products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <span class="material-symbols-outlined" style="font-size: 64px; opacity: 0.5; margin-bottom: 16px;">search_off</span>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <button class="product-favorite ${this.favorites.has(product.id) ? 'active' : ''}" 
                            onclick="app.toggleFavorite(${product.id})">
                        <span class="material-symbols-outlined">
                            ${this.favorites.has(product.id) ? 'favorite' : 'favorite_border'}
                        </span>
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="price-current">$${product.price}</span>
                        ${product.originalPrice ? `
                            <span class="price-original">$${product.originalPrice}</span>
                            <span class="price-discount">-${product.discount}%</span>
                        ` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const categories = {
            'smartphones': 'Smartphones',
            'laptops': 'Laptops',
            'tablets': 'Tablets',
            'auriculares': 'Auriculares',
            'electronica': 'Electrónica',
            'ropa': 'Ropa',
            'accesorios': 'Accesorios'
        };
        return categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="material-symbols-outlined">star</span>';
        }
        
        if (hasHalfStar) {
            stars += '<span class="material-symbols-outlined">star_half</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="material-symbols-outlined">star_border</span>';
        }
        
        return stars;
    }

    // Favoritos
    toggleFavorite(productId) {
        if (this.favorites.has(productId)) {
            this.favorites.delete(productId);
            this.showSnackbar('Producto removido de favoritos');
        } else {
            this.favorites.add(productId);
            this.showSnackbar('Producto agregado a favoritos');
        }
        
        // Actualizar icono
        const favoriteBtn = document.querySelector(`[data-product-id="${productId}"] .product-favorite`);
        const icon = favoriteBtn.querySelector('.material-symbols-outlined');
        
        favoriteBtn.classList.toggle('active');
        icon.textContent = this.favorites.has(productId) ? 'favorite' : 'favorite_border';
    }

    // Carrito de compras
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateCartBadge();
        this.showSnackbar(`${product.title} agregado al carrito`);
        
        // Animación del botón
        const button = document.querySelector(`[data-product-id="${productId}"] .add-to-cart-btn`);
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartBadge();
        this.renderCartItems();
        this.showSnackbar('Producto removido del carrito');
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.renderCartItems();
                this.updateCartBadge();
            }
        }
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }

    clearCart() {
        this.cart = [];
        this.updateCartBadge();
        this.renderCartItems();
        this.showSnackbar('Carrito vaciado');
    }

    // Modal del carrito
    openCartModal() {
        const modal = document.getElementById('cartModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.add('open');
        overlay.classList.add('show');
        
        this.renderCartItems();
    }

    closeCartModal() {
        const modal = document.getElementById('cartModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.remove('open');
        // Solo remover overlay si no hay otros modales abiertos
        const aboutModal = document.getElementById('aboutModal');
        if (!aboutModal.classList.contains('open')) {
            overlay.classList.remove('show');
        }
    }

    // Modal "Acerca de"
    openAboutModal() {
        const modal = document.getElementById('aboutModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.add('open');
        overlay.classList.add('show');
        
        this.closeDrawer();
    }

    closeAboutModal() {
        const modal = document.getElementById('aboutModal');
        const overlay = document.getElementById('modalOverlay');
        
        modal.classList.remove('open');
        // Solo remover overlay si no hay otros modales abiertos
        const cartModal = document.getElementById('cartModal');
        if (!cartModal.classList.contains('open')) {
            overlay.classList.remove('show');
        }
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega algunos productos para comenzar</p>
                </div>
            `;
            cartTotal.textContent = '0';
            return;
        }
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)">
                        <span class="material-symbols-outlined">remove</span>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                </div>
                <button class="icon-button" onclick="app.removeFromCart(${item.id})" 
                        style="color: var(--md-sys-color-error);">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        `).join('');
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showSnackbar('Tu carrito está vacío');
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.showSnackbar(`¡Compra realizada por $${total.toFixed(2)}!`);
        
        this.cart = [];
        this.updateCartBadge();
        this.closeCartModal();
        
        // Simular redirección a página de éxito
        setTimeout(() => {
            this.showSnackbar('¡Gracias por tu compra!');
        }, 2000);
    }

    // Snackbar
    showSnackbar(message) {
        const snackbar = document.getElementById('snackbar');
        const snackbarText = document.getElementById('snackbarText');
        
        snackbarText.textContent = message;
        snackbar.classList.add('show');
        
        setTimeout(() => {
            this.hideSnackbar();
        }, 3000);
    }

    hideSnackbar() {
        const snackbar = document.getElementById('snackbar');
        snackbar.classList.remove('show');
    }

    // FAB Scroll to top
    setupScrollToTop() {
        const fab = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                fab.classList.add('show');
            } else {
                fab.classList.remove('show');
            }
        });
    }
}

// Utilidades para animaciones suaves
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EcommerceApp();
});

// Manejar errores de imágenes
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.jpg';
    }
}, true);

// Preload de imágenes críticas
function preloadImages() {
    const criticalImages = [
        'images/placeholder.jpg',
        'images/SmartWatch.webp',
        'images/Audifonos.webp',
        'images/tv.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Llamar preload cuando la página esté lista
window.addEventListener('load', preloadImages);

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Descomentar si deseas implementar PWA
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Detectar modo offline
window.addEventListener('online', () => {
    app.showSnackbar('Conexión restaurada');
});

window.addEventListener('offline', () => {
    app.showSnackbar('Sin conexión a internet');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K para abrir búsqueda
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        app.toggleSearch();
    }
    
    // Ctrl/Cmd + B para abrir carrito
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        app.openCartModal();
    }
});

// Lazy loading para imágenes (Intersection Observer)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Aplicar lazy loading a imágenes cuando se cargan dinámicamente
function enableLazyLoading() {
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Touch gestures para móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - cerrar drawer si está abierto
            app.closeDrawer();
        } else {
            // Swipe right - abrir drawer si está cerrado
            const drawer = document.getElementById('navigationDrawer');
            if (!drawer.classList.contains('open')) {
                app.toggleDrawer();
            }
        }
    }
}