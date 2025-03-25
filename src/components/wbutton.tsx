interface ButtonProps {
    handleClick?: () => void;
    text?: string;
    type?: "default" | "text" | "text-white";
    children?: React.ReactNode;
}

export default function WButton({
    handleClick,
    text = "",
    type = "default",
    children,
}: ButtonProps) {
    return type === "default" ? (
        <button
            type="button"
            className="border rounded-[4px] px-4 py-1 text-sm bg-[var(--color-main)] text-white cursor-pointer hover:bg-[var(--color-main-hover)]"
            onClick={handleClick}
        >
            {text}
            {children}
        </button>
    ) : type === "text" ? (
        <button
            type="button"
            className="p-1 text-sm text-[var(--color-main)] cursor-pointer hover:text-[var(--color-main-hover)]"
            onClick={handleClick}
        >
            {text}
            {children}
        </button>
    ) : (
        <button
            type="button"
            className="p-1 text-sm text-gray-50 cursor-pointer hover:text-white"
            onClick={handleClick}
        >
            {text}
            {children}
        </button>
    );
}
