interface WCheckboxProps {
    onText?: string;
    offText?: string;
    onColor?: string;
    offColor?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function WSwitch({
    onText = "On", offText = "Off", 
    onColor = "#40a070", offColor = "gray", 
    checked = false, onChange}: WCheckboxProps) {

    const text = checked ? onText : offText;
    const color = checked ? onColor : offColor;

    return <div 
        className={`inline-flex rounded-full bg-blue-400 p-0.5 text-white text-sm cursor-pointer select-none
            items-center w-16 justify-between relative ${checked ? "" : "justify-end"}`}
        style={{backgroundColor: color}}
        onClick={() => onChange && onChange(!checked)}
    >
        <span className={`block px-2 ${checked ? "animate-switch_" : "animate-switch"}`}>{text}</span> 
        <span className={`absolute right-0.5 block w-4 h-4 mx-0.5 rounded-full bg-white shadow-inner transition-transform 
            duration-200 ${checked ? "" : "-translate-x-10"}`}></span>
    </div>;
}   
