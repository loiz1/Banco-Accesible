// Función para alternar entre modos claro y oscuro
function toggleMode() {
    const body = document.body;
    const loginContainer = document.querySelector('.main-content');
    const formControls = document.querySelectorAll('.form-control');
    const btnPrincipal = document.querySelector('.btn-principal');
    const btnSecundario = document.querySelectorAll('.btn-secundario');
    const btnModo = document.getElementById('toggleModeButton');
    const headings = document.querySelectorAll('h1, h2');
    const paragraphs = document.querySelectorAll('p');
    const links = document.querySelectorAll('a');

    body.classList.toggle('modo-oscuro');
    body.classList.toggle('modo-claro');

    loginContainer.classList.toggle('modo-oscuro');
    loginContainer.classList.toggle('modo-claro');

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

    btnModo.textContent = body.classList.contains('modo-oscuro') ? '🔦' : '🌚';

    localStorage.setItem('theme', body.classList.contains('modo-oscuro') ? 'oscuro' : 'claro');
}

// Función para aplicar el tema guardado
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'claro';
    const body = document.body;
    const loginContainer = document.querySelector('.main-content');
    const formControls = document.querySelectorAll('.form-control');
    const btnPrincipal = document.querySelector('.btn-principal');
    const btnSecundario = document.querySelectorAll('.btn-secundario');
    const btnModo = document.getElementById('toggleModeButton');
    const headings = document.querySelectorAll('h1, h2');
    const paragraphs = document.querySelectorAll('p');
    const links = document.querySelectorAll('a');

    if (savedTheme === 'oscuro') {
        body.classList.add('modo-oscuro');
        body.classList.remove('modo-claro');
        loginContainer.classList.add('modo-oscuro');
        loginContainer.classList.remove('modo-claro');
        
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

        btnModo.textContent = '🔦';
    } else {
        body.classList.add('modo-claro');
        body.classList.remove('modo-oscuro');
        loginContainer.classList.add('modo-claro');
        loginContainer.classList.remove('modo-oscuro');
        
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

        btnModo.textContent = '🌚';
    }
}

// Función para mostrar el nombre del usuario
function showUserGreeting() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userGreeting = document.getElementById('userGreeting');
    
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const userName = user.names || user.username;
        userGreeting.textContent = `Hola, ${userName}!`;
    } else {
        window.location.href = 'login.html';
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// Evento para el botón de alternancia
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleModeButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }
    
    applySavedTheme();
    
    showUserGreeting();

    const currentModeElement = document.getElementById('currentMode');
    currentModeElement.textContent = document.body.classList.contains('modo-oscuro') ? 'Oscuro' : 'Claro';
});