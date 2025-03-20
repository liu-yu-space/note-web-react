import markdownit from 'markdown-it';

export default function note() {

    const md = markdownit();
    const result = md.render('# markdown-it rulezz!');

    console.log(result);

    return <main>
        <div>
            <pre className="font-lxgw">
                凉州词之二（王之涣）<br></br>
            黄河远上白云间，一片孤城万仞山。<br></br>
            羌笛何须怨杨柳，春风不度玉门关。<br></br>
            </pre>
        </div>
    </main>;
}
