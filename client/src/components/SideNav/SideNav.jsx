import navConf from "../../config/sideNav";
import { Menu } from "antd";

import React, { useState, useEffect } from "react";

import * as Icon from "@ant-design/icons";

import { Link, useRouteMatch, useLocation } from "react-router-dom";
const { SubMenu, Item } = Menu;
export default function SiderNav(props) {
  let match = useRouteMatch();
  let location = useLocation();
  const len = match.url.length;

  const [openKeys, setOpenKeys] = useState([]);
  let [selectedKey, setSelectedKey] = useState("/easy-mock");

  const pathname = window.location.pathname;
  setSelectedKey(pathname.slice(len));

  useEffect(() => {
    console.log("只执行一次3333");
  }, []);

  const renderMenuItem = ({ key, icon, title }) => {
    return (
      <Item key={key} icon={icon && React.createElement(Icon[icon])}>
        <Link to={`${match.url}${key}`}>
          <span>{title}</span>
        </Link>
      </Item>
    );
  };

  const renderSubMenu = ({ key, icon, title, subs }) => {
    return (
      <SubMenu
        key={key}
        title={title}
        icon={icon && React.createElement(Icon[icon])}
      >
        {subs &&
          subs.map((item) => {
            return item.subs && item.subs.length > 0
              ? renderSubMenu(item)
              : renderMenuItem(item);
          })}
      </SubMenu>
    );
  };

  const selectNavHandler = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log(item, key, keyPath, selectedKeys, domEvent);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[selectedKey]}
      onClick={selectNavHandler}
      // openKeys={openKeys}
    >
      {navConf &&
        navConf.map((item) => {
          return item.subs && item.subs.length > 0
            ? renderSubMenu(item)
            : renderMenuItem(item);
        })}
    </Menu>
  );
}
