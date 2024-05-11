import React, { useState, useEffect } from 'react';
import logo from '../static/logo.svg';
import '../static/App.css';
import PersistedState from 'use-persisted-state';
import { Layout, Menu, Typography, theme, Button, Select, ConfigProvider } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import About from '../components/About';
import About2 from '../components/About2';
import internal from 'stream';

const { Sider, Content } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: ['https://estamelgg.github.io/hack-tools-html/iconfont.js']
});


const MainWindow = () => {
  const location = useLocation();
  const [defaultIndex, setDefaultIndex] = useState('0');
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
      icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
      name: 'About2',
      path: '/About2',
      component: About2
    }
  ]

  const MenuItemsLists = Tabs.map((item) => (
    <Menu.Item style={{ overflow: 'hidden' }} key={item.key} icon={item.icon}>
      <a href={item.path}>
        {item.name}
      </a>
    </Menu.Item>
  ));

  useEffect(() => {
    const currentTab = Tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setDefaultIndex(currentTab.key);
      console.info("set " + currentTab.key)
    }
    else {
      setDefaultIndex('0');
      console.info("default 0")
    }
  }, [location.pathname, Tabs]);

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={true}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <div className='logo'>
            <svg xmlns='http://www.w3.org/2000/svg' width='45' height='35' viewBox='0 0 134.624 80.584'>
              <g transform='translate(-6.457 -23.8)'>
                <path
                  d='M138.715,62.377c-9.043-1.871-15.592.78-21.673,4.989l-5.616-26.958-2.18-10.463a1.432,1.432,0,0,0-.624-.936c-.312-.156-6.86-4.21-32.431-4.21s-34.458,4.678-34.77,4.834c-.468.312-.78.624-.78,1.091L36.9,57.543c-4.678,0-19.022.624-26.039,9.2C7.119,71.264,6.651,78.125,9.3,84.829c4.054,9.979,14.033,16.839,26.506,18.087a80.594,80.594,0,0,0,8.42.468c21.985,0,40.071-8.887,52.389-16.06,1.559-.468,11.538-3.274,24.635-8.42,14.812-5.769,18.554-14.033,18.71-14.5a2.163,2.163,0,0,0,0-1.4C139.495,62.689,139.183,62.377,138.715,62.377ZM43.448,32.128c2.495-1.091,11.694-4.21,32.743-4.21,20.581,0,28.377,2.651,30.248,3.43L111.585,56.3a165.118,165.118,0,0,1-40.851,8.887C51.088,66.9,41.733,63,39.238,61.6ZM95.058,84.517c-13.409,7.8-33.991,17.931-59.094,15.436-11.382-1.247-20.27-7.328-24.012-16.216-2.183-5.613-1.871-11.382,1.091-14.968,5.925-7.328,18.554-8.108,23.232-8.108L34.249,74.694a1.367,1.367,0,0,0,.78,1.559c9.979,6.081,21.049,8.264,31.5,8.264,16.216,0,31.34-5.145,40.7-9.043A85,85,0,0,1,95.058,84.517ZM120,75.942C114.236,78.125,109.091,80,104.881,81.4c2.183-1.715,4.054-3.43,6.081-5.145,7.172-6.237,13.1-11.382,21.829-11.382a19.881,19.881,0,0,1,2.962.156C134.038,67.522,129.516,72.356,120,75.942Z'
                  transform='translate(0 0)'
                  fill='#F0F2F5'
                  stroke='#F0F2F5'
                  strokeWidth='2'
                />
              </g>
            </svg>
          </div>

          <Menu theme='dark' defaultSelectedKeys={[defaultIndex]} mode='inline'>
            {MenuItemsLists}
          </Menu>
        </Sider>
        <Layout className='site-layout' style={{ marginLeft: 80 }}>
          <Content style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            minHeight: 360,
            padding: 14,
            borderRadius: 8
          }}>
            <Routes>
              {Tabs.map((tab) => (
                <Route key={tab.key} path={tab.path} element={<tab.component />} />
              ))}
              <Route path="*" element={<About />} />
            </Routes>
          </Content>
        </Layout>
      </Layout >
    </ConfigProvider >
  );
}

export default MainWindow;
