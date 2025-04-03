interface ButtonProps {
    handleClick?: () => void;
    size?: "small" | "default" | "large";
    type?: "default" | "text";
    children?: React.ReactNode;
}

export default function WButton({
    handleClick,
    type = "default",
    size = "default",
    children,
}: ButtonProps) {

    // 按钮基础样式
    const publicClassName = "shrink-0 py-1 px-2 cursor-pointer flex items-center justify-center transition-colors ";
    
    // 按钮类型样式
    let className = "rounded-[4px] bg-primary text-white hover:bg-primary-light active:bg-primary hover:shadow-sm ";
    if (type === "text") {
        className = "text-primary-font rounded-[4px] hover:text-primary-light active:text-primary ";
    }

    // 按钮大小样式
    if (size === "small") {
        className += "text-xs ";
    } else if (size === "large") {
        className += "text-base";
    } else {
        className += "text-sm";
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
