import classNames from "../../utils/classNames";


export default function BoxContainer(props) {
    const { className, children } = props;

    return (
        <div
            className={classNames(
                "flex rounded-lg gap-y-4 p-2 gap-4",
                className
            )}
        >
            {children}
        </div>
    );
}