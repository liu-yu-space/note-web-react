import { useState, useEffect } from 'react';

export default function CreateNotePage({ onTextUpdate }: { onTextUpdate: (text: string) => void }) {
    const str = `# H1
## H2
### H3
**bold text**.   
*italicized text*.  
> blockquote.   
    
1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item.   
    \`code\`

---

[title](https://www.example.com)
![alt text](https://cdn01.dcfever.com/articles/news/2015/08/150811_fire_09.jpg)`;
    const [text, setText] = useState(str);

    useEffect(() => {
        onTextUpdate(text);
    }, []);

    return (
        <textarea
            placeholder='正文内容'
            value={text}
            className="p-4 w-full h-full outline-none resize-none overflow-auto bg-gray-50 focus:bg-gray-100 transition-all duration-300"
            onChange={(e) => {
                setText(e.target.value);
                onTextUpdate(e.target.value);
            }}
        />
    );
}
