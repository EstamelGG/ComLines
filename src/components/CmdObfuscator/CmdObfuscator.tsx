import React, { useState } from 'react';
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


function w_quo(str: string) {
    var result: string = '';

    return result
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
        let output;
        let errorMessage;
        const binaryString = utf8String(input);
        switch (type) {
            case "WinCMD":
                // Your Windows obfuscation logic here
                break;
            case "Linux":
                // Your Linux obfuscation logic here
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
        escape: true,
        tab: true,
        ifs: true,
        dollarN: true,
        variableConcat: false,
    });

    const handleSysTypeList = (type: { key: React.SetStateAction<string | any> }) => {
        setSysType(type.key.toString());
        if (type.key === 'Linux') {
            setOptions({
                quote: true,
                escape: true,
                tab: true,
                ifs: true,
                dollarN: true,
                variableConcat: false,
            });
        } else if (type.key === 'WinCMD') {
            setOptions({
                quote: true,
                escape: true,
                tab: false,
                ifs: false,
                dollarN: false,
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

    document.title = `${t('cmd_confusion')} - HackTrick Checklist`;

    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('cmd_confusion')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                {t('cmd_confusion_desc')}
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
                        onChange={() => setOptions({ ...options, quote: !options.quote })}
                    >
                        {t('quotation')}
                    </Checkbox>
                    <Checkbox
                        checked={options.escape}
                        onChange={() => setOptions({ ...options, escape: !options.escape })}
                    >
                        {t('escape')}
                    </Checkbox>
                    <Checkbox
                        checked={options.tab}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, tab: !options.tab })}
                    >
                        tab
                    </Checkbox>
                    <Checkbox
                        checked={options.ifs}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, ifs: !options.ifs })}
                    >
                        IFS
                    </Checkbox>
                    <Checkbox
                        checked={options.dollarN}
                        disabled={sysType !== 'Linux'}
                        onChange={() => setOptions({ ...options, dollarN: !options.dollarN })}
                    >
                        $n
                    </Checkbox>
                    <Checkbox
                        checked={options.variableConcat}
                        disabled={sysType !== 'WinCMD'}
                        onChange={() => setOptions({ ...options, variableConcat: !options.variableConcat })}
                    >
                        {t('variable')}
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
