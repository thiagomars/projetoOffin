import Box from "../../components/Box";
import Totalizador from "../../components/Totalizador";
import dadosTotalizador from "../../data/totalizador.json";
import dadosGraficos from "../../data/dados.json";
import BoxContainer from "../../components/BoxContainer";
import ContainerGrafico from "../../components/ContainerGrafico";
import Botao from "../../components/Button";
import Formulario from "../../components/Input";
import { useForm } from "react-hook-form";

export default function Dashboard() {
    const { register, control } = useForm();

    return (
        <section className="w-full py-10">
            <BoxContainer>
                <Box className="w-full flex lg:flex-row gap-2">
                    <Formulario className="md:col-span-2 grid md:grid-cols-2">
                        <Formulario.InputTexto
                            name="operador"
                            label="Operador"
                            placeholder="Nome Operador"
                            register={register}
                        />
                        <Formulario.InputSelect
                            name="produto"
                            label="Produto"
                            placeholder="Selecione"
                            options={[
                                { value: 1, label: "Produto A" },
                                { value: 2, label: "Produto B" },
                                { value: 3, label: "Produto C" },
                                { value: 4, label: "Produto D" },
                                { value: 5, label: "Produto E" },
                            ]}
                            control={control}
                        />
                    </Formulario>
                    <div className="flex flex-row gap-2">
                        <Botao
                            texto="Operador"
                            tipo="impressao"
                            onClick={() => {}}
                        />
                        <Botao
                            texto="Produto"
                            tipo="impressao"
                            onClick={() => {}}
                        />
                        <Botao
                            texto="Data"
                            tipo="impressao"
                            onClick={() => {}}
                        />
                    </div>
                    <Formulario className="w-fit">
                        <Formulario.InputDataIntervalo
                            name="periodo"
                            label=""
                            control={control}
                        />
                    </Formulario>
                </Box>
            </BoxContainer>

            <BoxContainer className="flex flex-wrap justify-center items-center">
                {dadosTotalizador?.map((item, index) => (
                    <Totalizador
                        className="basis-60 flex-shrink flex-grow"
                        label={item?.label}
                        total={item?.valor}
                        unidade={item?.unidade}
                        key={"item_totalizador_" + index}
                    />
                ))}
            </BoxContainer>

            <BoxContainer className="flex-col">
                {dadosGraficos?.dados?.map((item, index) => (
                    <ContainerGrafico
                        item={item}
                        key={"grafico_box_" + index}
                        index={index}
                    />
                ))}
            </BoxContainer>
        </section>
    );
}
