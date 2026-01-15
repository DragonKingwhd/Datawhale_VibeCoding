# Task 02: React 游戏开发

## 任务说明

使用 React 和 Vite 构建两个交互式游戏项目，学习 React 状态管理、事件处理和组件设计。

## 项目结构

```
task_02/
├── post.md                    # 任务说明和学习笔记
├── custom_game/               # 英语消消乐游戏（Vanilla JS + Vite）
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── snake-game-react/          # 贪吃蛇游戏（React + Vite）
    ├── src/
    ├── public/
    └── package.json
```

## 游戏介绍

### 1. 英语消消乐 (Custom Game)

**游戏玩法**：
- 8×8 的字母网格，随机生成英文字母
- 点击字母按顺序拼出有效的英文单词
- 成功消除单词后，被消除的字母位置会补充新的随机字母
- 每个单词的分数 = 字母数 × 10

**技术栈**：
- Vanilla JavaScript（原生 JS）
- Vite 构建工具
- CSS 3（Flexbox + Grid）
- 响应式设计

**核心功能**：
- 动态网格渲染
- 单词验证系统
- 分数计算
- 消息提示系统
- 移动端适配

**可消除单词示例**：
CAT, DOG, APPLE, GAME, BOOK, TREE, CODE, HELLO, WORLD, JAVA, PYTHON, GOOD, COOL, HOME, WATER, MUSIC, NOTE, BLUE, GREEN

### 2. 贪吃蛇游戏 (Snake Game React)

**游戏玩法**：
- 经典贪吃蛇游戏机制
- 使用方向键控制蛇的移动
- 吃到食物增长，碰到边界或自己则游戏结束

**技术栈**：
- React 18
- Vite 构建工具
- TypeScript（可选）

## 运行方式

### 运行英语消消乐

```bash
cd task_02/custom_game
npm install
npm run dev
```

访问 `http://localhost:5173`

### 运行贪吃蛇游戏

```bash
cd task_02/snake-game-react
npm install
npm run dev
```

访问 `http://localhost:3000` 或 `http://localhost:5173`

## 学习总结

### 关键学习点

1. **JavaScript 游戏开发基础**
   - 游戏状态管理
   - 事件监听和处理
   - 动画和渲染循环

2. **React 状态管理**
   - useState Hook 的使用
   - useEffect Hook 的生命周期
   - useMemo 的性能优化

3. **DOM 操作和事件处理**
   - 事件委托
   - 动态 DOM 更新
   - 事件监听器管理

4. **CSS 设计**
   - Grid 布局用于游戏网格
   - Flexbox 用于界面布局
   - 响应式设计
   - 过渡和动画效果

5. **Vite 构建工具**
   - 快速开发服务器
   - 模块热更新（HMR）
   - 生产构建优化

### 技术亮点

- **英语消消乐**：展示了原生 JavaScript 的游戏开发能力，包括网格系统、单词验证、分数计算等
- **贪吃蛇游戏**：展示了 React 在游戏开发中的应用，特别是状态管理和性能优化

### 收获

通过这两个项目，深入理解了：
- 游戏逻辑的实现方式
- React 组件的状态管理
- 事件驱动编程
- 响应式 UI 设计
- 前端构建工具的使用
