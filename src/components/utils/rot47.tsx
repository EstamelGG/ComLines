export function rot47encode(input: string): string {
    return input.replace(/[\x21-\x7E]/g, (char) => {
        let code = char.charCodeAt(0);
        code = ((code - 33 + 47) % 94) + 33;
        return String.fromCharCode(code);
    });
}
