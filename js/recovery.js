// Función para alternar entre modos claro y oscuro (misma que en welcome.js)
function toggleMode() {
    const body = document.body;
    const loginContainer = document.querySelector('.login-contenedor');
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

// Función para aplicar el tema guardado
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'claro';
    const body = document.body;
    const loginContainer = document.querySelector('.login-contenedor');
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

document.addEventListener('DOMContentLoaded', function() {
    const recoveryForm = document.getElementById('recoveryForm');
    const toggleButton = document.getElementById('toggleModeButton');
    const recoveryResult = document.getElementById('recoveryResult');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }
    
    // Aplicar tema guardado
    applySavedTheme();
    
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const identification = document.getElementById('recoveryIdentification').value;
            const email = document.getElementById('recoveryEmail').value;
            
            // Obtener usuarios
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Buscar usuario
            const user = users.find(u => 
                u.identification === identification && u.email === email
            );
            
            if (user) {
                recoveryResult.className = 'alert alert-success';
                recoveryResult.innerHTML = `
                    <strong>Usuario encontrado:</strong><br>
                    Nombre de usuario: ${user.username}<br>
                    Contraseña: ${user.password}
                `;
                recoveryResult.style.display = 'block';
            } else {
                recoveryResult.className = 'alert alert-danger';
                recoveryResult.textContent = 'No se encontró un usuario con esos datos';
                recoveryResult.style.display = 'block';
            }
        });
    }
});