import { regex_extraccion } from "./constantes";

export const extraerURLsImagenes = (html: string): string[]  => {
    console.log("me ejecuto?");
    const coincidencias = html.match(regex_extraccion);

    if (!coincidencias) {
        return [];
    }

    const urls: string[] = [];

    coincidencias.forEach((coincidencia) => {
        const urlCoincidencia = coincidencia.match(/src="([^">]+)"/);

        if (urlCoincidencia && urlCoincidencia[1]) {
            urls.push(urlCoincidencia[1]);
        }
    });

    return urls;
}