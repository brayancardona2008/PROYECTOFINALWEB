// Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navList = document.querySelector(".nav-list")
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active")
    this.classList.toggle("active")
  })
}

// Close nav when clicking a link
document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navList) navList.classList.remove("active")
    if (menuToggle) menuToggle.classList.remove("active")
  })
})

// Alert banner visible solo en agosto (8) y febrero (2)
function checkPaymentPeriod() {
  const currentMonth = new Date().getMonth() + 1
  const alertBanner = document.getElementById("alertBanner")
  if (!alertBanner) return
  if (currentMonth === 8 || currentMonth === 2) {
    alertBanner.classList.add("active")
  } else {
    alertBanner.classList.remove("active")
  }
}

const alertClose = document.getElementById("alertClose")
if (alertClose) {
  alertClose.addEventListener("click", () => {
    document.getElementById("alertBanner").style.display = "none"
  })
}

// Simple scroll smooth
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href === "#") return
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
})

// Generar logo abeja SVG
function generateBeeLogo() {
  const logos = document.querySelectorAll("#logo, .login-logo")
  const beeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="20" fill="#FFD700"/>
            <ellipse cx="35" cy="45" rx="8" ry="15" fill="#87CEEB" opacity="0.6"/>
            <ellipse cx="65" cy="45" rx="8" ry="15" fill="#87CEEB" opacity="0.6"/>
            <rect x="45" y="45" width="10" height="3" fill="#000"/>
            <rect x="45" y="52" width="10" height="3" fill="#000"/>
            <rect x="45" y="59" width="10" height="3" fill="#000"/>
            <circle cx="45" cy="32" r="2" fill="#000"/>
            <circle cx="55" cy="32" r="2" fill="#000"/>
            <path d="M 45 38 Q 50 40 55 38" stroke="#000" fill="none" stroke-width="1.5"/>
        </svg>
    `
  logos.forEach((logo) => {
    if (logo) logo.innerHTML = beeSVG
  })
}

// Login Form
const loginForm = document.getElementById("loginForm")
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const curp = document.getElementById("curp").value
    const numeroControl = document.getElementById("numeroControl").value
    const password = document.getElementById("password").value

    // Validación simple
    if (curp.length === 18 && numeroControl.length === 8 && password.length >= 6) {
      // Guardar sesión
      sessionStorage.setItem("userLoggedIn", "true")
      sessionStorage.setItem("userCurp", curp)
      sessionStorage.setItem("userControl", numeroControl)

      alert("¡Inicio de sesión exitoso! Bienvenido al portal.")
      window.location.href = "servicios.html"
    } else {
      alert(
        "Por favor verifica tus datos. Asegúrate de que el CURP tenga 18 caracteres, el número de control 8 dígitos y la contraseña al menos 6 caracteres.",
      )
    }
  })
}

// Boleta de Calificaciones
const boletaForm = document.getElementById("boletaForm")
if (boletaForm) {
  boletaForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("[v0] Generando boleta de calificaciones...")

    const curp = document.getElementById("boletaCurp").value
    const control = document.getElementById("boletaControl").value
    const semestre = document.getElementById("boletaSemestre").value
    const periodo = document.getElementById("boletaPeriodo").value

    const nombre = generarNombre(curp)
    const materias = [
      { nombre: "Matemáticas", calificacion: 85, faltas: 2, estado: "Aprobado" },
      { nombre: "Física", calificacion: 90, faltas: 1, estado: "Aprobado" },
      { nombre: "Química", calificacion: 88, faltas: 0, estado: "Aprobado" },
      { nombre: "Inglés", calificacion: 92, faltas: 1, estado: "Aprobado" },
      { nombre: "Programación", calificacion: 95, faltas: 0, estado: "Aprobado" },
      { nombre: "Historia", calificacion: 87, faltas: 3, estado: "Aprobado" },
    ]

    // Mostrar resultados
    document.getElementById("boletaNombre").textContent = nombre
    document.getElementById("boletaCurpDisplay").textContent = curp
    document.getElementById("boletaControlDisplay").textContent = control
    document.getElementById("boletaSemestreDisplay").textContent = semestre + "° Semestre"

    const tbody = document.getElementById("boletaGrades")
    tbody.innerHTML = ""
    materias.forEach((materia) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
                <td>${materia.nombre}</td>
                <td><strong>${materia.calificacion}</strong></td>
                <td>${materia.faltas}</td>
                <td><span style="color: ${materia.estado === "Aprobado" ? "var(--success-color)" : "var(--danger-color)"}">${materia.estado}</span></td>
            `
      tbody.appendChild(tr)
    })

    const resultDiv = document.getElementById("boletaResult")
    resultDiv.style.display = "block"
    console.log("[v0] Boleta generada exitosamente")
    resultDiv.scrollIntoView({ behavior: "smooth" })
  })
}

