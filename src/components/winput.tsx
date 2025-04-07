interface WInputProps {
    placeholder?: string;
    size?: "xs" | "sm" | "md" | "lg";
    childrenPosition?: "left" | "right";
    children?: React.ReactNode;
}

export default function WInput({placeholder = '', size = "md", childrenPosition, children}: WInputProps) {
   
    let className = ` `;
    // 按钮大小样式
    if (size === "xs") {
        className += "text-xs ";
    } else if (size === "sm") {
        className += "text-sm ";
    } else if (size === "lg") {
        className += "text-lg";
    } else {
        className += "text-base";
    }

    return (
        <div className="flex items-center w-full relative text-primary-font">
            {children ? <span className={`absolute ${childrenPosition === 'left'? 'left-0' : 'right-0'} w-8 h-full 
                pointer-events-none flex items-center justify-center`}>
                {children}
            </span> : null}
            <input
                className={`w-full min-w-14 rounded-md outline-none border border-gray-300 px-2 py-1 
                    focus:border-primary transition-colors ${childrenPosition === 'right' && 'pr-8'} ${className}
                    ${childrenPosition === 'left' && 'pl-8'}`}
                type="text" 
                placeholder={placeholder}
            />
        </div>
    );
};
