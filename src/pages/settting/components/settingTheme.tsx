import { WSelect } from '@/components';
import { useTheme } from '@/store';
import { THEME_OPTIONS } from '@/store/modules/theme';
import type { ThemeType } from '@/store/modules/theme';

export default function SettingTheme() {
    const { toggleTheme, mode } = useTheme();

    const handleThemeChange = (theme: ThemeType) => {
        toggleTheme(theme);
    };

    return (
        <div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">主题</div>
                <div className="flex flex-col">
                    <WSelect
                        options={Array.from(THEME_OPTIONS)}
                        selectedIds={[mode]}
                        size="sm"
                        onChange={selectedIds => handleThemeChange(selectedIds[0])}
                    />
                </div>
            </div>
        </div>
    );
}
