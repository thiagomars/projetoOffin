import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ReactNode } from 'react';
import classNames from "../../utils/classNames";

export const BoxContainer = ({ children, className, vertical = true }) => {
    const [autoAnimateRef] = useAutoAnimate();

    return (
        <div ref={autoAnimateRef} className={classNames(
            "flex gap-4",
            vertical && "flex-col",
            className
        )}>
            {children}
        </div>
    )
}

export default function Box(props) {
    const {
        className,
        children,
        vertical = true
    } = props;

    return (
        <div className={classNames(
            "bg-white p-4 shadow-md flex rounded-lg gap-y-2",
            vertical && "flex-col",
            className
        )}>
            {children}
        </div>
    )
}

const Header = (props) => {
    const {
        children,
        className,
        padding = "pb-3"
    } = props;

    return (
        <div className={classNames("flex w-full justify-between items-center border-b-2 col-span-full", className, padding)}>
            {children}
        </div>
    )
}

const Content = ({ children, flexDirection = "flex-row", className }) => {
    return (
        <div className={classNames("flex flex-col gap-2 items-start", flexDirection, className)}>
            {children}
        </div>
    )
}

Content.Titulo = ({ children }) => {
    return (
        <h2 id="applicant-information-title" className="text-lg leading-6 font-bold text-gray-600">
            {children}
        </h2>
    )
}

Content.Subtitulo = ({ children }) => {
    return (
        <p className="max-w-2xl font-normal text-sm text-gray-500">
            {children}
        </p>
    )
}

Header.Botoes = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

Header.Content = Content;
Box.Header = Header;