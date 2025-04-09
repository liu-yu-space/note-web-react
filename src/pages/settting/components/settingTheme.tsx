import { WSelect } from '@/components';
import { useTheme } from '@/store';

const options = [
    {
        id: 'light',
        name: '浅色',
    },
    {
        id: 'dark',
        name: '深色',
    },
    {
        id: 'system',
        name: '跟随系统',
    },
];

export default function SettingTheme() {
    const { toggleTheme, mode } = useTheme();

    const handleThemeChange = () => {
        toggleTheme();
    };

    return (
        <div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">主题</div>
                <div className="flex flex-col">
                    <WSelect
                        options={options}
                        selectedIds={[mode]}
                        size="sm"
                        onChange={() => handleThemeChange()}
                    />
                </div>
            </div>
        </div>
    );
}
