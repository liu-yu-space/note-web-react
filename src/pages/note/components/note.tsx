export default function Note({ html }: { html: string }) {
    return (
        <div
            className="p-4 w-full h-full md-container overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
        ></div>
    );
}
