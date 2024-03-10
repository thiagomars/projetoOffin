import classNames from "../../utils/classNames";
import { formatarDecimal, formatarDinheiro, verificaTipoFormatacao } from "../../utils/formartar";
import Box from "../Box";

export default function Totalizador({label, total, unidade, className}) {
    
    return (
        <Box className={classNames(className, "flex-col justify-center items-center")}>
            <h1 className="text-gray-500/90 font-semibold text-sm">{label}</h1>
            <p className="text-gray-700 font-black text-2xl">{verificaTipoFormatacao(total, unidade)}</p>
        </Box>
    );
}
