import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined, SwapOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { utf8String } from '../utils/utf8String';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

function toHex(str: string, head: string = '') {
    var result: string = '';
    for (var i: number = 0; i < str.length; i++) {
        var hex: string = str.charCodeAt(i).toString(16).toUpperCase();
        //console.log(hex)
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        if (head.length != 0) {
            hex = head + hex;
        }
        result += hex;
    }
    return result;
}

function removeHexPrefix(hex: string): string {
    if (hex.includes("\\x")) {
        return hex.split("\\x").join("");
    }
    return hex;
}

function hex2a(hex: string) {
    var str: string = '';
    if (hex.includes("\\x")) {
        hex = removeHexPrefix(hex)
    }
    for (var i: number = 0; i < hex.length; i += 2) {
        var code: number = parseInt(hex.substr(i, 2), 16);
        if (!isNaN(code)) {
            str += String.fromCharCode(code);
        }
    }
    return str;
}


const TextEncoder = () => {
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

    const handleSwitchButtonClick = () => {
        setInput(output);
        setOutput(input);
    };

    const handleClick = (type: string) => {
        let output;
        let errorMessage;
        const binaryString = utf8String(input)
        //console.log(binaryString)
        switch (type) {
            case "encode":
                switch (encMode) {
                    case "Base64":
                        output = btoa(binaryString);
                        break;
                    case "URL":
                        try {
                            output = encodeURI(binaryString);
                        } catch (error) {
                            errorMessage = "Incorrect format, please try something else.";
                        }
                        break;
                    case "Hexadecimal":
                        try {
                            output = toHex(binaryString);
                        } catch (error) {
                            errorMessage = "Incorrect Hex, please try something else.";
                        }
                        break;
                    case "Hexadecimal(\\x)":
                        try {
                            output = toHex(binaryString, "\\x");
                        } catch (error) {
                            errorMessage = "Incorrect Hex, please try something else.";
                        }
                        break;
                }
                break;
            case "decode":
                switch (encMode) {
                    case "Base64":
                        try {
                            output = atob(binaryString);
                        } catch (ex) {
                            errorMessage = "Incorrect Base64, please try something else.";
                        }
                        break;
                    case "URL":
                        try {
                            output = decodeURI(binaryString);
                        } catch (ex) {
                            errorMessage = "Incorrect URL, please try something else.";
                        }
                        break;
                    case "Hexadecimal":
                        try {
                            output = hex2a(binaryString);
                        } catch (ex) {
                            errorMessage = "Incorrect hexadecimal, please try something else.";
                        }
                        break;
                    case "Hexadecimal(\\x)":
                        try {
                            output = hex2a(binaryString);
                        } catch (ex) {
                            errorMessage = "Incorrect hexadecimal, please try something else.";
                        }
                        break;
                }
                break;
        }
        setOutput(errorMessage ? "Unable to decode properly: " + errorMessage : output);
        if (errorMessage) {
            message.error(errorMessage);
        }
    };
    const [encMode, setEncmode] = useState('Base64');

    const handleEncModeList = (type: { key: React.SetStateAction<string | any> }) => {
        setEncmode(type.key.toString());
    };

    const menu = (
        <Menu onClick={handleEncModeList}>
            <Menu.Item key='Base64'>Base64</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='URL'>URL</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='Hexadecimal'>Hexadecimal</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='Hexadecimal(\\x)'>Hexadecimal(\x)</Menu.Item>
        </Menu>
    );
    document.title = `${t('data_encoder_title')} - HackTrick Checklist`;
    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('data_encoder_title')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                {t('data_encoder_desc')}
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
                    placeholder='Some Base64 or ASCII Text to Encode / Decode / Quote escape...'
                />

                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {encMode} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>

                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleClick('encode')}
                >
                    <IconFont type='icon-lock' />
                    {t('misc_encode')}
                </Button>
                <Button
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => handleClick('decode')}
                >
                    <IconFont type='icon-lock-open' />
                    {t('misc_decode')}
                </Button>

                <Button
                    icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    onClick={(e) => {
                        handleSwitchButtonClick();
                    }}
                >
                    {t('misc_switch')}
                </Button>

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

export default TextEncoder;
