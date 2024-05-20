import React, { useState } from 'react';
import { Button, Input, Typography, Menu, Dropdown, Divider, message, Upload, Table } from 'antd';
import { CopyOutlined, UploadOutlined, DownOutlined, ClearOutlined, createFromIconfontCN, SwapOutlined } from '@ant-design/icons';
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
    const [output, setOutput] = useState('');
    const [filesInput, setFInput] = useState<string>('');
    const [filesOnput, setFOutput] = useState('');
    const [fileList, setFileList] = useState([]);
    const [_, setHashType] = useState('0');
    const [hashname, setHashname] = useState('MD5');
    const { t } = useTranslation();
    const handleClick = (type: { key: React.SetStateAction<string | any> }) => {
        setHashType(type.key);
        resolvehashname(type.key);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    const clearFileHash = () => {
        setFInput('');
        setFOutput('');
    };

    const handleSwitchButtonClick = () => {
        setInput(output);
        setOutput(input);
    };

    const handleHash = (hashtype: string) => {
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

    const handleFileSelectChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleUpload = ({ file, fileList }) => {
        setFileList(fileList);
    };

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Hash Value',
            dataIndex: 'hash',
            key: 'hash',
            // render: (text, record) => <span>{handleHash(record.name)}</span>,
        },
    ];

    const dataSource = fileList.map(file => ({
        key: file.uid,
        name: file.name,
        hash: handleHash(file.name),
    }));

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

            <Divider orientation="center" style={{ borderTopColor: 'black' }}> Multi Files </Divider>
            <div key='a' style={{ margin: 15 }}>
                <Upload
                    multiple
                    onChange={handleUpload}
                    fileList={fileList}
                >
                    <Dropdown overlay={menu}>
                        <a className='ant-dropdown-link'>
                            {hashname} <DownOutlined style={{ padding: 10 }} />
                        </a>
                    </Dropdown>
                    <Button icon={<UploadOutlined />}>Select Files</Button>
                </Upload>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowClassName={() => 'small-height'}
                    style={{ marginTop: 15 }}
                />
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleHash(hashname)}
                >
                    <IconFont type='icon-hash' /> {t('misc_calc')}
                </Button>
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
