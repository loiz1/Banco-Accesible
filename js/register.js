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

    // Toggle body class
    body.classList.toggle('modo-oscuro');
    body.classList.toggle('modo-claro');

    // Toggle container class
    if (loginContainer) {
        loginContainer.classList.toggle('modo-oscuro');
        loginContainer.classList.toggle('modo-claro');
    }

    // Toggle form controls
    formControls.forEach(control => {
        control.classList.toggle('modo-oscuro');
        control.classList.toggle('modo-claro');
    });

    // Toggle buttons
    if (btnPrincipal) {
        btnPrincipal.classList.toggle('modo-oscuro');
        btnPrincipal.classList.toggle('modo-claro');
    }

    btnSecundario.forEach(btn => {
        btn.classList.toggle('modo-oscuro');
        btn.classList.toggle('modo-claro');
    });

    // Toggle mode button
    if (btnModo) {
        btnModo.classList.toggle('modo-oscuro');
        btnModo.classList.toggle('modo-claro');
    }

    // Toggle headings
    headings.forEach(heading => {
        heading.classList.toggle('modo-oscuro');
        heading.classList.toggle('modo-claro');
    });

    // Toggle paragraphs
    paragraphs.forEach(paragraph => {
        paragraph.classList.toggle('modo-oscuro');
        paragraph.classList.toggle('modo-claro');
    });

    // Toggle links
    links.forEach(link => {
        link.classList.toggle('modo-oscuro');
        link.classList.toggle('modo-claro');
    });

    // Update button text and save preference
    if (body.classList.contains('modo-oscuro')) {
        if (btnModo) btnModo.textContent = '🔦';
        localStorage.setItem('theme', 'oscuro');
    } else {
        if (btnModo) btnModo.textContent = '🌚';
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

    // Apply saved theme
    if (savedTheme === 'oscuro') {
        body.classList.add('modo-oscuro');
        body.classList.remove('modo-claro');
        
        if (loginContainer) {
            loginContainer.classList.add('modo-oscuro');
            loginContainer.classList.remove('modo-claro');
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

// Funcionalidad de registro
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const toggleButton = document.getElementById('toggleModeButton');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMode);
    }
    
    // Aplicar tema guardado
    applySavedTheme();
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Eliminado el campo de identificación
            const names = document.getElementById('names').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validaciones
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if (password.length < 3) {
                alert('La contraseña debe tener al menos 3 caracteres');
                return;
            }
            
            // Obtener usuarios existentes
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Verificar si el usuario ya existe (solo por username o email)
            const existingUser = users.find(user => 
                user.username === username || 
                user.email === email
            );
            
            if (existingUser) {
                alert('Ya existe un usuario con ese nombre de usuario o correo');
                return;
            }
            
            // Crear nuevo usuario (sin identificación)
            const newUser = {
                id: Date.now(), // ID único para el usuario
                names,
                email,
                username,
                password,
                balance: 0, // Inicializar saldo en 0 para nuevos usuarios
                accountNumber: Math.floor(100000 + Math.random() * 900000).toString() // Número de cuenta aleatorio
            };
            
            // Agregar a la lista de usuarios
            users.push(newUser);
            
            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('¡Registro exitoso! Ahora puedes iniciar sesión');
            window.location.href = 'login.html';
        });
    }
});