# 在 LLM 中使用

随着 AI 编程助手（如 Cursor、Claude、VS Code Copilot 等）的普及，开发者希望 LLM 能够获取最新的组件库文档。本文介绍如何通过 MCP（Model Context Protocol）让 LLM 正确使用 Arco Design Mobile。

=====================

## 为什么需要 MCP？

LLM 的训练数据通常存在时效性问题，可能导致：

- ❌ 代码示例过时，基于陈旧的训练数据
- ❌ 产生幻觉，生成不存在的 API
- ❌ 针对旧版本包给出通用答案

通过 MCP 工具，LLM 可以实时获取最新的组件库文档和代码示例，生成更准确的代码。

## 推荐方案：Context7

[Context7](https://context7.com) 是一个 MCP 服务器，可从源头获取最新文档和代码示例，并注入到提示词中。

Arco Design Mobile 已在 Context7 注册：

- **Context7 页面**：[https://context7.com/arco-design/arco-design-mobile](https://context7.com/arco-design/arco-design-mobile)

### 安装 Context7 MCP

#### 要求

- Node.js >= v18.0.0
- 支持 MCP 的客户端（Cursor、Claude、VS Code、Windsurf 等）

#### 在 Cursor 中安装

进入 `Cursor Settings` > `MCP`，添加如下配置：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

#### 在 VS Code 中安装

在 VS Code 设置中添加（或在 `.vscode/settings.json` 中）：

```json
{
  "mcp": {
    "servers": {
      "context7": {
        "command": "npx",
        "args": ["-y", "@upstash/context7-mcp@latest"]
      }
    }
  }
}
```

#### 在 Claude Desktop 中安装

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### 使用方法

安装完成后，在你的提示词中添加 `use context7` 即可自动获取相关文档：

```
使用 Arco Design Mobile 实现一个带下拉刷新的列表页面 use context7
```

或者直接指定库 ID：

```
实现一个移动端表单页面 use library /arco-design/arco-design-mobile
```

### 设置自动规则（推荐）

为避免每次都输入 `use context7`，可以在 MCP 客户端中添加规则自动调用：

- **Cursor**：在 `Cursor Settings > Rules` 中添加
- **Windsurf**：在 `.windsurfrules` 文件中添加
- **Claude**：在 `CLAUDE.md` 文件中添加

示例规则：

```
当我需要代码生成、配置步骤或库/API 文档时，始终使用 context7。
这意味着你应该自动使用 Context7 MCP 工具来解析库 ID 并获取库文档，
而无需我明确要求。
```

## 其他 MCP 方案

除了 Context7，还有其他可选方案：

### GitMCP

[GitMCP](https://gitmcp.io) 可将 GitHub 仓库转换为 MCP 服务器，让 AI 助手检索项目文档。

配置方式：

```json
{
  "mcpServers": {
    "arco-design-mobile": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://gitmcp.io/arco-design/arco-design-mobile"
      ]
    }
  }
}
```

### llms.txt

你也可以使用支持 `llms.txt` 标准的工具，直接访问仓库中的 LLM 友好文档：

- `https://gitmcp.io/arco-design/arco-design-mobile/llms.txt`

## 常见问题

### Q: Context7 和 GitMCP 有什么区别？

A: Context7 专为 LLM 优化，提供结构化文档，支持版本选择和主题过滤。GitMCP 将 GitHub 仓库直接转换为 MCP 服务，更通用但优化程度较低。

### Q: 需要 API Key 吗？

A: Context7 提供免费使用配额，对于更高的使用频率，可以在 [context7.com/dashboard](https://context7.com/dashboard) 创建账户获取 API Key。

### Q: 如何确认 MCP 正常工作？

A: 配置完成后，在对话中输入包含 `use context7` 的提示词。若 LLM 返回准确的组件用法，则配置成功。
