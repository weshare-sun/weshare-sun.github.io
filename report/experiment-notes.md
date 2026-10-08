# 计算机网络实验一：静态网页制作

| 项目 | 内容 |
| :--- | :--- |
| 姓名 | wesharesun |
| 个人主页 | https://weshare-sun.github.io/ |
| HTTP 版本 | HTTP/2（实测，见第五节） |

> 本文件随站点一同公开，因此只使用网名 wesharesun；真实姓名与学号只出现在提交用的 PDF 报告中。


---

## 一、实验目的

1. 熟悉 HTML 与 CSS 的基本语法，掌握常用标签与样式的实际用法
2. 理解静态网页的文档结构与「内容与表现分离」的设计思路
3. 学习把本地网页部署到公网，走通从源码到可访问网址的完整流程
4. 观察网页访问与 HTTP 协议之间的关系，理解 HTTP 在其中的作用

## 二、实验环境

| 类别 | 具体环境 |
| :--- | :--- |
| 操作系统 | Windows 11 |
| 编辑器 | VS Code |
| 页面技术 | HTML5、CSS3、原生 JavaScript |
| 版本控制 | Git 2.55 |
| 托管平台 | GitHub Pages |
| 浏览器 | Microsoft Edge（开发者工具 / 无头模式） |
| 代码实现方式 | 结构、内容与交互设计由本人确定；HTML / CSS / JavaScript 代码借助 AI 工具生成后逐段阅读与修改 |

## 三、网页设计

### 3.1 网站主题

网站定位为「计算机 × 化学 × AI for Science」的个人学习主页。
选择这个主题，是因为它既能体现我在学的方向（计算机网络、机器学习、物理化学），
也符合实验对「个人主页」的要求，内容可以写得真实而不空泛。

配色控制在三种主色以内：蓝色（#2563eb）、青绿色（#0d9488）与中性灰阶，
分别对应计算机与化学两个方向，以及页面的文字与背景。

### 3.2 页面结构

`index.html` 按语义划分为七个部分：

```
header   固定导航栏（logo、主导航、主题切换）
main
  section#home       Hero 首屏
  section#about      About Me
  section#learning   Current Focus（卡片 + 表格）
  section#projects   Projects & Coursework
  section#blog       Blog
  section#links      Useful Links
footer   版权与「Built with HTML, CSS & JavaScript」
```

`blog.html` 为独立博客页，包含一篇约 1500 字的完整文章，并复用了同一套导航与页脚。

### 3.3 使用的 HTML 元素

- 结构类：`header`、`nav`、`main`、`section`、`article`、`figure`、`figcaption`、`footer`
- 文本类：`h1`–`h3`、`p`、`strong`、`time`、`code`、`pre`
- 列表类：`ul` / `ol` / `li`
- 表格类：`table`、`caption`、`thead`、`tbody`、`tr`、`th`、`td`
- 媒体类：`img`（全部带 `alt` 与 `width`/`height`）
- 交互类：`a`、`button`

### 3.4 CSS 布局

样式全部集中在 `css/style.css`，页面中没有堆砌行内样式。主要用到：

| 技术 | 用在哪里 |
| :--- | :--- |
| CSS 变量 | 全站配色、圆角、阴影、字体栈统一定义，深色主题只需覆盖变量 |
| class 选择器 | 可复用的样式，如 `.card-grid`、`.btn`、`.tag`、`.post-card` |
| id 选择器 | 页面上唯一的元素：`#site-header`（固定导航栏）、`#back-to-top`（回到顶部按钮） |
| Flexbox | 导航栏、按钮组、列表项对齐 |
| Grid | 学习卡片、项目卡片、链接卡片，配合 `auto-fit` + `minmax()` 自动换行 |
| `clamp()` | 标题字号随视口平滑缩放，不需要为每档屏幕单独写规则 |
| 媒体查询 | 1024px / 820px / 560px 三档断点 |
| hover 与过渡 | 卡片上浮、按钮变色、链接箭头位移 |

关于 id 与 class 的取舍：id 选择器权重更高、也只能用一次，因此只用在页面上
确实只出现一次的元素上；所有会在页面里重复出现的组件都使用 class，
这样样式可以复用，也不会因为权重过高而难以覆盖。

### 3.5 响应式设计

- **1920px / 1366px**：Hero 左右两栏，卡片多列排布
- **≤1024px**：Hero 改为单栏，首屏插图移到文字上方
- **≤820px**：导航折叠为汉堡菜单，点击展开为面板
- **≤560px**：卡片单列；学习表格由三列改为纵向堆叠，避免出现被截断的列

经过实测，在 1920 / 1366 / 820 / 390 四种宽度下，页面均无横向滚动条。

## 四、网页主要内容

| 区域 | 内容 |
| :--- | :--- |
| Home | 主标题、副标题、个人简介、两个入口按钮 |
| About | 个人介绍、当前兴趣列表、头像与姓名占位 |
| Learning | 四张学习方向卡片（计算机网络 / 机器学习 / 物理化学 / AI for Science）+ Current Learning Overview 表格 |
| Projects | 三张项目卡片，含简介、技术标签与 Learn More 链接 |
| Blog | 一篇完整文章的入口 + 两篇预告文章 |
| Links | 六个外部学习资源链接 |
| 全站 | 深色 / 浅色主题切换、回到顶部按钮、滚动淡入效果 |

