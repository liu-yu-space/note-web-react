export function idCreator() {
    // 获取当前时间戳
    const timestamp = Date.now().toString(36);
    // 生成一个随机数并转换为36进制字符串
    const random = Math.random().toString(36).substr(2, 9);
    // 返回组合后的字符串
    return `${timestamp}-${random}`;
}

// 打印图片到控制台
export function consoleImg(img: string) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = img;
    image.onload = () => {
        const scale = 2; // 放大倍数，可根据需要调整
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.setTransform(scale, 0, 0, scale, 0, 0); // 放大绘制
            ctx.drawImage(image, 0, 0);
            const dataUrl = canvas.toDataURL('image/png', 1);
            console.log(
                '%c ',
                `padding: ${canvas.height / 5}px ${canvas.width / 5}px; background-image: url(${dataUrl}); background-size: contain; background-repeat: no-repeat; background-position: center; user-select: none;`
            );
        }
    };
}