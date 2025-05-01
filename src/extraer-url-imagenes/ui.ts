import { extraerURLsImagenes } from './extraerURLs';

const obtenerElementos = () => {
    const button = document.getElementById('extraer-imagenes') as HTMLButtonElement;
    const textarea = document.getElementById('html-input') as HTMLTextAreaElement;
    const resultadoContainer = document.getElementById('resultado') as HTMLDivElement;
    return { button, textarea, resultadoContainer };
}

const crearSeccionURLs = (urls: string[]): HTMLElement => {
    const seccion = document.createElement('div');

    const titulo = document.createElement('h4');
    titulo.textContent = 'Listado de URLs de recursos';
    titulo.classList.add('urls-title');

    const lista = document.createElement('div');
    lista.classList.add('urls-list');

    urls.forEach(url => {
        const item = document.createElement('p');
        item.textContent = url;
        item.classList.add('url-item');
        lista.appendChild(item);
    });

    seccion.appendChild(titulo);
    seccion.appendChild(lista);

    return seccion;
}

const crearSeccionGaleria = (urls: string[]): HTMLElement => {
    const seccion = document.createElement('div');

    const titulo = document.createElement('h4');
    titulo.textContent = 'Galería de imágenes';
    titulo.classList.add('gallery-title');

    const grid = document.createElement('div');
    grid.classList.add('image-grid');

    urls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('grid-image');
        grid.appendChild(img);
    });

    seccion.appendChild(titulo);
    seccion.appendChild(grid);

    return seccion;
}

export const mostrarImagenes = () => {
    const { button, textarea, resultadoContainer } = obtenerElementos();

    button.addEventListener('click', () => {
        const html = textarea.value;
        const urls = extraerURLsImagenes(html);

        resultadoContainer.innerHTML = '';

        if (urls.length === 0) {
            resultadoContainer.textContent = 'No se encontraron imágenes.🤷‍♀️';
            return;
        }

        const seccionURLs = crearSeccionURLs(urls);
        const seccionGaleria = crearSeccionGaleria(urls);

        resultadoContainer.appendChild(seccionURLs);
        resultadoContainer.appendChild(seccionGaleria);
    });
};
