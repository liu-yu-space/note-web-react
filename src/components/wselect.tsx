import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface WSelectOption {
    id: string;
    text: string;
}
interface WSelectProps {
    options?: WSelectOption[];
    selectedIds?: string[];
    multi?: boolean;
    onChange?: (optionId: string | string[]) => void;
    placeholder?: string;
}

const emptyOptions: WSelectOption[] = [];
const emptySelectedIds: string[] = []; 
function WSelect({ options = emptyOptions, selectedIds = emptySelectedIds, multi = false, onChange, placeholder = '' }: WSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLUListElement | null>(null);
    const [selectedText, setSelectedText] = useState(options.filter(option => selectedIds.includes(option.id)).map(option => option.text));

    // 打开/关闭下拉框
    const toggleList = () => {
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
        }
    };

    // 关闭弹窗
    const handleClose = () => {
        if (onChange) {
            if (multi) {
                onChange(selectedText.map(text => options.find(option => option.text === text)?.id ?? ''));
            } else {
                onChange(options.find(option => option.text === selectedText[0])?.id ?? '');
            }
        }
        setIsOpen(false);
    };

    // 选择选项
    const selectOption = (option: WSelectOption) => {
        if (multi) {
            if (selectedText.includes(option.text)) {
                setSelectedText(selectedText.filter(text => text !== option.text));
            } else {
                setSelectedText([...selectedText, option.text]);
            }
        } else {
            setSelectedText([option.text]);
            handleClose();
        }
    };

    // 点击其他地方关闭下拉框
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Node;
        
            if (!inputRef.current?.contains(target) && !listboxRef.current?.contains(target)) {
                handleClose();
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className='w-full relative text-xs'>
            <input
                id="select-input"
                placeholder={placeholder}
                className="border border-gray-300 rounded-md py-1 pl-2 pr-8 w-full outline-none focus:border-primary cursor-pointer"
                role="combobox"
                aria-haspopup="listbox"
                value={selectedText.join(', ')}
                title={selectedText.join(', ')}
                onClick={toggleList}
                ref={inputRef}
                readOnly
            />
            <ChevronDown className='absolute right-1 top-0.5 h-6 w-6 text-gray-300' strokeWidth={1} size={16}/>
            {isOpen && (
                <ul ref={listboxRef} role="listbox" 
                    className='absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-300 
                    rounded-md shadow-sm z-10 py-1'>
                    {options.map(option => (
                        <li 
                            key={option.id} 
                            role="option" 
                            tabIndex={0} 
                            onClick={() => selectOption(option)}
                            className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${selectedText.includes(option.text) ? 'bg-gray-100' : ''}`}
                        >
                            {option.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WSelect;
