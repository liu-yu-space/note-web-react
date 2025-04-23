import { NotebookText, Pencil } from 'lucide-react';
import { idCreator } from '@/utils/tools';
import { WButton, WTag } from '@/components';
import type { Note } from '@/types';
import { useUser } from '@/store';
import { formatTime } from '@/utils';
import { useEffect, useState } from 'react';

export default function Timeline({
    notes,
    onEdit,
    onClick,
}: {
    notes: Note[];
    onEdit: (id: number) => void;
    onClick: (id: number) => void;
}) {
    const [currentId, setCurrentId] = useState<number | null>(null);
    useEffect(() => {
        if (notes.length > 0) {
            setCurrentId(notes[0].id);
        }
    }, [notes]);
    const handleClick = (id: number) => {
        setCurrentId(id);
        onClick(id);
    };
    const { isLoggedIn } = useUser();

    return (
        <ul className="p-4 text-sm text-gray-500 h-full overflow-auto">
            {notes.map(item => (
                <li
                    key={item.id}
                    className={`py-8 relative before:content-[''] before:block before:absolute 
                        before:left-4 before:h-2/4 before:w-0.5 before:bg-gray-200 before:top-0
                        after:block after:absolute 
                        after:left-4 after:h-2/4 after:w-0.5 after:bg-gray-200 
                        after:top-1/2 first:before:h-0 last:after:h-0`}
                >
                    <div
                        className="group timeline-item hover:cursor-pointer hover:bg-primary-shadow pr-6 py-2 pl-8 rounded-sm"
                        onClick={() => handleClick(item.id)}
                    >
                        <div className="flex items-center gap-1">
                            <NotebookText size={18} strokeWidth={1.25} className="shrink-0" />
                            <h2 className="title">{item.title}</h2>
                            <span
                                className={`${currentId === item.id ? 'bg-primary' : 'bg-gray-400'} absolute top-[calc(50%-7px)] left-[13px] w-2 h-2 rounded z-10`}
                            ></span>
                        </div>
                        <div>
                            <div className="my-2">
                                {item.tags.map((tag, i) => (
                                    <WTag key={idCreator()} text={tag.name} hDegree={i * 45}></WTag>
                                ))}
                            </div>
                            <div className="text-gray-400 text-xs">
                                {formatTime(item.createdDate)}
                            </div>
                        </div>
                        {isLoggedIn && (
                            <div className="absolute -right-0.5 top-[calc(50%-10px)] opacity-0 group-hover:opacity-100">
                                <WButton type="text" onClick={onEdit && (() => onEdit(item.id))}>
                                    <Pencil size={16} strokeWidth={1.25} />
                                </WButton>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