// Certificado
const certificadoForm = document.getElementById("certificadoForm")
if (certificadoForm) {
  certificadoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const folio = "CERT-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    const fechaEntrega = new Date()
    fechaEntrega.setDate(fechaEntrega.getDate() + 5)

    document.getElementById("certFolio").textContent = folio
    document.getElementById("certFecha").textContent = fechaEntrega.toLocaleDateString("es-MX")

    document.getElementById("certificadoResult").style.display = "block"
    document.getElementById("certificadoResult").scrollIntoView({ behavior: "smooth" })
  })
}

// Constancia
const constanciaForm = document.getElementById("constanciaForm")
if (constanciaForm) {
  constanciaForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const curp = document.getElementById("constCurp").value
    const control = document.getElementById("constControl").value
    const semestre = document.getElementById("constSemestre").value
    const nombre = generarNombre(curp)
    const folio = "CONST-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    document.getElementById("constNombre").textContent = nombre
    document.getElementById("constCurpDisplay").textContent = curp
    document.getElementById("constControlDisplay").textContent = control
    document.getElementById("constSemestreDisplay").textContent = semestre + "° Semestre"
    document.getElementById("constFecha").textContent = new Date().toLocaleDateString("es-MX")
    document.getElementById("constFolio").textContent = folio

    document.getElementById("constanciaResult").style.display = "block"
    document.getElementById("constanciaResult").scrollIntoView({ behavior: "smooth" })
  })
}

