import { LanguageSupport } from '../../utils/language';

export const localeMap = {
    DevelopmentGuide: {
        [LanguageSupport.CH]: '开发指南',
        [LanguageSupport.EN]: 'Development Guide',
    },
    QuickStart: {
        [LanguageSupport.CH]: '快速开始',
        [LanguageSupport.EN]: 'Quick Start',
    },
    v1tov2: {
        [LanguageSupport.CH]: '从v1到v2',
        [LanguageSupport.EN]: 'v1 to v2',
    },
    Components: {
        [LanguageSupport.CH]: '组件',
        [LanguageSupport.EN]: 'Components',
    },
    Changelog: {
        [LanguageSupport.CH]: '更新日志',
        [LanguageSupport.EN]: 'Changelog',
    },
    Home: {
        [LanguageSupport.CH]: '首页',
        [LanguageSupport.EN]: 'Home',
    },
    DevelopmentResource: {
        [LanguageSupport.CH]: '开发资源',
        [LanguageSupport.EN]: 'Development Resource',
    },
    Copy: {
        [LanguageSupport.CH]: '复制',
        [LanguageSupport.EN]: 'Copy',
    },
    CopySuccess: {
        [LanguageSupport.CH]: '复制成功',
        [LanguageSupport.EN]: 'Copy successfully',
    },
    Expand: {
        [LanguageSupport.CH]: '展开',
        [LanguageSupport.EN]: 'Expand',
    },
    GeneralHooks: {
        [LanguageSupport.CH]: '公共Hooks',
        [LanguageSupport.EN]: 'General Hooks',
    },
    Icon: {
        [LanguageSupport.CH]: '图标',
        [LanguageSupport.EN]: 'Icon',
    },
    DesignResource: {
        [LanguageSupport.CH]: '设计资源',
        [LanguageSupport.EN]: 'Design Resources',
    },
    DesignResourceDesc: {
        [LanguageSupport.CH]: '即刻开启你的体验旅程',
        [LanguageSupport.EN]: 'Start your experience journey now',
    },
    DesignResourceFigmaTitle: {
        [LanguageSupport.CH]: '获取 Figma 文件',
        [LanguageSupport.EN]: 'Get the Figma file',
    },
    DesignResourceFigmaDesc1: {
        [LanguageSupport.CH]: '跳转至Figma网页版本，可直接进行编辑。',
        [LanguageSupport.EN]: 'Jump to the Figma web version for direct editing.',
    },
    QRCodeTip: {
        [LanguageSupport.CH]: '扫描二维码查看演示效果',
        [LanguageSupport.EN]: 'Scan the QR code to view the demo',
    },
    SearchTip: {
        [LanguageSupport.CH]: '在 Arco Design 中搜索...',
        [LanguageSupport.EN]: 'Searching in Arco Design...',
    },
    SearchResultTip: {
        [LanguageSupport.CH]: (num: number) => `搜索到 ${num} 个结果`,
        [LanguageSupport.EN]: (num: number) => `About ${num} results found`,
    },
    Loading: {
        [LanguageSupport.CH]: '加载中...',
        [LanguageSupport.EN]: 'Loading...',
    },
    SearchNoResultTip: {
        [LanguageSupport.CH]: (value: string) => `没有 “${value}” 的搜索结果`,
        [LanguageSupport.EN]: (value: string) => `No results for '${value}'`,
    },
    ComponentType: {
        [LanguageSupport.CH]: '组件',
        [LanguageSupport.EN]: 'Component',
    },
};
