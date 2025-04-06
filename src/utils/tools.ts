export function idCreator() {
    // 获取当前时间戳
    const timestamp = Date.now().toString(36);

    // 生成一个随机数并转换为36进制字符串
    const random = Math.random().toString(36).substr(2, 9);
  
    // 返回组合后的字符串
    return `${timestamp}-${random}`;
}
