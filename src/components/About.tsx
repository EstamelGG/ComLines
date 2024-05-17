import React from 'react';
import { Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import '../i18n';
import ReferenceLinks from './utils/reference';
import moment from "moment-timezone";

const { Title, Paragraph, Link } = Typography;
const rawTimeStamp = process.env.REACT_APP_COMPILATION_TIME;
const compilationTime = parseInt(rawTimeStamp);
const currentTime = moment();
const compilationMoment = moment(compilationTime);
const timeSinceCompile = moment.duration(currentTime.diff(compilationMoment)).humanize();
//console.log(compilationTime > 0)

export default function About() {
    //const rawTimeStamp = useFetchTextFile('./COMPILATION_TIME');

    const { t } = useTranslation();

    return (
        <div>
            <Title
                level={2}
                style={{
                    fontWeight: 'bold',
                    margin: 15
                }}
            >
                {t('about')}
            </Title>
            <Paragraph
                style={{
                    margin: 15
                }}
            >
                <div>{t('about_text')}  <Link href='https://github.com/LasCC/HackTools/' target='_blank'>HackTools</Link></div>
            </Paragraph>

            <Paragraph
                style={{
                    margin: 15
                }}
            >
                {compilationTime > 0 && (<div>
                    [ Last build: {timeSinceCompile.substr(0, 1).toUpperCase() + timeSinceCompile.substr(1)} ago ]
                </div>)}
            </Paragraph>

            <Divider plain />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}> {t('aboutlink')} </Title>
                <Paragraph style={{
                    margin: 15
                }}>
                    <ReferenceLinks references={t('functionLinks', { returnObjects: true })} />
                    {/* 自定义的参考链接展示 */}
                </Paragraph>
            </div>
            <Divider plain />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}> {t('Contributors')} </Title>
                <Paragraph>- {t('aboutme0')} <Link href='https://chatgpt.com/' target='_blank'>ChatGPT</Link></Paragraph>
                <Paragraph>- {t('aboutme1')} <Link href='https://github.com/EstamelGG/' target='_blank'>EstamelGG</Link></Paragraph>
                <Paragraph>- {t('aboutme2')} <Link href='https://github.com/sakarie9' target='_blank'>sakarie9</Link></Paragraph>
            </div>
        </div>
    );
}
