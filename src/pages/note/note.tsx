import markdownit from 'markdown-it';
import { FormEvent, useState } from 'react'; // 导入 React 和 FormEvent 类型

export default function Note() {

    const md = markdownit();
    // const result = md.render('# markdown-it rulezz!');
    const [mdText, setMdText] = useState('');
 
    function handleInput(event: FormEvent<HTMLDivElement>) {
        const input = event.target as HTMLInputElement;
        console.log(input.innerHTML);
        if(input?.innerHTML) {
            const output = md.render(input.innerHTML);
            console.log(output);
            setMdText(output);
        }
    }

    return <main>
        <div>
            <pre className="font-lxgw">
                凉州词之二（王之涣）<br></br>
            黄河远上白云间，一片孤城万仞山。<br></br>
            羌笛何须怨杨柳，春风不度玉门关。<br></br>
            </pre>
        </div>
        
        <div className='flex gap-4'>
            <div contentEditable={'plaintext-only'} className='w-100 h-100 border' onInput={handleInput}></div>
            <div className='w-100 h-100 border font-lxgw' dangerouslySetInnerHTML={{ __html: mdText }}></div>
        </div>
    </main>;
}
