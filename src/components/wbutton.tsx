interface ButtonProps {
    onClick?: () => void;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    type?: 'default' | 'text';
    originalType?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
}

export default function WButton({
    onClick,
    type = 'default',
    originalType = 'button',
    size = 'md',
    children,
}: ButtonProps) {
    // 按钮基础样式
    const publicClassName =
        'shrink-0 py-1 px-2 cursor-pointer flex items-center justify-center transition-colors ';

    // 按钮类型样式
    let className =
        'rounded-[4px] bg-primary text-white hover:bg-primary-light active:bg-primary hover:shadow-sm ';
    if (type === 'text') {
        className = 'text-primary-font rounded-[4px] hover:text-primary-light active:text-primary ';
    }

    // 按钮大小样式
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
        <button type={originalType} className={publicClassName + className} onClick={onClick}>
            {children}
        </button>
    );
}
