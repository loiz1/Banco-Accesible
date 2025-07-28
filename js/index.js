// === FUNCIONALIDAD DE LA APLICACIÓN BANCARIA ===

// === VARIABLES GLOBALES ===
let currentUser = null;
let movimientos = [];

// === FUNCIONES DE INICIALIZACIÓN ===

function initApp() {
    loadUserData();
    updateUserInfo();
    loadMovimientos();
    updateMovimientosLista();
    setupEventListeners();
}

function loadUserData() {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (loggedInUserStr) {
        try {
            currentUser = JSON.parse(loggedInUserStr);
            // Asegurar que el usuario tenga un saldo y número de cuenta
            if (typeof currentUser.balance === 'undefined') {
                currentUser.balance = 0;
            }
            if (typeof currentUser.accountNumber === 'undefined') {
                // Generar un número de cuenta aleatorio si no existe
                currentUser.accountNumber = Math.floor(100000 + Math.random() * 900000).toString();
            }
        } catch (e) {
            console.error("Error al parsear los datos del usuario:", e);
        }
    }
}

/**
 * Guarda los datos del usuario en localStorage.
 */
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
    }
}

/**
 * Carga los movimientos del usuario desde localStorage.
 */
function loadMovimientos() {
    if (currentUser && currentUser.id) {
        const movimientosStr = localStorage.getItem(`movimientos_${currentUser.id}`);
        if (movimientosStr) {
            try {
                movimientos = JSON.parse(movimientosStr);
            } catch (e) {
                console.error("Error al parsear los movimientos:", e);
                movimientos = [];
            }
        } else {
            movimientos = [];
        }
    }
}
function saveMovimientos() {
    if (currentUser && currentUser.id) {
        localStorage.setItem(`movimientos_${currentUser.id}`, JSON.stringify(movimientos));
    }
}

// === FUNCIONES DE ACTUALIZACIÓN DE LA UI ===
function updateUserInfo() {
    if (currentUser) {
        document.getElementById('username-display').textContent = currentUser.names || 'Usuario';
        document.getElementById('account-display').textContent = `#${currentUser.accountNumber || 'XXXXXX'}`;
        document.getElementById('balance-display').textContent = `$${parseFloat(currentUser.balance || 0).toFixed(2)}`;
    }
}

function updateMovimientosLista() {
    const lista = document.getElementById('movimientos-lista');
    lista.innerHTML = '';

    if (movimientos.length === 0) {
        lista.innerHTML = '<li class="list-group-item bg-transparent text-center text-muted">No hay movimientos registrados.</li>';
        return;
    }

    // Mostrar solo los últimos movimientos 
    const ultimosMovimientos = movimientos.slice(-8).reverse();

    ultimosMovimientos.forEach(mov => {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-transparent d-flex justify-content-between align-items-center';
        
        const badgeClass = mov.tipo === 'ingreso' ? 'bg-success' : 'bg-danger';
        const signo = mov.tipo === 'ingreso' ? '+' : '-';
        
        li.innerHTML = `
            <div>
                <span class="badge ${badgeClass}">${mov.tipo === 'ingreso' ? 'Ingreso' : 'Retiro'}</span>
                <small class="ms-2">${new Date(mov.fecha).toLocaleDateString()}</small>
            </div>
            <span>${signo}$${parseFloat(mov.monto).toFixed(2)}</span>
        `;
        lista.appendChild(li);
    });
}

/**
 * Genera y muestra el contenido del extracto completo en el modal.
 */
