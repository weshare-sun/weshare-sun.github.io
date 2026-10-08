# Computing × Chemistry — 个人学习主页

计算机网络实验一：静态网页制作。

一个用 **原生 HTML5 + CSS3 + 少量 JavaScript** 做的个人主页，主题是
「计算机 × 化学 × AI for Science」，部署在 GitHub Pages 上。

没有使用任何前端框架，也没有引入第三方依赖 —— 页面里看到的每一个元素和样式，
都是这个仓库里的几个文件直接写出来的。

## 线上地址

**https://weshare-sun.github.io/**

## 页面与功能

| 文件 | 内容 |
| :--- | :--- |
| `index.html` | 主页：Hero、About、Learning、Projects、Blog、Links 六个区域 |
| `blog.html` | 博客页：一篇完整文章《从 HTTP 到一个真正上线的网页》+ 两篇预告 |
| `404.html` | 自定义 404 页面（GitHub Pages 会自动使用） |

主页功能：

- **顶部导航栏** —— sticky 固定，点击平滑滚动到对应区域，滚动后出现阴影，移动端折叠为汉堡菜单
- **Hero 首屏** —— 主标题、副标题、简介与两个入口按钮
- **About Me** —— 个人介绍与当前兴趣列表
- **Learning** —— 四张学习方向卡片 + 一张 Current Learning Overview 表格
- **Projects** —— 三张项目卡片，带技术标签和 Learn More 链接
- **Blog** —— 一篇完整文章的入口 + 两篇 Coming Soon
- **Useful Links** —— 六个外部链接卡片，均在新标签页打开
- **深色 / 浅色主题切换** —— 记忆用户选择
- **回到顶部按钮**、**滚动淡入动画**

## 使用技术

- **HTML5** —— 语义化标签：`header` / `nav` / `main` / `section` / `article` / `figure` / `footer`，
  以及 `table`、`ul`、`pre`、`time` 等
- **CSS3** —— CSS 变量、Flexbox、Grid、`clamp()`、媒体查询、过渡与 hover 效果、
  `prefers-color-scheme` 与 `prefers-reduced-motion`
- **JavaScript（原生，无依赖）** —— 主题切换、移动端菜单、导航栏滚动状态、
  回到顶部、`IntersectionObserver` 滚动淡入
- **Git / GitHub Pages** —— 版本管理与静态托管

## 项目目录结构

```
project/
├── index.html                 # 主页
├── blog.html                  # 博客页（含完整文章）
├── 404.html                   # 自定义 404
├── .nojekyll                  # 告诉 GitHub Pages 跳过 Jekyll 处理
├── css/
│   └── style.css              # 全部样式（含深色主题）
├── js/
│   └── main.js                # 全部交互脚本
├── assets/
│   └── images/                # 自绘 SVG 图片与 favicon
│       ├── hero-visual.svg
│       ├── project-web.svg
│       ├── project-ml.svg
│       ├── project-chem.svg
│       ├── avatar.svg
│       ├── favicon.svg
│       └── og-cover.png
├── report/
│   └── experiment-notes.md    # 实验报告材料
└── README.md
```

## 本地运行

这是一个纯静态站点，不需要构建步骤。任选一种方式：

**方式一：直接打开**

双击 `index.html` 即可在浏览器中查看。

**方式二：起一个本地服务器**（推荐，行为与线上一致）

```bash
# Python 3
python -m http.server 8000

# 或者 Node.js
npx serve .
```

然后访问 <http://localhost:8000>。

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "init website structure"
git branch -M main
git remote add origin https://github.com/<用户名>/<用户名>.github.io.git
git push -u origin main
```

在仓库的 **Settings → Pages** 中，把发布来源设置为 `main` 分支的根目录。
等一到两分钟后访问 `https://<用户名>.github.io` 即可。

本仓库已经包含 `.nojekyll` 文件，可以避免 GitHub Pages 用 Jekyll 处理这些文件。

## 图片说明

`assets/images/` 下的图片都是手写的 **SVG**（渐变、分子结构、神经网络示意图等），
体积小、缩放不糊、没有版权问题，也不需要联网加载。

`og-cover.png` 是社交分享封面（部分平台不支持 SVG，所以单独导出 PNG）。

## 作者与 AI 工具说明

页面的结构划分、内容组织、配色与交互设计由作者确定；
具体的 HTML / CSS / JavaScript 代码有相当一部分借助 AI 工具生成，再由作者逐段阅读和修改。

公开页面与公开文件中只使用网名 `wesharesun`；真实姓名与学号不出现在站点和仓库里，
只保留在本地提交用的 PDF 报告中。
