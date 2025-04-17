import { NotebookText, Pencil } from 'lucide-react';
import { idCreator } from '@/utils/tools';
import { WButton, WTag } from '@/components';
import type { Note } from '@/types';

export default function Timeline({
    notes,
    onEdit,
    onClick,
}: {
    notes: Note[];
    onEdit: (id: number) => void;
    onClick: (id: number) => void;
}) {
    return (
        <ul className="p-4 text-sm text-gray-500 h-full overflow-auto">
            {notes.map(item => (
                <li
                    key={idCreator()}
                    className={`py-8 relative before:content-[''] before:block before:absolute 
                        before:left-4 before:h-full before:w-0.5 before:bg-gray-200 
                        first:before:top-[calc(50%)] last:before:-top-[calc(50%)] ${
                            notes.length === 1 && 'before:hidden'
                        }`}
                >
                    <div
                        className="group timeline-item hover:cursor-pointer hover:bg-primary-shadow pr-6 py-2 pl-8 rounded-sm"
                        onClick={onClick && (() => onClick(item.id))}
                    >
                        <div className="flex items-center gap-1">
                            <NotebookText size={18} strokeWidth={1.25} className="shrink-0" />
                            <h2 className="title">{item.title}</h2>
                            <span className="bg-gray-400 absolute top-[calc(50%-7px)] left-[13px] w-2 h-2 rounded"></span>
                        </div>
                        <div>
                            <div className="my-2">
                                {item.tags.map((tag, i) => (
                                    <WTag key={idCreator()} text={tag.name} hDegree={i * 45}></WTag>
                                ))}
                            </div>
                            <div className="text-gray-400 text-xs">{item.createdDate}</div>
                        </div>
                        <div className="absolute right-0 top-[calc(50%-10px)] opacity-0 group-hover:opacity-100">
                            <WButton type="text" onClick={onEdit && (() => onEdit(item.id))}>
                                <Pencil size={16} strokeWidth={1.25} />
                            </WButton>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
