module.exports = {
  title: "朋来前端 开发规范&文档积累",
  description: "前端开发规范, 朋来前端, 朋来互动, 文档资产",
  dest: 'docs-dist',

  themeConfig: {
    repo: 'xxx',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    sidebar: [
      {
        title: "项目说明文档",
        collapsable: false,
        children: [
          ['deploy', '部署说明文档'],
          ['version', '版本更新说明'],
          ['core', '核心业务说明']
        ]
      }
    ]
  }
}
