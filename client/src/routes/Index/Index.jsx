import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import Home from "../Home/Home";
import User from "../User/User";
import EasyMock from "../EasyMock/EasyMock";
import NoPage from "../NoPage/NoPage";

import SideNav from "../../components/SideNav/SideNav";

import "./Index.css";

const { Header, Sider, Content, Footer } = Layout;

export default function SiderDemo() {
  const [collapsed, setCollapsed] = useState(false);

  let match = useRouteMatch();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    console.log(match);
    console.log(333);
  });

  return (
    <Layout className="layout-custom">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="logo" />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="trigger-sideNav">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </div>

          <SideNav />
        </Sider>

        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
            }}
          >
            <Breadcrumb style={{ marginBottom: 10 }}>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <UserOutlined />
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>

            <Switch>
              <Route exact path={`${match.path}/`} children={<Home />} />
              <Route path={`${match.path}/user`} children={<User />} />
              <Route path={`${match.path}/easy-mock`} children={<EasyMock />} />
              <Route path={`${match.path}/*`} children={<NoPage />} />
            </Switch>
          </Content>
          <Footer className="footer">MIT Licensed | Copyright © 2021-present Zhang W.J. </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
