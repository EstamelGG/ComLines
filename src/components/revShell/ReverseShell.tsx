import React, { useRef, useState, useEffect } from 'react';
import { message, Typography, Divider, Row, Col, Input, Table, Tag, AutoComplete, Form, InputRef, Button, Space, Dropdown } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterOutlined, SearchOutlined, WifiOutlined, createFromIconfontCN, ExportOutlined } from '@ant-design/icons';
import PersistedState from 'use-persisted-state';
import { Ipv4TcpCacheState } from 'components/types/Ipv4TcpCacheState';
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { oneliner } from '../utils/oneliner'
import '../../i18n';
import randomString from '../utils/getRandomString';

const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

interface DataType {
    key: React.Key;
    name: string;
    tags: string[];
    oneliner: string[];
    log: string;
    listener_cmd: string;
    payloadstr: string;
    command: string;
    note: string;
}

type DataIndex = keyof DataType;


export default function ReverseShell() {
    const { t } = useTranslation();
    const useIPv4State = PersistedState<Ipv4TcpCacheState>('ipv4_tcp_cache');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [str_random, setStrRandom] = useState(randomString());
    const [values, setValues] = useIPv4State({
        ip: '192.168.0.1',
        port: '9090',
        shell: '/bin/sh',
    });

    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.success(t('revshell_copied'));
    };
    const infoEncoded = () => {
        messageApi.success(t('revshell_encode_copied'));
    };

    const infoURLCopied = () => {
        messageApi.success(t('revshell_infoURLCopied'));
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const dip = params.get("ip") || "192.168.0.1";
        const dport = params.get("port") || "9090";
        const shell = params.get("shell") || "/bin/sh";
        setSearchText(params.get("name") || "");
        setValues((prevValues) => ({
            ...prevValues,
            ip: dip,
            port: dport,
            shell: shell
        }));
        if (params.has("name")) {
            const filteredInfoCopy = { ...filteredInfo }; // 复制过滤信息
            filteredInfoCopy['name'] = [params.get("name")]; // 设置过滤器值
            setFilteredInfo(filteredInfoCopy); // 更新过滤信息
        }
    }, []);

    const handleChange = (name: string) => (event: { target: { value: string } }) => {
        setValues({ ...values, [name]: event.target.value });
        const params = new URLSearchParams(window.location.hash.substring(1));
        params.set(name, event.target.value);
        window.location.hash = '#' + params.toString();
    };

    const handleChangeSelect = (prop: string) => (data: any) => {
        setValues({ ...values, [prop]: data });
        const params = new URLSearchParams(window.location.hash.substring(1));
        params.set(prop, data);
        window.location.hash = '#' + params.toString();
    };

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const handleChangeFilter: TableProps<DataType>['onChange'] = (_, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const handleFilter = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        if (typeof selectedKeys[0] !== 'undefined') {
            params.set("name", selectedKeys[0]);
        }
        window.location.hash = '#' + params.toString();
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        params.delete('name');
        window.location.hash = '#' + params.toString();
        clearFilters();
        setSearchText('');
        setFilteredInfo({});
        setSortedInfo({});
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Filter ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleFilter(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                            handleFilter(selectedKeys as string[], confirm, dataIndex)
                        }}
                        icon={<FilterOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Filter
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>

                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button> */}
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => {
                    searchInput.current?.select();
                }, 100);
            } else {
                setSearchedColumn("");
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const [expandAllRows, setExpandAllRows] = useState(false);
    const [forceRerender, setForceRerender] = useState(false);
    const [expandButtonText, setExpandButtonText] = useState(t('revshell_expand'));
    const handleExpandAllRows = () => {
        setExpandAllRows(!expandAllRows);
        setForceRerender(!forceRerender);
        if (!forceRerender) { setExpandButtonText(t('revshell_collapse')); }
        else { setExpandButtonText(t('revshell_expand')); }


    };

    const handleShareButtonClick = (line_name: string) => {
        // 将哈希路由参数添加到页面 URL
        const params = new URLSearchParams(window.location.hash.substring(1));
        if (typeof line_name !== 'undefined') {
            params.set("name", line_name);
        }
        let newHashRoute = '#' + params.toString();
        let currentURL = window.location.origin + window.location.pathname + newHashRoute;
        navigator.clipboard.writeText(currentURL);
        // Function to copy URL to clipboard
        infoURLCopied();
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name', dataIndex: 'name', key: 'name', filteredValue: filteredInfo.name || null,
            onFilter: (value: string, record) => record.name.includes(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
            ellipsis: true,
            render: (text: string) => <Text strong>{text}</Text>, // 将文本加粗
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        switch (tag) {
                            case 'linux':
                                return <Tag color="volcano" key={tag}>{tag.toUpperCase()}</Tag>;
                            case 'mac':
                                return <Tag color="green" key={tag}>{tag.toUpperCase()}</Tag>;
                            case 'windows':
                                return <Tag color="blue" key={tag}>{tag.toUpperCase()}</Tag>;
                            case 'terminal':
                                return <Tag color="black" key={tag}>{tag.toUpperCase()}</Tag>;
                            case 'code':
                                return <Tag color="cyan" key={tag}>{tag.toUpperCase()}</Tag>;
                            default:
                                return <Tag color="gray" key={tag}>{tag.toUpperCase()}</Tag>;
                        }
                    })}
                </>
            ),
            filters: [
                { text: 'Linux', value: 'linux' },
                { text: 'MacOS', value: 'mac' },
                { text: 'Windows', value: 'windows' },
                { text: 'Terminal', value: 'terminal' },
                { text: 'Code', value: 'code' }
            ],
            filteredValue: filteredInfo.tags as string[] || null,
            onFilter: (value, record) => {
                if (!filteredInfo.tags || filteredInfo.tags.length === 0) {
                    return true;
                }
                return (filteredInfo.tags as string[]).every(tag => record.tags.includes(tag));
            },
            sortOrder: sortedInfo.columnKey === 'tags' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Note', dataIndex: 'note', key: 'note', filteredValue: filteredInfo.note || null,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, { command, name }) => (
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '100px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}>
                            <Dropdown.Button
                                trigger={['hover']}
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: 'Base64 Encoded',
                                        },
                                        {
                                            key: '2',
                                            label: 'URL Encoded',
                                        },
                                        {
                                            key: '3',
                                            label: 'Double URL Encoded',
                                        }
                                    ],
                                    onClick: (e) => {
                                        switch (e.key) {
                                            case '1':
                                                e.domEvent.stopPropagation();
                                                // base64 encoded
                                                navigator.clipboard.writeText(btoa(command));
                                                infoEncoded()
                                                break;
                                            case '2':
                                                e.domEvent.stopPropagation();
                                                // url encoded
                                                infoEncoded()
                                                navigator.clipboard.writeText(encodeURIComponent(command));
                                                break;
                                            case '3':
                                                e.domEvent.stopPropagation();
                                                // double url encoded
                                                navigator.clipboard.writeText(encodeURIComponent(encodeURIComponent(command)));
                                                infoEncoded()
                                                break;
                                            default:
                                                e.domEvent.stopPropagation();
                                                info()
                                                break;
                                        }
                                    },
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    info();
                                    navigator.clipboard.writeText(command);
                                    setStrRandom(randomString());
                                }}
                            >
                                Copy
                            </Dropdown.Button>
                        </div>
                        <div style={{ width: '100px' }}>
                            <Button
                                icon={<ExportOutlined />}
                                style={{ marginLeft: 8, marginRight: 8 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShareButtonClick(name);
                                }}
                            >
                            </Button>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    let payloads = require('../../static/data/RevShell.json');

    const data: DataType[] = payloads.map((payload: any, index: number) => ({
        key: index,
        name: payload.name,
        tags: payload.tags.sort(),
        listener_cmd: payload.listener_cmd || null,
        payloadstr: payload.payloadstr || null,
        oneliner: payload.oneliner || [],
        log: payload.log || null,
        command: payload.command,
        note: payload.note || "-",
    }));

    data.forEach((payload) => {
        if (payload.listener_cmd) {
            payload.listener_cmd = payload.listener_cmd.replace(/\${values.port}/g, String(values.port));
        }
        if (payload.payloadstr) {
            payload.payloadstr = payload.payloadstr.replace(/\${values.ip}/g, String(values.ip));
            payload.payloadstr = payload.payloadstr.replace(/\${values.port}/g, String(values.port));
            payload.payloadstr = payload.payloadstr.replace(/\{shell}/g, String(values.shell));
        }
        if (payload.command) {
            payload.command = payload.command.replace(/\${values.ip}/g, String(values.ip));
            payload.command = payload.command.replace(/\${values.port}/g, String(values.port));
            payload.command = payload.command.replace(/\${random_str}/g, String(str_random));
            payload.command = payload.command.replace(/\{shell}/g, String(values.shell));
        }
        if (payload.log) {
            payload.log = payload.log.replace(/\${random_str}/g, String(str_random));
        }
    });
    const rawText = t('revshell_desc',);
    const paragraphs = rawText.split('<br />');
    document.title = `${t('revshell_title')} - HackTrick Checklist`;
    return (
        <div>
            {contextHolder}
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('revshell_title')}
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
                <div style={{ padding: 5, maxHeight: '32px' }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={8}>
                            <Input
                                prefix={<WifiOutlined />}
                                name='Ip adress'
                                placeholder='IP Address or domain (ex: 212.212.111.222)'
                                onChange={handleChange('ip')}
                                value={values.ip}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                maxLength={5}
                                prefix={<IconFont type='icon-Network-Plug' />}
                                name='Port'
                                type="number"
                                placeholder='Port (ex: 1337)'
                                onChange={handleChange('port')}
                                value={values.port}
                            />
                        </Col>
                        <Col span={8}>
                            <Form.Item name='shell' valuePropName={String(values.shell)} label='Shell'>
                                <AutoComplete
                                    onChange={handleChangeSelect('shell')}
                                    placeholder='/bin/sh'
                                    value={String(values.shell)}
                                    //allowClear
                                    options={[
                                        {
                                            label: 'Linux / macOS',
                                            options: [
                                                { label: 'sh', value: 'sh' },
                                                { label: '/bin/sh', value: '/bin/sh' },
                                                { label: 'bash', value: 'bash' },
                                                { label: '/bin/bash', value: '/bin/bash' },
                                            ],
                                        },
                                        {
                                            label: 'Windows',
                                            options: [
                                                { label: 'cmd', value: 'cmd' },
                                                { label: 'powershell', value: 'powershell' },
                                                { label: 'pwsh', value: 'pwsh' },
                                            ],
                                        },
                                    ]}>
                                </AutoComplete>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <Divider plain />
                <Table
                    title={() => (
                        <Button
                            onClick={handleExpandAllRows}
                            type="primary"
                            size="small"
                        >
                            {expandButtonText}
                        </Button>
                    )}
                    key={forceRerender ? 'forceUpdate' : 'normal'}
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <>
                                {record.log && (
                                    <div>
                                        <Paragraph>
                                            Before:
                                        </Paragraph>
                                        <Paragraph>
                                            <pre>
                                                <Text copyable>
                                                    {record.log}
                                                </Text>
                                            </pre>
                                        </Paragraph>
                                    </div>
                                )}
                                {record.listener_cmd && (
                                    <div>
                                        <Paragraph>
                                            Listener:
                                        </Paragraph>
                                        <Paragraph>
                                            <pre>
                                                <Text copyable>
                                                    {record.listener_cmd}
                                                </Text>
                                            </pre>
                                        </Paragraph>
                                    </div>
                                )}
                                {(record.listener_cmd || record.log) && (
                                    <div>
                                        <Paragraph>
                                            Victim:
                                        </Paragraph>
                                    </div>
                                )}
                                <Paragraph>
                                    <pre>
                                        <Text copyable>
                                            {record.command}
                                        </Text>
                                    </pre>
                                </Paragraph>
                                {/* Oneliner */}
                                {record.oneliner.length > 0 && (
                                    <div>
                                        <Paragraph>
                                            OneLiner:
                                        </Paragraph>
                                        <div>
                                            {record.oneliner.map((item, index) => {
                                                // 获取键和值
                                                const key = Object.keys(item)[0];
                                                const value = item[key];
                                                // 调用 oneliner 函数
                                                const result = oneliner(record[value], key as any);
                                                return (
                                                    <Paragraph key={index}>
                                                        <pre>
                                                            <Text copyable>
                                                                {result}
                                                            </Text>
                                                        </pre>
                                                    </Paragraph>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                        expandRowByClick: true,
                        defaultExpandAllRows: expandAllRows ? true : undefined,
                    }}
                    dataSource={data}
                    onChange={handleChangeFilter}
                    scroll={{ y: 650 }} // 定义垂直滚动
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: 5, //默认每页行数
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                        position: ["bottomRight"]
                    }}
                />
            </div>
        </div >
    );
}
