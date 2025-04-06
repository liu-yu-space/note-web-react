import { WButton, WInput } from '@/components';
import Timeline from './components/timeline';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Note as NoteType, FullNote } from '@/types';
import http from '@/lib/http';
import Note from './components/note';
import { formatTime } from '@/utils';

export default function NotePage() {
    const navigate = useNavigate();
    const handleClick = () => {
        void navigate('/note/create');
    };

    // 编辑笔记
    const handleEdit = (id: number) => {
        void navigate(`/note/edit/${id}`);
    };

    // 获取笔记列表
    const [notes, setNotes] = useState([] as NoteType[]);
    useEffect(() => {
        void http('/api/note' + '?onlyPublic=false').then(res => {
            setNotes(res as NoteType[]);
        });
    }, []);

    // 当前的笔记
    const [currentNote, setCurrentNote] = useState({} as FullNote);
    const [currentNoteId, setCurrentNoteId] = useState(undefined as number | undefined);
    useEffect(() => {
        if (notes.length > 0 || currentNoteId) {
            void http('/api/note/' + (currentNoteId ?? notes[0].id)).then(res => {
                setCurrentNote(res as FullNote);
            });
        }
    }, [notes, currentNoteId]);

    // 点击笔记
    const handleNoteClick = (id: number) => {
        console.log('handleNoteClick', id);
        setCurrentNoteId(id);
    };

    return (
        <div className="flex w-full h-full justify-center relative overflow-auto">
            <section className="w-[800px] p-8">
                <h1 className="text-xl mb-4 text-center">{currentNote?.title ?? ''}</h1>
                <h3 className="text-sm mb-4 text-gray-500 text-center">
                    {currentNote?.createdDate ? formatTime(currentNote.createdDate) : ''}
                </h3>
                <article>
                    <Note html={currentNote?.content ?? ''} />
                </article>
            </section>
            <aside
                className="flex flex-col fixed top-0 z-50 right-0 w-[calc(50%-400px)] min-w-[250px] 
                    max-w-[400px] h-full hover:opacity-100 
                    opacity-10 transition-opacity duration-300"
            >
                <div className="flex items-center p-4 gap-3">
                    <WInput placeholder="搜索" />
                    <WButton handleClick={handleClick}>
                        <Plus size="16" />
                        新笔记
                    </WButton>
                </div>
                <Timeline onEdit={handleEdit} onClick={handleNoteClick} notes={notes} />
            </aside>
        </div>
    );
}
