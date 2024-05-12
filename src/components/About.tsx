import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;

export default function About () {
    return (
        <div>
            <Title
                level={2}
                style={{
                    fontWeight: 'bold',
                    margin: 15
                }}
            >
                About
            </Title>
            <Paragraph
                style={{
                    margin: 15
                }}
            >
                This project is a fork from  <Link href='https://github.com/LasCC/HackTools/' target='_blank'>HackTools</Link>
            </Paragraph>
            <Divider dashed />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}> Contributors </Title>
                 <Paragraph>- Despicable, shameless, vulgar, low-class, crude hacker: <Link href='https://github.com/EstamelGG/' target='_blank'>EstamelGG</Link></Paragraph>
                 <Paragraph>- Embarrassing, creepy, perverted otaku: <Link href='https://github.com/sakarie9' target='_blank'>sakarie9</Link></Paragraph>
            </div>
        </div>
    );
}
