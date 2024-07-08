export function stringToHex(str: string, head: string=""): string {
    return head + str.split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(head);
}

export function hexToString(hex: string): string {
    const hexes = hex.match(/.{1,2}/g) || [];
    return hexes.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
}
