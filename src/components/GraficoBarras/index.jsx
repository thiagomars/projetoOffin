import EChartsReact from "echarts-for-react";
import { formatarNumeroBrl } from "../../utils/formartar";
import ScrollArea from "../ScrollArea";

export default function GraficoBarra(props) {
    const { children } = props;

    return <>{children}</>;
}

const coresGrafico = [
    "#63ABFD",
    "#1B60AF",
    "#637CFD",
    "#1B2BAF",
    "#F2FC50",
    "#B1BA18",
    "#FCB750",
    "#BA7917",
    "#C5FC50",
    "#87BC15",
    "#FFBBBB",
    "#FC5A50",
];

const Content = ({
    data,
    cor,
    meta,
    vertical = false,
    sobrepor = false,
    label = true,
    focusView = false,
    tooltipCursor = true,
    legendRotate = 0,
    viewLabelMeta = true,
    viewLabelData = true,
    barWidth = "pequeno"
}) => {
    let qtdBarras = data.length + 1;
    let ajusteMedio = Math.ceil(qtdBarras / 20);
    let width = (ajusteMedio * ((barWidth == "pequeno" ? 20 : barWidth == "normal" ? 50 : barWidth == "grande" ? 92 : 130) )) * qtdBarras;
    let minWidth = window.innerWidth * (1000 / window.innerWidth);
    width = width >= minWidth ? width : minWidth;

    let quantidadeRegistros = data[0]?.length - 1;

    let height = 40 * qtdBarras;
    let minHeight = window.innerHeight * (0.4 * quantidadeRegistros);
    height = height >= minHeight ? height : minHeight;

    let configPadrao = (index) => ({
        type: "bar",
        stack: sobrepor ? "barGroup" : "barGroup" + index,
        color: Array.isArray(cor)
            ? cor[(index - 1) * 2]
            : !!cor
            ? cor
            : coresGrafico[(index - 1) * 2],
        itemStyle: {
            borderRadius: 10,
            borderColor: cor[((index - 1) * 2) + 1],
            borderWidth: 2,
        },
        label:
            sobrepor || !label
                ? { show: viewLabelData, fontStyle: "bold" }
                : {
                      type: "category",
                      show: viewLabelData,
                      position: vertical ? "right" : "top",
                      distance: 6,
                      valueAnimation: true,
                      backgroundColor: Array.isArray(cor)
                          ? cor[index - 1]
                          : !!cor
                          ? cor
                          : coresGrafico[index - 1],
                      borderColor: "#ffffff",
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 5,
                      fontSize: 12,
                      color: "white",
                      shadowBlur: 4,
                      shadowColor: "#d6d6d6",
                      shadowOffsetX: 2,
                      shadowOffsetY: 2,
                      fontStyle: "bold",
                      rich: {
                          per: {
                              color: "#fff",
                              backgroundColor: "#4C5058",
                          },
                      },
                  },
    });

    let configuracoesGrafico = Array.from({ length: quantidadeRegistros }).map(
        (_, i) => {
            let config = configPadrao(i + 1);

            return config;
        }
    );

    if (!!meta?.length) {
        const dataTemp = data?.map((item) => item[0]);
        dataTemp.shift();

        meta?.map((itens) => {
            if (!!itens) {
                configuracoesGrafico?.push({
                    type: "line",
                    showSymbol: true,
                    color: "#d10dce",
                    name: "Meta",
                    data: itens.map((item, index) => [
                        dataTemp[index],
                        item?.value,
                    ]).filter(x => x[1] != null),
                    endLabel: {
                        show: viewLabelMeta,
                        fontSize: 11,
                        formatter: function () {
                            return "Meta";
                        },
                        backgroundColor: "red",
                        padding: 5,
                        borderRadius: 4,
                        color: "white",
                        zIndex: 20,
                    },
                });
            }
        });
    }

    return (
        <>
            {quantidadeRegistros > 0 ? (
                <div className="overflow-hidden grid">
                    <ScrollArea paddingX="px-1 lg:px-0">
                        <div
                            className="mx-auto "
                            style={vertical ? { height } : { width }}
                        >
                            <EChartsReact
                                style={
                                    vertical
                                        ? { height }
                                        : { width, height: "42vh" }
                                }
                                option={{
                                    grid: {
                                        left: vertical ? 120 : 50,
                                        right: vertical ? 50 : 50,
                                        top: vertical ? 30 : "25%",
                                        height: vertical ? "85%" : "65%",
                                    },
                                    legend: {
                                        orient: "horizontal",
                                        right: "center",
                                        top: 1,
                                        backgroundColor: "white",
                                        width: "100%",
                                    },
                                    xAxis: vertical
                                        ? {}
                                        : {
                                              type: "category",
                                              axisLabel: {
                                                  interval: 0,
                                                  rotate: legendRotate,
                                              },
                                          },
                                    yAxis: vertical
                                        ? {
                                              type: "category",
                                              inverse: true,
                                          }
                                        : {},
                                    dataset: {
                                        source: data,
                                    },
                                    series: configuracoesGrafico,
                                    tooltip: {
                                        trigger: "axis",
                                        axisPointer: tooltipCursor
                                            ? {
                                                  type: "cross",
                                              }
                                            : {},
                                    },
                                    emphasis: {
                                        focus: focusView ? "series" : "",
                                    },
                                }}
                            />
                        </div>
                    </ScrollArea>
                </div>
            ) : (
                <p>Nenhuma informação disponível</p>
            )}
        </>
    );
};

GraficoBarra.Content = Content;
