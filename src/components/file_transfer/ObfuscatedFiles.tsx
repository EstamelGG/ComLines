import React, { useState, useEffect } from 'react';
import PersistedState from 'use-persisted-state';
import { Button, Input, Typography, message, Divider, Menu, Dropdown, Space, Upload } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { ObfuscatedFile } from 'components/types/ObfuscatedFile';
import Clipboard from 'react-clipboard.js';
import { useTranslation } from 'react-i18next';
import segmentString from '../utils/stringSegmenter';
import ReferenceLinks from '../utils/reference';
import randomString from '../utils/getRandomString';
import { stringToHex } from '../utils/hex';
import { utf8String } from '../utils/utf8String';
import '../../i18n';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

const FileEncodeTrans = () => {
    const { t } = useTranslation();
    const [output, setOutput] = useState('');
    const [fileRaw, setFileRaw] = useState('');
    const [fileB64, setFileB64] = useState('');
    const echoFileName = PersistedState<ObfuscatedFile>('echo_file_name');
    const { TextArea } = Input;

    const [values, setValues] = echoFileName({
        name: '',
        input: ''
    });

    const [defaultPlaceholder, setdefaultPlaceholder] = useState(
        `$wvlgi = @"\n` +
        `using System;\n` +
        `using System.Runtime.InteropServices;\n` +
        `public class wvlgi {\n` +
        `    [DllImport("kernel32")]\n` +
        `    public static extern IntPtr GetProcAddress(IntPtr hModule, string procName);\n` +
        `    [DllImport("kernel32")]\n` +
        `    public static extern IntPtr LoadLibrary(string name);\n` +
        `    [DllImport("kernel32")]\n` +
        `    public static extern bool VirtualProtect(IntPtr lpAddress, UIntPtr tsarvf, uint flNewProtect, out uint lpflOldProtect);\n` +
        `}\n` +
        `"@\n`)
    const [currentPlaceholder, setcurrentPlaceholder] = useState(defaultPlaceholder);
    const successPayloadCopy = () => {
        message.success(t('fileTrans_payloadcopied'));
    };

    const toPayloadCopy = () => {
        if (output.length !== 0) {
            successPayloadCopy()
        }
    }

    const handleChange = (name: string) => (event: { target: { value: string } }) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const props = {
        multiple: false,
        beforeUpload: (file) => {
            if (file && file.size > 10 * 1024 * 1024) { // 文件大小超过 5MB
                const confirmUpload = window.confirm(t('fileTrans_largefile_warn'));
                if (!confirmUpload) {
                    // 用户取消上传，清空文件输入框
                    return false;
                }
            }
            handleUpload(file);
            return false;
        },
    };

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
            let base64String = reader.result as string;
            base64String = base64String.replace(/^data:(.*?);base64,/, '');
            const rawBin = atob(base64String);
            const lines = rawBin.split('\n');
            const first10Lines = lines.slice(0, 10);
            let raw10Lines = first10Lines.join('\n');
            raw10Lines += "\n......";
            setFileB64(base64String);
            setFileRaw(rawBin);
            message.success(t('fileTrans_info1') + file.name);
            setcurrentPlaceholder(raw10Lines);
            setValues({ input: '', name: file.name });

        };
    };


    const [encMode, setEncmode] = useState('');
    const [ifTextAreaDisabled, setTextAreaDisable] = useState(false);
    const [ifUploadDisabled, setUploadDisable] = useState(true);

    const handleClick = () => {
        const binaryString = utf8String(values.input)
        try {
            if (binaryString.length === 0 && fileB64.length === 0) {
                message.error(t('fileTrans_err1'));
                return;
            }
            if (values.name.length === 0) {
                message.error(t('fileTrans_err2'));
                return;
            }
            if (encMode.length === 0) {
                message.error(t('fileTrans_err5'));
                return;
            }
            switch (encMode) {
                case 'Plain text - Bash b64':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const bash_b64 = btoa(binaryString);
                    setOutput(
                        `raw="${bash_b64}"\n` +
                        `echo -n $raw | base64 -d > "${values.name}"`
                    );
                    break;
                case 'Plain text - Bash Hex':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const bash_hex = stringToHex(binaryString);
                    setOutput(
                        `raw="${bash_hex}"\n` +
                        `echo -n $raw | xxd -r -p > "${values.name}"`
                    );
                    break;
                case 'Plain text - CMD':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const cmd_b64 = btoa(binaryString);
                    const cmd_random = randomString();
                    let maxSegmentLength = 1000;
                    let outputCommand = '';
                    const segments = segmentString(cmd_b64, maxSegmentLength);
                    segments.forEach((segment) => {
                        outputCommand += `echo|set /p="${segment}" >> ${cmd_random}\n`;
                    });
                    outputCommand += `certutil -decode ${cmd_random} "${values.name}"\n`;
                    outputCommand += `del /Q ${cmd_random}`;
                    setOutput(outputCommand);
                    break;
                case 'Plain text - Powershell':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const pwsh_b64 = btoa(binaryString);
                    const pwsh_random = randomString();
                    setOutput(
                        `${"$" + pwsh_random} = @()\n` +
                        `${"$" + pwsh_random} +=\n` +
                        `[System.Convert]::FromBase64String("${pwsh_b64}")\n` +
                        `[Environment]::CurrentDirectory = (Get-Location -PSProvider FileSystem).ProviderPath\n` +
                        `[System.IO.File]::WriteAllBytes("${values.name}",  ${"$" + pwsh_random})\n` +
                        `Remove-Variable ${pwsh_random}`
                    );
                    break;
                case 'File - Bash b64':
                    if (!(fileB64.length > 0)) {
                        message.error(t('fileTrans_err4'));
                        return;
                    }
                    setOutput(
                        `raw="${fileB64}"\n` +
                        `echo -n $raw | base64 -d > "${values.name}"`
                    );
                    break;
                case 'File - Bash Hex':
                    if (!(fileRaw.length > 0)) {
                        message.error(t('fileTrans_err4'));
                        return;
                    }
                    setOutput(
                        `raw="${stringToHex(fileRaw)}"\n` +
                        `echo -n $raw | xxd -r -p > "${values.name}"`
                    );
                    break;
                case 'File - CMD':
                    if (!(fileB64.length > 0)) {
                        message.error(t('fileTrans_err4'));
                        return;
                    }
                    const cmd_random2 = randomString();
                    let maxSegmentLength2 = 1000;
                    let outputCommand2 = '';
                    const segments2 = segmentString(fileB64, maxSegmentLength2);
                    segments2.forEach((segment) => {
                        outputCommand2 += `echo|set /p="${segment}" >> ${cmd_random2}\n`;
                    });
                    outputCommand2 += `certutil -decode ${cmd_random2} "${values.name}"\n`;
                    outputCommand2 += `del /Q ${cmd_random2}`;
                    setOutput(outputCommand2);
                    break;
                case 'File - Powershell':
                    if (!(fileB64.length > 0)) {
                        message.error(t('fileTrans_err4'));
                        return;
                    }
                    const pwsh_random2 = randomString();
                    setOutput(
                        `${"$" + pwsh_random2} = @()\n` +
                        `${"$" + pwsh_random2} +=\n` +
                        `[System.Convert]::FromBase64String("${fileB64}")\n` +
                        `[Environment]::CurrentDirectory = (Get-Location -PSProvider FileSystem).ProviderPath\n` +
                        `[System.IO.File]::WriteAllBytes("${values.name}",  ${"$" + pwsh_random2})\n` +
                        `Remove-Variable ${pwsh_random2}`
                    );
                    break;
                default:
                    message.error('Unknown encoding mode');
                    break;
            }
        }
        catch (ex) {
            message.error('Unable to encode properly please try again');
        }
        return;

    }
    const [selectedOption, setSelectedOption] = useState('');
    const handleEncModeList = (text: string, key: string) => {
        setSelectedOption(text); // 更新选择的名字
        setEncmode(key); // 更新加密模式
    };

    useEffect(() => {
        // 编码明文内容
        //if (['Plain text - Bash b64', 'Plain text - Bash Hex', 'Plain text - CMD', 'Plain text - Powershell'].includes(encMode)) {
        if (encMode.startsWith("Plain text ")) {
            setTextAreaDisable(false);
            setUploadDisable(true);
            // 编码文件内容
            // } else if (['File - Bash b64', 'File - Bash Hex', 'File - CMD', 'File - Powershell'].includes(encMode)) {
        } else if (encMode.startsWith("File ")) {
            setTextAreaDisable(true);
            setUploadDisable(false);
        }
    }, [encMode]);

    const handleClear = () => {
        setOutput('');
        setValues({
            name: '',
            input: ''
        });
        setcurrentPlaceholder(defaultPlaceholder);
        setFileB64('');
    };

    const menu = (
        <Menu onClick={({ key, domEvent }) => handleEncModeList(domEvent.currentTarget.innerText, key.toString())}>
            <Menu.SubMenu title="Linux">
                <Menu.Item key='Plain text - Bash b64'>{t('fileTrans_selection_plain')} - Bash B64</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='Plain text - Bash Hex'>{t('fileTrans_selection_plain')} - Bash Hex</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='File - Bash b64'>{t('fileTrans_selection_file')} - Bash B64</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='File - Bash Hex'>{t('fileTrans_selection_file')} - Bash Hex</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Windows">
                <Menu.Item key='Plain text - CMD'>{t('fileTrans_selection_plain')} - CMD</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='Plain text - Powershell'>{t('fileTrans_selection_plain')} - Powershell</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='File - CMD'>{t('fileTrans_selection_file')} - CMD</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='File - Powershell'>{t('fileTrans_selection_file')} - Powershell</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
    const rawText = t('fileTrans_desc');
    const paragraphs = rawText.split('<br />');
    document.title = `${t('fileTrans_title')} - HackTrick Checklist`;
    return (
        <div>
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('fileTrans_title')}
                </Title>
                <Paragraph style={{
                    margin: 15
                }}>
                    <div>
                        {paragraphs.map((paragraph, index) => (
                            <Paragraph key={index}>
                                {paragraph}
                            </Paragraph>
                        ))}
                    </div>
                </Paragraph>
            </div>
            <Divider plain />
            <div
                key='a'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={6}
                    value={values.input}
                    disabled={ifTextAreaDisabled}
                    onChange={handleChange('input')}
                    style={{ cursor: 'auto' }}
                    placeholder={currentPlaceholder}
                />

                {/* <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {encMode} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown> */}
                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                        {selectedOption || t('fileTrans_select_transmode')} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>
                <Space>
                    <Upload {...props} showUploadList={false} disabled={ifUploadDisabled}>
                        <Button icon={<UploadOutlined />} style={{ marginTop: 15 }} disabled={ifUploadDisabled}>Upload</Button>
                    </Upload>
                    <Input
                        prefix={<DownloadOutlined />}
                        onChange={handleChange('name')}
                        style={{ marginTop: 15 }}
                        placeholder="Output File Name"
                        value={values.name}
                    />
                    <Button
                        type='primary'
                        style={{ marginTop: 15 }}
                        onClick={() => handleClick()}
                    >
                        <IconFont type='icon-lock' />
                        {t('misc_encode')}
                    </Button>
                </Space>
            </div>
            <div
                key='b'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={6}
                    value={output}
                    disabled={true}
                    onChange={handleChange('output')}
                    style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
                    placeholder='The results will appear here'
                />
                <Clipboard component='a' data-clipboard-text={output}>
                    <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={toPayloadCopy}>
                        <CopyOutlined /> {t('misc_copy')}
                    </Button>
                </Clipboard>
                <Button
                    danger
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => handleClear()}
                >
                    <ClearOutlined /> {t('misc_clear')}
                </Button>
            </div>
            <Divider plain />
            <div>
                <Title level={3} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('misc_ref')}
                </Title>
                <Paragraph style={{
                    margin: 15
                }}>
                    <ReferenceLinks references={t('fileTrans_reference', { returnObjects: true })} />
                    {/* 自定义的参考链接展示 */}
                </Paragraph>
            </div>
        </div>
    );
};

export default FileEncodeTrans;
