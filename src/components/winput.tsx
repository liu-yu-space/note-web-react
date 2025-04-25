interface WInputProps {
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'submit' | 'search';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    childrenPosition?: 'left' | 'right';
    name?: string | undefined;
    children?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function WInput({
    placeholder = '',
    size = 'md',
    childrenPosition,
    children,
    name,
    type = 'text',
    onChange,
}: WInputProps) {
    let className = ` `;
    if (size === 'xs') {
        className += 'text-xs ';
    } else if (size === 'sm') {
        className += 'text-sm ';
    } else if (size === 'lg') {
        className += 'text-lg';
    } else {
        className += 'text-base';
    }

    return (
        <div className="flex items-center w-full relative text-gray-300 focus-within:text-primary border-gray-300 focus-within:border-primary border rounded-md transition-colors">
            {children ? (
                <span
                    className={`absolute ${childrenPosition === 'left' ? 'left-0' : 'right-0'} w-8 h-full 
                pointer-events-none flex items-center justify-center`}
                >
                    {children}
                </span>
            ) : null}
            <input
                name={name}
                className={`w-full min-w-14 outline-none border-none rounded-md px-2 py-1 bg-white ${className} text-primary-font
                    ${childrenPosition === 'right' && 'pr-8'} ${childrenPosition === 'left' && 'pl-8'}`}
                type={type}
                autoComplete="off"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
