import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { WEmpty } from '@/components';

interface WSelectOption<T extends string | number> {
    id: T;
    name: string;
}

interface WSelectProps<T extends string | number> {
    options: WSelectOption<T>[];
    selectedIds: T[];
    multi?: boolean;
    canCreate?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    placeholder?: string;
    onCreateOption?: (name: string) => void;
    onChange?: (selectedIds: T[]) => void;
}

const emptyOptions: WSelectOption<string | number>[] = [];
const emptySelectedIds: (string | number)[] = [];

function WSelect<T extends string | number>({
    options = emptyOptions as WSelectOption<T>[],
    selectedIds = emptySelectedIds as T[],
    multi = false,
    canCreate = false,
    size = 'md',
    placeholder = '请选择',
    onCreateOption,
    onChange,
}: WSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedText, setSelectedText] = useState([] as string[]);
    const createOptionRef = useRef<HTMLInputElement | null>(null);

    // 按钮大小样式
    let className = ' ';
    if (size === 'xs') {
        className += 'text-xs ';
    } else if (size === 'sm') {
        className += 'text-sm ';
    } else if (size === 'lg') {
        className += 'text-lg';
    } else {
        className += 'text-base';
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
    const selectOption = (option: WSelectOption<T>) => {
        if (multi) {
            if (onChange) {
                onChange(
                    selectedIds.includes(option.id)
                        ? selectedIds.filter(id => id !== option.id)
                        : [...selectedIds, option.id]
                );
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
            if (!inputRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="w-full relative text-xs text-primary-font" ref={inputRef}>
            <input
                id="select-input"
                placeholder={placeholder}
                className={`w-full ${className} bg-white border border-gray-300 rounded-md py-1 pl-2 pr-8 outline-none focus:border-primary cursor-pointer`}
                role="combobox"
                aria-haspopup="listbox"
                value={selectedText.join(', ')}
                title={selectedText.join(', ')}
                onClick={toggleList}
                readOnly
            />
            <ChevronDown
                className="absolute right-1 top-[50%] text-gray-300 transform -translate-y-1/2 pointer-events-none"
                strokeWidth={1.25}
                size={20 + 2 * { xs: 0, sm: 1, md: 2, lg: 3 }[size]}
            />
            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-300 
                    rounded-md shadow-sm z-10 py-1"
                >
                    {canCreate && (
                        <li
                            role="option"
                            tabIndex={0}
                            className={`px-2 py-1 ${className} cursor-pointer flex items-center justify-center box-border`}
                        >
                            <input
                                className="border border-gray-200 bg-gray-50 outline-0 p-0.5 w-full text-sm"
                                type="text"
                                ref={createOptionRef}
                            />
                            <Plus
                                className="text-gray-600 w-4 h-4 ml-2 shrink-0"
                                strokeWidth={1.25}
                                size={20 + 2 * { xs: 0, sm: 1, md: 2, lg: 3 }[size]}
                                onClick={() => {
                                    if (!createOptionRef.current) return;
                                    const input = createOptionRef.current;
                                    if (!input.value) return;
                                    if (onCreateOption) {
                                        onCreateOption(input.value);
                                    }
                                    input.value = '';
                                }}
                            />
                        </li>
                    )}
                    {options.length ? (
                        options.map(option => (
                            <li
                                key={option.id}
                                role="option"
                                tabIndex={0}
                                onClick={() => selectOption(option)}
                                className={`px-2 py-1 ${className} cursor-pointer hover:bg-gray-100 ${selectedText.includes(option.name) ? 'bg-gray-100' : ''}`}
                            >
                                {option.name}
                            </li>
                        ))
                    ) : (
                        <div className="h-40">
                            <WEmpty size="xs" content="暂无数据" />
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}

export default WSelect;
