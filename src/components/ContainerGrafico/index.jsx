import GraficoTabelaLayout from "../../Layout/GraficoTabelaLayout";
import { verificaTipoFormatacao } from "../../utils/formartar";
import Box from "../Box";
import Botao from "../Button";

export default function ContainerGrafico({ item, index }) {

    const coresGrafico = [
        "#63ABFD",
        "#1B60AF",
        "#637CFD",
        "#1625AA",
        "#F2FC50",
        "#B1BA18",
        "#FCB750",
        "#BA7917",
        "#C5FC50",
        "#87BC15",
        "#FFBBBB",
        "#FC5A50",
    ];
    
    return (
        <Box className="w-full bg-gray-50/45">
            <div className="grid md:grid-cols-4 text-center">
                <Botao
                    tipo="impressao"
                    className="justify-center"
                    onClick={() => {}}
                >
                    {item?.titulo}
                </Botao>

                {item?.totalizadores?.map((totalizador, i) => (
                    <Botao
                        className="justify-center"
                        tipo="padrao"
                        onClick={() => { }}
                        key={"botao_item_" + i}
                    >
                        {totalizador.label}:{" "}
                        {verificaTipoFormatacao(
                            totalizador.value,
                            totalizador.unidade
                        )}
                    </Botao>
                ))}
            </div>

            <GraficoTabelaLayout
                item={item}
                cores={[coresGrafico[(index * 2)], coresGrafico[(index * 2) + 1]]}
            />
        </Box>
    );
}
