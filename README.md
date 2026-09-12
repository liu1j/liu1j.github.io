# 刘一骏 · Yijun Liu

中英文响应式个人主页，适用于 GitHub Pages。纯 HTML / CSS / JavaScript，无需安装依赖或构建。

## 本地预览

直接打开 `index.html`，或在目录运行 `python -m http.server 8000` 后访问 http://localhost:8000。

## 日常维护

- `content.js`：全部中英文文案、教育及实习经历。`zh` 为中文，`en` 为英文，修改时同步维护。
- `education`、`experience` 数组按从新到旧排列，可复制一个条目新增经历。`current: true` 表示进行中，实习结束后移除并修改时间。
- 毕业后更新简介和教育条目中的“预计 2026 年 12 月”。
- `styles.css`：页面样式，顶部变量定义颜色；底部定义手机和平板布局。
- `assets/golden-gate.webp`：用户提供的金门大桥照片的网页优化版本，已去除元数据。未提取或使用简历证件照。原始 JPG 仅留在本地并被 Git 忽略。
- `CNAME`：现有自定义域名配置，保留即可。

## 添加爱好、旅行、摄影

向 `content.js` 最后的 `sections` 数组添加条目，即可自动展示新的区域：

```js
{
  title: { zh: '旅途中的光', en: 'Light along the way' },
  text: { zh: '写下你的旅行记录。', en: 'Your travel notes.' },
  photos: [
    {
      src: 'assets/travel/photo.jpg',
      alt: { zh: '画面描述', en: 'Describe the photograph' },
      caption: { zh: '地点 · 日期', en: 'Place · Date' }
    }
  ]
}
```

将照片放入对应路径。纯文字爱好区域使用 `photos: []`；空 `sections` 数组不会出现占位区域。

## 发布与隐私

检查本地效果及 `git diff` 后，提交并推送到 GitHub Pages 配置的分支。页面没有第三方字体或分析脚本，语言偏好只保存在访问者浏览器本地。

简历仅用作资料来源，没有复制进仓库。不要把简历原件、证件照、邮箱、电话等私人信息加入仓库。页面仅选用教育与实习经历，不展示项目经历或技能。新照片发布前应移除 EXIF 定位等元数据。
