import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown, Space, Upload } from 'antd';
import { createFromIconfontCN, ClearOutlined, DownOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { stringToHex } from '../utils/hex';
import { rot47encode } from '../utils/rot47';
import { utf8String } from '../utils/utf8String';
import { powershell_b64_oneliner, python_zlib_oneliner } from '../utils/oneliner'
import '../../i18n';

const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

const OneLinerGenerator = () => {
    const { t } = useTranslation();
    const [output, setOutput] = useState<string[]>(['output should be here']);
    const [fileB64, setFileB64] = useState('');
    const { TextArea } = Input;
    const [inputvalue, setInputValue] = useState('');
    const [defaultPlaceholder, setdefaultPlaceholder] = useState(
        `import os\ndef exq(cmd):\n\tos.system(cmd)\nexq('calc')`)
    const [currentPlaceholder, setcurrentPlaceholder] = useState(defaultPlaceholder);

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
            setFileB64(base64String);
            message.success(t('fileTrans_info1') + file.name);
            setInputValue(rawBin);
        };
    };


    const [encMode, setEncmode] = useState('');

    const handleClick = () => {
        const binaryString = utf8String(inputvalue)
        try {
            if (binaryString.length === 0 && fileB64.length === 0) {
                message.error(t('fileTrans_err1'));
                return;
            }
            if (encMode.length === 0) {
                message.error(t('fileTrans_err5'));
                return;
            }
            switch (encMode) {
                case 'Bash B64':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const bash_b64 = btoa(binaryString);
                    setOutput(
                        [`echo "${bash_b64}" | base64 -d | bash`,
                        `bash -c "{echo,${bash_b64}}|{base64,-d}|{bash,-i}"`]
                    );
                    break;
                //Bash Hex
                case 'Bash Hex':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    const bash_hex = stringToHex(binaryString);
                    setOutput(
                        [`echo "${bash_hex}" | xxd -r -p | bash -i`,
                        `bash -c "{echo,${bash_hex}}|{xxd,-r,-p}|{bash,-i}"`
                        ]
                    );
                    break;
                //Bash Rot47
                case 'Bash Rot47':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    setOutput(
                        [`echo "${btoa(rot47encode(binaryString))}" | base64 -d | tr '!-~' 'P-~!-O' | bash -i`,
                        `bash -c "{echo,${btoa(rot47encode(binaryString))}}|{base64,-d}|{tr,'!-~','P-~!-O'}|{bash,-i}"`
                        ]
                    );
                    break;
                //Powershell
                case 'Powershell':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    setOutput(
                        [`${powershell_b64_oneliner(binaryString)}`]
                    );
                    break;
                //Python
                case 'Python':
                    if (binaryString.length === 0) {
                        message.error(t('fileTrans_err1'));
                        return;
                    }
                    setOutput(
                        [`${python_zlib_oneliner(binaryString)}`]
                    );
                    break;
                default:
                    message.error('Error encMode');
                    break;
            }
        }
        catch (ex) {
            message.error('Unable to encode properly please try again');
            //message.error(ex);
        }
        return;

    }
    const [selectedOption, setSelectedOption] = useState('');
    const handleEncModeList = (text: string, key: string) => {
        switch (key) {
            case 'Bash B64':
            case 'Bash Hex':
            case 'Bash Rot47':
                setcurrentPlaceholder("whoami; uname -a; ip a");
                break;
            case 'Powershell':
                setcurrentPlaceholder("$system = Get-CimInstance -ClassName Win32_ComputerSystem\n$systemName = $system.Name\nWrite-Output \"System Name: $systemName\"");
                break;
            default:
            case 'Python':
                setcurrentPlaceholder(defaultPlaceholder);
                break;
        }
        setSelectedOption(text); // 更新选择的名字
        setEncmode(key); // 更新加密模式
    };

    const handleClear = () => {
        setOutput(['']);
        setInputValue('');
        setcurrentPlaceholder(defaultPlaceholder);
        setFileB64('');
    };

    const handleChange = (_name: string) => (event: { target: { value: React.SetStateAction<string> } }) => {
        setInputValue(event.target.value);
    };

    const menu = (
        <Menu onClick={({ key, domEvent }) => handleEncModeList(domEvent.currentTarget.innerText, key.toString())}>
            <Menu.SubMenu title="Linux">
                <Menu.Item key='Bash B64'>Bash B64</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='Bash Hex'>Bash Hex</Menu.Item>
                <Menu.Divider />
                <Menu.Item key='Bash Rot47'>Bash Rot47</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Windows">
                <Menu.Item key='Powershell'>Powershell</Menu.Item>
                {/* <Menu.Divider /> */}
            </Menu.SubMenu>
            <Menu.SubMenu title="Multi">
                <Menu.Item key='Python'>Python</Menu.Item>
                {/* <Menu.Divider /> */}
            </Menu.SubMenu>
        </Menu>
    );
    const rawText = t('oneliner_desc');
    const paragraphs = rawText.split('<br />');
    document.title = `${t('oneliner_title')} - HackTrick Checklist`;
    return (
        <div>
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('oneliner_title')}
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
                    value={inputvalue}
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
                    <Upload {...props} showUploadList={false}>
                        <Button icon={<UploadOutlined />} style={{ marginTop: 15 }}>Upload</Button>
                    </Upload>
                    <Button
                        type='primary'
                        style={{ marginTop: 15 }}
                        onClick={() => handleClick()}
                    >
                        <IconFont type='icon-lock' />
                        {t('misc_encode')}
                    </Button>
                    <Button
                        danger
                        style={{ marginTop: 15 }}
                        onClick={() => handleClear()}
                    >
                        <ClearOutlined /> {t('misc_clear')}
                    </Button>
                </Space>
            </div>
            {output.length > 0 && output[0].length > 0 && <Divider plain />}
            <div
                key='b'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <div>
                    {output.map((item) => (item.length > 0 &&
                        (<Paragraph>
                            <pre>
                                <Text copyable>
                                    {item}
                                </Text>
                            </pre>
                        </Paragraph>)
                    ))}
                </div>
            </div>
            {/* <Divider plain />
            <div>
                <Title level={3} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('misc_ref')}
                </Title>
                <Paragraph style={{
                    margin: 15
                }}>
                    <ReferenceLinks references={t('fileTrans_reference', { returnObjects: true })} />
                    // 自定义的参考链接展示
                </Paragraph>
            </div> */}
        </div>
    );
};

export default OneLinerGenerator;
