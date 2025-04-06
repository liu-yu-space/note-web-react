import { useState, useEffect } from 'react';
import Editor from './components/editor_';
import Note from './components/note';
import { Save } from 'lucide-react';
import { WButton, WSwitch, WSelect } from '@/components';
import { useNavigate } from 'react-router-dom';
import http from '@/lib/http';
import type { Tag, FullNote } from '@/types';
import { useMsgContext } from '@/components/wmsg/createContext';
import { useParams } from 'react-router-dom';

export default function CreateNotePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addMsg } = useMsgContext();
    const [savedNote, setSavedNote] = useState<FullNote | null>(null);

    // 获取笔记详情
    useEffect(() => {
        if (id) {
            void http<FullNote>(`/api/note/${id}`).then(res => {
                addMsg('笔记查询成功', 'success', 3000);
                console.log(res);
                setSavedNote(res);
                setTitle(res.title);
                setContent(res.content);
                setTagIds(res.tags.map(tag => tag.id));
                setIsPublic(res.isPublic);
            });
        }
    }, [id, addMsg]);

    // 获取标签列表
    const [tags, setTags] = useState<Tag[]>([]);
    useEffect(() => {
        void http<Tag[]>('/api/note/tag').then(res => {
            console.log(res);
            setTags(res);
        });
    }, []);

    // 标题
    const [title, setTitle] = useState('');

    // 内容
    const [content, setContent] = useState('');
    const [html, setHtml] = useState('');

    const updateText = function (text: string) {
        const trimmedText = text.trim();
        setContent(trimmedText);
        setHtml(trimmedText);
    };

    // 公开/私密
    const [isPublic, setIsPublic] = useState(false);
    function handleClick() {
        setIsPublic(!isPublic);
    }

    // 选择标签
    const [tagIds, setTagIds] = useState<number[]>([]);
    const handleSelect = (optionId: number | number[]) => {
        setTagIds(Array.isArray(optionId) ? optionId : [optionId]);
    };

    // 保存笔记
    const saveNote = function () {
        // 校验
        if (!title) {
            addMsg('标题不能为空', 'error', 3000);
            return;
        }
        if (!content) {
            addMsg('内容不能为空', 'error', 3000);
            return;
        }
        if (!tagIds.length) {
            addMsg('标签不能为空', 'error', 3000);
            return;
        }
        const data = {
            id: savedNote?.id,
            title: title,
            content: content,
            tagIds: tagIds,
            isPublic: isPublic,
        };
        void http<FullNote>('/api/note' + (data.id ? `/${data.id}` : ''), {
            body: JSON.stringify(data),
            method: data.id ? 'PUT' : 'POST',
        }).then(res => {
            addMsg('笔记保存成功', 'success', 3000);
            console.log(res);
            setSavedNote(res);
        });
    };
    return (
        <div className="flex h-full relative">
            <div className="w-1/2 h-full p-4 flex flex-col">
                <input
                    type="text"
                    placeholder="标题内容"
                    value={title}
                    onChange={e => setTitle(e.target.value.trim())}
                    className="w-full mb-4 p-4 border-gray-300 outline-none bg-gray-50 focus:bg-gray-100 transition-all duration-300"
                />
                <Editor onTextUpdate={updateText} />
            </div>
            <hr className="origin-top-left rotate-90 absolute w-[calc(100vh-2rem)] left-[50%] text-gray-300 top-4" />
            <div className="w-1/2 h-full p-4 flex flex-col">
                <div className="flex items-center gap-4 justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <WSwitch
                            checked={isPublic}
                            onText="公开"
                            offText="草稿"
                            onChange={handleClick}
                        />
                        <WSelect
                            options={tags}
                            selectedIds={tagIds}
                            multi={true}
                            placeholder="选择标签"
                            onChange={handleSelect}
                        />
                        <WButton type="text" handleClick={saveNote}>
                            <Save size={22} strokeWidth={1.25} />
                        </WButton>
                    </div>
                    <WButton handleClick={() => void navigate('/note')}>返回列表</WButton>
                </div>
                <Note html={html} />
            </div>
        </div>
    );
}
