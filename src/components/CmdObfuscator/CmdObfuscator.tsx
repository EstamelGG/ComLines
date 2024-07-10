import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown, Checkbox } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined, SwapOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { utf8String } from '../utils/utf8String';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

function generateRandomString(n) {
    if (n == 0) {
        n = 1;
    }
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < n; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function w_quo(inputString: string) {
    // curl "http://127.0.0.1:8000/test?a=kkk" -A "test asd" & whoami
    // certutil.exe -urlcache -split -f "http://7-zip.org/a/7z1604-x64.exe" 7zip.exe
    // dir "c:\program files"& whoami
    // whoami /all
    // "c:\windows\system32\cmd.exe" /c "whoami /all"

    const regex = /[a-zA-Z0-9\.]{4,8}/g;

    // Replace function to insert quotes
    const result = inputString.replace(regex, match => {
        if (match.length >= 4) {
            // Insert quotes before the 2nd and 3rd characters
            return match.slice(0, 2) + '"' + match.slice(2, 4) + '"' + match.slice(4);
        } else {
            return match; // No change if the match length is less than 4
        }
    });
    // console.log(result)
    return result
}


function w_Carets(inputString: string) {
    let result = '';
    let quoteCount = 0;

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (char === '"') {
            quoteCount++;
            result += char;
        } else {
            if (/[0-9a-zA-Z\.]/.test(char)) {
                if (quoteCount % 2 === 0 && Math.random() < 0.5) {
                    result += '^';
                }
            }
            result += char;
        }
    }

    //console.log(result)
    return result
}

function w_variableConcat(inputString: string) {
    // Helper function to generate a random 4-character string
    function generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Function to find a suitable split index ensuring no trailing '^'
    function findSplitIndex(str: string, start: number, end: number) {
        let index;
        do {
            index = Math.floor(Math.random() * (end - start)) + start;
        } while (str.charAt(index - 1) === '^');
        return index;
    }

    // Randomly split the input string into 3 parts ensuring no trailing '^'
    const length = inputString.length;
    const splitIndex1 = findSplitIndex(inputString, 1, length - 2);
    const splitIndex2 = findSplitIndex(inputString, splitIndex1 + 1, length - 1);

    const part1 = inputString.substring(0, splitIndex1);
    const part2 = inputString.substring(splitIndex1, splitIndex2);
    const part3 = inputString.substring(splitIndex2);

    // Generate random 4-character strings for a, b, c
    const varA = generateRandomString(4);
    const varB = generateRandomString(4);
    const varC = generateRandomString(4);

    // Construct the result
    const result = `set ${varA}=${part1}\nset ${varB}=${part2}\nset ${varC}=${part3}\n%${varA}%%${varB}%%${varC}%`;

    return result;
}

const toHex = (char) => {
    return `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`;
};

const toOctal = (char) => {
    return `\\${char.charCodeAt(0).toString(8).padStart(3, '0')}`;
};

const isPunctuation = (char) => {
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    return punctuation.includes(char);
};

function L_tab(inputString: string) {
    let encodedString = '';
    let insideQuotes = false; // Flag to track if currently inside quotes

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        // Check if character is a quote
        if (char === '"' || char === "'") {
            insideQuotes = !insideQuotes; // Toggle insideQuotes flag
        }

        // Replace space with tab if not inside quotes
        if (char === ' ' && !insideQuotes && Math.random() < 0.5) {
            encodedString += '\t';
        } else {
            encodedString += char;
        }
    }

    return encodedString;
}

function L_enc(inputString: string, doHex, doOct) {
    let encodedString = '';
    if (inputString.length === 0) { return encodedString; }
    if (!(doHex || doOct)) {return encodedString;}
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (char === '\t' || char === ' ') {
            // Encode \t or space characters to hex
            if (doHex) {encodedString += toHex(char);}
            else {encodedString += toOctal(char);}
        } else if (isPunctuation(char)) {
            // Encode punctuation marks to hex
            if (doHex) {encodedString += toHex(char);}
            else {encodedString += toOctal(char);}
        } else {
            // Character is not \t, space, or punctuation mark
            if (Math.random() < 0.5) {
                // Decide whether to encode
                if (Math.random() < 0.3) {
                    // Encode as hex with 30% probability
                    if (doHex) { encodedString += toHex(char); } else {encodedString += char}
                } else {
                    // Encode as octal with 70% probability
                    if (doOct) { encodedString += toOctal(char); } else {encodedString += char}
                }
            } else {
                // Do not encode, just append
                encodedString += char;
            }
        }
    }

    return `sh -c $'${encodedString}'`;
}

