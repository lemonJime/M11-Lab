import { isValidIBAN } from "ibantools";
import { datosIBANBanco } from "./validarIBAN.model";
import { codigosYBancos, formatoValido } from "./constantes";


const leerIBAN = (cuentaBancaria: string): boolean => {
    return formatoValido.test(cuentaBancaria);
}

export const esValidoIBAN = (iban: string): boolean => {
    const ibanLimpio = iban.replace(/[\s-_]/g, '');
    if (!leerIBAN(ibanLimpio)) {
        return false;
    }
    return isValidIBAN(ibanLimpio);
}

export const extraerDatosIBAN = (iban: string): datosIBANBanco => {
    const ibanLimpio = iban.replace(/[\s-_]/g, '');
    const comprobaciones = formatoValido.exec(ibanLimpio);
    // console.log("comprobaciones: ", comprobaciones);
    // console.log("comprobaciones.groups: ", comprobaciones?.groups);

    if (!comprobaciones?.groups) {
        throw new Error("Formato de IBAN inválido...");
    }
    const { codigoPais, digitoControl, codigoBanco, codigoSucursal, digitoControl2, numeroCuenta } = comprobaciones.groups;

    return {
        nombre_banco: codigosYBancos[codigoBanco as keyof typeof codigosYBancos],
        codigo_pais: codigoPais,
        digito_constrol: digitoControl,
        codigo_banco: codigoBanco,
        codigo_sucursal: codigoSucursal,
        digito_control: digitoControl2,
        numero_cuenta: numeroCuenta
    };
}