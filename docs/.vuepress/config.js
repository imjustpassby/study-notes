module.exports = {
  base: '/notes/',
  dest: 'dist',
  title: '搬砖日记🤺🤺🤺',
  description: '高效搬砖手册📖',
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [],
    sidebar: [
      {
        title: '前端',
        collapsable: false,
        children: [
          ['frontend/', 'Introduction'],
          'frontend/vue+ts引入antd',
          'frontend/vue+ts+antd项目建立',
          'frontend/vue-ts中封装axios',
          'frontend/vue-ts项目中vuex如何使用'
        ]
      },
      {
        title: '服务器',
        collapsable: false,
        children: [
          'server/阿里云服务器购买使用',
          'server/centOS-Jenkins安装与使用',
          'server/使用SSH-Key登录远程服务器'
        ]
      },
      {
        title: '软件',
        collapsable: false,
        children: ['software/Typora图片自动上传']
      }
    ]
  }
};
