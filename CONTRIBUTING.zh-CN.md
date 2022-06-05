
# 贡献指南

感谢你的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

该项目有一份[行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 GitHub 上进行。核心团队成员和外部贡献者的 pull requests 都需要经过相同的 review 流程。

## 语义化版本

该项目遵循语义化版本。我们对重要的漏洞修复发布修订号，对新特性或不重要的变更发布次版本号，对重大且不兼容的变更发布主版本号。

每个重大更改都将记录在 changelog 中。

## 报告 Issues

我们使用 [Github issues](https://github.com/arco-design/arco-design-mobile/issues) 进行 bug 报告和新 feature 建议。在报告 bug 之前，请确保已经搜索过类似的 [issues](https://github.com/arco-design/arco-design-mobile/issues)，因为它们可能已经得到解答或正在被修复。新问题应通过 [issue helper](https://arco.design/issue-helper?repo=arco-design-mobile) 提交。对于 bug 报告，请包含可用于重现问题的代码。对于新 feature 建议，请指出你想要的更改以及期望的行为。

## 提交 Pull Request

1. Fork [此仓库](https://github.com/arco-design/arco-design-mobile)，从 `main` 创建分支。请发 pull request 到 `main` 分支。
2. 在仓库根目录下执行 `npm install`。
3. 执行 `npm start` 启动和预览 Mobile 端示例站，执行 `npm run start:pc` 启动和预览 PC 端文档站。
4. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
5. 确认执行 `npm run test` 后所有的测试都是通过的。
6. 提交 git commit, 请同时遵守 [Commit 规范](#commit-guidelines)。
7. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

### 常用的命令

```bash
# 启动和预览 Mobile 端示例站
$ npm start

# 启动和预览 PC 端文档站
$ npm run start:pc

# 组件构建
$ npm run build

# 执行组件单元测试
$ npm run test
```

## Commit 指南

Commit messages 请遵循 [conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit 类型

以下是 commit 类型列表：

- feat: 新特性或功能
- fix: 缺陷修复
- docs: 文档更新
- style: 代码风格或者组件样式更新
- refactor: 代码重构，不引入新功能和缺陷修复
- perf: 性能优化
- test: 单元测试
- chore: 其他不修改 src 或测试文件的提交

## 项目结构

### 组件目录

> packages/arcodesign/components/{componentName}

```
├── README.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── README.en-US.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── __ast__
│   ├── index.ast.json（组件属性的ast描述）
├── __test__
│   ├── __snapshots__
│   │   └── index.test.js.snap （Snapshot）
│   └── index.spec.js （单元测试）
├── demo （每个组件的示例）
│   ├── style（示例的样式）
│   ├── basic.md
│   └── advanced.md
├── index.tsx（组件导出）
└── style
    └── index.less（组件样式）
    └── index.ts (组件样式入口文件)
```

### Changelog

`CHANGELOG.md` 是在发版时由脚本自动生成的。请勿手动编辑该文件。

## License

当您向仓库贡献代码时，说明您同意依据 [MIT 协议](./LICENSE) 约束您的贡献。