// Historial Académico
const historialForm = document.getElementById("historialForm")
if (historialForm) {
  historialForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const curp = document.getElementById("histCurp").value
    const control = document.getElementById("histControl").value
    const nombre = generarNombre(curp)

    document.getElementById("histNombre").textContent = nombre
    document.getElementById("histCurpDisplay").textContent = curp
    document.getElementById("histControlDisplay").textContent = control
    document.getElementById("histPromedio").textContent = "8.9"

    const semestres = [
      { num: 1, materias: ["Matemáticas I", "Química I", "Inglés I", "TIC I"], promedio: 8.5 },
      { num: 2, materias: ["Matemáticas II", "Química II", "Inglés II", "TIC II"], promedio: 8.8 },
      { num: 3, materias: ["Física I", "Biología", "Inglés III", "Programación I"], promedio: 9.0 },
      { num: 4, materias: ["Física II", "Cálculo", "Inglés IV", "Programación II"], promedio: 9.2 },
    ]

    const container = document.getElementById("historialSemestres")
    container.innerHTML = ""

    semestres.forEach((sem) => {
      const div = document.createElement("div")
      div.className = "student-info"
      div.style.marginBottom = "1.5rem"
      div.innerHTML = `
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">${sem.num}° Semestre - Promedio: ${sem.promedio}</h4>
                <ul style="list-style: none; padding-left: 0;">
                    ${sem.materias.map((m) => `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">✓ ${m}</li>`).join("")}
                </ul>
            `
      container.appendChild(div)
    })

    document.getElementById("historialResult").style.display = "block"
    document.getElementById("historialResult").scrollIntoView({ behavior: "smooth" })
  })
}

// Referencia de Pago
const referenciaForm = document.getElementById("referenciaForm")
if (referenciaForm) {
  referenciaForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const curp = document.getElementById("refCurp").value
    const concepto = document.getElementById("refConcepto").value
    const nombre = generarNombre(curp)
    const referencia = Math.floor(Math.random() * 9000000000000) + 1000000000000

    const montos = {
      inscripcion: "$1,500.00",
      reinscripcion: "$800.00",
      certificado: "$350.00",
      constancia: "$150.00",
    }

    const conceptos = {
      inscripcion: "Inscripción",
      reinscripcion: "Reinscripción",
      certificado: "Certificado de Estudios",
      constancia: "Constancia",
    }

    const vigencia = new Date()
    vigencia.setDate(vigencia.getDate() + 30)

    document.getElementById("refNumero").textContent = referencia
    document.getElementById("refNombre").textContent = nombre
    document.getElementById("refConceptoDisplay").textContent = conceptos[concepto]
    document.getElementById("refMonto").textContent = montos[concepto]
    document.getElementById("refVigencia").textContent = vigencia.toLocaleDateString("es-MX")

    document.getElementById("referenciaResult").style.display = "block"
    document.getElementById("referenciaResult").scrollIntoView({ behavior: "smooth" })
  })
}

// Pago en Línea
const pagoForm = document.getElementById("pagoForm")
const pagoMetodo = document.getElementById("pagoMetodo")
const tarjetaFields = document.getElementById("tarjetaFields")

if (pagoMetodo) {
  pagoMetodo.addEventListener("change", function () {
    if (this.value === "tarjeta") {
      tarjetaFields.style.display = "block"
      document.getElementById("pagoTarjeta").required = true
      document.getElementById("pagoVencimiento").required = true
      document.getElementById("pagoCvv").required = true
    } else {
      tarjetaFields.style.display = "none"
      document.getElementById("pagoTarjeta").required = false
      document.getElementById("pagoVencimiento").required = false
      document.getElementById("pagoCvv").required = false
    }
  })
}

if (pagoForm) {
  pagoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const concepto = document.getElementById("pagoConcepto").value
    const metodo = document.getElementById("pagoMetodo").value
    const folio = "PAG-" + Math.random().toString(36).substr(2, 12).toUpperCase()

    const montos = {
      inscripcion: "$1,500.00",
      reinscripcion: "$800.00",
      certificado: "$350.00",
      constancia: "$150.00",
    }

    const conceptos = {
      inscripcion: "Inscripción",
      reinscripcion: "Reinscripción",
      certificado: "Certificado de Estudios",
      constancia: "Constancia",
    }

    const metodos = {
      tarjeta: "Tarjeta de Crédito/Débito",
      oxxo: "OXXO",
      transferencia: "Transferencia SPEI",
    }

    document.getElementById("pagoFolio").textContent = folio
    document.getElementById("pagoFecha").textContent = new Date().toLocaleString("es-MX")
    document.getElementById("pagoConceptoDisplay").textContent = conceptos[concepto]
    document.getElementById("pagoMontoDisplay").textContent = montos[concepto]
    document.getElementById("pagoMetodoDisplay").textContent = metodos[metodo]

    document.getElementById("pagoResult").style.display = "block"
    document.getElementById("pagoResult").scrollIntoView({ behavior: "smooth" })
  })
}

// Funciones auxiliares
function generarNombre(curp) {
  const nombres = ["Juan Carlos", "María Fernanda", "Luis Alberto", "Ana Patricia", "José Miguel", "Laura Sofía"]
  const apellidos = ["García López", "Martínez Rodríguez", "Hernández Pérez", "González Sánchez", "Ramírez Torres"]
  return (
    nombres[Math.floor(Math.random() * nombres.length)] + " " + apellidos[Math.floor(Math.random() * apellidos.length)]
  )
}

function downloadPDF(tipo) {
  alert("Generando PDF de " + tipo + "... Esta función estará disponible próximamente.")
}

// Funciones para descuentos
function aplicarPromocion(promo) {
  alert('Promoción "' + promo + '" aplicada correctamente. Serás redirigido al formulario de pago.')
  window.location.href = "servicios.html#pago"
}

function copiarCupon(codigo) {
  navigator.clipboard
    .writeText(codigo)
    .then(() => {
      alert('Cupón "' + codigo + '" copiado al portapapeles. Úsalo al realizar tu pago.')
    })
    .catch(() => {
      alert("Cupón: " + codigo + " - Cópialo manualmente")
    })
}

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  checkPaymentPeriod()
  generateBeeLogo()
})

// Carrito de compras simulado
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cbtis-carrito');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cbtis-carrito', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(name, price, id) {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: id,
                name: name,
                price: parseFloat(price) || 0,
                quantity: 1
            });
        }
        this.saveCart();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getIva() {
        return this.getSubtotal() * 0.16;
    }

    getTotal() {
        return this.getSubtotal() + this.getIva();
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const subtotalDisplay = document.getElementById('subtotalDisplay');
        const ivaDisplay = document.getElementById('ivaDisplay');
        const totalDisplay = document.getElementById('totalDisplay');

        if (!cartCount) return;

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
                    </div>
                    <p class="cart-item-price">$${item.price.toFixed(2)} MXN</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" onchange="updateCartQuantity('${item.id}', this.value)" min="1">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <span style="margin-left: auto; font-weight: 600; color: var(--primary-color);">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
        }

        const subtotal = this.getSubtotal();
        const iva = this.getIva();
        const total = this.getTotal();

        subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
        ivaDisplay.textContent = `$${iva.toFixed(2)}`;
        totalDisplay.textContent = `$${total.toFixed(2)}`;
    }
}

// Productos disponibles
const products = [
    { id: 'boleta', name: 'Boleta de Calificaciones', price: 'Gratuito', description: 'Consulta y descarga tus calificaciones' },
    { id: 'certificado', name: 'Certificado de Estudios', price: '$350.00 MXN', description: 'Certificado oficial de bachillerato' },
    { id: 'constancia', name: 'Constancia de Estudios', price: '$150.00 MXN', description: 'Constancia oficial para trámites' },
    { id: 'historial', name: 'Historial Académico', price: 'Gratuito', description: 'Trayectoria completa de estudios' },
    { id: 'referencia', name: 'Referencia de Pago', price: 'Sin costo', description: 'Referencia bancaria Santander' },
    { id: 'kardex', name: 'Kardex Escolar', price: '$200.00 MXN', description: 'Documento oficial con historial' },
    { id: 'carta', name: 'Carta de Recomendación', price: '$100.00 MXN', description: 'Cartas para becas o empleo' },
    { id: 'credencial', name: 'Credencial Escolar', price: '$80.00 MXN', description: 'Reposición o renovación' },
    { id: 'pago', name: 'Pago en Línea', price: '$0.00 MXN', description: 'Realiza pagos seguros' }
];

let cart = null;

// Función para agregar productos al carrito
function addToCart(name, price, id) {
    if (!cart) {
        cart = new ShoppingCart();
    }
    cart.addItem(name, price, id);
    alert(`${name} agregado al carrito`);
    updateCartUI();
}

function removeFromCart(id) {
    if (cart) {
        cart.removeItem(id);
    }
}

function updateCartQuantity(id, quantity) {
    if (cart) {
        cart.updateQuantity(id, parseInt(quantity));
    }
}

function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function updateCartUI() {
    if (cart) {
        cart.updateCartUI();
    }
}

function proceedToCheckout() {
    if (!cart || cart.items.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = cart.getTotal();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Compra simulada:\n\n${itemCount} artículo(s)\nTotal: $${total.toFixed(2)} MXN\n\nSerás redirigido a pagos...`);
    window.location.href = 'servicios.html#pago';
}

// Inicialización del carrito
window.addEventListener("DOMContentLoaded", () => {
    checkPaymentPeriod();
    generateBeeLogo();
    cart = new ShoppingCart();
    updateCartUI();
});

// Agregar event listener para el botón de toggle del carrito
const cartToggleBtn = document.getElementById('cartToggleBtn');
if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCart);
}

