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
            message.success(t('fileTrans_info1') + file.name);
            setInputValue(rawBin);
        };
    };


    const [encMode, setEncmode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBashB64 = async (binaryString) => {
        console.log(binaryString)
        const bash_b64 = btoa(binaryString);
        let result1 = `echo "${bash_b64}" | base64 -d | bash`;
        let result2 = `bash -c "{echo,${bash_b64}}|{base64,-d}|{bash,-i}"`
        // result1 = decodeURIComponent(escape(result1));
        // result2 = decodeURIComponent(escape(result2));
        setOutput([result1,result2]);
    };

    const handleBashHex = async (binaryString) => {
        const bash_hex = stringToHex(binaryString);
        let result1 = `echo "${bash_hex}" | xxd -r -p | bash -i`;
        let result2 = `bash -c "{echo,${bash_hex}}|{xxd,-r,-p}|{bash,-i}"`;
        const bash_x_hex = stringToHex(binaryString, "\\x");
        let result3 = `printf '${bash_x_hex}'|bash`;
        let result4 = `echo -e '${bash_x_hex}'|bash`;
        // result1 = decodeURIComponent(escape(result1));
        // result2 = decodeURIComponent(escape(result2));
        setOutput([result1,result2,result3,result4]);
    };

    const handleBashRot47 = async (binaryString) => {
        let result1 = `echo "${btoa(rot47encode(binaryString))}" | base64 -d | tr '!-~' 'P-~!-O' | bash -i`;
        let result2 = `bash -c "{echo,${btoa(rot47encode(binaryString))}}|{base64,-d}|{tr,'!-~','P-~!-O'}|{bash,-i}"`
        // result1 = decodeURIComponent(escape(result1));
        // result2 = decodeURIComponent(escape(result2));
        setOutput([result1,result2]);
    };

    const handlePowershell = async (binaryString) => {
        let result = `${powershell_b64_oneliner(binaryString)}`;
        // result = decodeURIComponent(escape(result));
        setOutput([result]);
    };

    const handlePython = async (binaryString) => {
        let result = `${python_zlib_oneliner(binaryString)}`
        // result = decodeURIComponent(escape(result));
        setOutput([result]);
    };

    const handleClick = async () => {
        if (inputvalue.length === 0) {
            message.error(t('fileTrans_err1'));
            return;
        }

        const binaryString = utf8String(inputvalue)
        setLoading(true);
        try {
            switch (encMode) {
                case 'Bash B64':
                    await handleBashB64(binaryString);
                    break;
                case 'Bash Hex':
                    await handleBashHex(binaryString);
                    break;
                case 'Bash Rot47':
                    await handleBashRot47(binaryString);
                    break;
                case 'Powershell':
                    await handlePowershell(inputvalue);
                    break;
                case 'Python':
                    await handlePython(binaryString);
                    break;
                default:
                    message.error('Error encMode');
                    break;
            }
        } catch (ex) {
            message.error('Unable to encode properly please try again');
        } finally {
            setLoading(false);
        }
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
        setOutput(['output should be here']);
        setInputValue('');
        setcurrentPlaceholder(defaultPlaceholder);
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
                        onClick={handleClick}
                        loading={loading}
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
