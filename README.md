# DevFlow - 开发者问答社区平台

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

一个现代化的全栈开发者问答社区平台，类似于 Stack Overflow，使用 Next.js 16、TypeScript、MongoDB 和 Tailwind CSS 构建。

[在线演示](#) · [报告问题](#) · [请求功能](#)

</div>

## 📋 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [API 文档](#api-文档)
- [部署指南](#部署指南)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🎯 项目简介

DevFlow 是一个专为开发者设计的问答社区平台，旨在帮助开发者分享知识、解决问题和建立专业声誉。平台提供了完整的问题发布、回答、投票、收藏等功能，并集成了 AI 辅助回答功能。

### 核心亮点

- 🚀 **现代化架构**：基于 Next.js 16 App Router 和服务端组件
- 🔐 **身份认证**：集成 NextAuth.js 支持多种登录方式
- 🤖 **AI 辅助**：智能 AI 回答生成器
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **暗色模式**：支持明暗主题切换
- ⚡ **高性能**：优化的数据库查询和缓存策略

## ✨ 功能特性

### 用户系统
- ✅ 邮箱密码注册/登录
- ✅ OAuth 社交登录（GitHub、Google 等）
- ✅ 个人资料管理
- ✅ 声望值系统
- ✅ 徽章成就系统

### 问答功能
- ✅ 发布和编辑问题
- ✅ Markdown 富文本编辑器
- ✅ 标签分类系统
- ✅ 投票机制（点赞/踩）
- ✅ 最佳答案标记
- ✅ 问题收藏

### 搜索与筛选
- ✅ 全文搜索
- ✅ 多维度筛选（最新、最热、未回答等）
- ✅ 标签过滤
- ✅ 分页加载

### 社区互动
- ✅ 回答和评论
- ✅ 用户关注
- ✅ 通知系统
- ✅ 用户个人主页

### AI 功能
- ✅ AI 智能回答生成
- ✅ 代码示例推荐
- ✅ 相关问题推荐

## 🛠️ 技术栈

### 前端
- **框架**: [Next.js 16](https://nextjs.org/) - React 全栈框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) - 高质量组件库
- **富文本编辑器**: TipTap / ProseMirror
- **状态管理**: React Server Components + Server Actions

### 后端
- **运行时**: Node.js
- **数据库**: [MongoDB](https://www.mongodb.com/) - NoSQL 数据库
- **ODM**: [Mongoose](https://mongoosejs.com/) - MongoDB 对象建模
- **认证**: [NextAuth.js](https://next-auth.js.org/) - 身份验证解决方案
- **API**: RESTful API + Server Actions

### 开发工具
- **包管理器**: npm
- **代码规范**: ESLint + Prettier
- **日志**: Pino Logger
- **部署**: Vercel / Docker

## 📦 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 7.0
- Git

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/my-devflow.git
cd my-devflow
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入以下配置：

```env
# MongoDB 连接字符串
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devflow

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth 提供商配置（可选）
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# AI API 密钥（可选）
OPENAI_API_KEY=your-openai-api-key

# 其他配置
NODE_ENV=development
LOG_LEVEL=info
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
my-devflow/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 认证相关页面
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # 主要应用页面
│   │   ├── questions/       # 问题页面
│   │   ├── tags/           # 标签页面
│   │   ├── profile/        # 用户资料
│   │   └── collection/     # 收藏页面
│   ├── api/                 # API 路由
│   │   ├── auth/           # 认证 API
│   │   ├── users/          # 用户 API
│   │   ├── accounts/       # 账户 API
│   │   └── ai/             # AI 功能 API
│   └── layout.tsx          # 根布局
├── components/              # React 组件
│   ├── cards/              # 卡片组件
│   ├── forms/              # 表单组件
│   ├── navigation/         # 导航组件
│   ├── ui/                 # UI 基础组件
│   └── editor/             # 编辑器组件
├── database/                # 数据库模型
│   ├── user.model.ts
│   ├── question.model.ts
│   ├── answer.model.ts
│   └── ...
├── lib/                     # 工具函数和业务逻辑
│   ├── actions/            # Server Actions
│   ├── handlers/           # 请求处理器
│   ├── utils.ts            # 工具函数
│   └── validations.ts      # 数据验证
├── types/                   # TypeScript 类型定义
│   ├── global.d.ts
│   └── action.d.ts
├── constants/               # 常量定义
├── context/                 # React Context
└── public/                  # 静态资源
```

## 📚 API 文档

### 认证 API

#### POST `/api/auth/signin-with-oauth`
OAuth 社交登录

**请求体:**
```json
{
  "provider": "github",
  "code": "authorization-code"
}
```

### 用户 API

#### GET `/api/users`
获取用户列表

**查询参数:**
- `page`: 页码（默认: 1）
- `pageSize`: 每页数量（默认: 10）
- `query`: 搜索关键词

#### GET `/api/users/[id]`
获取单个用户信息

### 问题 API

#### POST `/api/questions`
创建新问题

**请求体:**
```json
{
  "title": "问题标题",
  "content": "问题内容（支持 Markdown）",
  "tags": ["tag1", "tag2"]
}
```

#### GET `/api/questions`
获取问题列表

**查询参数:**
- `page`: 页码
- `pageSize`: 每页数量
- `filter`: 筛选条件（newest, most-voted, etc.）
- `query`: 搜索关键词

### AI API

#### POST `/api/ai/answers`
生成 AI 回答

**请求体:**
```json
{
  "questionId": "question-id",
  "questionTitle": "问题标题",
  "questionContent": "问题内容"
}
```

## 🌐 部署指南

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 点击部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到 Vercel
vercel --prod
```

### Docker 部署

```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# 构建镜像
docker build -t my-devflow .

# 运行容器
docker run -p 3000:3000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e NEXTAUTH_SECRET=your-secret \
  my-devflow
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork** 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 **Pull Request**

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规范
- 为新增功能编写测试
- 更新相关文档

### 提交消息规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建过程或辅助工具的变动
```

<div align="center">

如果这个项目对你有帮助，请考虑给它一个 ⭐️ Star！

Made with ❤️ by Your Name

</div>
