import navConf from "../../config/sideNav";
import { Menu } from "antd";

import React, { useEffect } from "react";

import { Link, useRouteMatch, useParams } from "react-router-dom";

import { UserOutlined, HomeOutlined, CloudOutlined } from "@ant-design/icons";

export default function SiderNav(Props) {
  let match = useRouteMatch();

  useEffect(() => {
  });

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[match.url]} selectedKeys={['/easy-mock']}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to={`${match.url}`}>首页</Link>
      </Menu.Item>
      <Menu.Item key="/easy-mock" icon={<CloudOutlined />}>
        <Link to={`${match.url}/easy-mock`}>easyMock</Link>
      </Menu.Item>

      <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="个人中心">
        <Menu.Item key="/user/info">
          <Link to={`${match.url}/user/info`}>用户信息</Link>
        </Menu.Item>
        <Menu.Item key="/user/modify-avatar">
          <Link to={`${match.url}/user/modify-avatar`}>头像修改</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}