// Cerrar carrito al hacer clic fuera
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    
    if (cartModal && !cartModal.contains(event.target) && event.target !== cartToggleBtn) {
        closeCart();
    }
});

// Agregar event listener para el botón de toggle del carrito
const cartToggleBtn = document.getElementById('cartToggleBtn');
if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCart);
}

// Cerrar carrito al hacer clic fuera
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    
    if (cartModal && !cartModal.contains(event.target) && event.target !== cartToggleBtn) {
        closeCart();
    }
});

function addToCart(name, price, id) {
    console.log('[v0] addToCart called:', name, price, id);
    
    if (!cart) {
        console.log('[v0] Initializing cart...');
        cart = new ShoppingCart();
    }
    
    cart.addItem(name, price, id);
    console.log('[v0] Cart items:', cart.items);
    
    // Show visual notification
    showNotification(`${name} agregado al carrito ✓`);
}

function removeFromCart(id) {
    console.log('[v0] removeFromCart called:', id);
    if (cart) {
        cart.removeItem(id);
    }
}

function updateCartQuantity(id, quantity) {
    console.log('[v0] updateCartQuantity called:', id, quantity);
    if (cart) {
        cart.updateQuantity(id, parseInt(quantity));
    }
}

function openCart() {
    console.log('[v0] openCart called');
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    console.log('[v0] closeCart called');
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

function updateCartUI() {
    if (cart) {
        cart.updateCartUI();
    }
}

function proceedToCheckout() {
    console.log('[v0] proceedToCheckout called');
    if (!cart || cart.items.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = cart.getTotal();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Compra simulada:\n\n${itemCount} artículo(s)\nTotal: $${total.toFixed(2)} MXN\n\n¡Gracias por tu compra!`);
    
    // Clear cart after purchase
    cart.items = [];
    cart.saveCart();
    closeCart();
}

function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cartNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cartNotification';
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navList = document.querySelector(".nav-list")
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active")
    this.classList.toggle("active")
  })
}

// Close nav when clicking a link
document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navList) navList.classList.remove("active")
    if (menuToggle) menuToggle.classList.remove("active")
  })
})

// Alert banner visible solo en agosto (8) y febrero (2)
function checkPaymentPeriod() {
  const currentMonth = new Date().getMonth() + 1
  const alertBanner = document.getElementById("alertBanner")
  if (!alertBanner) return
  if (currentMonth === 8 || currentMonth === 2) {
    alertBanner.classList.add("active")
  } else {
    alertBanner.classList.remove("active")
  }
}

const alertClose = document.getElementById("alertClose")
if (alertClose) {
  alertClose.addEventListener("click", () => {
    document.getElementById("alertBanner").style.display = "none"
  })
}

// Simple scroll smooth
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href === "#") return
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
})

// Generar logo abeja SVG
function generateBeeLogo() {
  const logos = document.querySelectorAll("#logo, .login-logo")
  const beeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="20" fill="#FFD700"/>
            <ellipse cx="35" cy="45" rx="8" ry="15" fill="#87CEEB" opacity="0.6"/>
            <ellipse cx="65" cy="45" rx="8" ry="15" fill="#87CEEB" opacity="0.6"/>
            <rect x="45" y="45" width="10" height="3" fill="#000"/>
            <rect x="45" y="52" width="10" height="3" fill="#000"/>
            <rect x="45" y="59" width="10" height="3" fill="#000"/>
            <circle cx="45" cy="32" r="2" fill="#000"/>
            <circle cx="55" cy="32" r="2" fill="#000"/>
            <path d="M 45 38 Q 50 40 55 38" stroke="#000" fill="none" stroke-width="1.5"/>
        </svg>
    `
  logos.forEach((logo) => {
    if (logo) logo.innerHTML = beeSVG
  })
}

// Login Form
const loginForm = document.getElementById("loginForm")
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const curp = document.getElementById("curp").value
    const numeroControl = document.getElementById("numeroControl").value
    const password = document.getElementById("password").value

    // Validación simple
    if (curp.length === 18 && numeroControl.length === 8 && password.length >= 6) {
      // Guardar sesión
      sessionStorage.setItem("userLoggedIn", "true")
      sessionStorage.setItem("userCurp", curp)
      sessionStorage.setItem("userControl", numeroControl)

      alert("¡Inicio de sesión exitoso! Bienvenido al portal.")
      window.location.href = "servicios.html"
    } else {
      alert(
        "Por favor verifica tus datos. Asegúrate de que el CURP tenga 18 caracteres, el número de control 8 dígitos y la contraseña al menos 6 caracteres.",
      )
    }
  })
}

