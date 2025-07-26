

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
    const cifrasContainer = document.querySelector('.cifras-contenedor');
    const optionsContainer = document.querySelector('.options-contenedor');

    body.classList.toggle('modo-oscuro');
    body.classList.toggle('modo-claro');

    loginContainer.classList.toggle('modo-oscuro');
    loginContainer.classList.toggle('modo-claro');

    cifrasContainer.classList.toggle('modo-oscuro');
    cifrasContainer.classList.toggle('modo-claro');

    optionsContainer.classList.toggle('modo-oscuro');
    optionsContainer.classList.toggle('modo-claro');

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

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'claro';
    const body = document.body;
    const loginContainer = document.querySelector('.login-contenedor');
    const cifrasContainer = document.querySelector('.cifras-contenedor');
    const optionsContainer = document.querySelector('.opciones-contenedor');
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
        loginContainer.classList.add('modo-oscuro');
        loginContainer.classList.remove('modo-claro');
        cifrasContainer.classList.add('modo-oscuro');
        cifrasContainer.classList.remove('modo-claro');
        optionsContainer.classList.add('modo-oscuro');
        optionsContainer.classList.remove('modo-claro');
        
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

        btnModo.classList.add('modo-oscuro');
        btnModo.classList.remove('modo-claro');

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

        btnModo.textContent = '🔦';
    } else {
        body.classList.add('modo-claro');
        body.classList.remove('modo-oscuro');
        loginContainer.classList.add('modo-claro');
        loginContainer.classList.remove('modo-oscuro');
        cifrasContainer.classList.add('modo-claro');
        cifrasContainer.classList.remove('modo-oscuro');
        optionsContainer.classList.add('modo-claro');
        optionsContainer.classList.remove('modo-oscuro');
        
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

        btnModo.classList.add('modo-claro');
        btnModo.classList.remove('modo-oscuro');

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

        btnModo.textContent = '🌚';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    // Obtener usuarios del localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar usuario (puede ser por username o email)
    const user = users.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password
    );
    
    if (user) {
        // Guardar usuario logueado en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleModeButton');
    const loginForm = document.getElementById('loginForm');

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    applySavedTheme();
    

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
    }
});