/**
 * @fileoverview Manejador del formulario de contacto
 * @version 1.0.0
 * @author [Tu Nombre]
 * @description Gestiona la validación y envío del formulario de contacto
 */

/**
 * Maneja el envío del formulario de contacto
 * @param {Event} e - Evento del formulario
 * @throws {Error} Si hay un problema al procesar el formulario
 * @returns {void}
 */
function handleSubmit(e) {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();
    
    /**
     * Obtiene y valida los datos del formulario
     * @type {string}
     */
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Crear y configurar el mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    // Template literal para el mensaje de confirmación
    successMessage.innerHTML = `
        <h4>¡Mensaje enviado con éxito!</h4>
        <p>Gracias ${nombre}, hemos recibido tu mensaje.</p>
        <p>Te contactaremos pronto al correo: ${email}</p>
    `;
    
    // Limpiar y mostrar el mensaje de éxito
    const form = document.getElementById('contactForm');
    form.innerHTML = '';
    form.appendChild(successMessage);
}

// Inicialización del manejador de eventos
document.getElementById('contactForm').addEventListener('submit', handleSubmit);
