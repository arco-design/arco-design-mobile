
export enum LanguageSupport {
    CH = 'ch',
    EN = 'en',
}
export const LanguageLocaleMap = {
    [LanguageSupport.CH]: 'zh-CN',
    [LanguageSupport.EN]: 'en-US'
}
export const commonLocaleMap = {
    Others: {
        [LanguageSupport.CH]: '其他',
        [LanguageSupport.EN]: 'Others'
    },
    General: {
        [LanguageSupport.CH]: '通用',
        [LanguageSupport.EN]: 'General'
    },
    Layout: {
        [LanguageSupport.CH]: '布局',
        [LanguageSupport.EN]: 'Layout'
    },
    DataDisplay: {
        [LanguageSupport.CH]: '数据展示',
        [LanguageSupport.EN]: 'Data Display'
    },
    DataEntry: {
        [LanguageSupport.CH]: '数据输入',
        [LanguageSupport.EN]: 'Data Entry'
    },
    FeedBack: {
        [LanguageSupport.CH]: '反馈',
        [LanguageSupport.EN]: 'FeedBack'
    },
    Navigation: {
        [LanguageSupport.CH]: '导航',
        [LanguageSupport.EN]: 'Navigation'
    },
}
