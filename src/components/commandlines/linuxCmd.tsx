import React from 'react';
import { Typography, Divider, Collapse } from 'antd';
import '../../i18n';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text, Link } = Typography;

export default function LinuxCommands() {
    const { t } = useTranslation();
    let payloads = require('../../static/data/linuxCmds.json');
    document.title = `${t('linux_cmd_title')} - HackTrick Checklist`;
    return (
        <div style={{ margin: 15 }}>
            <Title level={2} style={{ fontWeight: 'bold' }}>
                {t('linux_cmd_title')}
            </Title>
            <Paragraph>{t('linux_cmd_desc')}</Paragraph>
            <Divider orientation='center' style={{ padding: 5 }}>
                Userful Links
            </Divider>
            <div>
                - <Link href="https://github.com/peass-ng/PEASS-ng/releases" target='_blank'>Get PEASS-ng/releases</Link>
                <br />
                - <Link href="https://gtfobins.github.io/" target='_blank'>GTFOBins</Link>
            </div>
            <div>
                {Object.keys(payloads).map((key, index) => (
                    <div key={index}>
                        <Divider orientation='center' style={{ padding: 5 }}>
                            {t([key]) || key}
                        </Divider>
                        <div>
                            {payloads[key].map((cmd, i) => (
                                <Paragraph key={i}>
                                    <pre><Text copyable>{cmd}</Text></pre>
                                </Paragraph>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
