import React, { useState } from 'react';
import { Button, Input, Typography, Menu, Dropdown, Divider, message, Upload, Table, Spin } from 'antd';
import { CopyOutlined, UploadOutlined, DownOutlined, ClearOutlined, createFromIconfontCN, SwapOutlined } from '@ant-design/icons';
import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
import CryptoJS from 'crypto-js';
import ReferenceLinks from '../utils/reference';
import Sm3 from 'sm3';
import Clipboard from 'react-clipboard.js';
import '../../i18n';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

const HashEncode = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState('');
    const [fileList, setFileList] = useState([]);
    const [fileHashes, setFileHashes] = useState([]);
    const [, setHashType] = useState('0');
    const [, setFileHashType] = useState('0');
    const [hashname, setHashname] = useState('MD5');
    const [fileHashName, setFileHashname] = useState('MD5');
    const [calculatingHash, setCalculatingHash] = useState(false); // 添加一个状态用于表示是否正在计算哈希值
    const { t } = useTranslation();

    const handleClick = (type: { key: React.SetStateAction<string | any> }) => {
        setHashType(type.key);
        resolvehashname(type.key);
    };

    const handleFileClick = (type: { key: React.SetStateAction<string | any> }) => {
        setFileHashType(type.key);
        resolveFileHashname(type.key);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const clearFileHash = () => {
        setFileList([]);
        setFileHashes([]);
    };

    const handleSwitchButtonClick = () => {
        setInput(output);
        setOutput(input);
    };

    const handleHash = (hashtype: string) => {
        let output: string;
        switch (hashtype) {
            case 'MD5':
                output = MD5(input, undefined).toString().toUpperCase();
                break;
            case 'SHA1':
                output = SHA1(input, undefined).toString().toUpperCase();
                break;
            case 'SHA256':
                output = SHA256(input, undefined).toString().toUpperCase();
                break;
            case 'SHA512':
                output = SHA512(input, undefined).toString().toUpperCase();
                break;
            case 'SM3':
                output = Sm3(input).toString().toUpperCase();
                break;
            default:
                output = '';
        }
        setOutput(output);
    };

    const handleFileHash = (input, hashtype: string) => {
        let output: string;
        switch (hashtype) {
            case 'MD5':
                output = MD5(input, undefined).toString().toUpperCase();
                break;
            case 'SHA1':
                output = SHA1(input, undefined).toString().toUpperCase();
                break;
            case 'SHA256':
                output = SHA256(input, undefined).toString().toUpperCase();
                break;
            case 'SHA512':
                output = SHA512(input, undefined).toString().toUpperCase();
                break;
            case 'SM3':
                output = Sm3(input).toString().toUpperCase();
                break;
            default:
                output = '';
        }
        return output; // Return the computed hash
    };

    const calcFileHash = async (hashType: string) => {
        setCalculatingHash(true); // 设置状态为正在计算哈希值
        const hashes = await Promise.all(fileList.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const binary = e.target.result;
                    const wordArray = CryptoJS.lib.WordArray.create(binary);
                    const hash = handleFileHash(wordArray, hashType);
                    resolve({ uid: file.uid, hash });
                };
                reader.onerror = (e) => reject(e);
                reader.readAsArrayBuffer(file); // Use the file directly
            });
        }));
        setFileHashes(hashes);
        setCalculatingHash(false); // 哈希值计算完成后，设置状态为不再计算
    };

    const successInfoHashing = () => {
        if (output.length > 0) {
            message.success(t('hash_copy'));
        } else {
            message.error(t('hash_copy_err'));
        }
    };

    const resolvehashname = (hashindex: string) => {
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
    };

    const resolveFileHashname = (hashindex: string) => {
        switch (hashindex) {
            case '0':
                setFileHashname('MD5');
                break;
            case '1':
                setFileHashname('SHA1');
                break;
            case '2':
                setFileHashname('SHA256');
                break;
            case '3':
                setFileHashname('SHA512');
                break;
            case '4':
                setFileHashname('SM3');
                break;
        }
    };

    const props = {
        beforeUpload: (file) => {
            if (file && file.size > 10 * 1024 * 1024) { // 文件大小超过 10MB
                const confirmUpload = window.confirm('The file is too large. Do you want to continue?');
                if (!confirmUpload) {
                    return false;
                }
            }
            setFileList(prevList => [...prevList, file]);
            return false; // 阻止默认的文件上传行为
        },
    };

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: text => <span style={{ wordBreak: 'break-all' }}>{text}</span>,
            style: { wordBreak: 'break-all' },
            width: 300,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Hash Value',
            dataIndex: 'hash',
            key: 'hash',
            render: (text, record) => {
                const hashRecord = fileHashes.find(fh => fh.uid === record.uid);
                return hashRecord ? (
                    <span style={{ wordBreak: 'break-all' }}>{hashRecord.hash}</span>
                ) : (
                    calculatingHash ? (
                        <Spin size="small" />
                    ) : (
                        'Not Available'
                    )
                );
            },
            style: { wordBreak: 'break-all' },
        },
    ];

    const dataSource = fileList.length > 0
        ? fileList.map(file => ({
            key: file.uid,
            uid: file.uid,
            name: file.name
        }))
        : [{ key: 'Null', uid: 'Null', name: 'No File' }];

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key='0' onClick={() => handleHash('MD5')}>
                MD5
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1' onClick={() => handleHash('SHA1')}>
                SHA1
            </Menu.Item>
            <Menu.Item key='2' onClick={() => handleHash('SHA256')}>
                SHA256
            </Menu.Item>
            <Menu.Item key='3' onClick={() => handleHash('SHA512')}>
                SHA512
            </Menu.Item>
            <Menu.Item key='4' onClick={() => handleHash('SM3')}>
                SM3
            </Menu.Item>
        </Menu>
    );

    const filehash_menu = (
        <Menu onClick={handleFileClick}>
            <Menu.Item key='0' onClick={() => calcFileHash('MD5')}>
                MD5
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1' onClick={() => calcFileHash('SHA1')}>
                SHA1
            </Menu.Item>
            <Menu.Item key='2' onClick={() => calcFileHash('SHA256')}>
                SHA256
            </Menu.Item>
            <Menu.Item key='3' onClick={() => calcFileHash('SHA512')}>
                SHA512
            </Menu.Item>
            <Menu.Item key='4' onClick={() => calcFileHash('SM3')}>
                SM3
            </Menu.Item>
        </Menu>
    );

    const handleChange = (_name: string) => (event: { target: { value: React.SetStateAction<string> } }) => {
        setInput(event.target.value);
    };

    const rawText = t('hash_enerator_desc');
    const paragraphs = rawText.split('<br />');
    document.title = `${t('hash_enerator_title')} - HackTrick Checklist`;

    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('hash_enerator_title')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                <div>
                    {paragraphs.map((paragraph, index) => (
                        <Paragraph key={index}>
                            {paragraph}
                        </Paragraph>
                    ))}
                </div>
            </Paragraph>
            <Divider orientation="center" style={{ borderTopColor: 'black' }}> String / Text </Divider>
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
                    onClick={() => handleHash(hashname)}
                >
                    <IconFont type='icon-hash' /> {t('misc_calc')}
                </Button>
                <Button
                    icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    onClick={() => handleSwitchButtonClick()}
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
                    onClick={clearAll}
                >
                    <ClearOutlined /> {t('misc_clear')}
                </Button>
            </div>

            <Divider orientation="center" style={{ borderTopColor: 'black' }}> Multi Files </Divider>
            <div key='c' style={{ margin: 15 }}>
                <Dropdown overlay={filehash_menu}>
                    <a className='ant-dropdown-link'>
                        {fileHashName} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>
                <Upload
                    {...props}
                    multiple
                    showUploadList={false}
                    fileList={fileList}
                >
                    <Button
                        icon={<UploadOutlined />}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        Select Files
                    </Button>
                </Upload>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => calcFileHash(fileHashName)}
                    disabled={fileList.length === 0}
                >
                    <IconFont type='icon-hash' /> {t('misc_calc')}
                </Button>
                <Button
                    danger
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    disabled={fileList.length === 0}
                    onClick={clearFileHash}
                >
                    <ClearOutlined /> {t('misc_clear')}
                </Button>
                <Table
                    size="small"
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowClassName={() => 'small-height'}
                    style={{ marginTop: 15 }}
                />

            </div>
            <Divider plain />
            <div>
                <Title level={3} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('misc_ref')}
                </Title>

                <Paragraph style={{ margin: 15 }}>
                    <Text>Crack Hash: </Text>
                    <ReferenceLinks references={t('hash_enerator_reference', { returnObjects: true })} />
                </Paragraph>
            </div>
        </div>
    );
};

export default HashEncode;
