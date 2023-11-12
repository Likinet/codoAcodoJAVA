const valorTicket = 200;

let descuentoEstudiante = 80;
let descuentoTrainee = 50;
let descuentoJunior = 15;

let totalPago = document.getElementById("totalPago");
let btnBorrar = document.getElementById("btnBorrar");
let btnResumen = document.getElementById("btnResumen");

let nombre = document.getElementById("nombre");
let mensajeErrorNombre = document.getElementById("mensajeErrorNombre");
let apellido = document.getElementById("apellido");
let mensajeErrorApellido = document.getElementById("mensajeErrorApellido");
let email = document.getElementById("email");
let mensajeErrorEmail = document.getElementById("mensajeErrorEmail");
let cantidadTickets = document.getElementById("cantidadTickets");
let mensajeErrorCantidad = document.getElementById("mensajeErrorCantidad");
let categoriaSelect = document.getElementById("categoriaSelect");
let mensajeErrorCategoria = document.getElementById("mensajeErrorCategoria");

let primerFocoNombre = true;
let primerFocoApellido = true;
let primerFocoEmail = true;
let primerFocoCantidad = true;
let primerFocoCategoria = true;

const mostrarMensajeError = (elemento, mensajeError) => {
    elemento.classList.add("is-invalid");
    mensajeError.classList.add("visible");
};

const ocultarMensajeError = (elemento, mensajeError) => {
    elemento.classList.remove("is-invalid");
    mensajeError.classList.remove("visible");
};

const quitarClaseError = () => {
    let formElements = document.querySelectorAll(".form-control , .form-select");
    let mensajesError = document.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < formElements.length; i++) {
        ocultarMensajeError(formElements[i], mensajesError[i]);
    }
};

const validarEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
};

const validarFormulario = () => {

    if (nombre.value === "") {
        if (!primerFocoNombre) {
            mostrarMensajeError(nombre, mensajeErrorNombre);
        }
        primerFocoNombre = false;
        return false;
    }
    if (apellido.value === "") {
        if (!primerFocoApellido) {
            mostrarMensajeError(apellido, mensajeErrorApellido);
        }
        primerFocoApellido = false;
        return false;
    }
    if (!validarEmail(email.value)) {
        if (!primerFocoEmail) {
            mostrarMensajeError(email, mensajeErrorEmail);
        }
        primerFocoEmail = false;
        return false;
    }
    if (cantidadTickets.value === "" || isNaN(cantidadTickets.value)) {
        if (!primerFocoCantidad) {
            mostrarMensajeError(cantidadTickets, mensajeErrorCantidad);
        }
        primerFocoCantidad = false;
        return false;
    }
    if (categoriaSelect.value === "") {
        mostrarMensajeError(categoriaSelect, mensajeErrorCategoria);
        return false;
    }
    return true;
}

const calcularTotalAPagar = (evento) => {

    quitarClaseError();
    if (!validarFormulario() || evento.type !== "click") {
        return;
    }
    if (evento.type === "click") {
        let costoTotalTickets = cantidadTickets.value * valorTicket;
    
        switch (categoriaSelect.value) {
            case "0":
                costoTotalTickets = costoTotalTickets;
                break;
            case "1":
                costoTotalTickets = costoTotalTickets - (descuentoEstudiante / 100 * costoTotalTickets);
                break;
            case "2":
                costoTotalTickets = costoTotalTickets - (descuentoTrainee / 100 * costoTotalTickets);
                break;
            case "3":
                costoTotalTickets = costoTotalTickets - (descuentoJunior / 100 * costoTotalTickets);
                break;
        }
        totalPago.innerHTML = costoTotalTickets;
    }
};

// Obtén una referencia al formulario
const formularioTickets = document.getElementById("formularioTickets");

// Agrega un evento al formulario para capturar el envío
formularioTickets.addEventListener("submit", function(event) {
    // Evita la acción por defecto del formulario
    event.preventDefault();

    // Resto del código de manejo del envío del formulario
    // ...
});

const borrarFormulario = () => {
    totalPago.innerHTML = "";
    primerFocoNombre = true;
    primerFocoApellido = true;
    primerFocoEmail = true;
    primerFocoCantidad = true;
    primerFocoCategoria = true;
}

// Event listeners para el evento "input" en los campos del formulario
nombre.addEventListener("input", calcularTotalAPagar);
apellido.addEventListener("input", calcularTotalAPagar);
email.addEventListener("input", calcularTotalAPagar);
cantidadTickets.addEventListener("input", calcularTotalAPagar);
categoriaSelect.addEventListener("input", calcularTotalAPagar);

btnResumen.addEventListener("click", calcularTotalAPagar);
btnBorrar.addEventListener("click", borrarFormulario);