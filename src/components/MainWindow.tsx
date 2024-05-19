import React, { useState, useEffect } from 'react';
import '../static/App.css';
import { Layout, Menu, ConfigProvider, FloatButton} from 'antd';
import { useLocation, Outlet, Link, Route, Routes } from 'react-router-dom';
import About from '../components/About';
import { Tabs } from './RouterTabs';

const { Sider, Content } = Layout;

const MainWindow = () => {

  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(() => {
    const currentTab = Tabs.find(tab => tab.path === location.pathname);
    return currentTab ? currentTab.key : '0';
  });

  useEffect(() => {
    const currentTab = Tabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setSelectedKey(currentTab.key);
    }
  }, [location.pathname]);

  const MenuItemsLists = Tabs.map((item) => (
    <Menu.Item style={{ overflow: 'hidden' }} key={item.key} icon={item.icon}>
      <Link to={item.path}>
        {item.name}
      </Link>
    </Menu.Item>
  ));

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={true}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 1000, // 保持在其他组件之上
            overflowX: "hidden",
          }}
        >
          <div className='logo'>
            <svg xmlns='http://www.w3.org/2000/svg' width='45' height='35' viewBox="0 0 260 174">
              <g transform='translate(-6.457 -23.8)'>
                <path
                  d="M252.59,84.22c-22.12,3.78-38.96,23.03-38.96,46.23c0,2.63,0.23,5.21,0.65,7.73c-1.7-0.12-3.42-0.19-5.15-0.19 c-25.16,0-42.24,13.63-49.13,34.01h-60c-6.64-20.38-23.97-34.01-49.13-34.01c-1.73,0-3.45,0.07-5.15,0.19 c0.42-2.52,0.65-5.1,0.65-7.73c0-23.2-16.84-42.45-38.96-46.23c11.11-9.31,18.18-23.28,18.18-38.91c0-18.03-9.41-33.87-23.59-42.85 C5.24,2.15,8.53,2,11.85,2C42.9,2,70.8,15.46,90.03,36.88C83.73,46.99,80,59.56,80,73.18c0,20.74,8.188,39.615,21.83,49.92 c4.51,3.407,9.144,2.374,11.898-0.304c2.828-2.75,2.825-7.778-0.338-11.076c-9.915-10.34-14.48-15.96-14.16-30.52 c0.11-5.28,2.14-10.29,5.05-14.55c-1.57-0.17-3.21-0.77-4.71-2.18c-4.75-4.48-3.92-11.86-3.87-12.23c4.32,5.28,11.4,7.23,17.7,5.17 c0.15-0.11,0.3-0.21,0.45-0.32c-9.93-7.24-7.53-18.66-7.44-19.07c3.48,8.62,11.88,14.03,20.89,13.97 c9.81-1.18,17.33,2.83,17.33,2.83s2.12-4.22,2.12-10.55c0,0,5.25,5.09,9.08,13.76c2.64,5.97,3.05,11.89,6.44,15.88l4.89,4.69 c1.27,1.21,1.29,3.24,0.03,4.47l-6.09,6.02l0.61-5.18L149.5,77.8c1.35,3.36,5.1,11.59,5.1,11.59l3.78,1.63l-4.74,1.77 c-1.74,0.64-3.69,0.14-4.9-1.26c-2.83-3.3-11.76-13.79-12.23-14.36c-3.13-3.83-10.09-4.53-13.21,1.61c-2.2,4.34,0.67,8.25,1.87,9.63 c5.84,6.72,26.51,15.42,37.9,30.18c10.44-11.07,17.03-27.31,17.03-45.41c0-13.66-3.75-26.25-10.07-36.37 C189.26,15.44,217.13,2,248.15,2c3.32,0,6.61,0.15,9.85,0.46c-14.18,8.98-23.59,24.82-23.59,42.85 C234.41,60.94,241.48,74.91,252.59,84.22z"
                  transform='translate(0 0)'
                  fill='#F0F2F5'
                />
              </g>
            </svg>
          </div>
          <Menu theme='dark' selectedKeys={[selectedKey]} mode='inline'>
            {MenuItemsLists}
          </Menu>
        </Sider>
        <Layout className='site-layout' style={{ marginLeft: 80 }}>
          <Content style={{
            margin: '16px 16px 0',
            overflow: 'initial',
            minHeight: 360,
            padding: '14px 60px 14px 14px',
            borderRadius: 8
          }}>
            <Routes>
              {Tabs.map((tab) => (
                <Route key={tab.key} path={tab.path} element={<tab.component />} />
              ))}
              <Route path="*" element={<About />} />
            </Routes>
            <Outlet />
          </Content>
          <FloatButton.BackTop visibilityHeight={10}>
          </FloatButton.BackTop>
        </Layout>
      </Layout >
    </ConfigProvider >
  );
}

export default MainWindow;