// Funciones auxiliares
function generarNombre(curp) {
  const nombres = ["Juan Carlos", "María Fernanda", "Luis Alberto", "Ana Patricia", "José Miguel", "Laura Sofía"]
  const apellidos = ["García López", "Martínez Rodríguez", "Hernández Pérez", "González Sánchez", "Ramírez Torres"]
  return (
    nombres[Math.floor(Math.random() * nombres.length)] + " " + apellidos[Math.floor(Math.random() * apellidos.length)]
  )
}

function downloadPDF(tipo) {
  alert("Generando PDF de " + tipo + "... Esta función estará disponible próximamente.")
}

// Funciones para descuentos
function aplicarPromocion(promo) {
  alert('Promoción "' + promo + '" aplicada correctamente. Serás redirigido al formulario de pago.')
  window.location.href = "servicios.html#pago"
}

function copiarCupon(codigo) {
  navigator.clipboard
    .writeText(codigo)
    .then(() => {
      alert('Cupón "' + codigo + '" copiado al portapapeles. Úsalo al realizar tu pago.')
    })
    .catch(() => {
      alert("Cupón: " + codigo + " - Cópialo manualmente")
    })
}

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cbtis-carrito');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cbtis-carrito', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(name, price, id) {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: id,
                name: name,
                price: parseFloat(price) || 0,
                quantity: 1
            });
        }
        this.saveCart();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getIva() {
        return this.getSubtotal() * 0.16;
    }

    getTotal() {
        return this.getSubtotal() + this.getIva();
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const subtotalDisplay = document.getElementById('subtotalDisplay');
        const ivaDisplay = document.getElementById('ivaDisplay');
        const totalDisplay = document.getElementById('totalDisplay');

        if (!cartCount) return;

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
                    </div>
                    <p class="cart-item-price">$${item.price.toFixed(2)} MXN</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" onchange="updateCartQuantity('${item.id}', this.value)" min="1">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <span style="margin-left: auto; font-weight: 600; color: var(--primary-color);">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
        }

        const subtotal = this.getSubtotal();
        const iva = this.getIva();
        const total = this.getTotal();

        subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
        ivaDisplay.textContent = `$${iva.toFixed(2)}`;
        totalDisplay.textContent = `$${total.toFixed(2)}`;
    }
}

let cart = null;

window.addEventListener("DOMContentLoaded", () => {
    console.log('[v0] DOM Content Loaded - Initializing...');
    
    checkPaymentPeriod();
    generateBeeLogo();
    
    // Initialize shopping cart
    cart = new ShoppingCart();
    updateCartUI();
    console.log('[v0] Cart initialized with items:', cart.items);
    
    // Add event listener for cart toggle button
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCart();
        });
        console.log('[v0] Cart toggle button listener added');
    }
});

document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartModalContent = cartModal?.querySelector('.cart-modal-content');
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    
    // Close only if clicking outside the modal content and not on the toggle button
    if (cartModal && cartModal.classList.contains('active')) {
        if (!cartModalContent?.contains(event.target) && 
            !cartToggleBtn?.contains(event.target)) {
            closeCart();
        }
    }
});
