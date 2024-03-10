import classNames from "../../utils/classNames";

export default function Tabela({ children }) {
    return (
        <table className="table-auto w-full text-sm text-left text-gray-500">
            {children}
        </table>
    );
}

const Titulo = ({ children }) => {
    return (
        <thead className="text-sm border-b">
            <tr>{children}</tr>
        </thead>
    );
};

const TituloItem = ({ children, className }) => {
    return (
        <th className={classNames("font-bold py-2", className)}>
            {children}
        </th>
    );
};

const Body = ({ children }) => {
    return (
        <tbody className="py-2">
            { children }
        </tbody>
    );
}

const BodyLinha = ({ children }) => {
    return (
        <tr className="w-full">
            {children}
        </tr>
    );
}

const BodyItem = ({ children, className }) => {
    return (
        <th className={classNames("py-2 font-medium text-gray-500/80", className)}>{ children }</th>
    )
}

Tabela.Titulo = Titulo;
Titulo.Item = TituloItem;

Tabela.Body = Body;
Body.BodyLinha = BodyLinha;
BodyLinha.BodyItem = BodyItem;
