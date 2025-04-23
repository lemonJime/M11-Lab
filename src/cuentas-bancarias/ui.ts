import { esValidoIBAN, extraerDatosIBAN, leerIBAN } from "./validarIBAN";


const mostrarMensajeExito = (texto: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    parrafo.classList.add('valido'); 
    contenedor.appendChild(parrafo);
};


const mostrarNombreBanco = (nombreBanco: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = `Banco: ${nombreBanco}`;
    contenedor.appendChild(parrafo);
};


const mostrarSucursal = (codigoSucursal: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = `Código de sucursal: ${codigoSucursal}`;
    contenedor.appendChild(parrafo);
};


const mostrarDigitoControl = (digitoControl: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = `Dígito de control: ${digitoControl}`;
    contenedor.appendChild(parrafo);
};


const mostrarNumeroCuenta = (numeroCuenta: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = `Número de cuenta: ${numeroCuenta}`;
    contenedor.appendChild(parrafo);
};


const mostrarMensajeError = (texto: string, contenedor: HTMLElement): void => {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    parrafo.classList.add('invalido'); 
    contenedor.appendChild(parrafo);
};


const limpiarContenedor = (contenedor: HTMLElement): void => {
    contenedor.innerHTML = ''; 
};

export const manejarBusquedaIBAN = (evento: Event): void => {
    evento.preventDefault(); 

    const inputIBAN = document.getElementById('buscadorIBAN') as HTMLInputElement;
    const iban = inputIBAN.value.trim();
    const contenedorResultados = document.getElementById('muestraDatos') as HTMLElement;

    limpiarContenedor(contenedorResultados); 

    try {
        if (!leerIBAN(iban)) {
            mostrarMensajeError('El IBAN no está bien formado.', contenedorResultados);
            return;
        }

        if (!esValidoIBAN(iban)) {
            console.log('El IBAN no es válido.');
        }

        mostrarMensajeExito('El IBAN está bien formado.', contenedorResultados);
        mostrarMensajeExito('El IBAN es válido.', contenedorResultados);

        const datosBanco = extraerDatosIBAN(iban);
        mostrarNombreBanco(datosBanco.nombre_banco, contenedorResultados);
        mostrarSucursal(datosBanco.codigo_sucursal, contenedorResultados);
        mostrarDigitoControl(datosBanco.digito_control, contenedorResultados);
        mostrarNumeroCuenta(datosBanco.numero_cuenta, contenedorResultados); 

    } catch (error) {
        const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
        mostrarMensajeError(mensajeError, contenedorResultados);
    }
};