function generarExtracto() {
    const contenido = document.getElementById('extracto-contenido');
    
    if (!currentUser) {
        contenido.innerHTML = '<p class="text-danger">Error: No se encontró información del usuario.</p>';
        return;
    }

    let totalIngresos = 0;
    let totalRetiros = 0;

    movimientos.forEach(mov => {
        if (mov.tipo === 'ingreso') {
            totalIngresos += parseInt(mov.monto);
        } else if (mov.tipo === 'retiro') {
            totalRetiros += parseInt(mov.monto);
        }
    });

    const saldoActual = parseInt(currentUser.balance || 0);

    // Crear contenido del extracto
    contenido.innerHTML = `
        <div class="extracto-header">
            <h3>Bancafé - Extracto de Cuenta</h3>
            <p>Fecha de generación: ${new Date().toLocaleString()}</p>
        </div>
        <div class="extracto-summary">
            <h6><strong>Usuario:</strong> ${currentUser.username || 'N/A'}</h6>
            <h6><strong>Número de Cuenta:</strong> #${currentUser.accountNumber || 'N/A'}</h6>
            <hr>
            <h6><strong>Total de Ingresos:</strong> <span class="text-success">+$${totalIngresos.toFixed(2)}</span></h6>
            <h6><strong>Total de Retiros:</strong> <span class="text-danger">-$${totalRetiros.toFixed(2)}</span></h6>
            <hr>
            <h5><strong>Saldo Actual:</strong> $${saldoActual.toFixed(2)}</h5>
        </div>
        <div class="extracto-movimientos">
            <h4>Detalle de Movimientos (${movimientos.length})</h4>
            <div class="movimientos-list">
    `;

    if (movimientos.length === 0) {
        contenido.innerHTML += '<p class="text-muted">No hay movimientos registrados.</p>';
    } else {
        movimientos.slice().reverse().forEach(mov => {
            const tipoClass = mov.tipo === 'ingreso' ? 'ingreso' : 'retiro';
            const signo = mov.tipo === 'ingreso' ? '+' : '-';
            contenido.innerHTML += `
                <div class="movimiento-item d-flex justify-content-between align-items-center">
                    <div>
                        <span class="movimiento-tipo ${tipoClass}">${mov.tipo === 'ingreso' ? 'Ingreso' : 'Retiro'}</span>
                        <div class="movimiento-fecha">${new Date(mov.fecha).toLocaleString()}</div>
                    </div>
                    <span class="movimiento-monto ${tipoClass}">${signo}$${parseFloat(mov.monto).toFixed(2)}</span>
                </div>
            `;
        });
    }

    contenido.innerHTML += `
            </div>
        </div>
    `;
}

// === FUNCIONES DE MANEJO DE EVENTOS ===

function setupEventListeners() {
    // Formulario de transacción
    const formTransaccion = document.getElementById('transaccion-form');
    if (formTransaccion) {
        formTransaccion.addEventListener('submit', handleTransaccion);
    }

    const btnVerExtracto = document.getElementById('btn-ver-extracto');
    if (btnVerExtracto) {
        btnVerExtracto.addEventListener('click', generarExtracto);
    }

    // Botón para descargar PDF
    const btnDescargarPdf = document.getElementById('btn-descargar-pdf');
    if (btnDescargarPdf) {
        btnDescargarPdf.addEventListener('click', descargarPDF);
    }

    const formChangeUser = document.getElementById('form-change-user-data');
    if (formChangeUser) {
        formChangeUser.addEventListener('submit', handleChangeUser);
    }

    const formChangePassword = document.getElementById('form-change-password-data');
    if (formChangePassword) {
        formChangePassword.addEventListener('submit', handleChangePassword);
    }

    // Botón para mostrar/ocultar formulario de transacción
    const btnTransaccion = document.getElementById('btn-realizar-transaccion');
    if (btnTransaccion) {
        btnTransaccion.addEventListener('click', function() {
            toggleForm('form-transaccion');
        });
    }

    const btnChangeUserMain = document.getElementById('btn-change-user');
    const btnChangePasswordMain = document.getElementById('btn-change-password');

    if (btnChangeUserMain) {
        btnChangeUserMain.addEventListener('click', function() {
            toggleForm('form-change-user', 'form-change-password');
        });
    }

    if (btnChangePasswordMain) {
        btnChangePasswordMain.addEventListener('click', function() {
            toggleForm('form-change-password', 'form-change-user');
        });
    }
    // Botón para cerrar sesión
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        }
    });
}

    document.addEventListener('click', function(event) {
        const forms = document.querySelectorAll('.hidden-form');
        const buttons = document.querySelectorAll('#btn-realizar-transaccion, #btn-change-user, #btn-change-password');
        
        let clickedInside = false;
        
        forms.forEach(form => {
            if (form.contains(event.target) || 
                Array.from(buttons).some(btn => btn === event.target)) {
                clickedInside = true;
            }
        });
        
        if (!clickedInside) {
            forms.forEach(form => {
                if (form.style.display === 'block') {
                    form.style.display = 'none';
                }
            });
        }
    });
}

