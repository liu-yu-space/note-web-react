interface ButtonProps {
    handleClick?: () => void;
    size?: "small" | "default" | "large";
    type?: "default" | "text" | "text-white" | "icon";
    children?: React.ReactNode;
}

export default function WButton({
    handleClick,
    type = "default",
    size = "default",
    children,
}: ButtonProps) {

    const publicClassName = "shrink-0 text-sm py-1 px-2 cursor-pointer flex items-center justify-center transition-colors ";
    
    let className = "rounded-[4px] bg-primary text-white hover:bg-primary-light active:bg-primary hover:shadow-sm";
    if (type === "text") {
        className = "text-primary rounded-[4px] hover:text-primary-light active:text-primary";
    } else if (type === "text-white") {
        className = "text-gray-50 rounded-[4px] hover:text-white active:text-gray-50";
    }
    if (size === "small") {
        className += " text-xs";
    } else if (size === "large") {
        className += " text-base";
    }

    return (
        <button
            type="button"
            className={publicClassName + className}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
