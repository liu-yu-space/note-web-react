import { WButton, WInput, WEmpty } from '@/components';
import Timeline from './components/timeline';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Note as NoteType, FullNote } from '@/types';
import Note from './components/note';
import { formatTime } from '@/utils';
import { useUser } from '@/store';
import { useHttp } from '@/hooks/useHttp';

export default function NotePage() {
    const { isLoggedIn } = useUser();
    const navigate = useNavigate();
    const http = useHttp();

    const handleClick = () => {
        // 这里使用profile接口进行token验证
        http({
            url: `/api/auth/profile`,
            method: 'GET',
        })
            .then(() => {
                void navigate('/note/create');
            })
            .catch(() => {
                // 如果验证失败，跳转到登录页面
                // void navigate('/login');
            });
    };

    // 编辑笔记
    const handleEdit = (id: number) => {
        void navigate(`/note/edit/${id}`);
    };

    // 获取笔记列表
    const [notes, setNotes] = useState([] as NoteType[]);
    useEffect(() => {
        void http({
            url: '/api/note' + '?onlyPublic=false',
        }).then(res => {
            setNotes(res as NoteType[]);
        });
    }, []);

    // 当前的笔记
    const [currentNote, setCurrentNote] = useState({} as FullNote);
    const [currentNoteId, setCurrentNoteId] = useState(undefined as number | undefined);
    useEffect(() => {
        if (notes.length > 0 || currentNoteId) {
            void http({
                url: '/api/note/' + (currentNoteId ?? notes[0].id),
            }).then(res => {
                setCurrentNote(res as FullNote);
            });
        }
    }, [notes, currentNoteId]);

    // 点击笔记
    const handleNoteClick = (id: number) => {
        setCurrentNoteId(id);
    };

    // 搜索笔记
    const handleSearch = (value: string) => {
        void http({
            url: '/api/note/search' + '?onlyPublic=false&title=' + value,
        }).then(res => {
            setNotes(res as NoteType[]);
        });
    };

    return (
        <div className="flex w-full h-full relative">
            <div className="w-full flex justify-center overflow-auto">
                <section className="w-[800px] p-8 relative h-fit">
                    <h1 className="text-xl mb-4 text-center">{currentNote?.title ?? ''}</h1>
                    <h3 className="text-sm mb-4 text-gray-500 text-center">
                        {currentNote?.createdDate ? formatTime(currentNote.createdDate) : ''}
                    </h3>
                    <article>
                        <Note html={currentNote?.content ?? ''} />
                    </article>
                </section>
                {!currentNote?.content && (
                    <div className="absolute w-full h-full top-0 left-0">
                        <WEmpty size="lg" content="暂无笔记，点击右上角创建一个吧" />
                    </div>
                )}
            </div>
            <aside
                className="flex flex-col top-0 z-50 right-0 w-[calc(50%-400px)] min-w-[250px] 
                    max-w-[400px] h-full hover:opacity-100 
                    opacity-20 transition-opacity duration-300 absolute"
            >
                <div className="flex items-center p-4 gap-3">
                    <WInput
                        placeholder="搜索"
                        childrenPosition="right"
                        size="sm"
                        onChange={e => handleSearch(e.target.value)}
                    >
                        <Search size="18" color="#aaa" />
                    </WInput>
                    {isLoggedIn && (
                        <WButton onClick={handleClick}>
                            <Plus size="16" />
                            新笔记
                        </WButton>
                    )}
                </div>
                <Timeline onEdit={handleEdit} onClick={handleNoteClick} notes={notes} />
            </aside>
        </div>
    );
}
