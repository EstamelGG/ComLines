import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
import About from './About';
import ReverseShell from './revShell/ReverseShell';
import PHPWebShell from './revShell/PHPWebShell';
import FileEncodeTrans from './file_transfer/ObfuscatedFiles';
import MSFVenom from './msfvenom/MSFBuilder'
import SpawnTTY from './linux_terminal/TtySpawnShell'
import Encoder from './encoding/DataEncoding';
import Hashing from './encoding/Hashing';
import OneLinerGenerator from './OnelinerGenerator/OnelinerPage';

const IconFont = createFromIconfontCN({
  scriptUrl: ['./iconfont.js']
});

interface IRouterComponent {
  key: string;
  icon: JSX.Element;
  name: string;
  path: string;
  component: React.ComponentType<any>;
}

const Tabs: Array<IRouterComponent> = [
  {
    key: '1',
    icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'About',
    path: '/About',
    component: About
  },
  {
    key: '2',
    icon: <IconFont type='icon-gnubash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Reverse Shell',
    path: '/RevShell',
    component: ReverseShell
  },
  {
    key: '3',
    icon: <IconFont type='icon-php' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'PHP WebShell',
    path: '/PHPWebShell',
    component: PHPWebShell
  },
  {
    key: '4',
    icon: <IconFont type='icon-lvzhou_yuanchengTelnet' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'TTY Shell',
    path: '/SpawnTTY',
    component: SpawnTTY
  },
  {
    key: '10',
    icon: <IconFont type='icon-jiemaleixing' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Data Encoder',
    path: '/Encoder',
    component: Encoder
  },
  {
    key: '11',
    icon: <IconFont type='icon-yasuo' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'OneLiner',
    path: '/OneLiner',
    component: OneLinerGenerator
  },
  {
    key: '12',
    icon: <IconFont type='icon-Encode-File' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Obfuscated Files',
    path: '/FileEncodeTrans',
    component: FileEncodeTrans
  },
  {
    key: '13',
    icon: <IconFont type='icon-hash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Calc Hash',
    path: '/Hashing',
    component: Hashing
  },
  {
    key: '15',
    icon: <IconFont type='icon-shield' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'MSFVenom',
    path: '/MSFVenom',
    component: MSFVenom
  }
];


export { Tabs };