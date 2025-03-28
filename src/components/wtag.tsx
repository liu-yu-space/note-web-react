interface WTagProps {
    text?: string;
    hDegree?: number | undefined; // 色相(0-360)
}

// 基础颜色
const baseColor = "oklch(79.22% 0.09 0)";
// 颜色函数
const createColor = function(h: number | undefined) {
    h = h ?? Math.floor(Math.random() * 360);
    return `oklch(from ${baseColor} l c ${h})`;
};

export default function WTag({text = '标签', hDegree}: WTagProps) {
    return <div 
        className="text-white rounded-sm px-1 py-0.5 mr-2 mb-2 text-xs inline-block"
        style={{backgroundColor: createColor(hDegree)}}>{text}
    </div>;
}
