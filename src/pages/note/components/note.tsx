export default function Note({ html }: { html: string }) {
    return (
        <div
            className="border-2 border-gray-300 rounded-md p-2 w-full h-full font-lxgw md-container"
            dangerouslySetInnerHTML={{ __html: html }}
        ></div>
    );
}
