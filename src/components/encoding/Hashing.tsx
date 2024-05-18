import React, { useState } from 'react';
import { Button, Input, Typography, Menu, Dropdown, Divider, message } from 'antd';
import { CopyOutlined, DownOutlined, ClearOutlined, createFromIconfontCN, SwapOutlined } from '@ant-design/icons';
import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
import ReferenceLinks from '../utils/reference';
//@ts-ignore
import Sm3 from 'sm3';
import Clipboard from 'react-clipboard.js';
//
import '../../i18n';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

const HashEncode = () => {
    const [input, setInput] = useState<string>('');
    const [_, setHashType] = useState('0');
    const [hashname, setHashname] = useState('MD5');
    const [output, setOutput] = useState('');
    const { t } = useTranslation();
    const handleClick = (type: { key: React.SetStateAction<string | any> }) => {
        setHashType(type.key);
        resolvehashname(type.key);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const handleSwitchButtonClick = () => {
        setInput(output);
        setOutput(input);
    };

    const handleEncode = (hashtype: string) => {
        let output: string;
        switch (hashtype) {
            case 'MD5':
                output = MD5(input, undefined).toString();
                break;
            case 'SHA1':
                output = SHA1(input, undefined).toString();
                break;
            case 'SHA256':
                output = SHA256(input, undefined).toString();
                break;
            case 'SHA512':
                output = SHA512(input, undefined).toString();
                break;
            case 'SM3':
                output = Sm3(input);
                break;
            default:
                // If the hashtype is not recognized, return an empty string
                output = '';
        }
        setOutput(output);
    };
    const successInfoHashing = () => {
        message.success('Your hash has been copied successfully !');
    };
    const resolvehashname = (hashindex: string): 'Choose the Hash type' => {
        switch (hashindex) {
            case '0':
                setHashname('MD5');
                break;
            case '1':
                setHashname('SHA1');
                break;
            case '2':
                setHashname('SHA256');
                break;
            case '3':
                setHashname('SHA512');
                break;
            case '4':
                setHashname('SM3');
                break;
        }
        return 'Choose the Hash type';
    };

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key='0' onClick={() => handleEncode('MD5')}>
                MD5
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1' onClick={() => handleEncode('SHA1')}>
                SHA1
            </Menu.Item>
            <Menu.Item key='2' onClick={() => handleEncode('SHA256')}>
                SHA256
            </Menu.Item>
            <Menu.Item key='3' onClick={() => handleEncode('SHA512')}>
                SHA512
            </Menu.Item>
            <Menu.Item key='4' onClick={() => handleEncode('SM3')}>
                SM3
            </Menu.Item>
        </Menu>
    );

    const handleChange = (_name: string) => (event: { target: { value: React.SetStateAction<string> } }) => {
        setInput(event.target.value);
    };
    document.title = `${t('hash_enerator_title')} - HackTrick Checklist`;
    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('hash_enerator_title')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                {t('hash_enerator_desc')}
            </Paragraph>
            <Divider dashed />
            <div key='a' style={{ margin: 15 }}>
                <TextArea
                    rows={4}
                    value={input}
                    onChange={handleChange('input')}
                    placeholder='Type something to hash (ex: mysecretpassword)'
                />
                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {hashname} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleEncode(hashname)}
                >
                    <IconFont type='icon-hash' /> {t('misc_calc')}
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
            <div key='b' style={{ margin: 15 }}>
                <TextArea
                    rows={4}
                    value={output}
                    style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
                    placeholder='The results will appear here'
                />
                <Clipboard component='a' data-clipboard-text={output}>
                    <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successInfoHashing}>
                        <CopyOutlined /> {t('misc_copy')}
                    </Button>
                </Clipboard>
                <Button
                    danger
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={
                        () => clearAll()
                    }
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
                    <Text>Crack Hash: </Text>
                    <ReferenceLinks references={t('hash_enerator_reference', { returnObjects: true })} />
                    {/* 自定义的参考链接展示 */}
                </Paragraph>
            </div>
        </div>
    );
};

export default HashEncode;
