import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
import About from './About';
import ReverseShell from './revShell/ReverseShell';
import PHPWebShell from './revShell/PHPWebShell';
import FileEncodeTrans from './file_transfer/ObfuscatedFiles';
import MSFVenom from './msfvenom/MSFBuilder'

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
    key: '11',
    icon: <IconFont type='icon-Encode-File' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Obfuscated Files',
    path: '/FileEncodeTrans',
    component: FileEncodeTrans
  },
  {
    key: '14',
    icon: <IconFont type='icon-shield' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'MSFVenom',
    path: '/MSFVenom',
    component: MSFVenom
  }
];


export { Tabs };