import React from "react";
import { AiOutlineSave, AiOutlineStop } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import { GrReturn } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import classNames from "../../utils/classNames";

const Botao = (props) => {
    const {
        onClick,
        carregando = false,
        disabled = false,
        tipo, //erro, aviso, sucesso, padrao, informacao
        texto,
        icone,
        className = "",
        classNameText = "",
        children,
    } = props;

    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                "relative flex flex-row gap-2 items-center text-sm font-medium rounded-md disabled:cursor-not-allowed",
                carregando && "grayscale-[50%] cursor-not-allowed ",
                tipo == "sucesso" &&
                    "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
                tipo == "erro" &&
                    "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
                tipo == "padrao" &&
                    "border hover:bg-gray-50 hover:ring-white/30 focus:ring-white/10 border-gray-300 bg-white text-gray-700",
                tipo == "aviso" &&
                    "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white",
                tipo == "impressao" &&
                    "bg-gray-600 hover:bg-gray-500 focus:ring-gray-500 text-white",
                tipo == "informacao" &&
                    "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
                tipo != null && "px-4 py-2 shadow-sm",
                className
            )}
            disabled={carregando || disabled}
        >
            {!!texto && (
                <span className={classNames(classNameText)}>{texto}</span>
            )}
            {children}
        </button>
        // <button
        //     id={id}
        //     type="button"
        //     onClick={onClick}
        //     className={classNames("relative flex flex-row gap-2 items-center text-sm font-medium rounded-md disabled:cursor-not-allowed",
        //         carregando && "grayscale-[50%] cursor-not-allowed ",
        //         tipo == "sucesso" && "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white",
        //         tipo == "erro" && "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
        //         tipo == "padrao" && "border hover:bg-gray-50 hover:ring-white/30 focus:ring-white/10 border-gray-300 text-gray-700",
        //         tipo == "aviso" && "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white",
        //         tipo == "impressao" && "bg-gray-600 hover:bg-gray-500 focus:ring-gray-500 text-white",
        //         tipo == "informacao" && "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
        //         tipo != null && "px-4 py-2 shadow-sm",
        //         className
        //     )}
        //     disabled={carregando || disabled}
        // >
        //     <div className={`w-full flex gap-2 items-center justify-center `}>
        //         {
        //             carregando ?
        //                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        //                 </svg>
        //                 :
        //                 (icone ||
        //                     (tipo == "impressao" && <FaPrint />) ||
        //                     (texto?.toString().toLowerCase().includes("adicionar") && <IoMdAdd className='w-5 h-5' />) ||
        //                     (texto?.toString().toLowerCase().includes("salvar") && <AiOutlineSave className='w-5 h-5' />) ||
        //                     (texto?.toString().toLowerCase().includes("cancelar") && <AiOutlineStop className='w-5 h-5 fill-black' />) ||
        //                     (texto?.toString().toLowerCase().includes("voltar") && <GrReturn className='w-5 h-5 fill-black' />))
        //         }

        //         {!!texto && <span className={classNames(classNameText)}>{texto}</span>}
        //         {children}
        //     </div>
        // </button>
    );
};

export default Botao;
