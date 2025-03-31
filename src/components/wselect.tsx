import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface WSelectOption {
    id: string;
    text: string;
}
interface WSelectProps {
    options?: WSelectOption[];
    selectedId?: string;
    onChange?: (optionId: string) => void;
    placeholder?: string;
}

function WSelect({ options = [], selectedId = '', onChange, placeholder = '' }: WSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    // const inputRef = useRef(null);
    // const listboxRef = useRef(null);  
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLUListElement | null>(null);
    const [selectedOption, setSelectedOption] = useState(options.find(option => option.id === selectedId)?.text ?? '');

    const toggleList = () => setIsOpen(!isOpen);

    const selectOption = (option: WSelectOption) => {
        setSelectedOption(option.text);
        setIsOpen(false);
        if (onChange) {
            onChange(option.id);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log(e);
        if (!inputRef?.current?.contains(e.relatedTarget) && !listboxRef?.current?.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    // Ensure that the listbox is closed when focus is lost from both the input and list
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Node;
        
            if (!inputRef.current?.contains(target) && !listboxRef.current?.contains(target)) {
                setIsOpen(false);
            }
            // if (!inputRef.current?.contains(e.target) && !listboxRef.current?.contains(e.target)) {
            //     setIsOpen(false);
            // }
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
                value={selectedOption}
                onClick={toggleList}
                onBlur={handleBlur}
                ref={inputRef}
                readOnly
            />
            <ChevronDown className='absolute right-1 top-1 h-6 w-6 text-gray-300' strokeWidth={1.25} size={16}/>
            {isOpen && (
                <ul ref={listboxRef} role="listbox" 
                    className='absolute w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-sm z-10 py-1'>
                    {options.map(option => (
                        <li 
                            key={option.id} 
                            role="option" 
                            tabIndex={0} 
                            onClick={() => selectOption(option)}
                            className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${selectedOption === option.text? 'bg-gray-100' : ''}`}
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
