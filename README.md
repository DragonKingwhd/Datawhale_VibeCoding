# 🎓 Datawhale VibeCoding 学习记录

这是一个 **Datawhale VibeCoding 3 群** 的学习记录仓库，记录了通过 AI 辅助开发学习 Web 开发、AI 集成和现代前端框架的完整过程。

## 📋 项目目的

### 核心目标
1. **学习 AI 原生应用开发**：使用 AI 辅助工具（Z.ai）快速开发创意应用
2. **掌握现代前端技术栈**：深入学习 Next.js、React、TypeScript 等前沿技术
3. **理解 AI 集成方式**：学习如何将 LLM 和图像生成能力集成到应用中
4. **记录学习过程**：详细记录每个任务的问题、解决方案和技术要点

### 学习方式
- 📝 **提示词工程**：学习如何编写有效的系统提示词
- 🔍 **问题驱动学习**：通过实际问题的调试来深入理解技术
- 🤖 **AI 辅助开发**：利用 AI 加速开发过程，同时理解底层原理
- 📚 **知识总结**：每个任务都有详细的技术分析和学习总结

---

## 📁 仓库架构

```
Datawhale_VibeCoding/
├── README.md                          # 项目说明（本文件）
├── CLAUDE.md                          # Claude Code 开发指南
│
├── task_01/                           # 任务 1：贪吃蛇诗歌游戏
│   ├── post.md                        # 📖 完整的任务记录和技术分析
│   ├── package.json                   # 项目配置
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # 🎮 游戏主组件（已修复）
│   │   │   ├── layout.tsx            # 页面布局
│   │   │   ├── globals.css           # 全局样式
│   │   │   └── api/
│   │   │       ├── generate-poem/    # 📝 AI 诗歌生成 API
│   │   │       ├── generate-image/   # 🎨 AI 图像生成 API
│   │   │       └── remix-poem/       # 🔄 诗歌混合 API
│   │   ├── components/
│   │   │   └── ui/                   # shadcn/ui 组件库
│   │   └── lib/                      # 工具函数
│   ├── public/                        # 静态资源
│   ├── prisma/                        # 数据库配置
│   └── ...
│
├── task_02/                           # 任务 2（待开发）
│   ├── post.md
│   └── src/
│
└── task_03/                           # 任务 3（待开发）
    ├── post.md
    └── src/
```

### 目录说明

#### 根目录
- **README.md** - 项目总体说明
- **CLAUDE.md** - 为 Claude Code 提供的开发指南

#### 每个 task 文件夹
- **post.md** - 任务的完整记录，包括：
  - 学习收获
  - 任务说明
  - 游戏/功能演示
  - 运行说明
  - 问题调试记录
  - 技术分析

