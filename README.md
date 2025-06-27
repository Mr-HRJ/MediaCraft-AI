# MediaCraft AI - 新媒体内容生成工具 🎨

专为新媒体内容创作者打造的AI工具，根据标签智能生成选题、脚本和文案。

## ✨ 功能特色

### 🤖 多AI模型支持
- **支持多个AI提供商**: OpenAI、DeepSeek等
- **智能模型选择**: 实时显示可用模型和成本信息
- **成本透明**: 显示每个模型的详细定价信息
- **性能优化**: 根据任务类型推荐最适合的模型

### 🎯 智能选题生成
- 基于用户输入的标签生成爆款选题
- 支持多平台适配（抖音、小红书、微博、B站等）
- 提供选题推荐理由和热度预估

### 📝 脚本智能创作
- 根据选题生成完整视频脚本
- 包含开场吸引、主体内容、结尾召唤
- 提供视觉提示和时间节点标注

### 💬 文案多平台适配
- 针对不同平台特性生成文案
- 支持多种风格选择
- 自动推荐话题标签和表情符号

### 🏷️ 智能标签系统
- 预设分类标签快速选择
- 支持自定义标签输入
- 标签管理和复用功能

## 🚀 技术栈

- **前端框架**: Next.js 14 + TypeScript
- **UI组件**: Tailwind CSS + Shadcn/ui
- **AI接口**: OpenAI GPT-4 + DeepSeek
- **图标**: Lucide React
- **部署**: Vercel

## 📦 安装部署

### 环境要求
- Node.js 18+ 
- npm/yarn/pnpm

### 本地开发部署

