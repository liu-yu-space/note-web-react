interface ButtonProps {
    handleClick: () => void;
    text: string;
}

export default function WButton({ handleClick, text }: ButtonProps) {
    return (
        <button
            type="button"
            className="border rounded-[4px] px-4 py-1 text-sm mt-10 bg-[var(--color-main)] text-white cursor-pointer hover:bg-[var(--color-main-hover)]"
            onClick={handleClick}
        >
            {text}
        </button>
    );
}
