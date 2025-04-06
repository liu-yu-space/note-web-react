import DOMPurify from 'dompurify';
import showdown from 'showdown';

export default function Note({ html }: { html: string }) {
    const converter = new showdown.Converter({
        emoji: true,
        tasklists: true,
        simpleLineBreaks: true,
        strikethrough: true,
        tables: true,
        ghCodeBlocks: true,
        smartIndentationFix: true,
        // 禁用危险功能
        parseImgDimensions: false,
        encodeEmails: true,
        openLinksInNewWindow: true,
        backslashEscapesHTMLTags: false,
        rawHeaderId: false,
        rawPrefixHeaderId: false,
    });
    const dirtyHtml = converter.makeHtml(html);
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);

    return (
        <div
            className="p-4 w-full h-full md-container overflow-auto"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        ></div>
    );
}
