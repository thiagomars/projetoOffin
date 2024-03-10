import ReactECharts from 'echarts-for-react';
import { formatarNumeroBrl } from '../../utils/formartar';

export default function GraficoLinha(props) {
    const { children } = props;

    return (
        <>
            {children}
        </>
    )
}

const Content = (props) => {
    const {
        dados,
        tamanhoTexto,
        labelHidden,
        style = {},
        prefix,
        sufix,
        focusView = false,
        legendRotate = 0,
        legendEnabled = true,
        showDescSeries = true,
        smooth = false,
        backgroundColor = false,
        media,
        meta
    } = props;

    let coresGrafico = [];

    coresGrafico = [
        "#F27F00", "#0F5EFF", "#00A65A", "#edc634", "#ffaa7f", "#8c8cff", "#ffcc66", "#cbd5e1", "#68dcfc", "#ff7fff", "#ffaa8c", "#7fff7f", "#ff7f7f", "#ff7faa", "#aae07f", "#ffcc99", "#7faaff", "#ffcc7f", "#ffcf7f", "#7f8aff", "#aae0cf", "#ff7fa4", "#7fbfff", "#a4ff7f", "#ff7fff", "#ff7faa", "#6a7fff", "#c8c8b7", "#b7c8ff", "#ffccff"
    ]

    const series = dados.map((serie) => ({
            name: serie.name,
            type: 'line',
            emphasis: {
                label: {
                    show: !labelHidden,
                    fontSize: tamanhoTexto || 16,
                    fontWeight: 'bold',
                    formatter: function (params) {
                        return (prefix || "") + formatarNumeroBrl(params.value) + (sufix || "")
                    }
                },
                focus: focusView ? 'series' : ''
            },
            areaStyle: backgroundColor ? { color: serie.color } : { color: "transparent" },
            data: serie.data?.map((item) => item.value),
            label: {
                show: showDescSeries,
                position: 'top',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 500
                },
                formatter: function (params) {
                    return (prefix || "") + formatarNumeroBrl(params.value) + (sufix || "")
                }
            },
        smooth: smooth,
        })
    );

    if (!!media && typeof media == 'number') {
        dados?.map((itens) => {
            series?.push({
                type: 'line',
                showSymbol: false,
                color: "red",
                name: "Média",
                data: itens?.data.map(() => media),
                endLabel: {
                    show: true,
                    fontSize: 11,
                    formatter: function (params) {
                        return params.value
                    },
                    backgroundColor: "red",
                    padding: 5,
                    borderRadius: 4,
                    color: "white",
                    zIndex: 20
                }
            });

        })
    }

    if (!!meta?.length) {
        meta?.map((itens) => {
            series?.push({
                type: 'line',
                showSymbol: false,
                color: "red",
                name: "Meta",
                data: itens?.map((item) => item),
                symbol: "react",
                symbolSize: 8,
                endLabel: {
                    show: true,
                    fontSize: 11,
                    formatter: function () {
                        return "Meta"
                    },
                    backgroundColor: "red",
                    padding: 5,
                    borderRadius: 4,
                    color: "white",
                    zIndex: 20
                }
            });

        })
    }

    const option = {
        color: coresGrafico,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7185',
                    valueFormatter: (value) => (Array.isArray(prefix) ? "" : prefix) + formatarNumeroBrl(value) + (Array.isArray(sufix) ? "" : sufix),
                },
            }
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "10%",
            containLabel: true,
            height: "80%"
        },
        xAxis: {
            type: 'category',
            data: dados[0]?.data?.map((item) => item.label) || [],
            axisLabel: { interval: 0, rotate: legendRotate },
        },
        yAxis: { type: 'value' },
        series: series,
        legend: {
            show: legendEnabled,
            bottom: 0,
        },

    };

    return (
        <div className='h-full'>
            <ReactECharts option={option} style={{ ...style, height: "95%", minHeight: window.innerWidth < 1024 ? "45vh" : "auto" }} />
        </div>
    )
}

GraficoLinha.Content = Content;