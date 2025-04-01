import { CircleCheck, CircleX, CircleAlert, Info } from 'lucide-react';

interface WMsgProps {
    text?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
}

const IconMap = {
    info: <Info />,
    success: <CircleCheck />,
    warning: <CircleAlert />,
    error: <CircleX />,
} as const;

function WMsg({text = '消息', type = 'info'}: WMsgProps) {
    return <div className={`w-msg w-msg-${type}`}>
        <div className="w-msg-icon">
            {IconMap[type]}
        </div>
        <div className="w-msg-text">{text}</div>
    </div>;
}

export default WMsg;