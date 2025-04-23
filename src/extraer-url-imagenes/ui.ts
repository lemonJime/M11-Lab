import { extraerURLsImagenes } from './extraerURLs';

export const mostrarImagenes = () => {
    const button = document.getElementById('extraer-imagenes') as HTMLButtonElement;
    const textarea = document.getElementById('html-input') as HTMLTextAreaElement;
    const resultadoContainer = document.getElementById('resultado') as HTMLDivElement;

    button.addEventListener('click', () => {
        const html = textarea.value;
        const urls = extraerURLsImagenes(html);

        resultadoContainer.innerHTML = '';

        if (urls.length === 0) {
            resultadoContainer.textContent = 'No se encontraron imágenes.';
            return;
        }

        // Crear sección de listado de URLs
        const urlsTitulo = document.createElement('h4');
        urlsTitulo.textContent = 'Listado de URLs de recursos';
        urlsTitulo.classList.add('urls-title');
        
        const listaURLs = document.createElement('div');
        listaURLs.classList.add('urls-list');
        urls.forEach(url => {
            const urlElemento = document.createElement('p');
            urlElemento.textContent = url;
            urlElemento.classList.add('url-item');
            listaURLs.appendChild(urlElemento);
        });

        // Crear sección de galería
        const tituloGaleria = document.createElement('h4');
        tituloGaleria.textContent = 'Galería de imágenes';
        tituloGaleria.classList.add('gallery-title');

        const grid = document.createElement('div');
        grid.classList.add('image-grid');
        urls.forEach(url => {
            const imgElemento = document.createElement('img');
            imgElemento.src = url;
            imgElemento.classList.add('grid-image');
            grid.appendChild(imgElemento);
        });

        // Añadir todo al contenedor
        resultadoContainer.appendChild(urlsTitulo);
        resultadoContainer.appendChild(listaURLs);
        resultadoContainer.appendChild(tituloGaleria);
        resultadoContainer.appendChild(grid);
    });
}