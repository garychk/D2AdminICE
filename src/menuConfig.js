/* eslint-disable */
import util from './libs/util.ice'; // 菜单配置
// 侧栏菜单配置
// ice 会在新建页面的时候 push 数据
// ice 自动添加的菜单记录是以下格式：(不会有嵌套)
// {
//   name: 'Nav',
//   path: '/page',
//   icon: 'home',
// },

const asideMenuConfig = [
  {
    name: '控制台',
    icon: 'desktop',
    path: '/Dashboard/',
  },
  {
    name: '系统设置',
    icon: 'cog',
    children: [
      {
        name: '租户管理',
        path: '/Tenants',
        icon: 'user',
      },
      {
        name: '管理员',
        path: '/Users/',
        icon: 'users',
      },
      {
        name: '部门设置',
        path: '/Department/',
        icon: 'square-o',
      },
      {
        name: '用户设置',
        path: '/Members/',
        icon: 'user-o',
      },
      {
        name: '权限设置',
        path: '/Powers/',
        icon: 'lock',
      },
    ],
  },
  {
    name: '内容设置',
    path: '/Contents',
    icon: 'file-text-o',
    children: [
      {
        name: '内容管理',
        path: '/Contents/',
        icon: 'file-text-o',
      },
      {
        name: '分类设置',
        path: '/Categories/',
        icon: 'list-alt',
      },
    ],
  },
  {
    name: '模块管理',
    path: '/Tenants',
    icon: 'cube',
  },
]; // 顶栏菜单配置
// ice 不会修改 headerMenuConfig
// 如果你需要功能开发之前就配置出菜单原型，可以只设置 name 字段
// D2Admin 会自动添加不重复 id 生成菜单，并在点击时提示这是一个临时菜单

const headerMenuConfig = [
  {
    name: '系统设置',
    icon: 'gear',
    children: [
      {
        name: '设置',
        path: '/Config/',
        icon: 'cog',
      },
      {
        name: '系统帮助',
        path: 'https://d2admin.fairyever.com/#/index',
        icon: 'info',
      },
    ],
  },
]; // 请根据自身业务逻辑修改导出设置，并在合适的位置赋给对应的菜单
// 参考
// 设置顶栏菜单的方法 (vuex)
// $store.commit('d2adminMenuHeaderSet', menus)
// 设置侧边栏菜单的方法 (vuex)
// $store.commit('d2adminMenuAsideSet', menus)
// 你可以在任何地方使用上述方法修改顶栏和侧边栏菜单
// 导出顶栏菜单

export const menuHeader = util.recursiveMenuConfig(headerMenuConfig); // 导出侧边栏菜单

export const menuAside = util.recursiveMenuConfig(asideMenuConfig);
