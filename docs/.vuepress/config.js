module.exports = {
  base: '/notes/',
  dest: 'dist',
  title: '搬砖日记🤺🤺🤺',
  description: '高效搬砖手册📖',
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [],
    smoothScroll: true,
    sidebar: [
      {
        title: 'Vue',
        collapsable: false,
        children: [
          ['vue/', 'Introduction'],
          'vue/vue+ts引入antd',
          'vue/vue+ts+antd项目建立',
          'vue/vue-ts中封装axios',
          'vue/vue-ts项目中vuex如何使用'
        ]
      },
	  {
	    title: 'React',
		collapsable: false,
		children: [
		  'react/react外链资源'
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
      },
      {
        title: '外链资源',
        collapsable: false,
        children: [
		  'outside/dalao/技术大佬',
          'outside/docker/docker',
          'outside/typescript/TypeScript',
          'outside/node/node',
		  'outside/tools/tools'
        ]
      }
    ]
  }
};
