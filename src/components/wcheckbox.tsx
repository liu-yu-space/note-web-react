interface WCheckboxProps {
    text: string;
}

export default function WCheckbox({text}: WCheckboxProps) {
    return <div className="inline-flex">
        <input type="checkbox" name={text} />
    </div>;
}