const CmdObfuscator = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { TextArea } = Input;
    const { t } = useTranslation();
    const successCopy = () => {
        message.success('Your payload has been copied successfully !');
    };
    const handleChange = (_name: string) => (event: { target: { value: React.SetStateAction<string> } }) => {
        setInput(event.target.value);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const handleClick = (type: string) => {
        let errorMessage;
        let output = utf8String(input);
        switch (type) {
            case "WinCMD":
                // Your Windows obfuscation logic here
                if (options.quote) {
                    output = w_quo(output);
                }
                if (options.Carets) {
                    output = w_Carets(output);
                }
                if (options.variableConcat) {
                    output = w_variableConcat(output);
                }
                break;
            case "Linux":
                // Your Linux obfuscation logic here
                if (options.tab) {
                    output = L_tab(output);
                }
                if (options.hexencoded || options.octencoded) {
                    output = L_enc(output, options.hexencoded, options.octencoded);
                }
                break;
        }
        setOutput(errorMessage ? "Unable to obfuscate properly: " + errorMessage : output);
        if (errorMessage) {
            message.error(errorMessage);
        }
    };

    const [sysType, setSysType] = useState('Linux');
    const [options, setOptions] = useState({
        quote: true,
        Carets: true,
        tab: true,
        hexencoded: true,
        octencoded: true,
        variableConcat: false,
    });

    const handleSysTypeList = (type: { key: React.SetStateAction<string | any> }) => {
        setSysType(type.key.toString());
        if (type.key === 'Linux') {
            setOptions({
                quote: false,
                Carets: false,
                tab: true,
                hexencoded: true,
                octencoded: true,
                variableConcat: false,
            });
        } else if (type.key === 'WinCMD') {
            setOptions({
                quote: true,
                Carets: true,
                tab: false,
                hexencoded: false,
                octencoded: false,
                variableConcat: true,
            });
        }
    };

    const menu = (
        <Menu onClick={handleSysTypeList}>
            <Menu.Item key='WinCMD'>Windows CMD</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='Linux'>Linux</Menu.Item>
        </Menu>
    );

    document.title = `${t('cmd_obfuscate')} - HackTrick Checklist`;

    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('cmd_obfuscate')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                {t('cmd_obfuscate_desc')}
            </Paragraph>
            <Divider dashed />
            <div
                key='a'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={4}
                    value={input}
                    onChange={handleChange('input')}
                    placeholder='Command Line to process...'
                />

                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {sysType} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>

                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleClick(sysType)}
                >
                    <IconFont type='icon-lock' />
                    {t('process')}
                </Button>

                <div style={{ marginTop: 15 }}>
                    <Checkbox
                        checked={options.quote}
                        disabled={sysType !== 'WinCMD'}
                        onChange={() => setOptions({ ...options, quote: !options.quote })}
                    >
                        {t('quotation')}
                    </Checkbox>
                    <Checkbox
                        checked={options.Carets}
                        disabled={sysType !== 'WinCMD'}
                        onChange={() => setOptions({ ...options, Carets: !options.Carets })}
                    >
                        {t('Carets')}
                    </Checkbox>
                    <Checkbox
                        checked={options.variableConcat}
                        disabled={sysType !== 'WinCMD'}
                        onChange={() => setOptions({ ...options, variableConcat: !options.variableConcat })}
                    >
                        {t('variable')}
                    </Checkbox>
                    <Checkbox
                        checked={options.hexencoded}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, hexencoded: !options.hexencoded })}
                    >
                        Hex Encode
                    </Checkbox>
                    <Checkbox
                        checked={options.octencoded}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, octencoded: !options.octencoded })}
                    >
                        Oct Encode
                    </Checkbox>
                    <Checkbox
                        checked={options.tab}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, tab: !options.tab })}
                    >
                        Tab
                    </Checkbox>
                </div>

                {/* <Button
                    icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    onClick={(e) => {
                        handleSwitchButtonClick();
                    }}
                >
                    {t('misc_switch')}
                </Button> */}
            </div>
            <div
                key='b'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={4}
                    value={output}
                    style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
                    placeholder='The results will appear here'
                />
                <Clipboard component='a' data-clipboard-text={output}>
                    <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successCopy}>
                        <CopyOutlined /> {t('misc_copy')}
                    </Button>
                </Clipboard>
                <Button
                    danger
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => clearAll()}
                >
                    <ClearOutlined /> {t('misc_clear')}
                </Button>
            </div>
        </div>
    );
};

export default CmdObfuscator;