#### 1. 克隆项目
\`\`\`bash
git clone <项目地址>
cd mediacraft-ai
\`\`\`

#### 2. 安装依赖
\`\`\`bash
npm install
\`\`\`

#### 3. 配置环境变量
创建 \`.env.local\` 文件：
\`\`\`env
# OpenAI API Configuration (可选)
OPENAI_API_KEY=sk-your-openai-api-key-here

# DeepSeek API Configuration (推荐)
DEEPSEEK_API_KEY=sk-your-deepseek-api-key-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

#### 4. 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

#### 5. 构建生产版本
\`\`\`bash
npm run build
npm start
\`\`\`

### 🚀 生产环境部署 (Vercel)

#### 方式一：一键部署 (推荐)

1. **Fork 项目到您的 GitHub**
2. **访问 [Vercel](https://vercel.com)**
3. **导入项目**:
   - 点击 "New Project"
   - 选择您 fork 的仓库
   - 点击 "Import"

#### 方式二：命令行部署

1. **安装 Vercel CLI**
\`\`\`bash
npm i -g vercel
\`\`\`

2. **登录 Vercel**
\`\`\`bash
vercel login
\`\`\`

3. **部署项目**
\`\`\`bash
vercel --prod
\`\`\`

#### 配置环境变量

在 Vercel 控制台中设置环境变量：

1. **进入项目设置** → Settings → Environment Variables
2. **添加以下变量**:
   - \`DEEPSEEK_API_KEY\`: 您的 DeepSeek API 密钥
   - \`OPENAI_API_KEY\`: 您的 OpenAI API 密钥 (可选)
   - \`NEXT_PUBLIC_APP_URL\`: 您的部署域名

3. **重新部署**:
   - 返回 Deployments 页面
   - 点击 "Redeploy" 使环境变量生效

#### 自定义域名 (可选)

1. **购买域名** (推荐：Namecheap, Cloudflare)
2. **在 Vercel 中添加域名**:
   - 项目设置 → Domains
   - 输入您的域名
   - 按照提示配置 DNS 记录

### 📊 部署后检查清单

- ✅ 网站可正常访问
- ✅ AI模型选择器显示"已配置"
- ✅ 能够成功生成选题/脚本/文案
- ✅ 所有页面响应式适配正常
- ✅ API 调用正常 (无报错)

### 🔧 常见部署问题

#### 1. 环境变量未生效
**解决方案**: 确保在 Vercel 控制台正确设置环境变量，并重新部署

#### 2. API 调用失败
**解决方案**: 检查 API 密钥是否正确，网络是否能访问 AI 服务

#### 3. 构建失败
**解决方案**: 检查 Node.js 版本，确保本地能正常 \`npm run build\`

#### 4. 页面空白
**解决方案**: 检查浏览器控制台错误，通常是环境变量或 API 配置问题

## 🔧 AI模型配置

### 支持的AI提供商

#### 1. DeepSeek (推荐) ⭐
- **获取API密钥**: [DeepSeek开放平台](https://platform.deepseek.com/)
- **模型**: deepseek-chat, deepseek-coder
- **成本**: ~$0.0014/1K tokens (非常经济)
- **特点**: 中文友好、成本低廉、性能优秀

#### 2. OpenAI
- **获取API密钥**: [OpenAI平台](https://platform.openai.com/)
- **模型**: GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **成本**: $0.002-0.06/1K tokens
- **特点**: 性能强劲、生态完善

### 配置步骤

1. **DeepSeek配置** (推荐新用户):
   - 访问 [DeepSeek开放平台](https://platform.deepseek.com/)
   - 注册账号并创建API密钥
   - 将密钥添加到 \`.env.local\` 文件
   - 享受低成本高质量的AI生成服务

2. **OpenAI配置** (可选):
   - 访问 [OpenAI官网](https://platform.openai.com/) 
   - 注册账号并创建API密钥
   - 将密钥添加到 \`.env.local\` 文件

### 平台支持
- **抖音**: 短视频内容，注重开场吸引力
- **小红书**: 种草文案，生活化表达
- **微博**: 话题性强，适合热点传播
- **B站**: 深度内容，专业性强
- **Instagram**: 国际化视角
- **YouTube**: 长视频内容

## 💰 成本估算

### DeepSeek (推荐)
- **单次生成成本**: $0.003-0.007 (约 ¥0.02-0.05)
- **月使用100次**: ~$0.5 (约 ¥3.5)
- **优势**: 极低成本，中文优化

### OpenAI
- **GPT-4 Turbo**: ~$0.05-0.15 per generation
- **GPT-3.5 Turbo**: ~$0.004-0.008 per generation
- **月使用100次**: $4-15

### 部署成本
- **Vercel免费版**: 
  - 100GB带宽/月
  - 无限制部署
  - 自定义域名支持

## 📖 使用指南

### 1. 选择AI模型
- 在配置面板顶部选择AI模型
- 查看模型成本和性能信息
- 推荐使用DeepSeek Chat模型

### 2. 选择标签
- 从预设分类中快速选择标签
- 或手动输入自定义标签
- 支持多个标签组合

### 3. 配置参数
- 选择目标平台
- 设定内容风格
- 确定视频时长

### 4. 生成内容
- **选题生成**: 获得5个爆款选题建议
- **脚本创作**: 基于选题生成完整脚本
- **文案制作**: 输出平台适配文案

### 5. 一键复制
- 支持内容一键复制到剪贴板
- 可分别复制选题、脚本、文案
- 标签可单独复制使用

## 🎨 界面预览

- 🤖 **AI模型选择**: 直观的模型切换界面，实时成本显示
- 🎯 **选题生成**: 卡片式展示，包含推荐理由
- 📝 **脚本展示**: 分段显示，时间轴清晰
- 💬 **文案预览**: 平台适配，标签分离
- ⚙️ **参数配置**: 直观选择，实时预览

## 🔄 工作流程

1. **AI模型选择** → 选择最适合的AI模型
2. **标签输入** → 选择或输入内容相关标签
3. **参数设置** → 确定平台、风格、时长
4. **选题生成** → AI生成5个创意选题
5. **选题确认** → 选择满意的选题方向
6. **脚本创作** → 基于选题生成详细脚本
7. **文案制作** → 生成平台适配的发布文案
8. **内容输出** → 复制使用，开始创作

## 🛠️ 自定义开发

### 添加新AI提供商
1. 在 \`src/lib/ai.ts\` 中添加提供商配置
2. 更新 \`src/types/index.ts\` 中的类型定义
3. 在 \`AIModelSelector\` 组件中添加UI支持

### 添加新平台
1. 在 \`src/types/index.ts\` 中添加平台类型
2. 更新 \`src/lib/ai.ts\` 中的提示词模板
3. 在各组件中添加平台特性说明

### 修改AI提示词
编辑 \`src/lib/ai.ts\` 中的 \`prompts\` 对象来自定义AI行为。

### 样式定制
- 修改 \`tailwind.config.js\` 调整主题色
- 编辑 \`src/app/globals.css\` 添加自定义样式

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [OpenAI](https://openai.com/) - 提供强大的GPT模型API
- [DeepSeek](https://www.deepseek.com/) - 提供高性价比的AI模型
- [Vercel](https://vercel.com/) - 优秀的部署平台
- [Shadcn/ui](https://ui.shadcn.com/) - 美观的UI组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用的CSS框架

## 📞 联系我们

- 项目地址: [GitHub Repository](https://github.com/your-username/mediacraft-ai)
- 问题反馈: [Issues](https://github.com/your-username/mediacraft-ai/issues)
- 功能建议: [Discussions](https://github.com/your-username/mediacraft-ai/discussions)

---

**Made with ❤️ for content creators** 