import Box from "../../components/Box";
import GraficoBarra from "../../components/GraficoBarras";
import Tabela from "../../components/Table";
import { converterDecimal, formatarDecimal } from "../../utils/formartar";

export default function GraficoTabelaLayout({ item, cores }) {
    const todosNames = [];
    item?.graficos?.barra?.forEach(({ name }) => {
        todosNames.push(name);
    });

    const todosValues = [];
    item?.graficos?.barra?.forEach(({ value }) => {
        todosValues.push(value);
    });

    const resultado = todosNames.map((name, index) => [
        name,
        todosValues[index] || [],
    ]);

    return (
        <div className="grid lg:grid-cols-4 gap-2">
            <Box className="min-h-96 lg:col-span-3">
                <Box.Header>
                    <Box.Header.Content>
                        <Box.Header.Content.Titulo>
                            {item.graficos.titulo}
                        </Box.Header.Content.Titulo>
                    </Box.Header.Content>
                </Box.Header>

                <GraficoBarra>
                    <GraficoBarra.Content
                        data={[["Tipo", "Quantidade"], ...(resultado || [])]}
                        legendRotate={0}
                        meta={[item?.graficos?.linha]}
                        viewLabelMeta={false}
                        viewLabelData={false}
                        barWidth="pequeno"
                        cor={cores}
                    />
                </GraficoBarra>
            </Box>

            <Box>
                <Tabela>
                    <Tabela.Titulo>
                        {item.tabela.titulos?.map((titulo, index) =>
                            index == 1 ? (
                                <Tabela.Titulo.Item
                                    key={"item_titulo" + index}
                                    className="text-right"
                                >
                                    {titulo}
                                </Tabela.Titulo.Item>
                            ) : (
                                <Tabela.Titulo.Item key={"item_titulo" + index}>
                                    {titulo}
                                </Tabela.Titulo.Item>
                            )
                        )}
                    </Tabela.Titulo>

                    <Tabela.Body>
                        {item.tabela.dados?.map((dados, index) => (
                            <Tabela.Body.BodyLinha
                                key={"item_corpo_tabela_" + index}
                            >
                                <Tabela.Body.BodyLinha.BodyItem className="text-left">
                                    {dados.name}
                                </Tabela.Body.BodyLinha.BodyItem>
                                <Tabela.Body.BodyLinha.BodyItem className="text-right">
                                    {formatarDecimal(dados.value, 0)}
                                </Tabela.Body.BodyLinha.BodyItem>
                            </Tabela.Body.BodyLinha>
                        ))}
                    </Tabela.Body>
                </Tabela>
            </Box>
        </div>
    );
}
