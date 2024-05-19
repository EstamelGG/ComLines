export function utf8String(input: string): string {
    const utf8Bytes = new TextEncoder().encode(input);
    // 将字节数组转换为二进制字符串
    let binaryString = '';
    utf8Bytes.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });
    return binaryString;
}