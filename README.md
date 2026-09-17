# 刘一骏 · Yijun Liu

中英文响应式个人主页，适用于 GitHub Pages。纯 HTML / CSS / JavaScript，无需安装依赖或构建。

## 本地预览

直接打开 `index.html`，或在目录运行 `python -m http.server 8000` 后访问 http://localhost:8000。

## 日常维护

- `content.js`：全部中英文文案、教育及实习经历。`zh` 为中文，`en` 为英文，修改时同步维护。
- 每条经历的 `website` 为机构官网，`logo` 为本地标志路径。标志固定在机构名称左侧，点击名称在新窗口打开官网；素材来源见 `assets/logos/SOURCES.md`。
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

### 联系表单

`contact-config.js` 的 `endpoint` 为空时，访客可以填写内容，但发送按钮禁用，页面明确提示尚未开放提交。当前没有接收后端，填写内容不会被保存，也不会发送邮件。

当前已配置 Formspree 地址，`submissionsEnabled: true`，使用 `submissionMode: 'hosted-captcha'`。访客提交后通过原生 POST 前往 Formspree 托管的 reCAPTCHA 验证流程，提交字段包括 `name`、`email`、`message` 和隐藏蜜罐 `_gotcha`。验证码校验和最终结果由 Formspree 处理，本站不会提前显示发送成功。必须在 Formspree 的 Settings → Spam protection 中保持 CAPTCHA 开启并选择默认 reCAPTCHA；网页配置本身不能开启服务端防护。尚需实际验证后台设置与收件。

不要填写邮箱密码或秘密 API key。信息不写入浏览器持久存储。将 `submissionsEnabled` 设为 `false` 可关闭网页提交入口，但不能禁用公开的 Formspree 接口。上线后请用本人信息完成一次人工验证码和收件验证。

`interactions.js` 管理导航高亮、渐入动效和表单状态。系统“减少动态效果”开启时，关闭动画和顺滑滚动。

检查本地效果及 `git diff` 后，提交并推送到 GitHub Pages 配置的分支。页面没有第三方字体或分析脚本，语言偏好只保存在访问者浏览器本地。

简历仅用作资料来源，没有复制进仓库。不要把简历原件、证件照、邮箱、电话等私人信息加入仓库。页面仅选用教育与实习经历，不展示项目经历或技能。新照片发布前应移除 EXIF 定位等元数据。
