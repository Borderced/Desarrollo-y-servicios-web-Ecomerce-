# TechStore - Ecommerce con Material Design 3

Una página de ecommerce estática moderna implementada con Material Design 3, HTML5, CSS3 y JavaScript vanilla.

## 🚀 Características

### Diseño y UX
- **Material Design 3**: Implementación completa del sistema de diseño más reciente de Google
- **Responsive**: Adaptable a todos los tamaños de pantalla (móvil, tablet, desktop)
- **Dark Mode Ready**: Preparado para modo oscuro (variables CSS configurables)
- **Animaciones fluidas**: Transiciones suaves siguiendo las guías de Material Motion

### Funcionalidades
- 🛒 **Carrito de compras** completo con add/remove/quantity
- 🔍 **Búsqueda en tiempo real** de productos
- 📱 **Navegación lateral** (Navigation Drawer)
- 🏷️ **Filtros y categorías** dinámicos
- ⭐ **Sistema de favoritos**
- 📊 **Valoraciones con estrellas**
- 🏷️ **Badges y etiquetas** de productos
- 💳 **Proceso de checkout** simulado
- 📱 **Gestos táctiles** para móviles
- ⌨️ **Atajos de teclado** (Ctrl+K búsqueda, Ctrl+B carrito)

### Tecnologías utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Clases, modules, async/await
- **Material Symbols**: Iconografía oficial de Google
- **WebP**: Formato de imágenes optimizado
- **SVG**: Placeholders e iconos vectoriales

## 📁 Estructura del proyecto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos con Material Design 3
├── script.js           # Lógica de la aplicación
├── README.md           # Documentación
└── images/             # Recursos gráficos
    ├── SmartWatch.webp
    ├── Audifonos.webp
    ├── tv.webp
    ├── Mochila.webp
    ├── camisa negra.webp
    ├── hero-tech.jpg
    └── placeholder.jpg
```

## 🎨 Sistema de colores Material Design 3

El proyecto utiliza el sistema de tokens de Material Design 3:

- **Primary**: #6750A4 (Púrpura vibrante)
- **Secondary**: #625B71 (Gris púrpura)
- **Tertiary**: #7D5260 (Rosa muted)
- **Surface**: #FEF7FF (Blanco cálido)
- **Error**: #B3261E (Rojo de error)

## 🚀 Cómo usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador
2. **Explorar productos**: Navega por las diferentes categorías
3. **Buscar**: Usa la barra de búsqueda o Ctrl+K
4. **Agregar al carrito**: Haz clic en "Agregar al carrito"
5. **Ver carrito**: Haz clic en el icono del carrito o Ctrl+B

## 📱 Funcionalidades móviles

- **Swipe gestures**: Desliza para abrir/cerrar menú lateral
- **Touch-friendly**: Botones y areas táctiles optimizadas
- **Responsive images**: Imágenes que se adaptan al dispositivo
- **Viewport optimized**: Meta tags para móviles

## ⚙️ Configuración avanzada

### Personalizar colores
Modifica las variables CSS en `styles.css`:

```css
:root {
    --md-sys-color-primary: #TU_COLOR;
    --md-sys-color-secondary: #TU_COLOR;
    /* ... más colores */
}
```

### Agregar productos
Edita el array `products` en `script.js`:

```javascript
{
    id: 13,
    title: 'Tu Producto',
    category: 'tu_categoria',
    price: 999,
    image: 'images/tu-imagen.webp',
    // ... más propiedades
}
```

### Personalizar categorías
Actualiza las categorías en `index.html` y `getCategoryName()` en `script.js`.

## 🔧 Características técnicas

- **Performance**: Lazy loading de imágenes
- **Accessibility**: ARIA labels y navegación por teclado
- **SEO Ready**: Meta tags y estructura semántica
- **Progressive Enhancement**: Funciona sin JavaScript
- **Error Handling**: Fallbacks para imágenes y errores

## 📞 Soporte

El proyecto incluye:
- ✅ Detección de conexión online/offline
- ✅ Manejo de errores de imágenes
- ✅ Estados de carga
- ✅ Notificaciones (Snackbars)
- ✅ Validación de datos

## 🚀 Mejoras futuras

- [ ] PWA (Progressive Web App)
- [ ] Service Worker para cache
- [ ] Integración con APIs reales
- [ ] Sistema de usuarios
- [ ] Pasarela de pagos
- [ ] Modo oscuro automático
- [ ] Internacionalización (i18n)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**TechStore** - Una experiencia de compra moderna con Material Design 3 ⚡