function handleTransaccion(event) {
    event.preventDefault();
    
    const tipo = document.getElementById('tipo-transaccion').value;
    const montoInput = document.getElementById('monto');
    const monto = parseFloat(montoInput.value);

    if (isNaN(monto) || monto <= 0) {
        alert('Por favor, ingrese un monto válido.');
        return;
    }

    if (!currentUser) {
        alert('Error: No se encontró información del usuario.');
        return;
    }

    // Validar saldo para retiros
    if (tipo === 'retiro' && monto > parseFloat(currentUser.balance || 0)) {
        alert('Saldo insuficiente para realizar el retiro.');
        return;
    }

    // Actualizar saldo
    if (tipo === 'ingreso') {
        currentUser.balance = (parseFloat(currentUser.balance || 0) + monto).toFixed(2);
    } else if (tipo === 'retiro') {
        currentUser.balance = (parseFloat(currentUser.balance || 0) - monto).toFixed(2);
    }

    // Registrar movimiento
    const nuevoMovimiento = {
        id: Date.now(),
        tipo: tipo,
        monto: monto.toFixed(2),
        fecha: new Date().toISOString()
    };
    movimientos.push(nuevoMovimiento);

    saveUserData();
    saveMovimientos();

    updateUserInfo();
    updateMovimientosLista();

    montoInput.value = '';
    closeForm('form-transaccion'); 
    alert(`Transacción de ${tipo === 'ingreso' ? 'ingreso' : 'retiro'} realizada con éxito.`);
}

/**
 * Maneja el cambio de nombre de usuario.
 */
function handleChangeUser(event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value.trim();

    if (!newUsername) {
        alert('Por favor, ingrese un nuevo nombre de usuario.');
        return;
    }

    if (currentUser) {
        currentUser.username = newUsername;
        saveUserData();
        updateUserInfo();
        document.getElementById('new-username').value = '';
        closeForm('form-change-user');
        alert('Nombre de usuario actualizado con éxito.');
    }
}

/**
 * Maneja el cambio de contraseña.
 */
function handleChangePassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (!currentPassword || !newPassword) {
        alert('Por favor, complete ambos campos de contraseña.');
        return;
    }

    if (currentUser && currentUser.password === currentPassword) {
        currentUser.password = newPassword;
        saveUserData();
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        closeForm('form-change-password');
        alert('Contraseña actualizada con éxito.');
    } else {
        alert('La contraseña actual es incorrecta.');
    }
}

function toggleForm(formToShow, formToHide) {
    const form1 = document.getElementById(formToShow);
    const form2 = document.getElementById(formToHide);
    
    if (form1) {
        if (form1.style.display === 'block') {
            form1.style.display = 'none';
        } else {
            form1.style.display = 'block';
            if (form2) {
                form2.style.display = 'none';
            }
        }
    }
}

/**
 * Función para cerrar formularios.
 */
function closeForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = 'none';
    }
}

/**
 * Función para alternar el modo claro/oscuro.
 */
function toggleMode() {
    const body = document.body;
    const loginContainer = document.querySelector('.login-contenedor');
    const formControls = document.querySelectorAll('.form-control');
    const btnPrincipal = document.querySelector('.btn-principal');
    const btnSecundario = document.querySelectorAll('.btn-secundario');
    const btnModo = document.getElementById('toggleModeButton');
    const headings = document.querySelectorAll('h1');
    const paragraphs = document.querySelectorAll('p');
    const links = document.querySelectorAll('a');
    const movimientosContainer = document.querySelector('.movimientos-contenedor');
    const optionsContainer = document.querySelector('.options-contenedor');

    body.classList.toggle('modo-oscuro');
    body.classList.toggle('modo-claro');

    if (loginContainer) {
        loginContainer.classList.toggle('modo-oscuro');
        loginContainer.classList.toggle('modo-claro');
    }

    if (movimientosContainer) {
        movimientosContainer.classList.toggle('modo-oscuro');
        movimientosContainer.classList.toggle('modo-claro');
    }

    if (optionsContainer) {
        optionsContainer.classList.toggle('modo-oscuro');
        optionsContainer.classList.toggle('modo-claro');
    }

    formControls.forEach(control => {
        control.classList.toggle('modo-oscuro');
        control.classList.toggle('modo-claro');
    });

    if (btnPrincipal) {
        btnPrincipal.classList.toggle('modo-oscuro');
        btnPrincipal.classList.toggle('modo-claro');
    }

    btnSecundario.forEach(btn => {
        btn.classList.toggle('modo-oscuro');
        btn.classList.toggle('modo-claro');
    });

    btnModo.classList.toggle('modo-oscuro');
    btnModo.classList.toggle('modo-claro');

    headings.forEach(heading => {
        heading.classList.toggle('modo-oscuro');
        heading.classList.toggle('modo-claro');
    });

    paragraphs.forEach(paragraph => {
        paragraph.classList.toggle('modo-oscuro');
        paragraph.classList.toggle('modo-claro');
    });

    links.forEach(link => {
        link.classList.toggle('modo-oscuro');
        link.classList.toggle('modo-claro');
    });

    if (body.classList.contains('modo-oscuro')) {
        btnModo.textContent = '🔦';
        localStorage.setItem('theme', 'oscuro');
    } else {
        btnModo.textContent = '🌚';
        localStorage.setItem('theme', 'claro');
    }
}

