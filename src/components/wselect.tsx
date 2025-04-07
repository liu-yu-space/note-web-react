import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface WSelectOption {
    id: number;
    name: string;
}
interface WSelectProps {
    options?: WSelectOption[];
    selectedIds?: number[];
    multi?: boolean;
    size?: 'xs' |'sm' |'md' | 'lg';
    onChange?: (optionId: number | number[]) => void;
    placeholder?: string;
}

const emptyOptions: WSelectOption[] = [];
const emptySelectedIds: number[] = [];
function WSelect({
    options = emptyOptions,
    selectedIds = emptySelectedIds,
    multi = false,
    size = 'md',
    onChange,
    placeholder = '请选择',
}: WSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLUListElement | null>(null);
    const [selectedText, setSelectedText] = useState([] as string[]);

    // 按钮大小样式
    let className = " ";
    if (size === "xs") {
        className += "text-xs ";
    } else if (size === "sm") {
        className += "text-sm ";
    } else if (size === "lg") {
        className += "text-lg";
    } else {
        className += "text-base";
    }

    useEffect(() => {
        setSelectedText(
            options.filter(option => selectedIds.includes(option.id)).map(option => option.name)
        );
    }, [options, selectedIds]);

    // 打开/关闭下拉框
    const toggleList = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    // 选择选项
    const selectOption = (option: WSelectOption) => {
        if (multi) {
            if (onChange) {
                onChange(selectedIds.includes(option.id) ? selectedIds.filter(id => id!== option.id) : [...selectedIds, option.id]);
            }
        } else {
            if (onChange) {
                onChange([option.id]);
            }
            setIsOpen(false);
        }
    };

    // 点击其他地方关闭下拉框
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!inputRef.current?.contains(target) && !listboxRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="w-full relative text-xs">
            <input
                id="select-input"
                placeholder={placeholder}
                className={`w-full ${className} bg-white border border-gray-300 rounded-md py-1 pl-2 pr-8 outline-none focus:border-primary cursor-pointer`}
                role="combobox"
                aria-haspopup="listbox"
                value={selectedText.join(', ')}
                title={selectedText.join(', ')}
                onClick={toggleList}
                ref={inputRef}
                readOnly
            />
            <ChevronDown
                className="absolute right-1 top-[50%] text-gray-300 transform -translate-y-1/2 pointer-events-none"
                strokeWidth={1.25}
                size={20 + 2 * { xs: 0, sm: 1, md: 2, lg: 3 }[size]}
            />
            {isOpen && (
                <ul
                    ref={listboxRef}
                    role="listbox"
                    className="absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-300 
                    rounded-md shadow-sm z-10 py-1"
                >
                    {options.map(option => (
                        <li
                            key={option.id}
                            role="option"
                            tabIndex={0}
                            onClick={() => selectOption(option)}
                            className={`px-2 py-1 ${className} cursor-pointer hover:bg-gray-100 ${selectedText.includes(option.name) ? 'bg-gray-100' : ''}`}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WSelect;
