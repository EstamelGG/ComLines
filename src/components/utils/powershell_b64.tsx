// Powershell 风格的 b64 编码
export function powerB64Encode(input: string): string {
    const encoder = new TextEncoder();
    const utf16Encoded = encoder.encode(input);
    const utf16Extended = new Uint8Array(utf16Encoded.length * 2);
    utf16Encoded.forEach((byte, index) => {
        utf16Extended[index * 2] = byte;
        utf16Extended[index * 2 + 1] = 0;
    });
    const base64Encoded = btoa(String.fromCharCode.apply(null, utf16Extended));
    return base64Encoded;
}

export function powerB64Decode(input: string): string {
    const utf16Extended = new Uint8Array(atob(input).split('').map((char) => char.charCodeAt(0)));
    const utf16Decoded = new Uint8Array(utf16Extended.length / 2);
    for (let i = 0; i < utf16Decoded.length; i++) {
        utf16Decoded[i] = utf16Extended[i * 2];
    }
    const decoder = new TextDecoder();
    const base64Decoded = decoder.decode(utf16Decoded);
    return base64Decoded;
}