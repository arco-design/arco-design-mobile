# Using with LLMs

As AI coding assistants (Cursor, Claude, VS Code Copilot, etc.) become widespread, developers need LLMs to access up-to-date component library documentation. This guide explains how to use MCP (Model Context Protocol) to help LLMs correctly use Arco Design Mobile.

=====================

## Why MCP?

LLM training data often has timeliness issues, which may cause:

- ❌ Outdated code examples based on old training data
- ❌ Hallucinated APIs that don't exist
- ❌ Generic answers for old package versions

Through MCP tools, LLMs can retrieve the latest component library documentation and code examples in real-time to generate more accurate code.

## Recommended: Context7

[Context7](https://context7.com) is an MCP server that pulls up-to-date documentation and code examples from the source and injects them into your prompt.

Arco Design Mobile is registered on Context7:

- **Context7 Page**: [https://context7.com/arco-design/arco-design-mobile](https://context7.com/arco-design/arco-design-mobile)

### Installing Context7 MCP

#### Requirements

- Node.js >= v18.0.0
- MCP-compatible client (Cursor, Claude, VS Code, Windsurf, etc.)

#### Install in Cursor

Go to `Cursor Settings` > `MCP` and add the following configuration:

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

#### Install in VS Code

Add to VS Code settings (or in `.vscode/settings.json`):

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

#### Install in Claude Desktop

Add to `claude_desktop_config.json`:

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

### Usage

After installation, add `use context7` to your prompt to automatically retrieve relevant documentation:

```
Create a list page with pull-to-refresh using Arco Design Mobile use context7
```

Or specify the library ID directly:

```
Implement a mobile form page use library /arco-design/arco-design-mobile
```

### Set Up Auto Rules (Recommended)

To avoid typing `use context7` every time, you can add rules in your MCP client to auto-invoke:

- **Cursor**: Add in `Cursor Settings > Rules`
- **Windsurf**: Add in `.windsurfrules` file
- **Claude**: Add in `CLAUDE.md` file

Example rule:

```
Always use context7 when I need code generation, setup or configuration steps,
or library/API documentation. This means you should automatically use the
Context7 MCP tools to resolve library id and get library docs without me
having to explicitly ask.
```

## Alternative MCP Solutions

Besides Context7, other options are available:

### GitMCP

[GitMCP](https://gitmcp.io) converts GitHub repositories into MCP servers, enabling AI assistants to retrieve project documentation.

Configuration:

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

You can also use tools that support the `llms.txt` standard to directly access LLM-friendly documentation in the repository:

- `https://gitmcp.io/arco-design/arco-design-mobile/llms.txt`

## FAQ

### Q: What's the difference between Context7 and GitMCP?

A: Context7 is optimized for LLMs, providing structured documentation with version selection and topic filtering. GitMCP converts GitHub repositories directly into MCP services—more general-purpose but less optimized.

### Q: Do I need an API Key?

A: Context7 provides a free usage quota. For higher usage frequency, you can create an account at [context7.com/dashboard](https://context7.com/dashboard) to get an API Key.

### Q: How do I confirm MCP is working?

A: After configuration, enter a prompt containing `use context7`. If the LLM returns accurate component usage, the setup is successful.
