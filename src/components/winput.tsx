import { Search } from "lucide-react";

interface WInputProps {
    placeholder?: string;
    size?: "small" | "default" | "large";
}

export default function WInput({placeholder = '', size = "default"}: WInputProps) {
    const mapSize = {
        small: "text-xs",
        default: "text-sm",
        large: "text-base"
    };

    const className = `${mapSize[size]}`;

    return (
        <div className="flex items-center w-full relative text-primary-font">
            <input
                className={`w-full min-w-14 rounded-md outline-none border border-gray-300 px-2 py-1 
                    focus:border-primary transition-colors pr-8 ${className}`}
                type="text" 
                placeholder={placeholder}
            />
            <Search size="16" className="absolute right-2" />
        </div>
    );
};
