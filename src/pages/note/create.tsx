import { useState, useEffect, useCallback } from 'react';
import Editor from './components/editor';
import Note from './components/note';
import { Save } from 'lucide-react';
import { WButton, WSwitch, WSelect } from '@/components';
import { useNavigate } from 'react-router-dom';
import type { Tag, FullNote } from '@/types';
import { useMessage } from '@/store';
import { useParams } from 'react-router-dom';
import { useHttp } from '@/hooks/useHttp';

export default function CreateNotePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addMsg } = useMessage();
    const [savedNote, setSavedNote] = useState<FullNote | null>(null);
    const http = useHttp();

    // 获取笔记详情
    useEffect(() => {
        if (id !== undefined) {
            void http({
                url: `/api/note/${id}`,
                method: 'GET',
            }).then(res => {
                const note = res as FullNote;
                addMsg('笔记查询成功', 'success', 3000);
                setSavedNote(note);
                setTitle(note.title);
                setContent(note.content);
                setTagIds(note.tags.map((tag: Tag) => tag.id));
                setIsPublic(note.isPublic);
            });
        }
    }, [id, addMsg, http]);

    // 获取标签列表
    const [tags, setTags] = useState<Tag[]>([]);
    useEffect(() => {
        void http({ url: '/api/note/tag' }).then(res => {
            setTags(res as Tag[]);
        });
    }, [http]);

    // 标题
    const [title, setTitle] = useState('');

    // 内容
    const [content, setContent] = useState('');
    // const [html, setHtml] = useState('');

    const updateText = useCallback(function (text: string) {
        const trimmedText = text;
        setContent(trimmedText);
    }, []);

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
        void http({
            url: '/api/note' + (data.id ? `/${data.id}` : ''),
            body: JSON.stringify(data),
            method: data.id ? 'PUT' : 'POST',
        }).then(res => {
            const note = res as FullNote;
            addMsg('笔记保存成功', 'success', 3000);
            setSavedNote(note);
        });
    };

    // 创建标签
    const handleCreateTag = function (name: string) {
        if (!name) {
            return;
        }
        const data = {
            name: name,
        };
        void http({
            url: '/api/note/tag',
            body: JSON.stringify(data),
            method: 'POST',
        }).then(res => {
            const tag = res as Tag;
            addMsg('标签创建成功', 'success', 3000);
            setTags([...tags, tag]);
            setTagIds([...tagIds, tag.id]);
        });
    };
    return (
        <div className="flex h-full relative">
            <div className="w-1/2 h-full p-4 flex flex-col">
                <input
                    type="text"
                    placeholder="标题内容"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full mb-4 p-4 outline-none bg-gray-50 transition-all duration-300 border border-gray-50 focus:border-primary"
                />
                <Editor onTextUpdate={updateText} text={content} />
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
                            canCreate={true}
                            size="sm"
                            placeholder="选择标签"
                            onChange={handleSelect}
                            onCreateOption={handleCreateTag}
                        />
                        <WButton type="text" onClick={saveNote}>
                            <Save size={22} strokeWidth={1.25} />
                        </WButton>
                    </div>
                    <WButton onClick={() => void navigate('/note')}>返回列表</WButton>
                </div>
                <Note html={content} />
            </div>
        </div>
    );
}