- **src/** - 源代码目录
  - `app/page.tsx` - 主要功能组件
  - `app/api/` - 后端 API 路由
  - `components/` - 可复用组件
  - `lib/` - 工具函数

---

## 🎯 任务列表

### ✅ Task 01: 贪吃蛇诗歌游戏

**目标**：复现 AI 原生的贪吃蛇游戏

**功能**：
- 🐍 经典贪吃蛇游戏机制
- 📝 收集汉字后 AI 自动创作诗歌
- 🎨 根据诗歌生成对应的图像
- 🔄 诗歌混合功能（重新生成不同版本）

**技术栈**：
- Next.js 15 + React 18
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- Z.ai SDK（LLM + 图像生成）

**关键学习点**：
- ✅ React Hooks 闭包问题解决
- ✅ useRef 的正确使用
- ✅ 事件监听器管理
- ✅ AI API 集成
- ✅ 系统提示词设计

**详细记录**：[task_01/post.md](./task_01/post.md)

### ⏳ Task 02: 待开发

### ⏳ Task 03: 待开发

---

## 🚀 快速开始

### 前置要求
- Node.js v24.12.0+
- npm 11.6.2+
- Git

### 运行 Task 01

```bash
# 1. 进入项目目录
cd task_01

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# http://localhost:3000
```

### 使用其他端口
```bash
npm run dev -- -p 3001
# 访问 http://localhost:3001
```

### 其他命令
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行 linter
npm run lint
```

---

## 📚 学习资源

### Task 01 的完整学习记录

每个 task 的 `post.md` 包含：

1. **学习收获** - 本任务的关键学习点
2. **任务说明** - 项目概述和技术栈
3. **游戏演示** - 功能说明和界面展示
4. **运行项目** - 快速启动指南
5. **问题调试** - 遇到的问题和解决方案
6. **技术分析** - 深入的技术讲解
7. **AI 生成原理** - AI 诗歌和图像生成的详细流程

### 推荐阅读顺序

1. 📖 [task_01/post.md](./task_01/post.md) - 完整的任务记录
2. 🎮 运行游戏，亲身体验功能
3. 🔍 查看源代码，理解实现细节
4. 💡 学习技术分析部分，掌握核心概念

---

## 🔧 技术栈总览

### 前端框架
- **Next.js 15** - React 框架，支持 App Router
- **React 18** - UI 库
- **TypeScript 5** - 类型安全

### 样式和组件
- **Tailwind CSS 4** - 工具类 CSS 框架
- **shadcn/ui** - 高质量 UI 组件库
- **Framer Motion** - 动画库

### 状态管理和数据
- **React Hooks** - 状态管理（useState, useEffect, useRef 等）
- **Zustand** - 轻量级状态管理
- **TanStack Query** - 数据同步

### 后端和 AI
- **Next.js API Routes** - 后端 API
- **Z.ai SDK** - LLM 和图像生成
- **Prisma ORM** - 数据库 ORM

### 开发工具
- **TypeScript** - 类型检查
- **ESLint** - 代码检查
- **Tailwind CSS** - CSS 框架

---

## 📖 核心概念学习

### React Hooks 闭包问题
在 Task 01 中遇到的关键问题：事件监听器无法访问最新的状态值。

**解决方案**：使用 `useRef` 存储状态，避免闭包陷阱。

详见：[task_01/post.md - 问题 3](./task_01/post.md#问题-3键盘方向键无法控制)

### AI 集成模式
学习如何将 LLM 和图像生成集成到应用中：

1. **文本生成**：使用系统提示词定义 AI 角色
2. **链式调用**：先生成提示词，再生成图像
3. **错误处理**：处理 API 调用失败的情况

详见：[task_01/post.md - AI 诗歌生成原理](./task_01/post.md#ai-诗歌生成原理)

---

## 🐛 常见问题

### 问题 1：`'tee' 不是内部或外部命令`
**原因**：Windows PowerShell 不支持 `tee` 命令
**解决**：已在 `package.json` 中修复

### 问题 2：端口 3000 被占用
**解决**：使用其他端口 `npm run dev -- -p 3001`

### 问题 3：键盘方向键无法控制
**原因**：React Hooks 闭包陷阱
**解决**：使用 `useRef` 存储游戏状态

详见：[task_01/post.md - 问题调试](./task_01/post.md#问题调试)

---

## 📝 提交规范

每个任务的提交信息格式：
```
Add task_XX: 任务名称

- 简要说明任务内容
- 列出主要功能
- 记录关键学习点
```

例如：
```
Add task_01: 贪吃蛇诗歌游戏

- 实现贪吃蛇游戏机制
- 集成 Z.ai LLM 生成诗歌
- 集成 AI 图像生成功能
- 修复 React Hooks 闭包问题
- 详细记录技术分析和学习过程
```

---

## 🎓 学习收获

### 第一点收获
《请先用 5 句话讲清楚这个概念，再给几个问题提问我验证我理解对了没。》

这个点是之前使用 vibecoding 从来没有考虑到的一个点，或许这个才是让自身成长的一个重要因素，而不是一味索取答案！

### 第二点收获
《我们还可以要求 LLM 帮你直接生成项目级的提示词。在上一节中，我们只自己写了贪吃蛇游戏的提示词。现在让我们尝试让大模型生成一个带有整体框架和实现路径的提示词。》

这个可以在本身描述不够专业的情况，让 AI 结合专业词汇生成命令构建提示词汇。

### 第三点收获
系统学习了前端网页的实现以及框架的重要性。

---

## 📞 相关资源

### 官方文档
- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com)

### 学习资源
- [Datawhale 官网](https://www.datawhale.com)
- [VibeCoding 学习社区](https://vibecoding.com)
- [Z.ai 官网](https://chat.z.ai)

---

## 📄 许可证

本项目为学习项目，仅供学习和参考使用。

---

## 👤 作者

**学习者**：Datawhale VibeCoding 3 群成员

**创建时间**：2026-01-13

**最后更新**：2026-01-13

---

## 🙏 致谢

感谢 Datawhale 提供的学习平台和 VibeCoding 社区的支持！

感谢 Z.ai 提供的 AI 开发工具和 SDK！

感谢 Claude Code 提供的 AI 辅助开发支持！
