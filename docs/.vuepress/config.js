module.exports = {
  base: '/notes/',
  dest: 'dist',
  title: 'study notes',
  description: 'daily study notes',
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [],
    sidebar: [
      {
        title: '前端',
        collapsable: false,
        children: [['frontend/', 'Introduction']]
      },
      {
        title: '服务器',
        collapsable: false,
        children: [
          'server/阿里云服务器购买使用',
          'server/centOS-Jenkins安装与使用'
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
