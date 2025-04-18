interface WCheckboxProps {
    onText?: string;
    offText?: string;
    onColor?: string;
    offColor?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function WSwitch({
    onText = "", offText = "", 
    onColor = "#40a070", offColor = "gray", 
    checked = false, onChange}: WCheckboxProps) {

    const text = checked ? onText : offText;
    const color = checked ? onColor : offColor;

    return <div 
        className={`inline-flex h-5 rounded-full bg-blue-400 p-0.5 text-white text-sm cursor-pointer select-none
            items-center w-14 shrink-0 justify-between relative ${checked ? "" : "justify-end"}`}
        style={{backgroundColor: color}}
        onClick={() => onChange && onChange(!checked)}
    >
        <span className={`block text-xs px-1.5 ${checked ? "animate-switch_" : "animate-switch"}`}>{text}</span> 
        <span className={`absolute right-0 block w-4 h-4 mx-0.5 rounded-full bg-white shadow-inner transition-transform 
            duration-300 ${checked ? "" : "-translate-x-9"}`}></span>
    </div>;
}   
