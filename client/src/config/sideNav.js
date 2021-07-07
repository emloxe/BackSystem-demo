const navFirst = [
  {
    title: "首页",
    icon: "HomeOutlined",
    path: '',
    hasChild: false,
  },
  {
    title: "easyMock",
    icon: "CloudOutlined",
    path: "/easy-mock",
    hasChild: false,
  },
  {
    title: "个人中心",
    icon: "UserOutlined",
    path: "/user",
    hasChild: true,
  },
];


const navSecond = [
  {
    title: "用户信息",
    key: "/user/info",
    icon: "",
    parent: '个人中心',
  },
  {
    title: "头像修改",
    key: "/user/modify-avatar",
    icon: "",
    parent: '个人中心',
  }
];


const conf = [
  {
    title: "首页",
    icon: "HomeOutlined",
    key: "",
  },
  {
    title: "easyMock",
    icon: "CloudOutlined",
    key: "/easy-mock",
  },

  {
    title: "个人中心",
    icon: "UserOutlined",
    key: "/user",
    subs: [
      {
        title: "用户信息",
        key: "/user/info",
        icon: "",
      },
      {
        title: "头像修改",
        key: "/user/modify-avatar",
        icon: "",
      },
    ],
  },
];
export default conf;
