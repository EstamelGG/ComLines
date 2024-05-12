import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
import About from './About';
import ReverseShell from './revShell/ReverseShell';
import {  } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [`${require('../package.json').homepage}/iconfont.js`]
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
    key: '0',
    icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'About',
    path: '/About',
    component: About
  },
  {
    key: '1',
    icon: <IconFont type='icon-gnubash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
    name: 'Reverse Shell',
    path: '/RevShell',
    component: ReverseShell
  }
];


export { Tabs };