/**
 * Aplica el tema guardado al cargar la página.
 */
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'claro';
    const body = document.body;
    const loginContainer = document.querySelector('.login-contenedor');
    const movimientosContainer = document.querySelector('.movimientos-contenedor');
    const optionsContainer = document.querySelector('.options-contenedor');
    const formControls = document.querySelectorAll('.form-control');
    const btnPrincipal = document.querySelector('.btn-principal');
    const btnSecundario = document.querySelectorAll('.btn-secundario');
    const btnModo = document.getElementById('toggleModeButton');
    const headings = document.querySelectorAll('h1');
    const paragraphs = document.querySelectorAll('p');
    const links = document.querySelectorAll('a');

    if (savedTheme === 'oscuro') {
        body.classList.add('modo-oscuro');
        body.classList.remove('modo-claro');
        
        if (loginContainer) {
            loginContainer.classList.add('modo-oscuro');
            loginContainer.classList.remove('modo-claro');
        }
        
        if (movimientosContainer) {
            movimientosContainer.classList.add('modo-oscuro');
            movimientosContainer.classList.remove('modo-claro');
        }
        
        if (optionsContainer) {
            optionsContainer.classList.add('modo-oscuro');
            optionsContainer.classList.remove('modo-claro');
        }
        
        formControls.forEach(control => {
            control.classList.add('modo-oscuro');
            control.classList.remove('modo-claro');
        });

        if (btnPrincipal) {
            btnPrincipal.classList.add('modo-oscuro');
            btnPrincipal.classList.remove('modo-claro');
        }

        btnSecundario.forEach(btn => {
            btn.classList.add('modo-oscuro');
            btn.classList.remove('modo-claro');
        });

        if (btnModo) {
            btnModo.classList.add('modo-oscuro');
            btnModo.classList.remove('modo-claro');
            btnModo.textContent = '🔦';
        }

        headings.forEach(heading => {
            heading.classList.add('modo-oscuro');
            heading.classList.remove('modo-claro');
        });

        paragraphs.forEach(paragraph => {
            paragraph.classList.add('modo-oscuro');
            paragraph.classList.remove('modo-claro');
        });

        links.forEach(link => {
            link.classList.add('modo-oscuro');
            link.classList.remove('modo-claro');
        });

    } else {
        body.classList.add('modo-claro');
        body.classList.remove('modo-oscuro');
        
        if (loginContainer) {
            loginContainer.classList.add('modo-claro');
            loginContainer.classList.remove('modo-oscuro');
        }
        
        if (movimientosContainer) {
            movimientosContainer.classList.add('modo-claro');
            movimientosContainer.classList.remove('modo-oscuro');
        }
        
        if (optionsContainer) {
            optionsContainer.classList.add('modo-claro');
            optionsContainer.classList.remove('modo-oscuro');
        }
        
        formControls.forEach(control => {
            control.classList.add('modo-claro');
            control.classList.remove('modo-oscuro');
        });

        if (btnPrincipal) {
            btnPrincipal.classList.add('modo-claro');
            btnPrincipal.classList.remove('modo-oscuro');
        }

        btnSecundario.forEach(btn => {
            btn.classList.add('modo-claro');
            btn.classList.remove('modo-oscuro');
        });

        if (btnModo) {
            btnModo.classList.add('modo-claro');
            btnModo.classList.remove('modo-oscuro');
            btnModo.textContent = '🌚';
        }

        headings.forEach(heading => {
            heading.classList.add('modo-claro');
            heading.classList.remove('modo-oscuro');
        });

        paragraphs.forEach(paragraph => {
            paragraph.classList.add('modo-claro');
            paragraph.classList.remove('modo-oscuro');
        });

        links.forEach(link => {
            link.classList.add('modo-claro');
            link.classList.remove('modo-oscuro');
        });
    }
}

/**
 * Función para descargar el contenido del extracto como PDF.
 */
function descargarPDF() {
    const contenido = document.getElementById('extracto-contenido');
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        alert('Error: No se pudieron cargar las librerías necesarias para la descarga.');
        return;
    }

    html2canvas(contenido, {
        scale: 2, 
        useCORS: true,
        backgroundColor: document.body.classList.contains('modo-oscuro') ? '#032e36' : '#bcb49a'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; 
        const pageHeight = 280;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 10; 
        
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        const fecha = new Date().toISOString().slice(0, 10);
        pdf.save(`extracto_bancafe_${fecha}.pdf`);
    }).catch(error => {
        console.error('Error al generar el PDF:', error);
        alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initApp();
    applySavedTheme();
    
    const toggleButton = document.getElementById('toggleModeButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }
});