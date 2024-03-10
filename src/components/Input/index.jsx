import * as Form from "@radix-ui/react-form";
import classNames from "../../utils/classNames";
import { RxCalendar } from "react-icons/rx";
import { useController } from "react-hook-form";
import Select from "react-select";

export default function Formulario({ className, children, align = "start" }) {
    return (
        <Form.Root
            autoComplete="off"
            className={classNames("grid grid-cols-1 gap-4 w-full text-gray-500", align == "end" ? "items-end" : "items-start", className)}
            onSubmit={(e) => e.preventDefault()}
        >
            {children}
        </Form.Root>
    )
}

Formulario.Field = ({ children, ...props }) => {
    return (
        <Form.Field className={"flex flex-row"} name={props.name}>
            <Form.Label
                className="flex flex-row item-center gap-1 p-1 text-sm font-medium text-gray-700"
                htmlFor={props.name}
            >
                <p className="flex items-center justify-center">
                    {!!props.label ? `${props.label}: ` : ""}
                </p>
            </Form.Label>
            <div className="flex flex-row items-center gap-2 w-full">
                <div className="flex flex-row items-center w-full">
                    
                    <div className="w-full flex flex-row items-center">
                        <Form.Control asChild>{children}</Form.Control>
                    </div>
                </div>
            </div>
        </Form.Field>
    );
}

Formulario.InputTexto = (props) => {
    const { register } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsField.name}
                    disabled={propsInput.disabled}
                    name={propsField.name}
                    type={propsInput.type || "text"}
                    placeholder={propsInput.placeholder}
                    className={classNames(
                        `w-full border rounded-md text-gray-600 border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent`,
                        (!!propsInput.align ? propsInput.align : "text-left")
                    )}
                    {...register && register(propsField.name)}
                    onChange={e => {
                        if (propsInput.type != "number") {
                            const positionCursor = e.target.selectionStart;

                            if (!propsInput.lowercase) e.target.value = e.target.value.toString().toUpperCase()

                            if (propsInput.type == "number" &&
                                propsInput.min != null && typeof propsInput.min != "object" &&
                                Number(e.target.value) < (propsInput.min)
                            )
                                e.target.value = (Number(e.target.value) * (-1)).toString();

                            register && register(propsField.name).onChange(e);
                            e.target.selectionStart = positionCursor;
                            e.target.selectionEnd = positionCursor;
                        }
                    }}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputData = (props) => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    propsField.icone = propsField.icone || <RxCalendar />;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: new Date().toISOString().split("T")[0] });

    return (
        <Formulario.Field {...propsField}>
            <input
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                name={propsField.name}
                value={value === "" ? (propsInput.dataVazia ? "" : new Date().toISOString().split("T")[0]) : new Date(value).toISOString().split("T")[0]}
                disabled={propsInput.disabled}
                onChange={valor => onChange(valor.target.value)}
                type="date"
                min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                className={"rounded-md w-full text-gray-500 disabled:bg-gray-100 border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
            />
        </Formulario.Field>
    )
}

Formulario.InputSelect = (props) => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    const { field: { value: SelectValue, onChange: onChangeSelect } } = useController({ name: propsField.name, control });
    const { field: { onChange: onChangeSelectId } } = useController({ name: propsField.name + "Id", control, defaultValue: propsInput.defaultValue?.value });

    const getOpcoesSelect = () => {
        const opcoesSelect = [{ value: null, label: propsField.labelOpcaoPadrao || "" }]

        if (!propsInput.options)
            return opcoesSelect;

        if (!propsInput.labelOpcaoPadrao || propsInput.semOpcaoNula)
            return propsInput.options;

        return opcoesSelect.concat(propsInput.options);
    }

    return (
        <Formulario.Field {...propsField}>
            <>
                <Select
                    className="w-full text-left"
                    name={propsField.name}
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    onInputChange={(filtro, _) => {
                        propsInput.onInputChange && propsInput.onInputChange(filtro)
                    }}
                    options={getOpcoesSelect()}
                    noOptionsMessage={() => "Nenhuma opção disponível"}
                    isDisabled={propsInput.disabled}
                    placeholder={propsInput.placeholder || "Selecione"}
                    value={SelectValue?.value || SelectValue?.value != null ? SelectValue : " "}
                    onChange={option => {
                        onChangeSelect(option)
                        onChangeSelectId(option ? option.value : option)
                    }}
                    menuPlacement="auto"
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputDataIntervalo = (props) => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    propsField.icone = propsField.icone || <RxCalendar />;

    const { field: { value: startDate, onChange: onChangeStartDate } } = useController({ name: `${propsField.name}_start`, control, defaultValue: new Date().toISOString().split("T")[0] });
    const { field: { value: endDate, onChange: onChangeEndDate } } = useController({ name: `${propsField.name}_end`, control, defaultValue: new Date().toISOString().split("T")[0] });

    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;

        if (new Date(newStartDate) <= new Date(endDate)) {
            onChangeStartDate(newStartDate);
        }
    };

    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;

        if (new Date(newEndDate) >= new Date(startDate)) {
            onChangeEndDate(newEndDate);
        }
    };

    return (
        <Formulario.Field {...propsField}>
            <div className="rounded-md w-full text-gray-500 disabled:bg-gray-100 border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm flex flex-row items-center">
                <input
                    id={`${propsField.name}_start`}
                    name={`${propsField.name}_start`}
                    value={startDate}
                    disabled={propsInput.disabled}
                    onChange={handleStartDateChange}
                    type="date"
                    min={propsInput.min != null && typeof propsInput.min !== "object" ? propsInput.min : ""}
                    max={endDate}
                    className="appearance-none lg:w-60 w-full bg-white py-2 px-3 rounded-md focus:outline-none"
                />
                <input
                    id={`${propsField.name}_end`}
                    name={`${propsField.name}_end`}
                    value={endDate}
                    disabled={propsInput.disabled}
                    onChange={handleEndDateChange}
                    type="date"
                    min={startDate}
                    max={propsInput.max != null && typeof propsInput.max !== "object" ? propsInput.max : ""}
                    className="appearance-none lg:w-60 w-full bg-white py-2 px-3 rounded-md focus:outline-none"
                />
            </div>
        </Formulario.Field>
    )
}