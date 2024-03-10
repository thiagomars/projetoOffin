import Decimal from "decimal.js";

export const formatarDinheiro = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(converterDecimal(valor)));
}

export const formatarDecimal = (valor, decimalPlaces = 2) => {
    if (valor === 0)
        return "0";

    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimalPlaces }).format(Number(converterDecimal(valor, decimalPlaces)));
}

export const converterDecimal = (valor, decimalPlaces = 2) => {
    return new Decimal(valor).toDecimalPlaces(decimalPlaces, Decimal.ROUND_UP).toString();
}

export const formatarNumeroBrl = (valor, casasDecimais) => {
    return new Intl.NumberFormat('pt-BR').format(casasDecimais ? Number(valor.toFixed(casasDecimais)) : valor);
}

export const verificaTipoFormatacao = (total, unidade) => {
    return unidade == "monetario" 
                    ? formatarDinheiro(total)
                    : unidade == "inteiro"
                        ? formatarDecimal(total, 0)
                        : unidade == "percent"
                            ? formatarDecimal(total, 1) + "%"
                            : total
}