实验要求的「至少三个超链接」通过 Links 区域的六个外部链接满足，
全部使用 `target="_blank"` 与 `rel="noopener noreferrer"`，在新标签页打开。

## 五、HTTP 协议检查

### 5.1 测试方法

不使用「GitHub Pages 通常使用 HTTP/2」这类推测，而是对线上地址实际发起请求验证。

**方法一：命令行（.NET HttpClient，走系统网络栈）**

```powershell
foreach ($v in @([System.Net.HttpVersion]::Version20, [System.Net.HttpVersion]::Version11)) {
  $h = New-Object System.Net.Http.HttpClient
  $h.DefaultRequestVersion = $v
  $h.DefaultVersionPolicy = [System.Net.Http.HttpVersionPolicy]::RequestVersionOrLower
  $r = $h.GetAsync("https://weshare-sun.github.io/").Result
  "requested {0} -> actual HTTP/{1}  status={2}" -f $v, $r.Version, [int]$r.StatusCode
}
```

**方法二：浏览器开发者工具**

1. 打开 `https://weshare-sun.github.io/`
2. 按 `F12` 打开开发者工具，切换到 **Network（网络）** 面板
3. 刷新页面
4. 在表头区域右键 → 勾选 **Protocol** 列
5. 查看第一个文档请求的 Protocol 值

协议标识对照：`h2` = HTTP/2，`h3` = HTTP/3，`http/1.1` = HTTP/1.1。

### 5.2 测试结果

```
Homepage URL: https://weshare-sun.github.io/
HTTP Version: HTTP/2
Test Method:  .NET HttpClient（强制请求 HTTP/2 与 HTTP/1.1 对比）
Test Date:    2026-10-08
```

命令行实测输出：

```
requested 2.0  -> actual HTTP/2.0  status=200
requested 1.1  -> actual HTTP/1.1  status=200
```

### 5.3 结果说明

主动请求 HTTP/2 时，服务器协商使用 **HTTP/2**（h2）；
而当客户端只支持 HTTP/1.1 时，服务器会正常降级返回 HTTP/1.1。
这说明站点所在的 GitHub Pages 已启用 HTTP/2，并保留了向下兼容能力。

HTTP/2 相比 HTTP/1.1 的主要差别在于二进制分帧、多路复用与头部压缩，
而本站是纯静态站点，页面引用的样式、脚本与图片可以在这一个连接上并行取回，
这也是静态站点加载较快的原因之一。

## 六、实验结果

网站已部署上线，可通过 <https://weshare-sun.github.io/> 公开访问。

### 6.1 功能验证清单

| 检查项 | 结果 |
| :--- | :--- |
| index.html 正常访问 | ✅ 200 |
| blog.html 正常访问 | ✅ 200 |
| 404.html 自定义错误页 | ✅ 已配置 |
| 外部超链接数量 | ✅ 6 个（要求 ≥3） |
| 所有链接 `target="_blank"` + `rel="noopener noreferrer"` | ✅ 全部符合 |
| 图片正常加载 | ✅ 6 张，无失效 |
| 每张图片都有 `alt` 与 `width`/`height` | ✅ 全部符合 |
| 移动端导航折叠正常 | ✅ 已验证 |
| 横向滚动条 | ✅ 四种宽度下均无 |
| 控制台报错 | ✅ 无 |

### 6.2 截图

> 截图见提交的 PDF 文件：首页整页、手机视图、深色主题、博客页、以及 HTTP 协议检测结果。

## 七、实验总结

这个网站的代码不是我逐行手写的。页面分几个区域、每个区域放什么内容、配色和交互做成什么样，
这些是我定的；具体的 HTML / CSS / JavaScript 有相当一部分借助 AI 工具生成，我再逐段读、逐处改。
选择不用前端框架，是因为实验的重点就在 HTML 和 CSS 本身，用框架会把该理解的部分跳过去。

花时间最多的是「看懂」而不是「写出来」。比如深色模式为什么改几个 CSS 变量就够了，
不必另写一套样式表；卡片区域为什么用 Grid 的 `auto-fit` 和 `minmax()` 就能自动换行；
学习表格在手机上为什么要从三列改成纵向堆叠，用 `::before` 配合 `data-label` 把表头补回去。
这些地方看不懂就得回去翻文档，翻完基本弄明白了。

HTTP 那部分是自己动手验证的。用 .NET HttpClient 强制请求 HTTP/2 拿到 h2，再退回 HTTP/1.1
对比结果，才搞清楚协议协商是怎么回事，也理解了 HTTP/2 的多路复用对纯静态站点意味着什么。

整个实验做下来，最大的收获是把一条链路走通了：从写页面，到用 Git 管版本，再到部署上线，
最后用开发者工具回头看浏览器和服务器之间的通信。网页从一个躺在本地的文件，
变成了公网上一个可以打开的地址。
