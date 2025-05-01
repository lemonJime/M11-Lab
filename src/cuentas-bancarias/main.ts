import { manejarBusquedaIBAN } from "./ui";


document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario");
    if(formulario && formulario instanceof HTMLFormElement){
        formulario.addEventListener("submit", manejarBusquedaIBAN)
    } else{
        throw new Error ('No se encontró el formulario')
    }
});