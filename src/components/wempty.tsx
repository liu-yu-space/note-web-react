import { PackageOpen } from 'lucide-react';

export default function WEmpty({
    size = 'sm',
    content = '暂无数据',
}: {
    size: 'xs' | 'sm' | 'md' | 'lg';
    content?: string;
}) {
    const sizeClass = {
        xs: 40,
        sm: 50,
        md: 60,
        lg: 70,
    }[size];
    const textClass = {
        xs: 'text-xs mt-2.5',
        sm: 'text-sm mt-3',
        md: 'text-base mt-3.5',
        lg: 'text-lg mt-4',
    }[size];
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center text-gray-300`}>
            <PackageOpen size={sizeClass} strokeWidth={1} />
            <div className={`${textClass} select-none`}>{content}</div>
        </div>
    );
}
