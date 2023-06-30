const extend = require('./extend');

function getGlobalTokens() {
    return {
        /**
         * 类前缀，需配合 context-provider 中的 prefixCls 使用
         * @en Classname prefix, it needs to be used with prefixCls in context-provider
         */
        prefix: 'arco',
        /**
         * rem 转换使用的基础字号
         * @en Base font size used for rem conversion
         */
        baseFontSize: '50',
        /**
         * 基础背景色
         * @en Base background color
         */
        backgroundColor: '#ffffff',
        /**
         * 基础字体颜色
         * @en Base font color
         */
        fontColor: '#1d2129',
        /**
         * 副标题字体颜色
         * @en Subtitle font color
         */
        subFontColor: '#4e5969',
        /**
         * 附加信息字体颜色
         * @en Additional information font color
         */
        subInfoFontColor: '#86909c',
        /**
         * 基础线条颜色
         * @en Base line color
         */
        lineColor: '#e5e6eb',
        /**
         * 基础主题色
         * @en Base theme color
         */
        primaryColor: '#165dff',
        /**
         * 基础禁用态颜色
         * @en Base disabled color
         */
        primaryDisabledColor: '#94bfff',
        /**
         * 基础危险态颜色
         * @en Base dangerous state color
         */
        dangerColor: '#f53f3f',
        /**
         * 基础警告态颜色
         * @en Base warning state color
         */
        warningColor: '#ff7d00',
        /**
         * 基础禁用态字体颜色
         * @en Base disabled font color
         */
        disabledColor: '#c9cdd4',
        /**
         * 基础蒙层背景色
         * @en Base mask background color
         */
        maskBackground: 'rgba(0, 0, 0, 0.6)',
        /**
         * 蒙层内容字体颜色
         * @en  Mask content font color
         */
        maskContentColor: '#ffffff',
        /**
         * 蒙层内容面板背景色
         * @en Content panel background color of Mask
         */
        maskContentBackground: '#ffffff',
        /**
         * 隐藏滚动条预留宽度
         * @en Hidden scrollbar reserved width
         */
        scrollerBuffer: '10PX',
        /**
         * 全屏组件zIndex基础值
         * @en The zIndex base value of the full screen component
         */
        fullScreenZIndex: '1000',
        /**
         * 固定组件zIndex基础值
         * @en The zIndex base value of the fixed component
         */
        fixedZIndex: '100',
    };
}

const globalTokens = getGlobalTokens();
const getRem = px => `@getRem@${px}`;
const useGlobal = token => `@global@${token}`;

function getCompTokens() {
    return {
        /**
         * 弹窗蒙层背景色
         * @en Popup mask background color
         */
        popupMaskBackground: useGlobal('maskBackground'),
        /**
         * 弹窗内容面板背景色
         * @en Popup content panel background color
         */
        popupContentBackground: useGlobal('maskContentBackground'),
        /**
         * 打开弹窗时的变化曲线
         * @en The change curve when opening the popup
         */
        popupEnterTransition: 'all 450ms cubic-bezier(0.34, 0.69, 0.1, 1)',
        /**
         * 关闭弹窗时的变化曲线
         * @en Change curve when closing the popup
         */
        popupExitTransition: 'all 240ms cubic-bezier(0.34, 0.69, 0.1, 1)',
        /**
         * 对话框蒙层背景色
         * @en Dialog mask background color
         */
        dialogMaskBackground: useGlobal('maskBackground'),
        /**
         * 对话框面板宽度 (ios)
         * @en Dialog content panel width (ios)
         */
        dialogContentWidth: getRem(270),
        /**
         * 对话框面板宽度 (android)
         * @en Dialog content panel width (android)
         */
        dialogContentAndroidWidth: getRem(280),
        /**
         * 对话框内容面板背景色
         * @en Dialog content panel background color
         */
        dialogContentBackground: useGlobal('maskContentBackground'),
        /**
         * 对话框内容面板圆角值 (ios)
         * @en Dialog content panel border radius value (ios)
         */
        dialogContentBorderRadius: getRem(8),
        /**
         * 对话框内容面板圆角值 (android)
         * @en Dialog content panel border radius value (android)
         */
        dialogContentAndroidBorderRadius: getRem(4),
        /**
         * 对话框横向内边距 (ios)
         * @en Dialog horizontal padding (ios)
         */
        dialogIosHorizontalPadding: getRem(16),
        /**
         * 对话框纵向内边距 (ios)
         * @en Dialog vertical padding (ios)
         */
        dialogIosVerticalPadding: getRem(20),
        /**
         * 对话框 header 和 body 的间距 (ios)
         * @en  Dialog header and body gutter (ios)
         */
        dialogIosHeaderBodyGutter: getRem(4),
        /**
         * 对话框横向内边距 (android)
         * @en  Dialog horizontal padding (android)
         */
        dialogAndroidHorizontalPadding: getRem(24),
        /**
         * 对话框纵向内边距 (android)
         * @en Dialog vertical padding (android)
         */
        dialogAndroidVerticalPadding: getRem(20),
        /**
         * 对话框 header 和 body 的间距 (android)
         * @en Dialog header and body gutter (android)
         */
        dialogAndroidHeaderBodyGutter: getRem(12),
        /**
         * 对话框 body 和 footer 的间距 (android)
         * @en Dialog body and footer spacing (android)
         */
        dialogAndroidBodyFooterGutter: getRem(24),
        /**
         * 对话框正文字体颜色 (ios)
         * @en Dialog body font color (ios)
         */
        dialogBodyIosColor: useGlobal('subFontColor'),
        /**
         * 对话框正文字体大小 (ios)
         * @en  Dialog body font size (ios)
         */
        dialogBodyIosFontSize: getRem(15),
        /**
         * 对话框正文字体行高 (ios)
         * @en Dialog body font line height (ios)
         */
        dialogBodyIosLineHeight: getRem(22),
        /**
         * 对话框正文字体颜色 (android)
         * @en Dialog body font color (android)
         */
        dialogBodyAndroidColor: useGlobal('subFontColor'),
        /**
         * 对话框正文字体大小 (android)
         * @en Dialog body font size (android)
         */
        dialogBodyAndroidFontSize: getRem(15),
        /**
         * 对话框正文字体行高 (android)
         * @en Dialog body font line height (android)
         */
        dialogBodyAndroidLineHeight: getRem(24),
        /**
         * 对话框标题字体颜色 (ios)
         * @en Dialog header font color (ios)
         */
        dialogHeaderIosColor: useGlobal('fontColor'),
        /**
         * 对话框标题字体颜色 (android)
         * @en Dialog header font color (android)
         */
        dialogHeaderAndroidColor: useGlobal('fontColor'),
        /**
         * 对话框标题字体大小 (ios)
         * @en Dialog header font size (ios)
         */
        dialogHeaderIosFontSize: getRem(17),
        /**
         * 对话框标题字体行高 (ios)
         * @en Dialog header font line height (ios)
         */
        dialogHeaderIosLineHeight: getRem(26),
        /**
         * 对话框标题字体大小 (android)
         * @en Dialog header font size (android)
         */
        dialogHeaderAndroidFontSize: getRem(17),
        /**
         * 对话框标题字体行高 (android)
         * @en Dialog title font line height (android)
         */
        dialogHeaderAndroidLineHeight: getRem(28),
        /**
         * 对话框按钮区字体颜色 (ios)
         * @en Dialog footer font color (ios)
         */
        dialogFooterIosColor: useGlobal('primaryColor'),
        /**
         *  对话框按钮区字体大小 (ios)
         *  @en  Dialog footer font size (ios)
         */
        dialogFooterIosFontSize: getRem(16),
        /**
         * 对话框按钮区高度 (ios)
         * @en Dialog footer height (ios)
         */
        dialogFooterIosHeight: getRem(44),
        /**
         * 对话框按钮区字体颜色 (android)
         * @en Dialog footer font color (android)
         */
        dialogFooterAndroidColor: '#1a74ff',
        /**
         * 对话框按钮区字体大小 (android)
         * @en Dialog footer font size (android)
         */
        dialogFooterAndroidFontSize: getRem(15),
        /**
         * 对话框按钮区字体行高 (android)
         * @en Dialog footer line height (android)
         */
        dialogFooterAndroidLineHeight: getRem(20),
        /**
         * 对话框按钮区按钮间距 (android)
         * @en Dialog footer button gutter (android)
         */
        dialogFooterAndroidButtonGutter: getRem(28),
        /**
         * 对话框（独立按钮样式）主按钮背景色
         * @en Dialog (independent button style) primary button background color
         */
        dialogButtonFooterPrimaryBackground: useGlobal('primaryColor'),
        /**
         * 对话框（独立按钮样式）主按钮字体颜色
         * @en Dialog (independent button style) primary button font color
         */
        dialogButtonFooterPrimaryColor: '#ffffff',
        /**
         * 对话框（独立按钮样式）普通按钮字体颜色
         * @en Dialog (independent button style) normal button font color
         */
        dialogButtonFooterColor: useGlobal('subInfoFontColor'),
        /**
         * 对话框（独立按钮样式）按钮高度
         * @en Dialog (independent button style) button height
         */
        dialogButtonFooterHeight: getRem(36),
        /**
         * 对话框（独立按钮样式）按钮圆角值
         * @en Dialog (independent button style) button border radius
         */
        dialogButtonFooterBorderRadius: getRem(30),
        /**
         * 对话框（独立按钮样式）按钮间距
         * @en  Dialog (independent button style) button gutter
         */
        dialogButtonFooterGutter: getRem(8),
        /**
         * 轮播图自动轮播时的动画曲线
         * @en The animation curve when the carousel image rotates automatically
         */
        carouselAutoTransition: 'cubic-bezier(0.66, 0, 0.34, 1)',
        /**
         * 轮播图手势滑动时手指抬起后的动画曲线
         * @en The animation curve after the finger is lifted when the carousel gesture slides
         */
        carouselSlideTransition: 'cubic-bezier(0.32, 0.94, 0.6, 1)',
        /**
         * 轮播图指示器背景色
         * @en Carousel indicator background color
         */
        carouselIndicatorBackground: 'rgba(255, 255, 255, 0.5)',
        /**
         * 轮播图指示器高亮背景色
         * @en Carousel indicator active background color
         */
        carouselIndicatorActiveBackground: '#ffffff',
        /**
         * 轮播图指示器放轮播图外部时背景色
         * @en The background color of the carousel indicator which is outside the carousel
         */
        carouselIndicatorInverseBackground: useGlobal('lineColor'),
        /**
         * 轮播图指示器放轮播图外部时高亮背景色
         * @en The active background color of the carousel indicator  which is outside the carousel
         */
        carouselIndicatorActiveInverseBackground: useGlobal('primaryColor'),
        /**
         * 轮播图指示器放轮播图外部时，指示器容器内边距
         * @en the padding of the container of the indicator which is in outside the carousel
         */
        carouselIndicatorOutsidePadding: `${getRem(8)} 0 ${getRem(5)}`,
        /**
         * 轮播图指示器距离边缘的距离
         * @en The distance of the carousel indicator from the edge
         */
        carouselIndicatorPosition: getRem(12),
        /**
         * 轮播图指示器不居中时，距离两侧的安全距离
         * @en Safe distance from both sides when the carousel indicator is not centered
         */
        carouselIndicatorSafePadding: getRem(16),
        /**
         * 轮播图圆点形指示器之间的间距
         * @en Gutter between items of the carousel dot indicator
         */
        carouselCircleIndicatorGutter: getRem(8),
        /**
         * 轮播图方形指示器之间的间距
         * @en Gutter between items of carousel square indicator
         */
        carouselSquareIndicatorGutter: getRem(8),
        /**
         * 轮播图圆点形指示器大小
         * @en Size of item of the carousel dot indicator
         */
        carouselCircleIndicatorSize: '6PX',
        /**
         * 轮播图方形指示器宽度
         * @en Width of item of the carousel square indicator
         */
        carouselSquareIndicatorWidth: getRem(12),
        /**
         * 轮播图方形指示器高度
         * @en Height of item of the carousel square indicator
         */
        carouselSquareIndicatorHeight: '3PX',
        /**
         * 轮播图滑块文字颜色
         * @en Font color of the carousel sliders
         */
        carouselItemTextColor: '#ffffff',
        /**
         * 轮播图滑块文字背景色
         * @en Background color of the carousel sliders
         */
        carouselItemTextBackground:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 5.18%, rgba(0, 0, 0, 0.15) 100%)',
        /**
         * 轮播图滑块文字高度
         * @en Font height of the carousel sliders
         */
        carouselItemTextHeight: getRem(32),
        /**
         * 轮播图滑块文字内边距
         * @en Font Padding of the carousel sliders
         */
        carouselItemTextPadding: `0 ${getRem(12)}`,
        /**
         * 轮播图滑块文字大小
         * @en Font size of the carousel sliders
         */
        carouselItemTextFontSize: getRem(16),
        /**
         * 输入框 高度
         * @en Input height
         */
        inputHeight: getRem(54),
        /**
         * 输入框 禁用状态输入框背景色
         * @en Input background color in the disable state
         */
        inputDisabledBackground: '#fafbfc',
        /**
         * 输入框 禁用状态文字色
         * @en Input font color in the disable state
         */
        inputDisabledColor: useGlobal('disabledColor'),
        /**
         * 输入框 占位文本颜色
         * @en Input font color of placeholder
         */
        inputPlaceholderColor: useGlobal('disabledColor'),
        /**
         * 输入框 清除图标颜色
         * @en Input clear icon color
         */
        inputClearIconColor: useGlobal('disabledColor'),
        /**
         * 输入框 清除图标大小
         * @en Input clear icon font size
         */
        inputClearIconFontSize: '16PX',
        /**
         *  输入框 前置内容右内边距
         * @en Input right padding of label
         */
        inputLabelGutter: getRem(24),
        /**
         * 输入框 外包层水平内边距
         * @en Input horizontal padding of wrapper layer
         */
        inputHorizontalPadding: getRem(16),
        /**
         * 输入框 外包层垂直内边距
         * @en Input vertical padding of wrapper layer
         */
        inputVerticalPadding: getRem(12),
        /**
         * 输入框 光标颜色
         * @en Input caret color
         */
        inputCaretColor: useGlobal('primaryColor'),
        /**
         * 输入框 标签最小高度
         * @en Input label minimum height
         */
        inputLabelMinWidth: getRem(64),
        /**
         * 输入框 文字字体大小
         * @en Input text font size
         */
        inputTextFontSize: getRem(16),
        /**
         * 输入框 文字行高
         * @en Input text line height
         */
        inputTextLineHeight: getRem(22),
        /**
         * 多行文本框 字号
         * @en Textarea font size
         */
        textareaFontSize: getRem(16),
        /**
         * 多行文本框 行间距
         * @en Textarea line height
         */
        textareaLineHeight: getRem(22),
        /**
         * 多行文本框 内边距
         * @en Textarea padding
         */
        textareaPadding: getRem(16),
        /**
         * 多行文本框 有字数统计时的内边距
         * @en Textarea  padding of textarea with word count
         */
        textareaHasStatPadding: `${getRem(16)} ${getRem(16)} ${getRem(44)}`,
        /**
         * 多行文本框 字数统计文字颜色
         * @en Textarea word count font color
         */
        textareaStatisticColor: useGlobal('subInfoFontColor'),
        /**
         * 多行文本框 字数统计字号
         * @en Textareaword count font size
         */
        textareaStatisticFontSize: getRem(14),
        /** @ignore */
        avatarSizeMap: 'large, medium, small, smaller, ultra-small',
        /**
         * large 头像组件的大小
         * @en Size of the large avatar
         */
        avatarLargeSize: getRem(56),
        /**
         * medium 头像组件的大小
         * @en Size of the medium avatar
         */
        avatarMediumSize: getRem(48),
        /**
         * small 头像组件的大小
         * @en Size of the small avatar
         */
        avatarSmallSize: getRem(40),
        /**
         * smaller 头像组件的大小
         * @en Size of the smaller avatar
         */
        avatarSmallerSize: getRem(32),
        /**
         * ultra-small 头像组件的大小
         * @en Size of the ultra-small avatar
         */
        avatarUltraSmallSize: getRem(24),
        /**
         * large 头像组件默认头像图标大小
         * @en Default avatar icon size of the large avatar
         */
        avatarDefaultOverlapLargeSize: getRem(28),
        /**
         * medium 头像组件默认头像图标大小
         * @en Default avatar icon size of the medium avatar
         */
        avatarDefaultOverlapMediumSize: getRem(24),
        /**
         * small 头像组件默认头像图标大小
         * @en Default avatar icon size of the small avatar
         */
        avatarDefaultOverlapSmallSize: getRem(20),
        /**
         * smaller 头像组件默认头像图标大小
         * @en Default avatar icon size of the smaller avatar
         */
        avatarDefaultOverlapSmallerSize: getRem(16),
        /**
         * ultra-small 头像组件默认头像图标大小
         * @en Default avatar icon size of the ultra-small avatar
         */
        avatarDefaultOverlapUltraSmallSize: getRem(12),
        /**
         * 头像组件背景色
         * @en Avatar background color
         */
        avatarBackground: '#4080FF',
        /**
         * 头像组件默认头像背景色
         * @en Default avatar background color of the avatar
         */
        avatarDefaultOverlapBackground: useGlobal('disabledColor'),
        /**
         * 字体头像文字颜色
         * @en Text avatar font color
         */
        avatarTextFontColor: '#fff',
        /**
         * large 字体头像字体大小
         * @en Font size of the large text avatar
         */
        avatarLargeTextFontSize: getRem(16),
        /**
         * medium 字体头像字体大小
         * @en Font size of the medium text avatar
         */
        avatarMediumTextFontSize: getRem(16),
        /**
         * small 字体头像字体大小
         * @en Font size of the small text avatar
         */
        avatarSmallTextFontSize: getRem(14),
        /**
         * smaller 字体头像字体大小
         * @en Font size of the smaller text avatar
         */
        avatarSmallerTextFontSize: getRem(12),
        /**
         * ultra-small 字体头像字体大小
         * @en Font size of the ultra-small text avatar
         */
        avatarUltraSmallTextFontSize: getRem(10),
        /**
         * large 头像叠层组件头像重叠偏移量
         * @en Avatar overlap offset of the large avatar group
         */
        avatarGroupLargeSizeOffset: getRem(-12),
        /**
         * large 头像叠层组件头像border宽度
         * @en Avatar border width of the large avatar group
         */
        avatarGroupLargeSizeBorder: getRem(1.5),
        /**
         *  medium 头像叠层组件头像重叠偏移量
         * @en Avatar overlap offset of the medium avatar group
         */
        avatarGroupMediumSizeOffset: getRem(-12),
        /**
         * medium 头像叠层组件头像border宽度
         * @en Avatar border width of the medium avatar group
         */
        avatarGroupMediumSizeBorder: getRem(1.5),
        /**
         * small 头像叠层组件头像重叠偏移量
         *  @en Avatar overlap offset of the small avatar group
         */
        avatarGroupSmallSizeOffset: getRem(-12),
        /**
         * small 头像叠层组件头像border宽度
         * @en Avatar border width of the small avatar group
         */
        avatarGroupSmallSizeBorder: getRem(1.5),
        /**
         * smaller 头像叠层组件头像重叠偏移量
         * @en Avatar overlap offset of the smaller avatar group
         */
        avatarGroupSmallerSizeOffset: getRem(-8),
        /**
         * smaller 头像叠层组件头像border宽度
         * @en Avatar border width of the smaller avatar group
         */
        avatarGroupSmallerSizeBorder: getRem(1),
        /**
         * ultra-small 头像叠层组件头像重叠偏移量
         * @en Avatar overlap offset of the ultra-small avatar group
         */
        avatarGroupUltraSmallSizeOffset: getRem(-8),
        /**
         * ultra-small 头像叠层组件头像border宽度
         * @en Avatar border width of the ultra-small avatar group
         */
        avatarGroupUltraSmallSizeBorder: getRem(1),
        /**
         * 头像叠层border颜色
         * @en Border color of avatar group
         */
        avatarGroupBorderColor: useGlobal('backgroundColor'),
        /**
         * large大小带有辅助信息的头像组件容器高度
         * @en Container height of large avatar with auxiliary information
         */
        avatarInfoBoxLargeSize: getRem(88),
        /**
         * medium大小带有辅助信息的头像组件容器高度
         * @en Container height of medium avatar with auxiliary information
         */
        avatarInfoBoxMediumSize: getRem(80),
        /**
         * small大小带有辅助信息的头像组件容器高度
         * @en Container height of small avatar with auxiliary information
         */
        avatarInfoBoxSmallSize: getRem(80),
        /**
         * smaller大小带有辅助信息的头像组件容器高度
         * @en Container height of smaller avatar with auxiliary information
         */
        avatarInfoBoxSmallerSize: getRem(64),
        /**
         * ultra-small大小带有辅助信息的头像组件容器高度
         * @en Container height of ultra-small avatar with auxiliary information
         */
        avatarInfoBoxUltraSmallSize: getRem(56),
        /**
         * large 头像组件用户名文字大小
         * @en Username font size of large avatar
         */
        avatarNameLargeFontSize: getRem(18),
        /**
         * large 头像组件用户名文字行高
         * @en Username font line height of large avatar
         */
        avatarNameLargeLineHeight: getRem(26),
        /**
         * large 头像组件辅助信息文字大小
         * @en Auxiliary information font size of large avatar
         */
        avatarDescLargeFontSize: getRem(14),
        /**
         * large 头像组件辅助信息文字行高
         * @en Auxiliary information font line height of large avatar
         */
        avatarDescLargeLineHeight: getRem(20),
        /**
         * large 头像组件用户名和辅助信息间距的大小
         * @en The distance of the username and auxiliary information of large avatar
         */
        avatarDescLargeMarginTop: getRem(2),
        /**
         * medium 头像组件用户名文字大小
         * @en Username font size of medium avatar
         */
        avatarNameMediumFontSize: getRem(18),
        /**
         * medium 头像组件用户名文字行高
         * @en Username font line height of medium avatar
         */
        avatarNameMediumLineHeight: getRem(26),
        /**
         * medium 头像组件辅助信息文字大小
         * @en Auxiliary information font size of medium avatar
         */
        avatarDescMediumFontSize: getRem(14),
        /**
         * medium 头像组件辅助信息文字行高
         * @en Auxiliary information font line height of medium avatar
         */
        avatarDescMediumLineHeight: getRem(20),
        /**
         * medium 头像组件用户名和辅助信息间距的大小
         * @en The distance of the username and auxiliary information of medium avatar
         */
        avatarDescMediumMarginTop: getRem(2),
        /**
         * small 头像组件用户名文字大小
         * @en Username font size of small avatar
         */
        avatarNameSmallFontSize: getRem(16),
        /**
         * small 头像组件用户名文字行高
         * @en Username font line height of small avatar
         */
        avatarNameSmallLineHeight: getRem(24),
        /**
         * small 头像组件辅助信息文字大小
         * @en Auxiliary information font size of small avatar
         */
        avatarDescSmallFontSize: getRem(12),
        /**
         * small 头像组件辅助信息文字行高
         * @en Auxiliary information font line height of small avatar
         */
        avatarDescSmallLineHeight: getRem(16),
        /**
         * small 头像组件用户名和辅助信息间距的大小
         * @en The distance of the username and auxiliary information of small avatar
         */
        avatarDescSmallMarginTop: getRem(0),
        /**
         * smaller 头像组件用户名文字大小
         * @en Username font size of smaller avatar
         */
        avatarNameSmallerFontSize: getRem(14),
        /**
         * smaller 头像组件用户名文字行高
         * @en Username font line height of smaller avatar
         */
        avatarNameSmallerLineHeight: getRem(20),
        /**
         * smaller 头像组件辅助信息文字大小
         * @en Auxiliary information font size of smaller avatar
         */
        avatarDescSmallerFontSize: getRem(12),
        /**
         * smaller 头像组件辅助信息文字行高
         * @en Auxiliary information font line height of smaller avatar
         */
        avatarDescSmallerLineHeight: getRem(16),
        /**
         * smaller 头像组件用户名和辅助信息间距的大小
         * @en The distance of the username and auxiliary information of smaller avatar
         */
        avatarDescSmallerMarginTop: getRem(0),
        /**
         * ultra-small 头像组件用户名文字大小
         * @en Username font size of ultra-small avatar
         */
        avatarNameUltraSmallFontSize: getRem(13),
        /**
         * ultra-small 头像组件用户名文字行高
         * @en Username font line height of ultra-small avatar
         */
        avatarNameUltraSmallLineHeight: getRem(18),
        /**
         * ultra-small 头像组件辅助信息文字大小
         * @en Auxiliary information font size of ultra-small avatar
         */
        avatarDescUltraSmallFontSize: getRem(10),
        /**
         * ultra-small 头像组件辅助信息文字行高
         * @en Auxiliary information font line height of ultra-small avatar
         */
        avatarDescUltraSmallLineHeight: getRem(14),
        /**
         * ultra-small 头像组件用户名和辅助信息间距的大小
         * @en The distance of the username and auxiliary information of ultra-small avatar
         */
        avatarDescUltraSmallMarginTop: getRem(2),
        /**
         * 头像组件用户名字体颜色
         * @en Avatar username font color
         */
        avatarNameColor: useGlobal('fontColor'),
        /**
         * 头像组件辅助信息文字颜色
         * @en Auxiliary information font color of avatar
         */
        avatarDescColor: useGlobal('subInfoFontColor'),
        /**
         * 按钮的行高
         * @en Button line height
         * @override buttonBorder
         */
        buttonLineHeight: '1.2',
        /**
         * shape=semi时圆角大小
         * @en Button border radius when shape=semi
         */
        buttonRadius: '2PX',
        /**
         * 按钮图标与文字的间距
         * @en Gutter between icon and text
         */
        buttonIconTextGutter: getRem(4),
        /**
         * primary 类型按钮背景色
         * @en Primary button background color
         */
        buttonPrimaryBackground: useGlobal('primaryColor'),
        /**
         * primary 类型按钮点击态背景色
         * @en Background color in click state of primary button
         */
        buttonPrimaryClickedBackground: '#0E42D2',
        /**
         * primary 类型按钮禁用态背景色
         * @en Background color of disabled primary button
         */
        buttonPrimaryDisabledBackground: useGlobal('primaryDisabledColor'),
        /**
         * primary 类型按钮文字颜色
         * @en Font color of primary button
         * @override buttonPrimaryText
         */
        buttonPrimaryTextColor: '#fff',
        /**
         * primary 类型按钮禁用态文字颜色
         * @en Font color of disabled primary button
         * @override buttonPrimaryDisabledText
         */
        buttonPrimaryDisabledTextColor: '#E8F3FF',
        /**
         * default 类型按钮背景色
         * @en Default button background color
         */
        buttonDefaultBackground: '#E8F3FF',
        /**
         * default 类型按钮点击态背景色
         * @en Background color of default button in click state
         */
        buttonDefaultClickedBackground: useGlobal('primaryDisabledColor'),
        /**
         * default 类型按钮禁用态背景色
         * @en Background color of disabled default button
         */
        buttonDefaultDisabledBackground: '#E8F3FF',
        /**
         * default 类型按钮文字颜色
         * @en Font color of default button
         * @override buttonDefaultText
         */
        buttonDefaultTextColor: useGlobal('primaryColor'),
        /**
         * default 类型按钮禁用态文字颜色
         * @en Font color of disabled default button
         * @override buttonDefaultDisabledText
         */
        buttonDefaultDisabledTextColor: useGlobal('primaryDisabledColor'),
        /**
         * ghost 类型按钮背景色
         * @en Ghost button background color
         */
        buttonGhostBackground: 'transparent',
        /**
         * ghost 类型按钮点击态背景色
         * @en Background color of ghost button in click state
         */
        buttonGhostClickedBackground: '#e8f3ff',
        /**
         * ghost 类型按钮禁用态背景色
         * @en Background color of disabled ghost button
         */
        buttonGhostDisabledBackground: 'transparent',
        /**
         * ghost 类型按钮文字颜色
         * @en Font color of ghost button
         * @override buttonGhostText
         */
        buttonGhostTextColor: useGlobal('primaryColor'),
        /**
         * ghost 类型按钮禁用态文字颜色
         * @en Font color of disabled ghost button
         * @override buttonGhostDisabledText
         */
        buttonGhostDisabledTextColor: useGlobal('primaryDisabledColor'),
        /**
         * huge 按钮内部padding
         * @en Huge button padding
         */
        buttonHugePadding: `0 ${getRem(16)}`,
        /**
         * huge 按钮高度
         * @en Huge button height
         */
        buttonHugeHeight: getRem(44),
        /**
         * huge 按钮文字大小
         * @en Huge button font size
         */
        buttonHugeTextSize: getRem(16),
        /**
         * large 按钮内部padding
         * @en Large button padding
         */
        buttonLargePadding: `0 ${getRem(16)}`,
        /**
         * large 按钮高度
         * @en Large button height
         */
        buttonLargeHeight: getRem(36),
        /**
         * large 按钮文字大小
         * @en Large button font size
         */
        buttonLargeTextSize: getRem(15),
        /**
         * medium 按钮内部padding
         * @en Medium button padding
         */
        buttonMediumPadding: `0 ${getRem(16)}`,
        /**
         * medium 按钮高度
         * @en Medium button height
         */
        buttonMediumHeight: getRem(32),
        /**
         * medium 按钮文字大小
         * @en Medium button font size
         */
        buttonMediumTextSize: getRem(14),
        /**
         * small 按钮内部padding
         * @en Small button padding
         */
        buttonSmallPadding: `0 ${getRem(8)}`,
        /**
         * small 按钮高度
         * @en Small button height
         */
        buttonSmallHeight: getRem(28),
        /**
         * small 按钮文字大小
         * @en Small button font size
         */
        buttonSmallTextSize: getRem(14),
        /**
         * mini 按钮内部padding
         * @en Mini button padding
         */
        buttonMiniPadding: `0 ${getRem(8)}`,
        /**
         * mini 按钮高度
         * @en Mini button height
         */
        buttonMiniHeight: getRem(24),
        /**
         * mini 按钮文字大小
         * @en Mini button font size
         */
        buttonMiniTextSize: getRem(12),
        /**
         * 文字缩略组件默认字体大小
         * @en Ellipsis default font size
         */
        ellipsisDefaultTextSize: getRem(16),
        /**
         * 文字缩略组件浮动模式下的缩略符背景色
         * @en Background of floating ellipsis node
         */
        ellipsisFloatEllipsisNodeBackground:
            'linear-gradient(90deg, rgba(255, 255, 255, 0), #ffffff 20PX, #ffffff)',
        /**
         * 文字缩略组件浮动模式下的缩略符左边距
         * @en Padding left of floating ellipsis node
         */
        ellipsisFloatEllipsisNodePaddingLeft: '20PX',
        /**
         * checkbox图标颜色
         * @en Checkbox icon color
         */
        checkboxIconColor: '#c2c6cc',
        /**
         * checkbox图标大小（宽高）
         * @en Checkbox icon size (width and height)
         */
        checkboxIconFontSize: '20PX',
        /**
         * checkbox图标右侧margin
         * @en Right margin of checkbox icon
         */
        checkboxIconMarginRight: getRem(8),
        /**
         * checkbox图标被选中时的颜色
         * @en Color of selected checkbox icon
         */
        checkboxIconCheckedColor: useGlobal('primaryColor'),
        /**
         * checkbox图标被禁用时的颜色
         * @en Color of disabled checkbox icon
         */
        checkboxIconDisabledColor: '#f7f8fa',
        /**
         * checkbox图标被禁用且选中时的颜色
         * @en Color of selected but Disabled checkbox icon
         */
        checkboxIconCheckedDisabledColor: 'rgba(51,112,255, .5)',
        /**
         * checkbox被禁用时的字体颜色
         * @en Font color of disabled checkbox
         */
        checkboxDisabledColor: '#c2c6cc',
        /**
         * checkbox文字字体大小
         * @en Font size of checkbox
         */
        checkboxTextFontSize: getRem(16),
        /**
         * checkbox文字禁用态透明度
         * @en Text transparency of disable checkbox
         */
        checkboxTextDisabledOpacity: '0.5',
        /**
         * checkbox选项组中选项之间的间距
         * @en Gutter between options in checkbox group
         */
        checkboxGroupGutter: getRem(24),
        /**
         * tabs tabbar 字体大小
         * @en Tabs tabbar font size
         */
        tabsTabBarFontSize: getRem(15),
        /**
         * tabs tabbar 背景色
         * @en Tabs tabbar background color
         * @override tabBarBackground
         */
        tabsTabBarBackground: useGlobal('backgroundColor'),
        /**
         * tabs 上下排布时 tabbar 容器高度
         * @en Height of the tabbar container when the tabs is vertical
         * @override tabBarHeight
         */
        tabsTabBarHeight: getRem(42),
        /**
         * tabs 左右排布时 tabbar 容器宽度
         * @en Height of the tabbar container when the tabs is horizontal
         * @override tabBarWidth
         */
        tabsTabBarWidth: getRem(78),
        /**
         * tabs 左右排布时每一个选项卡的高度
         * @en Each tab height in horizontal tabs
         * @override tabBarHorizontalHeight
         */
        tabsTabBarHorizontalHeight: getRem(54),
        /**
         * tabs 分段器样式下 tabbar 容器高度
         * @en Height of tabbar container of card tabs
         * @override tabBarCardHeight
         */
        tabsTabBarCardHeight: getRem(40),
        /**
         * tabs 分段器样式下的主颜色（边框色、高亮块背景色、非高亮块文字颜色）
         * @en Primary color of tab in card tabs (border color, active block background color, inactive block font color)
         * @override tabBarCardColor
         */
        tabsTabBarCardColor: useGlobal('primaryColor'),
        /**
         * tabs 分段器样式下高亮选项卡的文字颜色
         * @en Font color of active tab in card tabs
         * @override tabBarCardTextColor
         */
        tabsTabBarCardTextColor: '#ffffff',
        /**
         * tabs 分段器样式 tabbar 容器圆角值
         * @en Border radius of tab container in card tabs
         * @override tabBarCardBorderRadius
         */
        tabsTabBarCardBorderRadius: '2PX',
        /**
         * tabs 基础样式下高亮选项卡的文字颜色
         * @en Font color of active tab
         * @override tabBarLineActiveColor
         */
        tabsTabBarLineActiveColor: useGlobal('primaryColor'),
        /**
         * tabs 基础非等分样式下选项卡的间距
         * @en Tab gutter of tabs under basic non-equal division style
         * @override tabBarLineGutter
         */
        tabsTabBarLineGutter: getRem(40),
        /**
         * tabs 标签非等分样式下选项卡的间距
         * @en Tab gutter of tag tabs under basic non-equal division style
         * @override tabBarTagGutter
         */
        tabsTabBarTagGutter: getRem(16),
        /**
         * tabs 标签样式下 tabbar 容器高度
         * @en Tabbar container height in tag tabs
         * @override tabBarTagHeight
         */
        tabsTabBarTagHeight: getRem(60),
        /**
         * tabs 标签样式下，选项卡与容器的垂直间距
         * @en Vertical padding between the tabbar and the container in tag tabs
         * @override tabBarTagVerticalPadding
         */
        tabsTabBarTagVerticalPadding: getRem(12),
        /**
         * tabs 标签样式下每个选项卡的背景色
         * @en Background color of each tab in tag tabs
         * @override tabBarTagBackground
         */
        tabsTabBarTagBackground: '#f7f8fA',
        /**
         * tabs 标签样式下每个选项卡的文字颜色
         * @en Font color of each tab in tag tabs
         * @override tabBarTagTextColor
         */
        tabsTabBarTagTextColor: useGlobal('fontColor'),
        /**
         * tabs 标签样式下高亮选项卡的背景色
         * @en Background color of active tab in tag tabs
         * @override tabBarTagActiveBackground
         */
        tabsTabBarTagActiveBackground: useGlobal('primaryColor'),
        /**
         * tabs 标签样式下高亮选项卡的文字颜色
         * @en Font color of active tab in tag tabs
         * @override tabBarTagActiveTextColor
         */
        tabsTabBarTagActiveTextColor: '#ffffff',
        /**
         * tabs 标签样式下每个选项卡的内边距
         * @en Padding of active tab in tag tabs
         */
        tabsTabBarTagPadding: `0 ${getRem(16)}`,
        /**
         * tabs 基础样式高亮下划线的颜色
         * @en Underline color of active tab in normal tabs
         */
        tabsUnderlineColor: useGlobal('primaryColor'),
        /**
         * tabs 基础样式高亮下划线的厚度
         * @en Thickness of active tab in normal tabs
         */
        tabsUnderlineThick: '2PX',
        /**
         * tabs 基础样式高亮下划线的长度
         * @en Length of active tab in normal tabs
         */
        tabsUnderlineSize: getRem(24),
        /**
         * tabs 基础样式高亮下划线的圆角值
         * @en Border radius of active tab in normal tabs
         */
        tabsUnderlineBorderRadius: '2PX',
        /**
         * tabBar 高度
         * @en TabBar height
         */
        tabBarHeight: getRem(50),
        /**
         * tabBar 默认字体大小
         * @en TabBar default font size
         */
        tabBarFontSize: getRem(10),
        /**
         * tabBar icon的默认大小
         * @en TabBar default icon size
         */
        tabBarIconSize: getRem(20),
        /**
         * tabBar 只有title时的字体大小
         * @en TabBar font size when only title
         */
        tabBarOnlyTitleFontSize: getRem(16),
        /**
         * tabBar 默认颜色
         * @en TabBar default color
         */
        tabBarColor: useGlobal('subInfoFontColor'),
        /**
         * tabBar 激活状态下的颜色
         * @en TabBar active color
         */
        tabBarActiveColor: useGlobal('primaryColor'),
        /**
         * tabBar 标题行高
         * @en TabBar title line height
         */
        tabBarTitleLineHeight: getRem(14),
        /**
         * tabBar 只有title时的行高
         * @en TabBar line height when only title
         */
        tabBarOnlyTitleLineHeight: getRem(22),
        /**
         * tabBar 标题外边距
         * @en TabBar title margin
         */
        tabBarTitleMargin: `0 0 ${getRem(5)} 0`,
        /**
         * tabBar 子选项图标外边距
         * @en TabBar items' icon margin
         */
        tabBarItemIconMargin: `${getRem(7)} 0 ${getRem(4)}`,
        /**
         * navBar 高度
         * @en NavBar height
         */
        navBarHeight: getRem(44),
        /**
         * navBar 下边框颜色
         * @en NavBar bottom border color
         * @override navBarLineColor
         */
        navBarBottomBorderColor: useGlobal('lineColor'),
        /**
         * navBar 背景色
         * @en NavBar background color
         */
        navBarBackground: useGlobal('backgroundColor'),
        /**
         * navBar 字体颜色
         * @en NavBar font color
         */
        navBarFontColor: useGlobal('fontColor'),
        /**
         * navBar 左右两侧字体大小
         * @en Font size of left and right side of navBar
         */
        navBarTwoSidesFontSize: getRem(16),
        /**
         * navBar 左右两侧内边距
         * @en Left and right padding of navBar
         */
        navBarTwoSidesPadding: `0 ${getRem(16)}`,
        /**
         * navBar 标题区域字体大小
         * @en Title font size of navBar
         */
        navBarTitleFontSize: getRem(17),
        /**
         * navBar 标题区域文字字体大小
         * @en Title text font size of navBar
         */
        navBarTitleTextFontSize: getRem(17),
        /**
         * navBar 标题区域左右内边距
         * @en Left and right padding of navBar title
         */
        navBarTitlePadding: `0 ${getRem(46)}`,
        /**
         * navBar 返回图标高度
         * @en Back icon height of navBar
         */
        navBarBackIconHeight: getRem(16),

        /**
         * 图片 placeholder 背景色
         * @en Image placeholder background color
         */
        imagePlaceholderBackground: '#f7f8fa',
        /**
         * 图片 loading 态图标及文字颜色
         * @en Image loading status icon color  and text color
         */
        imageLoadingIconColor: '#e6e8eb',
        /**
         * 图片 retry 态图标及文字颜色
         * @en Image retry status icon and text color
         */
        imageRetryIconColor: '#e6e8eb',
        /**
         * 图片加载或重试时默认蒙层背景色
         * @en Default mask background color when image loads or retries
         */
        imageMaskBackground: useGlobal('maskBackground'),
        /**
         * 图片加载完成展现时的动画曲线
         * @en The animation curve when the image is loaded and displayed
         */
        imageTransitionFunction: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
        /**
         * 图片加载或重试时默认字体大小
         * @en Default font size when image loads or retries
         */
        imageInnerFontSize: getRem(16),
        /**
         * 图片重试时字体大小
         * @en Font size when image retries
         */
        imageRetryFontSize: getRem(16),

        /**
         * switch 文字颜色
         * @en Switch font color
         */
        switchTextColor: useGlobal('subFontColor'),
        /**
         * switch 打开时文字颜色
         * @en Font color when switch is on
         */
        switchTextCheckedColor: '#FFFFFF',
        /**
         * switch 开关背景色
         * @en Switch background color
         */
        switchInnerBackground: '#FFFFFF',
        /**
         * switch 开关过渡动画
         * @en Switch transition animation
         */
        switchInnerTransition: 'all .2s',
        /**
         * switch 圆角开关圆角大小
         * @en Border radius of switch button
         */
        switchInnerFullyBorderRadius: '50%',
        /**
         * switch 直角开关圆角大小
         * @en Border radius of Semi switch button
         */
        switchInnerSemiBorderRadius: '1PX',
        /**
         * switch 安卓开关整体宽度
         * @en Switch width in Android
         */
        switchAndroidWidth: '40PX',
        /**
         * switch 安卓开关整体高度
         * @en Switch height in Android
         */
        switchAndroidHeight: '24PX',
        /**
         * switch 安卓开关内边距
         * @en Switch padding in Android
         */
        switchAndroidPadding: '2PX',
        /**
         * switch 安卓开关直径
         * @en Switch button diameter in Android
         * @override switchAndroidInnerDiameter
         */
        switchAndroidInnerDiameterSize: '20PX',
        /**
         * switch 安卓开关阴影
         * @en Switch button box shadow in Android
         */
        switchAndroidInnerBoxShadow: '0 2PX 4PX 0 rgba(0, 0, 0, 0.08)',
        /**
         * switch 安卓圆角开关圆角大小
         * @en Border radius of switch button in Android
         */
        switchAndroidFullyBorderRadius: '20PX',
        /**
         * switch 安卓直角开关圆角大小
         * @en Border radius of semi switch button in Android
         */
        switchAndroidSemiBorderRadius: '2PX',
        /**
         * switch 安卓开关打开时横向偏移量
         * @en The horizontal offset of switch button when the switch is on in Android
         */
        switchAndroidCheckedInnerTransform: `translateX(16PX)`,
        /**
         * switch 安卓开关文字大小
         * @en Switch font size in Android
         */
        switchAndroidTextFontSize: '12PX',
        /**
         * switch 安卓开关文字左右间距
         * @en Left and right spacing of switch in Android
         * @override switchAndroidTextGap
         */
        switchAndroidTextGapSize: '5PX',
        /**
         * switch 安卓开关背景色
         * @en Switch background color in Android
         */
        switchAndroidBackground: '#E5E6EB',
        /**
         * switch 安卓开关打开时背景色
         * @en Background color when switch is on in Android
         */
        switchAndroidCheckedBackground: useGlobal('primaryColor'),
        /**
         * switch 安卓开关默认打开禁用点击时背景色
         * @en Background color of disable switch which is open in Android
         */
        switchAndroidDisabledCheckedBackground: useGlobal('primaryDisabledColor'),
        /**
         * switch 安卓开关默认关闭禁用点击时背景色
         * @en Default background color of disable switch which is close in Android
         */
        switchAndroidDisabledBackground: '#F2F3F5',
        /**
         * switch iOS 开关整体宽度
         * @en Switch width in iOS
         */
        switchIosWidth: getRem(51),
        /**
         * switch iOS 开关整体高度
         * @en Switch height in iOS
         */
        switchIosHeight: getRem(31),
        /**
         * switch iOS 开关内边距
         * @en Switch padding in iOS
         */
        switchIosPadding: getRem(2),
        /**
         * switch iOS 开关直径
         * @en Switch button diameter in iOS
         * @override switchIosInnerDiameter
         */
        switchIosInnerDiameterSize: getRem(27),
        /**
         * switch iOS 开关边框颜色
         * @en Border color of switch button in iOS
         */
        switchIosInnerBorderColor: 'rgba(0, 0, 0, .04)',
        /**
         * switch iOS 开关阴影
         * @en Switch button box shadow in iOS
         */
        switchIosInnerBoxShadow: '0 3PX 2PX 0 rgba(0, 0, 0, .12)',
        /**
         * switch iOS 圆角开关圆角大小
         * @en Border radius of switch button in iOS
         */
        switchIosFullyBorderRadius: getRem(16),
        /**
         * switch iOS 直角开关圆角大小
         * @en Border radius of semi switch button in iOS
         */
        switchIosSemiBorderRadius: getRem(2),
        /**
         * switch iOS 开关打开时横向偏移量
         * @en The horizontal offset of switch button when the switch is on in iOS
         */
        switchIosCheckedInnerTransform: `translateX(${getRem(20)})`,
        /**
         * switch iOS 开关文字大小
         * @en Switch font size in iOS
         */
        switchIosTextFontSize: getRem(14),
        /**
         * switch iOS 开关文字左右间距
         * @en Left and right spacing of switch in iOS
         * @override switchIosTextGap
         */
        switchIosTextGapSize: getRem(6),
        /**
         * switch iOS 开关背景色
         * @en Switch background color in iOS
         */
        switchIosBackground: 'rgba(17, 17, 17, .15)',
        /**
         * switch iOS 开关打开时背景色
         * @en Background color when switch is on in iOS
         */
        switchIosCheckedBackground: '#34C759',
        /**
         * switch iOS 开关默认打开禁用点击时背景色
         * @en Background color of disable switch which is open in iOS
         */
        switchIosDisabledCheckedBackground: '#4DD865',
        /**
         * switch iOS 开关默认打开禁用点击时透明度
         * @en Opacity of disable switch which is open in iOS
         */
        switchIosDisabledCheckedOpacity: '0.3',
        /**
         * switch iOS 开关默认关闭禁用点击时背景色
         * @en Background color of disable switch which is close in iOS
         */
        switchIosDisabledBackground: 'rgba(120, 120, 128, .16)',

        /**
         * toast 背景色
         * @en Toast background color
         */
        toastBackground: 'rgba(0, 0, 0, 0.8)',
        /**
         * toast 文字颜色
         * @en Toast text color
         */
        toastTextColor: '#ffffff',
        /**
         * toast 字体大小
         * @en Toast font size
         */
        toastFontSize: getRem(16),
        /**
         * toast 字体行高
         * @en toast font line height
         */
        toastLineHeight: getRem(24),
        /**
         * toast 圆角值
         * @en Toast border radius
         */
        toastBorderRadius: getRem(4),
        /**
         * toast 加载态默认arc样式下底圈的背景色
         * @en Background color of arc of toast in loading state
         */
        toastLoadingArcBackgroundColor: '#666666',
        /**
         * toast 加载态，处于加载图标内部的文字大小
         * @en Font size inside the loading icon of toast in loading state
         */
        toastLoadingInnerFontSize: getRem(12),
        /**
         * toast 距屏幕边缘的安全距离
         * @en Safe distance of toast from the edge of the screen
         */
        toastSafePadding: `0 ${getRem(16)}`,
        /**
         * toast direction=top 时距离顶部的位置
         * @en Toast position from the top when toast direction=top
         */
        toastFromTopPosition: '30%',
        /**
         * toast direction=bottom 时距离底部的位置
         * @en Toast position from the bottom when toast direction=bottom
         */
        toastFromBottomPosition: '30%',
        /**
         * toast 内容横向排列时的内边距
         * @en Padding when toast content is horizontally aligned
         */
        toastHorizontalPadding: `${getRem(8)} ${getRem(16)}`,
        /**
         * toast 内容横向排列时的图标大小
         * @en Icon size when toast content is horizontally aligned
         */
        toastHorizontalIconSize: getRem(16),
        /**
         * toast 内容横向排列时文字与图标的距离
         * @en Distance between the text and the icon when the toast content is horizontally aligned
         */
        toastHorizontalIconContentGutter: getRem(8),
        /**
         * toast 内容纵向排列时的内边距
         * @en Padding when toast content is vertically aligned
         */
        toastVerticalPadding: getRem(16),
        /**
         * toast 内容纵向排列时的图标大小
         * @en Icon size when toast content is vertically aligned
         */
        toastVerticalIconSize: getRem(24),
        /**
         * toast 内容纵向排列时文字与图标的距离
         * @en Distance between the text and the icon when the toast content is vertically aligned
         */
        toastVerticalIconContentGutter: getRem(8),
        /**
         * loading 主颜色
         * @en Loading primary color
         */
        loadingColor: useGlobal('primaryColor'),
        /**
         * loading type=arc 时底圈的背景色
         * @en Circle background color when loading type=arc
         */
        loadingArcBackgroundColor: useGlobal('lineColor'),
        /**
         * loading type=dot 时圆点大小
         * @en Dot size when loading type=dot
         */
        loadingDotSize: '6PX',
        /**
         * loading type=dot 时圆点间距
         * @en Dot gutter when loading type=dot
         */
        loadingDotGutter: getRem(6),
        /**
         * 选择器选项字体大小
         * @en Picker option font size
         */
        pickerViewFontSize: getRem(16),
        /**
         * 选择器选项高度
         * @en Pickerview option height
         * @override pickerCellHeight
         */
        pickerViewCellHeight: getRem(44),
        /**
         * 选择器容器高度
         * @en Pickerview wrapper height
         * @override pickerWrapperHeight
         */
        pickerViewWrapperHeight: getRem(220),
        /**
         * 选择器上半区蒙层渐变颜色
         * @en Gradient color of the mask layer in the upper half of the Pickerview
         * @override pickerMaskTopBackground
         */
        pickerViewMaskTopBackground:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 65%)',
        /**
         * 选择器下半区蒙层渐变颜色
         * @en Gradient color of the mask layer in the lower half of the Pickerview
         * @override pickerMaskBottomBackground
         */
        pickerViewMaskBottomBackground:
            'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 65%)',
        /**
         * 选择器选中选择框的边框颜色
         * @en Border color of selection bar of Pickerview
         * @override pickerSelectionBorderColor
         */
        pickerViewSelectionBorderColor: useGlobal('lineColor'),
        /**
         * 选择器弹窗阴影值
         * @en Picker wrapper shadow
         */
        pickerWrapperShadow: '0 2PX 8PX rgba(0, 0, 0, .15)',
        /**
         * 选择器弹窗顶部圆角值
         * @en Picker wrapper border radius
         */
        pickerWrapperBorderRadius: getRem(4),
        /**
         * 选择器顶部操作栏高度
         * @en Top action bar height of Picker
         */
        pickerHeaderHeight: getRem(54),
        /**
         * 选择器顶部操作栏背景色
         * @en Top action bar background color of Picker
         */
        pickerHeaderBackground: useGlobal('maskContentBackground'),
        /**
         * 选择器标题文字大小
         * @en Picker title font size
         */
        pickerTitleFontSize: getRem(16),
        /**
         * 选择器标题内边距
         * @en Picker title padding
         */
        pickerTitlePadding: `0 ${getRem(60)}`,
        /**
         * 选择器按钮文字大小
         * @en Picker button font size
         */
        pickerButtonFontSize: getRem(15),
        /**
         * 选择器按钮内边距
         * @en Picker button padding
         */
        pickerButtonPadding: getRem(16),
        /**
         * 选择器左侧按钮字体颜色
         * @en Left button font color of Picker
         */
        pickerLeftBtnColor: useGlobal('primaryColor'),
        /**
         * 选择器右侧按钮字体颜色
         * @en Right button font color of Picker
         */
        pickerRightBtnColor: useGlobal('primaryColor'),
        /**
         * 气泡尖角大小
         * @en Popover arrow size
         * @override popoverArrowWidth
         */
        popoverArrowSize: '9PX',
        /**
         * 气泡尖角圆角大小
         * @en Popover arrow border radius
         */
        popoverArrowBorderRadius: '1PX',
        /**
         * 气泡内容圆角大小
         * @en Popover content border radius
         */
        popoverInnerBorderRadius: '4PX',
        /**
         * 气泡内容透明度
         * @en Popover content opacity
         */
        popoverInnerOpacity: '0.8',
        /**
         * 气泡内容动画曲线
         * @en Popover content animation curve
         */
        popoverInnerTransition: 'opacity .3s ease-in-out',
        /**
         * 白色主题气泡内容透明度
         * @en Content opacity of Popover in white theme
         * @override popoverInnerOpacityWhiteTheme
         */
        popoverInnerWhiteThemeOpacity: '1',
        /**
         * 气泡内容背景阴影值
         * @en Popover content background shadow
         */
        popoverInnerBackgroundShadow: '0 2PX 8PX 0 rgba(0, 0, 0, .1)',
        /**
         * 气泡内容顶部箭头阴影值
         * @en Arrow shadow at the top of Popover content
         */
        popoverInnerTopArrowShadow: '6PX 6PX 8PX 0 rgba(0, 0, 0, .04)',
        /**
         * 气泡内容底部箭头阴影值
         * @en Arrow shadow at the bottom of Popover content
         */
        popoverInnerBottomArrowShadow: '-6PX -6PX 8PX 0 rgba(0, 0, 0, .04)',
        /**
         * 气泡背景
         * @en Popover background color
         */
        popoverBackgroundColor: '#000000',
        /**
         * 白色主题气泡背景
         * @en Background color  of Popover in white theme
         * @override popoverBackgroundColorWhiteTheme
         */
        popoverWhiteThemeBackgroundColor: '#ffffff',
        /**
         * 气泡内容文字颜色
         * @en Popover content font color
         */
        popoverContentColor: useGlobal('maskContentColor'),
        /**
         * 气泡内容区padding
         * @en Popover content padding
         */
        popoverContentPadding: `${getRem(8)} ${getRem(12)}`,
        /**
         * Android设备气泡内容区padding
         * @en Popover content padding in Android
         */
        popoverContentAndroidPadding: `${getRem(10)} ${getRem(12)} ${getRem(6)}`,
        /**
         * 气泡内容文字大小
         * @en Popover content font size
         */
        popoverContentFontSize: getRem(14),
        /**
         * 气泡内容文字行高
         * @en Popover content font line height
         */
        popoverContentLineHeight: getRem(20),
        /**
         * 气泡内容文字颜色
         * @en Popover content font color
         */
        popoverContentColor: '#fff',
        /**
         * 气泡内容禁用态文字颜色
         * @en Popover content disabled font color
         */
        popoverContentDisabledColor: 'rgba(255,255,255,0.3)',
        /**
         * 白色主题气泡内容文字颜色
         * @en Content font color of Popover in white theme
         * @override popoverContentColorWhiteTheme
         */
        popoverContentWhiteThemeColor: useGlobal('fontColor'),
        /**
         * 白色主题气泡内容禁用态文字颜色
         * @en Content disabled font color of Popover in white theme
         * @override popoverContentDisabledColorWhiteTheme
         */
        popoverContentWhiteThemeDisabledColor: useGlobal('disabledColor'),
        /**
         * 气泡内容border颜色
         * @en Popover content border color
         */
        popoverContentBorderColor: 'rgba(247, 248, 250, 0.1)',
        /**
         * 白色主题气泡内容border颜色
         * @en Content border color of Popover in white theme
         * @override popoverContentBorderColorWhiteTheme
         */
        popoverContentWhiteThemeBorderColor: useGlobal('lineColor'),
        /**
         * 气泡阴影颜色
         * @en Popover shadow color
         */
        popoverShadowColor: 'rgba(0,0,0,0.1)',
        /**
         * 气泡菜单内容padding
         * @en PopoverMenu content padding
         */
        popoverMenuContentPadding: `0 ${getRem(12)}`,
        /**
         * 白色主题气泡菜单的icon颜色
         * @en Icon color of PopoverMenu in white theme
         * @override popoverMenuIconColorWhiteTheme
         */
        popoverMenuIconWhiteThemeColor: useGlobal('subFontColor'),
        /**
         * 气泡菜单选中态背景色
         * @en Selected option background color of PopoverMenu
         */
        popoverMenuActiveBackground: '#242425',
        /**
         * 白色主题气泡菜单选中态背景色
         * @en Selected option background color of PopoverMenu in white theme
         * @override popoverMenuActiveBackgroundWhiteTheme
         */
        popoverMenuActiveWhiteThemeBackground: '#F7F8FA',
        /**
         * 横向菜单气泡最大宽度
         * @en Horizontal Popover menu maximum width
         */
        popoverHorizontalMenuMaxWidth: getRem(288),
        /**
         * 横向菜单项大小
         * @en Horizontal Popover menu item size
         */
        popoverHorizontalMenuItemSize: getRem(72),
        /**
         * 横向菜单项padding
         * @en Horizontal Popover menu item padding
         */
        popoverHorizontalMenuItemPadding: `${getRem(12)} ${getRem(0)}`,
        /**
         * 横向菜单项margin
         * @en Horizontal Popover menu item margin
         */
        popoverHorizontalMenuIconMargin: `${getRem(0)} ${getRem(0)} ${getRem(8)} ${getRem(0)}`,
        /**
         * 关闭图标左侧的分割线颜色
         * @en Divider color to the left of close icon of Popover
         */
        popoverIconDividerColor: 'rgba(255, 255, 255, 0.3)',
        /**
         * 关闭图标左侧的分割线高度
         * @en Divider height to the left of close icon of Popover
         */
        popoverIconDividerHeight: getRem(12),
        /**
         * 关闭icon大小
         * @en Popover close icon size
         */
        popoverIconSize: getRem(16),
        /**
         * 关闭icon padding
         * @en Popover close icon padding
         */
        popoverIconPadding: `${getRem(0)} ${getRem(10)} ${getRem(0)} ${getRem(11)}`,
        /**
         * textSuffix 元素 padding
         * @en Popover textSuffix element padding
         */
        popoverTextSuffixPadding: `${getRem(0)} ${getRem(12)} ${getRem(0)} ${getRem(0)}`,
        /**
         * 气泡遮罩背景色
         * @en Popover mask background color
         */
        popoverMaskBackground: 'rgba(0, 0, 0, .6)',
        /**
         * 加载更多文字大小
         * @en Load more font size
         */
        loadMoreFontSize: getRem(14),
        /**
         * 加载更多文字颜色
         * @en Load more font color
         */
        loadMoreTextColor: useGlobal('subInfoFontColor'),
        /**
         * 单元格主体文字颜色
         * @en Cell body font color
         */
        cellTextColor: useGlobal('subInfoFontColor'),
        /**
         * 单元格标签文字颜色
         * @en Cell label font color
         */
        cellLabelColor: useGlobal('fontColor'),
        /**
         * 单元格标签图标颜色
         * @en Cell label icon color
         */
        cellLabelIconColor: useGlobal('subFontColor'),
        /**
         * 单元格标签描述文字颜色
         * @en Cell description font color
         */
        cellDescColor: useGlobal('subInfoFontColor'),
        /**
         * 单元格标签描述文字大小
         * @en Cell description font size
         */
        cellDescFontSize: getRem(14),
        /**
         * 单元格标签描述文字顶部间距
         * @en Cell description margin top
         */
        cellDescMarginTop: getRem(2),
        /**
         * 单元格内容文字大小
         * @en Cell content font size
         */
        cellContentFontSize: getRem(14),
        /**
         * 单元格右箭头图标颜色
         * @en  Cell right arrow icon color
         */
        cellArrowColor: useGlobal('disabledColor'),
        /**
         * 单元格右箭头图标左侧间距
         * @en  Left space of cell right arrow icon
         */
        cellArrowGutter: getRem(8),
        /**
         * 单元格右箭头自定义图标大小
         * @en Cell right arrow custom icon size
         */
        cellArrowFontSize: getRem(12),
        /**
         * 单元格背景色
         * @en Cell background color
         */
        cellBackgroundColor: useGlobal('backgroundColor'),
        /**
         * 单元格标签文字大小
         * @en Cell font size
         */
        cellFontSize: getRem(16),
        /**
         * 单元格两侧横向间距
         * @en Horizontal padding on both sides of cell
         */
        cellHorizontalPadding: getRem(16),
        /**
         * 单元格基础样式高度
         * @en Cell height
         */
        cellItemHeight: getRem(54),
        /**
         * 单元格有描述文字时的高度
         * @en Cell height with description
         */
        cellItemHasDescHeight: getRem(74),
        /**
         * 单元格标签文字右侧间距
         * @en Gutter to the right of cell label
         */
        cellLabelGutter: getRem(24),
        /**
         * 单元格标签图标右侧间距
         * @en Gutter to the right of cell label icon
         */
        cellLabelIconGutter: getRem(12),
        /**
         * 单元格标签图标大小
         * @en Cell label icon size
         */
        cellLabelIconFontSize: getRem(20),
        /**
         * 单元格头部和尾部说明文字大小
         * @en Head and tail description font size of Cell
         */
        cellExtraFontSize: getRem(14),
        /**
         * 单元格头部和尾部说明文字行高
         * @en Head and tail description line height of Cell
         */
        cellExtraLineHeight: getRem(20),
        /**
         * 单元格头部和尾部说明内边距
         * @en Head and tail description padding of Cell
         */
        cellExtraPadding: `${getRem(12)} ${getRem(16)}`,

        /**
         * tag 文字大小
         * @en Tag text size
         */
        tagFontSize: getRem(12),
        /**
         * tag 内部图标大小
         * @en Tag icon size
         */
        tagIconFontSize: getRem(12),
        /**
         * tag 内部图标右外边距
         * @en Tag icon margin right
         */
        tagIconMarginRight: getRem(2),
        /**
         * tag 内部关闭图标左外边距
         * @en Tag close icon margin left
         */
        tagIconCloseMarginLeft: getRem(4),
        /**
         * tag 小尺寸高度
         * @en Tag height in small size
         */
        tagSmallSizeHeight: getRem(18),
        /**
         * tag 小尺寸内边距
         * @en Tag padding in small size
         */
        tagSmallSizePadding: getRem(4),
        /**
         * tag 中尺寸高度
         * @en Tag height in medium size
         */
        tagMediumSizeHeight: getRem(20),
        /**
         * tag 中尺寸内边距
         * @en Tag padding in medium size
         */
        tagMediumSizePadding: getRem(4),
        /**
         * tag 大尺寸高度
         * @en Tag height in large size
         */
        tagLargeSizeHeight: getRem(24),
        /**
         * tag 大尺寸内边距
         * @en Tag padding in large size
         */
        tagLargeSizePadding: getRem(6),
        /**
         * tag 圆角标签内边距
         * @en Filleted tag padding
         */
        tagFilletedPadding: getRem(8),
        /**
         * tag 圆角大小
         * @en Tag border radius
         */
        tagBorderRadius: '2PX',
        /**
         * tag 基础字体颜色
         * @en Tag primary color
         */
        tagPrimaryColor: useGlobal('primaryColor'),
        /**
         * tag 基础背景色
         * @en Tag primary background color
         */
        tagPrimaryBackgroundColor: '#e8f3ff',
        /**
         * tag 基础边框色
         * @en Tag primary border color
         */
        tagPrimaryBorderColor: useGlobal('primaryColor'),
        /**
         * tag 空心标签字体颜色
         * @en Hollow tag font color
         */
        tagHollowColor: useGlobal('primaryColor'),
        /**
         * tag 空心标签边框颜色
         * @en Hollow tag border color
         */
        tagHollowBorderColor: useGlobal('primaryColor'),
        /**
         * tag 实心标签字体颜色
         * @en Solid tag font color
         */
        tagSolidColor: '#ffffff',
        /**
         * tag 实心标签背景色
         * @en Solid tag background color
         */
        tagSolidBackgroundColor: useGlobal('primaryColor'),
        /**
         * tag 实心标签边框颜色
         * @en Solid tag border color
         */
        tagSolidBorderColor: useGlobal('primaryColor'),
        /**
         * tag 标签列表水平间距
         * @en Tag list horizontal gutter
         */
        tagListHorizontalGutter: getRem(8),
        /**
         * tag 标签列表垂直间距
         * @en Tag list vertical gutter
         */
        tagListVerticalGutter: '0',
        /**
         * tag 标签列表添加标签按钮边框颜色
         * @en Add button border color of tag list
         */
        tagListAddBorderColor: '#c2c6cc',
        /**
         * tag 标签列表添加标签按钮背景色
         * @en Add button background color of tag list
         */
        tagListAddBackground: '#fafbfc',
        /**
         * tag 标签列表添加标签按钮文字颜色
         * @en Add button font color of tag list
         */
        tagListAddColor: '#939aa3',

        /**
         * 图片预览蒙层背景色
         * @en ImagePreview mask background color
         */
        imagePreviewMaskBackground: 'rgba(0, 0, 0, 0.9)',
        /**
         * 图片预览指示器文字大小
         * @en ImagePreview indicator font size
         */
        imagePreviewIndicatorFontSize: getRem(14),
        /**
         * 图片预览指示器内边距
         * @en ImagePreview indicator padding
         */
        imagePreviewIndicatorPadding: `${getRem(12)} ${getRem(20)}`,
        /**
         * 图片预览指示器背景色
         *  @en ImagePreview indicator background color
         */
        imagePreviewIndicatorBackground:
            'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3))',
        /**
         * 图片预览小图放大时的动画曲线
         * @en Animation curve when ImagePreview thumbnail is enlarged
         */
        imagePreviewThumbTransition: 'all cubic-bezier(0.34, 0.69, 0.1, 1)',

        /**
         * dropdownMenu的选择框每一项的padding
         * @en Menu item padding of DropdownMenu
         */
        dropdownMenuPadding: getRem(15),
        /**
         * dropdownMenu的选择框每一项的字体大小
         * @en Menu item font size of DropdownMenu
         */
        dropdownMenuFontSize: getRem(16),
        /**
         * dropdownMenu的选择框每一项的字体行高
         * @en Menu item font line height of DropdownMenu
         */
        dropdownMenuLineHeight: getRem(22),
        /**
         * dropdownMenu的选择框每一项的字体颜色
         * @en Menu item font color of DropdownMenu
         */
        dropdownMenuColor: useGlobal('fontColor'),
        /**
         * dropdownMenu的选择框被选中项的字体颜色
         * @en Font color of the selected menu item in the DropdownMenu
         */
        dropdownMenuSelectedColor: useGlobal('primaryColor'),
        /**
         * dropdownMenu的选择框被禁用项的字体颜色
         * @en Font color of the disabled menu item in the DropdownMenu
         */
        dropdownMenuDisabledColor: useGlobal('disabledColor'),
        /**
         * dropdownMenu的选择框中选择指引（选择项名称）的字体颜色
         * @en Selection tip font color of the menu item in the DropdownMenu
         */
        dropdownMenuTipColor: '#707070',
        /**
         * dropdownMenu的选择框中选择指引（选择项名称）的最小宽度
         * @en Selection tip minimum width of the menu item in the DropdownMenu
         */
        dropdownMenuTipMinWidth: getRem(18),
        /**
         * dropdownMenu的选择框中选择指引（选择项名称）的右侧padding
         * @en Selection tip right padding of the menu item in the DropdownMenu
         */
        dropdownMenuTipPaddingRight: getRem(16),
        /**
         * dropdownMenu的选择框中选择项的最大宽度
         * @en Maximum width of the menu item in the DropdownMenu
         */
        dropdownMenuLabelMaxWidth: getRem(96),
        /**
         * dropdownMenu的选择框中图标的大小（宽高）
         * @en DropdownMenu icon size
         */
        dropdownMenuIconSize: '12PX',
        /**
         * dropdownMenu的选择框中图标颜色
         * @en DropdownMenu icon color
         */
        dropdownMenuIconColor: useGlobal('disabledColor'),
        /**
         * dropdownMenu的选择框中图标被选中时的颜色
         * @en DropdownMenu selected icon color
         */
        dropdownMenuIconSelectedColor: useGlobal('primaryColor'),
        /**
         * dropdownMenu的选择框中图标的左侧margin
         * @en Left margin of the icon in the DropdownMenu
         */
        dropdownMenuIconMarginLeft: '4PX',
        /**
         * dropdown的弹出框的背景颜色
         * @en  Dropdown options background color
         */
        dropdownOptionsBackgroundColor: '#ffffff',
        /**
         * dropdown的弹出框中选项的padding
         * @en Dropdown options padding
         */
        dropdownOptionsItemPadding: `${getRem(16)}`,
        /**
         * dropdown的弹出框中选项的字体大小
         * @en Dropdown option itme font size
         */
        dropdownOptionsItemFontSize: getRem(16),
        /**
         * dropdown的弹出框中选项的字体行高
         * @en Dropdown option itme font line height
         */
        dropdownOptionsItemLineHeight: getRem(22),
        /**
         * dropdown的弹出框中选项的字体颜色
         * @en Dropdown options item font color
         */
        dropdownOptionsItemColor: useGlobal('fontColor'),
        /**
         * dropdown的弹出框中选项被选中时的字体颜色
         * @en Dropdown selected options item font color
         */
        dropdownOptionsItemSelectedColor: useGlobal('primaryColor'),
        /**
         * dropdown的弹出框中选项被禁选时的字体颜色
         * @en Dropdown disabled options item font color
         */
        dropdownOptionsItemDisabledColor: useGlobal('disabledColor'),
        /**
         * dropdown的弹出框中选项图标绝对定位时，距离右侧的距离
         * @en The right distance of Dropdown options item whose icon is absolutely positioned
         */
        dropdownOptionsItemIconRight: getRem(16),
        /**
         * dropdown的弹出框中mask的背景颜色
         * @en Dropdown mask background color
         */
        dropdownMaskBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        /**
         * dropdown的弹出框中多列样式下选项之间的间距
         * @en Gutter between options in multi-column Dropdown
         */
        dropdownMultiRowsOptionsGutter: getRem(12),
        /**
         * dropdown的弹出框中多列样式下选项的内边距
         * @en Options item padding in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemPadding: `${getRem(8)}`,
        /**
         * dropdown的弹出框中多列样式下选项的字体大小
         * @en Options font size in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemFontSize: getRem(14),
        /**
         * dropdown的弹出框中多列样式下选项的字体行高
         * @en Options item font line height in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemLineHeight: getRem(20),
        /**
         * dropdown的弹出框中多列样式下选项的字体颜色
         * @en Options item font color in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemColor: useGlobal('subFontColor'),
        /**
         * dropdown的弹出框中多列样式下选项的圆角值
         * @en Options item border radius in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemBorderRadius: '2PX',
        /**
         * dropdown的弹出框中多列样式下选项的背景色
         * @en Options item background color in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemBackground: '#f7f8fa',
        /**
         * dropdown的弹出框中多列样式下选项被选中时的背景色
         * @en Selected options item background color in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemSelectedBackground: '#E8F3FF',
        /**
         * dropdown的弹出框中多列样式下选项被选中时的字体颜色
         * @en Selected options item font color in multi-column Dropdown
         */
        dropdownMultiRowsOptionsItemSelectedColor: useGlobal('primaryColor'),
        /**
         * dropdown的弹出框中多列样式下容器的内边距
         * @en Options container padding in multi-column Dropdown
         */
        dropdownMultiRowsOptionsContainerPadding: getRem(16),
        /**
         * dropdown的弹出框中多列样式下容器的外边距
         * @en Options container margin in multi-column Dropdown
         */
        dropdownMultiRowsOptionsContainerMargin: `0 ${getRem(-12)} ${getRem(-12)} 0`,
        /**
         * collapse 禁用时header的字体颜色
         * @en Header font color of disabled collapse
         */
        collapseDisabledHeaderColor: useGlobal('disabledColor'),
        /**
         * collapse header的背景颜色
         * @en Collapse header background color
         */
        collapseHeaderBackground: useGlobal('backgroundColor'),
        /**
         * collapse header的高度
         * @en Collapse header height
         */
        collapseHeaderHeight: getRem(54),
        /**
         * collapse header的字体大小
         * @en Collapse header font size
         */
        collapseHeaderFontSize: getRem(16),
        /**
         * collapse header的左侧的margin
         * @en Collapse header left margin
         */
        collapseHeaderMarginLeft: getRem(16),
        /**
         * collapse header的内边距
         * @en Collapse header padding
         */
        collapseHeaderPadding: `${getRem(16)} ${getRem(16)} ${getRem(16)} 0`,
        /**
         * collapse header的字体颜色
         * @en Collapse header font color
         */
        collapseHeaderColor: useGlobal('fontColor'),
        /**
         * collapse header的字体行高
         * @en Collapse header font line height
         */
        collapseHeaderLineHeight: getRem(22),
        /**
         * collapse header的图标的颜色
         * @en Collapse header icon color
         */
        collapseHeaderIconColor: useGlobal('disabledColor'),
        /**
         * collapse content（面板）的内边距
         * @en Collapse content padding
         */
        collapseContentPadding: `${getRem(12)} ${getRem(16)}`,
        /**
         * collapse content（面板）的字体大小
         * @en Collapse content font size
         */
        collapseContentFontSize: getRem(14),
        /**
         * collapse content（面板）的字体颜色
         * @en Collapse content font color
         */
        collapseContentColor: useGlobal('subInfoFontColor'),
        /**
         * collapse content（面板）的字体行高
         * @en Collapse content font line height
         */
        collapseContentLineHeight: getRem(22),
        /**
         * 下拉刷新组件状态文案内容区背景色
         * @en PullRefresh label background color
         * @override pullRefreshWrapperBackgroundColor
         */
        pullRefreshLabelBackgroundColor: '#f7f8fa',
        /**
         * 下拉刷新组件状态文案字体大小
         * @en PullRefresh label font size
         */
        pullRefreshLabelFontSize: getRem(12),
        /**
         * 下拉刷新组件容器背景色
         * @en PullRefresh content background color
         */
        pullRefreshContentBackgroundColor: useGlobal('backgroundColor'),
        /**
         * 下拉刷新组件状态文案字体颜色
         * @en PullRefresh label font color
         */
        pullRefreshLabelTextColor: '#787878',
        /**
         * 下拉刷组件 loading 图标颜色
         * @en PullRefresh loading icon color
         */
        pullRefreshLabelLoadingColor: useGlobal('subInfoFontColor'),
        /**
         * slider 组件的内边距
         * @en Slider padding
         */
        sliderPadding: `${getRem(11)} ${getRem(16)}`,
        /**
         * slider 可点区域两侧留白边距
         * @en Slider mask padding
         */
        sliderMaskPadding: getRem(15),
        /**
         * slider 有标记时的底部内边距
         * @en Bottom padding of Slider with mask
         */
        sliderHasMarkPaddingBottom: getRem(35),
        /**
         * slider 两侧标注文字大小
         * @en The size of the text on both sides of the slider
         */
        sliderLabelFontSize: getRem(16),
        /**
         * slider 两侧标注与滑动条的间距
         * @en The distance between the labels on both sides of the slider and the slider
         */
        sliderLabelGutter: getRem(12),
        /**
         * slider 标记文案的字体颜色
         * @en Slider text font Color
         */
        sliderTextColor: useGlobal('subInfoFontColor'),
        /**
         * slider 线条颜色
         * @en Slider line color
         */
        sliderLineColor: useGlobal('lineColor'),
        /**
         * slider 线条的边框半径（首尾）
         * @en Slider line border radius
         */
        sliderLineBorderRadius: getRem(4),
        /**
         * slider 被选中时的线条颜色
         * @en Active slider line Color
         */
        sliderLineActivatedColor: useGlobal('primaryColor'),
        /** slider 被禁用时的线条颜色
         * @en Disabled slider line Color
         */
        sliderLineDisabledColor: useGlobal('primaryDisabledColor'),
        /**
         * slider 滑块的宽度
         * @en Slider button width
         */
        sliderThumbWidth: getRem(24),
        /**
         * slider 滑块的高度
         * @en Slider button height
         */
        sliderThumbHeight: getRem(24),
        /**
         * slider 滑块的边框半径
         * @en Slider button border radius
         */
        sliderThumbBorderRadius: '50%',
        /**
         * slider 滑块的阴影
         * @en Slider button box shadow
         */
        sliderThumbBoxShadow: '0 2PX 8PX rgba(0, 0, 0, .1)',
        /**
         * slider 滑块的背景色
         * @en Slider button background
         * @override sliderThumbColor
         */
        sliderThumbBackground: useGlobal('backgroundColor'),
        /**
         * slider 气泡箭头大小
         * @en Slider popover arrow size
         */
        sliderPopoverArrowSize: '6PX',
        /**
         * slider 气泡内容字体大小
         * @en Slider popover content font size
         */
        sliderPopoverFontSize: getRem(12),
        /**
         * slider 气泡内容字体行高
         * @en Slider popover content font line height
         */
        sliderPopoverLineHeight: getRem(17),
        /**
         * slider 气泡底部的外边距（垂直时是左外边距）
         * @en Bottom margin of slider popover  (left margin when vertical)
         */
        sliderPopoverGutter: getRem(14),
        /**
         * slider 滑动条节点的宽度
         * @en Slider mark width
         */
        sliderMarkWidth: '6PX',
        /**
         * slider 滑动条节点的高度
         * @en Slider mark height
         */
        sliderMarkHeight: '6PX',
        /**
         * slider 滑动条节点的边框半径
         * @en Slider mark border radius
         */
        sliderMarkBorderRadius: '50%',
        /**
         * slider 滑动条节点文案的字体大小
         * @en Slider mark label font size
         */
        sliderMarkLabelFontSize: getRem(14),
        /**
         * slider 滑动条节点文案的字体行高
         * @en Slider mark label font line height
         */
        sliderMarkLabelLineHeight: getRem(20),
        /**
         * slider 横向滑动条节点文案距离节点的顶部距离
         * @en Label distance  of horizontal slider from the top of the mark
         */
        sliderHorizontalMarkLabelTop: getRem(19),
        /**
         * slider 纵向滑动条节点文案距离节点的右距离
         * @en Label distance  of horizoverticalntal slider from the right of the mark
         */
        sliderVerticalMarkLabelRight: getRem(13),
        /**
         * swipeLoad 滑动区域的背景色
         * @en Background color of SwipeLoad loading area
         * @override swipeLoadLabelColor
         */
        swipeLoadLabelBackground: '#f8f8f8',
        /**
         * swipeLoad 滑动区域的边框半径
         * @en Border radius of SwipeLoad loading area
         */
        swipeLoadLabelBorderRadius: '50%',
        /**
         * swipeLoad 加载提示区域的左外边距
         * @en Left margin of SwipeLoad loading area
         */
        swipeLoadLabelTextMarginLeft: getRem(20),
        /**
         * swipeLoad 加载提示区域的宽度
         *  @en SwipeLoad loading area width
         */
        swipeLoadLabelTextWidth: getRem(20),
        /**
         * swipeLoad 加载提示区域的字体颜色
         * @en Font color of SwipeLoad loading area
         */
        swipeLoadLabelTextColor: useGlobal('fontColor'),
        /**
         * swipeLoad 加载提示区域的字体大小
         * @en Font size of SwipeLoad loading area
         */
        swipeLoadLabelTextFontSize: getRem(12),

        /**
         * 通知栏外层容器内边距
         * @en NoticeBar wrapper padding
         */
        noticeBarWrapperPadding: `0 ${getRem(16)}`,
        /**
         * 通知栏背景色
         * @en NoticeBar background
         */
        noticeBarBackground: '#fff7e8',
        /**
         * 通知栏文字颜色
         * @en NoticeBar font color
         */
        noticeBarColor: useGlobal('warningColor'),
        /**
         * 通知栏文字滚动时两侧渐变色
         * @en The gradient color on both sides of the NoticeBar text when scrolling
         */
        noticeBarGradientBackground: 'linear-gradient(to right, #fff7e8, rgba(255, 247, 232, 0))',
        /**
         * 通知栏在可换行时的文字行高
         * @en NoticeBar line height
         */
        noticeBarLineHeight: getRem(20),
        /**
         * 通知栏文字大小
         * @en NoticeBar font size
         */
        noticeBarTextFontSize: getRem(14),
        /**
         * 通知栏图标大小
         * @en NoticeBar icon size
         */
        noticeBarIconFontSize: '16PX',
        /**
         * 通知栏不可换行时所占高度
         * @en NoticeBar single-line text height
         */
        noticeBarSingleLineHeight: getRem(36),
        /**
         * 通知栏内容与容器的纵向间距
         * @en Vertical padding between the content and the wrapper of NoticeBar
         */
        noticeBarVerticalPadding: getRem(8),
        /**
         * 通知栏内容之间的横向间距
         *  @en Horizontal padding between the content and the wrapper of NoticeBar
         */
        noticeBarHorizontalPadding: getRem(8),
        /**
         * 通知栏两侧渐变的宽度
         * @en Gradient width on both sides of NoticeBar
         */
        noticeBarGradientWidth: getRem(8),

        /**
         * notify 成功通知背景色
         * @en Background color of success notify
         */
        notifySuccessBackground: '#00B42A',
        /**
         * notify 错误通知背景色
         * @en Background color of error notify
         */
        notifyErrorBackground: useGlobal('dangerColor'),
        /**
         * notify 警告通知背景色
         * @en Background color of wran notify
         */
        notifyWarnBackground: useGlobal('warningColor'),
        /**
         * notify 字体颜色
         * @en Font color of notify
         */
        notifyFontColor: '#ffffff',
        /**
         * notify info 类型样式下字体颜色
         * @en Font color of info notify
         */
        notifyInfoFontColor: useGlobal('primaryColor'),
        /**
         * notify 字体大小
         * @en Font size of notify
         */
        notifyFontSize: getRem(14),
        /**
         * notify 内容最小高度
         * @en Min height of notify
         */
        notifyMinHeight: getRem(36),

        /**
         * steps 上下内边距
         * @en Steps vertical padding
         */
        stepsPadding: `${getRem(16)} 0`,
        /**
         * steps 分割线圆角值
         * @en Border radius of steps dividing
         */
        stepsTailBorderRadius: '2PX',
        /**
         * steps 水平分割线与图标中心点的距离
         * @en The distance between the horizontal dividing line and the center point of the icon
         */
        stepsTailHorizontalGutter: '18PX',
        /**
         * steps 垂直分割线与图标中心点的距离
         * @en The distance between the vertical dividing line and the center point of the icon
         */
        stepsTailVerticalGutter: '14PX',
        /**
         * steps 水平分割线左右间距
         * @en Left and right spacing of the horizontal dividing line of Steps
         */
        stepsTailHorizontalPadding: `0 ${useGlobal('stepsTailHorizontalGutter')}`,
        /**
         * steps 垂直分割线上下间距
         * @en Left and right spacing of the vertical dividing line of Steps
         */
        stepsTailVerticalPadding: `${useGlobal('stepsTailVerticalGutter')} 0`,
        /**
         * steps 水平分割线的向右偏移距离，一般是 stepsIconHeight 值的一半
         * @en The offset distance to the right of the horizontal dividing line of steps, generally half the value of stepsIconHeight
         */
        stepsTailHorizontalLeft: '9PX',
        /**
         * steps 垂直分割线的向下偏移距离，一般是 stepsIconHeight 值的一半
         * @en The offset distance to the bottom of the vertical dividing line of steps, generally half the value of stepsIconHeight
         */
        stepsTailVerticalTop: '9PX',
        /**
         * steps 步骤分割线默认粗细
         * @en Steps dividing line thickness
         */
        stepsTailStandardSize: '1PX',
        /**
         * steps 步骤分割线默认颜色
         * @en Steps dividing line color
         */
        stepsTailStandardBackground: useGlobal('lineColor'),
        /**
         * steps 步骤分割线完成态颜色
         * @en Steps dividing line color in finish state
         */
        stepsTailFinishBackground: useGlobal('primaryColor'),
        /**
         * steps 无文字步骤背景色
         * @en Non-text steps background color in finish state
         */
        stepsFinishIconNumBackground: '#E8F3FF',
        /**
         * steps 无文字进行中步骤背景色
         * @en Non-text steps background color in processing state
         */
        stepsProcessIconNumBackground: useGlobal('primaryColor'),
        /**
         * steps 无文字等待中步骤背景色
         * @en Non-text steps background color in waiting state
         */
        stepsWaitIconNumBackground: '#F2F3F5',
        /**
         * steps 无文字错误步骤背景色
         * @en Non-text steps background color in error state
         */
        stepsErrorIconNumBackground: useGlobal('dangerColor'),
        /**
         * steps 步骤默认图标大小
         * @en Steps icon size
         */
        stepsIconSvgStandardFontSize: '10PX',
        /**
         * steps 完成步骤图标颜色
         * @en Finish icon color of Steps
         */
        stepsFinishIconSvgColor: useGlobal('primaryColor'),
        /**
         * steps 错误步骤图标颜色
         * @en Error icon color of Steps
         */
        stepsErrorIconSvgColor: '#FFFFFF',
        /**
         * steps 错误步骤图标大小
         * @en Error icon size of Steps
         */
        stepsErrorIconSvgFontSize: '8PX',
        /**
         * steps 无文字步骤字体大小
         * @en Non-text steps font size
         */
        stepsIconNumFontSize: '12PX',
        /**
         * steps 无文字步骤字体行高
         * @en Non-text steps font line height
         */
        stepsIconNumLineHeight: '18PX',
        /**
         * steps 默认步骤字体颜色
         * @en Steps font color
         */
        stepsIconNumColor: useGlobal('subInfoFontColor'),
        /**
         * steps 进行中步骤字体颜色
         * @en Steps font color in processing state
         */
        stepsProcessIconNumColor: '#FFFFFF',
        /**
         * steps 迷你版完成步骤边框颜色
         * @en Mini Steps border color in finish state
         */
        stepsFinishDotBorderColor: useGlobal('primaryColor'),
        /**
         * steps 迷你版进行中步骤背景色
         * @en Mini Steps background color in processing state
         */
        stepsProcessDotBackground: useGlobal('primaryColor'),
        /**
         * steps 迷你版等待中步骤边框颜色
         * @en Mini Steps border color in waiting state
         */
        stepsWaitDotBorderColor: useGlobal('subInfoFontColor'),
        /**
         * steps 完成步骤标题颜色
         * @en Steps title color in finish state
         */
        stepsFinishTitleColor: useGlobal('fontColor'),
        /**
         * steps 错误步骤标题颜色
         * @en Steps title color in error state
         */
        stepsErrorTitleColor: useGlobal('dangerColor'),
        /**
         * steps 进行中步骤标题颜色
         * @en Steps title color in processing state
         */
        stepsProcessTitleColor: useGlobal('primaryColor'),
        /**
         * steps 等待中步骤标题颜色
         * @en Steps title color in waiting state
         */
        stepsWaitTitleColor: useGlobal('subInfoFontColor'),
        /**
         * steps 步骤默认描述文字颜色
         * @en Steps description font color
         */
        stepsDescriptionColor: useGlobal('subFontColor'),
        /**
         * steps 等待中步骤描述文字颜色
         * @en Steps description font color in waiting state
         */
        stepsWaitDescriptionColor: useGlobal('subInfoFontColor'),
        /**
         * steps 步骤图标宽度
         * @en Steps icon width
         */
        stepsIconWidth: '18PX',
        /**
         * steps 步骤图标高度
         * @en Steps icon height
         */
        stepsIconHeight: '18PX',
        /**
         * steps 迷你版圆点宽度
         * @en Dot width of mini Steps
         */
        stepsDotWidth: '8PX',
        /**
         * steps 迷你版圆点高度
         * @en Dot height of mini Steps
         */
        stepsDotHeight: '8PX',
        /**
         * steps 迷你版圆点边框宽度
         * @en Dot border width of mini Steps
         */
        stepsDotBorderWidth: '1.5PX',
        /**
         * steps 横向步骤条内容区上外边距
         * @en Horizontal Steps content top margin
         */
        stepsHorizontalContentMarginTop: getRem(5),
        /**
         * steps 竖向步骤条内容左外边距
         * @en Vertical Steps content left margin
         */
        stepsVerticalContentMarginLeft: getRem(13),
        /**
         * steps 竖向步骤条内容下内边距
         * @en Vertical Steps content bottom padding
         */
        stepsVerticalContentPaddingBottom: getRem(25),
        /**
         * steps 标题文字大小
         * @en Steps title font size
         */
        stepsTitleFontSize: getRem(14),
        /**
         * steps 标题文字行高
         * @en Steps title font line height
         */
        stepsTitleLineHeight: getRem(20),
        /**
         * steps 描述文字大小
         * @en Steps description font size
         */
        stepsDescriptionFontSize: getRem(12),
        /**
         * steps 描述文字行高
         * @en Steps description font line height
         */
        stepsDescriptionLineHeight: getRem(18),
        /**
         * steps 描述文字外边距
         * @en Steps description top margin
         */
        stepsDescriptionMarginTop: getRem(2),
        /**
         * steps 竖向步骤条下内边距
         * @en Vertical steps bottom padding
         */
        stepsVerticalPaddingBottom: '0',
        /**
         * steps 竖向步骤条左内边距
         * @en Vertical steps left padding
         */
        stepsVerticalPaddingLeft: getRem(20),
        /**
         * steps mixin 函数进行中步骤自定义图标颜色
         * @en Custom icon color of Steps in processing state
         */
        stepsProcessWithConfigItemIconColor: '#FFFFFF',
        /**
         * SwipeAction 菜单打开时的动画曲线
         */
        swipeActionOpenTransition: 'cubic-bezier(0.2, 0.8, 0.32, 1.28)',
        /**
         * SwipeAction 菜单关闭时的动画曲线
         */
        swipeActionCloseTransition: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
        /**
         * SwipeAction 菜单的内边距
         */
        swipeActionInfoPadding: getRem(16),
        /**
         * swipeAction 菜单弹性效果预留底部色块宽度
         */
        swipeActionInfoBounceBuffer: getRem(30),
        /**
         * SwipeAction 文字大小
         */
        swipeActionTextFontSize: getRem(16),
        /**
         * SwipeAction 文字行高
         */
        swipeActionTextLineHeight: getRem(22),
        /**
         * SwipeAction 文字背景色
         */
        swipeActionTextColor: '#ffffff',
        /**
         * swipeAction Icon 宽
         */
        swipeActionIconWidth: getRem(20),
        /**
         * swipeAction Icon 高
         */
        swipeActionIconHeight: getRem(20),
        /**
         * swipeAction Icon的右边距
         */
        swipeActionIconMarginRight: getRem(4),
        /**
         * 徽标背景色
         * @en Badge background color
         */
        badgeBackgroundColor: useGlobal('dangerColor'),
        /**
         * 徽标文字颜色
         * @en Badge font color
         */
        badgeTextColor: '#FFFFFF',
        /**
         * 徽标字体大小
         * @en Badge font size
         */
        badgeFontSize: '12PX',
        /**
         * 徽标无文字小圆点样式大小
         * @en Badge dot Width
         */
        badgeDotWidth: '8PX',
        /**
         * 徽标带文字样式的高度及最小宽度
         * @en Height and minimum width of Badge with text
         */
        badgeTextWidth: '16PX',
        /**
         * 徽标带文字样式横向内边距
         * @en Horizontal padding of Badge with text
         */
        badgeTextPadding: '4PX',
        /**
         * 徽标带文字样式相对于右上角的缩进
         * @en indent relative to top right of Badge with text
         */
        badgeTextDeviation: '-8PX',
        /**
         * 徽标无文字小圆点样式相对于右上角的缩进
         * @en indent relative to right of Badge with text
         */
        badgeDotDeviation: '-4PX',
        /**
         * 徽标带文字样式的圆角值
         * @en Border radius of Badge with text
         */
        badgeBorderRadius: '100PX',
        /**
         * 徽标带边框时的边框颜色
         * @en Border color of Badge with border
         */
        badgeBorderColor: '#FFFFFF',
        /** 环形进度条 文字大小
         * @en CircleProgress font size
         */
        circleProgressFontSize: getRem(14),
        /**
         * 环形进度条 进度条颜色
         * @en CircleProgress progress bar color
         */
        circleProgressPrimaryColor: useGlobal('primaryColor'),
        /**
         * 环形进度条 轨道颜色
         * @en CircleProgress track color
         */
        circleProgressTrackColor: '#F2F3F5',
        /**
         * 环形进度条 不可用状态进度条颜色
         * @en CircleProgress disabled track color
         */
        circleProgressDisabledColor: useGlobal('disabledColor'),
        /**
         * 环形进度条 微型进度条轨道颜色
         * @en Mini CircleProgress track color
         */
        circleProgressMiniTrackColor: '#E8F3FF',
        /**
         * 环形进度条 自定义进度条颜色渐变开始的颜色
         * @en Start gradient color of CircleProgress track color
         */
        circleProgressLinearGradientStartColor: '#4776E6',
        /**
         * 环形进度条 自定义进度条颜色渐变结束的颜色
         *  @en End gradient color of CircleProgress track color
         */
        circleProgressLinearGradientEndColor: '#14CAFF',
        /**
         * 环形进度条 自定义进度条文字颜色
         * @en CircleProgress font color
         */
        circleProgressLinearGradientTextColor: '#3C89EC',
        /**
         * 进度条 进度条颜色
         * @en Progress bar color
         */
        progressPrimaryColor: useGlobal('primaryColor'),
        /**
         * 进度条 轨道颜色
         * @en Progress bar track color
         */
        progressTrackColor: '#F2F3F5',
        /**
         * 进度条 不可用状态进度条颜色
         * @en Progress bar disabled track color
         */
        progressDisabledColor: useGlobal('disabledColor'),
        /**
         * 进度条 不可用状态文字颜色
         * @en Progress bar disabled font color
         */
        progressDisabledTextColor: '#86909C',
        /**
         * 进度条 自定义进度条颜色渐变开始的颜色
         * @en Start gradient color of Progress bar track color
         */
        progressLinearGradientStartColor: '#4776E6',
        /**
         * 进度条 自定义进度条颜色渐变结束的颜色
         * @en End gradient color of Progress bar track color
         */
        progressLinearGradientEndColor: '#14CAFF',
        /**
         * 进度条 自定义进度条文字颜色
         * @en Progress bar font color
         */
        progressLinearGradientTextColor: '#3C89EC',
        /**
         * 进度条 导航式进度条轨道颜色
         * @en Navigation progress bar track color
         */
        progressNavTrackColor: 'transparent',
        /**
         * 进度条 导航式进度条轨道高度
         * @en Navigation progress bar track height
         */
        progressNavTrackHeight: '2PX',
        /**
         * 进度条 轨道高度
         * @en Progress bar track height
         */
        progressTrackHeight: '4PX',
        /**
         * 进度条 百分比内显轨道高度
         * @en Progress bar track height which percentage is in
         */
        progressInnerTrackHeight: '18PX',
        /**
         * 分页器内边距
         * @en Padding of Pagination
         */
        paginationPadding: `${getRem(11)} ${getRem(16)}`,
        /**
         * 分页器居中对齐时翻页按钮与页码的间距
         * @en The spacing between the button and the page number when pagination is centered
         */
        paginationCenterFieldGutter: getRem(24),
        /**
         * 分页器字体大小
         * @en Font size of pagination
         */
        paginationFieldFontSize: getRem(15),
        /**
         * 分页器字体行高
         * @en Line height of pagination
         */
        paginationFieldLineHeight: getRem(22),
        /**
         * 分页器翻页按钮最小高度
         * @en Min height of pagination button
         */
        paginationFieldButtonMinHeight: getRem(32),
        /**
         * 分页器翻页按钮圆角值
         * @en Border radius of pagination button
         */
        paginationFieldButtonBorderRadius: getRem(2),
        /**
         * 分页器翻页按钮内边距
         * @en Padding of pagination button
         */
        paginationFieldButtonPadding: `${getRem(6)} ${getRem(16)}`,
        /**
         * 分页器翻页按钮文字大小
         * @en Font size of pagination button text
         */
        paginationFieldBtnTextFontSize: getRem(14),
        /**
         * 分页器翻页按钮文字与图标的间距
         * @en The spacing between the text and the icon of the pagination button
         */
        paginationFieldBtnIconTextGutter: getRem(8),
        /**
         * 分页器翻页按钮图标与按钮边缘的间距
         * @en The spacing between the button's icon and the edge of the button
         */
        paginationFieldBtnIconSideMargin: getRem(-3),
        /**
         * 分页器翻页primary按钮背景颜色
         * @en Background color of the primary pagination button
         */
        paginationFieldPrimaryBackground: useGlobal('primaryColor'),
        /**
         * 分页器翻页primary按钮字体颜色
         * @en Font color of the primary pagination button
         */
        paginationFieldPrimaryTextColor: '#FFFFFF',
        /**
         * 分页器翻页默认按钮背景色
         * @en Background color of the default pagination button
         */
        paginationFieldDefaultBackground: '#F7F8FA',
        /**
         * 分页器翻页按钮默认字体颜色
         * @en Font color of the default pagination button
         */
        paginationFieldDefaultTextColor: useGlobal('fontColor'),
        /**
         * 分页器翻页按钮禁用背景颜色
         * @en Background color of the disabled pagination button
         */
        paginationFieldDisabledBackground: '#F7F8FA',
        /**
         * 分页器翻页按钮禁用字体颜色
         * @en Font color of the disabled pagination button
         */
        paginationFieldDisabledTextColor: '#C9CDD4',
        /**
         * 分页器翻页文字按钮字体颜色
         * @en Font color of the pagination button text
         */
        paginationFieldTextColor: useGlobal('fontColor'),
        /**
         * 分页器翻页文字primary按钮字体颜色
         * @en Font color of the primary pagination button text
         */
        paginationFieldTextPrimaryTextColor: useGlobal('primaryColor'),
        /**
         * 分页器页码显示文字大小
         * @en Font size of the page number
         */
        paginationItemFontSize: getRem(18),
        /**
         * 分页器页码显示文字行高
         * @en Line height of the page number
         */
        paginationItemLineHeight: getRem(22),
        /**
         * 分页器页码显示当前页文字颜色
         * @en Text color of the primary page number
         */
        paginationItemPrimaryTextColor: useGlobal('primaryColor'),
        /**
         * 分页器页码显示默认颜色
         * @en Text color of the default page number
         */
        paginationItemDefaultTextColor: useGlobal('fontColor'),
        /**
         * 进度条 百分比内显文字颜色
         * @en Progress bar font color which percentage is in
         * @override progressTextInner
         */
        progressTextInnerColor: '#FFFFFF',
        /**
         * 进度条 文字在两侧时与进度条的间距
         * @en The distance between the progress bar and text when the text is on both sides
         */
        progressTextGutter: getRem(8),
        /**
         * 进度条 文字大小
         * @en Progress bar font size
         */
        progressTextFontSize: getRem(14),
        /**
         * 进度条 跟随进度样式的文字大小
         * @en Font size of text followed by Progress bar
         */
        progressTextFollowFontSize: getRem(13),
        /**
         * 进度条 跟随进度样式的文字圆角值
         * @en Border radius of text followed by Progress bar
         */
        progressTextFollowBorderRadius: getRem(20),
        /**
         * 进度条 跟随进度样式的文字宽度
         * @en Text width followed by Progress bar
         */
        progressTextFollowWidth: getRem(36),
        /**
         * 进度条 跟随进度样式的文字高度
         * @en Text height followed by Progress bar
         */
        progressTextFollowHeight: getRem(20),
        /**
         * 渐隐过渡效果持续时长
         * @en Transition fade duration
         */
        transitionFadeDuration: '300ms',
        /**
         * 评分图标大小
         * @en Rate icon size
         */
        rateIconSize: '24PX',
        /**
         * 评分图标间距(点击热区含间距)
         * @en Rating icon spacing (click hotspot includes spacing)
         */
        rateIconOffset: '6PX',
        /**
         * 评分图标选中高亮色
         * @en Active color of Rate icon
         */
        rateIconActiveColor: '#FFB400',
        /**
         * 评分图标未选中颜色
         * @en Normal color of Rate icon
         */
        rateIconNormalColor: '#E5E6EB',
        /**
         * 评分图标禁用时选中颜色
         * @en Active color of disabled Rate icon
         */
        rateIconDisabledActiveColor: '#C9CDD4',
        /**
         * 倒计时默认字体大小
         * @en CountDown font size
         */
        countDownFontSize: getRem(16),
        /**
         * 倒计时默认字体行高
         * @en CountDown font line height
         */
        countDownLineHeight: getRem(22),
        /**
         * 倒计时默认字体颜色
         * @en CountDown font color
         */
        countDownColor: useGlobal('fontColor'),
        /**
         * 宫格组件每个单元格图标的宽度
         * @en Grid icon width
         */
        gridIconWidth: getRem(32),
        /**
         * 宫格组件每个单元格图标的高度
         * @en Grid icon height
         */
        gridIconHeight: getRem(32),
        /**
         * 宫格组件垂直布局中文字区域顶部间距
         * @en Top margin of Text of vertical Grid
         */
        gridVerticalTextMarginTop: getRem(8),
        /**
         * 宫格组件垂直布局中标题字体大小
         * @en Title font size of vertical Grid
         */
        gridVerticalTitleFontSize: getRem(16),
        /**
         * 宫格组件垂直布局中标题字体行高
         * @en Title font line height of vertical Grid
         */
        gridVerticalTitleLineHeight: getRem(20),
        /**
         * 宫格组件垂直布局中描述内容顶部间距
         * @en Top margin of content of vertical Grid
         */
        gridVerticalContentMarginTop: getRem(2),
        /**
         * 宫格组件垂直布局中描述内容字体大小
         * @en Content font size of vertical Grid
         */
        gridVerticalContentFontSize: getRem(12),
        /**
         * 宫格组件垂直布局中描述内容字体行高
         * @en Content font line height of vertical Grid
         */
        gridVerticalContentLineHeight: getRem(16),
        /**
         * 宫格组件水平布局中文字区域左侧间距
         * @en Left margin of Text of horizontal Grid
         */
        gridHorizontalTextMarginLeft: getRem(12),
        /**
         * 宫格组件水平布局中描述内容顶部间距
         * @en Top margin of content of horizontal Grid
         */
        gridHorizontalContentMarginTop: getRem(0),
        /**
         * 宫格组件分割线颜色
         * @en Grid border color
         */
        gridBorderColor: useGlobal('lineColor'),
        /**
         * 宫格组件分割线长度
         * @en Grid border length
         */
        gridBorderSize: '66.66%',
        /**
         * 动作面板选项高度
         * @en AactionSheet item height
         */
        actionSheetItemHeight: getRem(54),
        /**
         * 动作面板选项字体大小
         * @en ActionSheet item font size
         */
        actionSheetItemFontSize: getRem(16),
        /**
         * 动作面板顶部圆角值
         * @en ActionSheet top border radius
         */
        actionSheetBorderRadius: getRem(8),
        /**
         * 动作面板取消按钮顶线颜色
         * @en Top border color of ActionSheet cancel button
         */
        actionSheetCancelBorderColor: '#F2F3F5',
        /**
         * 动作面板取消按钮顶线宽度
         *  @en Top border Heigt of ActionSheet cancel button
         */
        actionSheetCancelBorderWidth: getRem(8),
        /** 动作面板头部内容内边距
         * @en ActionSheet header padding
         */
        actionSheetHeaderPadding: getRem(16),
        /**
         * 动作面板头部标题字体大小
         * @en ActionSheet title font size
         */
        actionSheetTitleFontSize: getRem(16),
        /**
         * 动作面板头部描述字体大小
         * @en ActionSheet subtitle font size
         */
        actionSheetSubTitleFontSize: getRem(14),
        /**
         * 搜索栏内边距大小
         * @en Padding of SearchBar
         */
        searchBarPadding: getRem(16),
        /**
         * 搜索栏背景颜色
         * @en BackgroundColor of SearchBar
         */
        searchBarBackgroundColor: '#FFFFFF',
        /**
         * 方形搜索栏的圆角大小
         * @en Size of the rounded corners of the square SearchBar
         */
        searchBarSquareShapeBorderRadius: getRem(2),
        /**
         * 圆形搜索栏的圆角大小
         * @en Size of the rounded corners of the round SearchBar
         */
        searchBarRoundShapeBorderRadius: getRem(9999),
        /**
         * 搜索输入框容器高度
         * @en SearchBar input container height
         */
        searchBarInputWrapperHeight: getRem(36),
        /**
         * 搜索输入框容器内边距大小
         * @en SearchBar input container padding
         */
        searchBarInputWrapperPadding: `${getRem(8)} ${getRem(14)}`,
        /**
         * 搜索输入框容器背景颜色
         * @en SearchBar input container background color
         */
        searchBarInputWrapperBackgroundColor: '#F2F3F5',
        /**
         * 搜索输入框容器字体大小
         * @en SearchBar input container font size
         */
        searchBarInputWrapperFontSize: getRem(14),
        /**
         * 搜索输入框高度
         * @en SearchBar input height
         */
        searchBarInputHeight: getRem(20),
        /**
         * 搜索输入框光标颜色
         * @en Color of SearchBar input caret
         */
        searchBarInputCaretColor: useGlobal('primaryColor'),
        /**
         * 搜索输入框提示文案颜色
         * @en Color of SearchBar input placeholder
         */
        searchBarInputPlaceholderColor: useGlobal('disabledColor'),
        /**
         * 搜索栏搜索栏左侧插入内容的右侧外边距
         * @en Right margin of SearchBar prefix
         */
        searchBarPrefixMarginRight: getRem(9),
        /**
         * 搜索栏清除按钮的颜色
         * @en Color of SearchBar clear icon
         */
        searchBarClearIconColor: '#C9CDD4',
        /**
         * 搜索栏搜索按钮的颜色
         * @en Color of SearchBar search icon
         */
        searchBarSearchIconColor: '#86909C',
        /**
         * 搜索栏按钮大小
         * @en Fontsize of SearchBar search icon
         */
        searchBarSearchIconFontSize: getRem(16),
        /**
         * 搜索栏右侧取消按钮颜色
         * @en Color of SearchBar cancel button
         */
        searchBarCancelBtnColor: useGlobal('primaryColor'),
        /**
         * 搜索栏右侧取消按钮文字大小
         * @en Font size of SearchBar cancel button
         */
        searchBarCancelBtnFontSize: getRem(15),
        /**
         * 搜索栏右侧取消按钮的左边距
         * @en Left margin of SearchBar cancel button
         */
        searchBarCancelBtnMarginLeft: getRem(16),
        /**
         * 搜索联想框背景颜色
         * @en Background color of SearchBar association
         */
        searchBarAssociationBackgroundColor: '#FFFFFF',
        /**
         * 搜索联想框候选项高度
         * @en Height of SearchBar association item
         */
        searchBarAssociationItemHeight: getRem(52),
        /**
         * 搜索联想框候选项内边距
         * @en Padding of SearchBar association item
         */
        searchBarAssociationItemPadding: getRem(16),
        /**
         * 搜索联想框候选项字体大小
         * @en Fontsize of SearchBar association item
         */
        searchBarAssociationItemFontSize: getRem(15),
        /**
         * 搜索联想框候选项普通文字颜色
         * @en Color of SearchBar association item
         */
        searchBarAssociationItemColor: useGlobal('fontColor'),
        /**
         * 搜索联想框候选项高亮文案颜色
         * @en Color of SearchBar association item highlight text
         */
        searchBarAssociationItemHighlightColor: useGlobal('primaryColor'),
        /**
         * 图片选择器内部字体大小
         * @en Font size of ImagePicker
         */
        imagePickerFontSize: getRem(14),
        /**
         * 图片选择器禁用状态下的透明度
         * @en Opacity of disabled ImagePicker
         */
        imagePickerDisabledOpacity: '0.7',
        /**
         * 图片选择器中图片的圆角值
         * @en Border radius of the image in ImagePicker
         */
        imagePickerBorderRadius: getRem(2),
        /**
         * 图片选择器添加图片按钮的背景色
         * @en Background of the add button of ImagePicker
         */
        imagePickerAddBackground: '#f7f8fa',
        /**
         * 图片选择器添加图片按钮的图标大小
         * @en Icon size of the add button of ImagePicker
         */
        imagePickerAddIconFontSize: getRem(30),
        /**
         * 图片选择器添加图片按钮的图标颜色
         * @en Icon color of the add button of ImagePicker
         */
        imagePickerAddIconColor: '#d8d8d8',
        /**
         * 图片选择器添加图片按钮的字体大小
         * @en Font size of the add button of ImagePicker
         */
        imagePickerAddTextFontSize: getRem(12),
        /**
         * 图片选择器添加图片按钮的字体颜色
         * @en Font color of the add button of ImagePicker
         */
        imagePickerAddTextColor: useGlobal('subInfoFontColor'),
        /**
         * 图片选择器中图片错误状态下的文字颜色
         * @en Text color for image error state in the image picker
         */
        imagePickerErrorColor: '#ffffff',
        /**
         * 图片选择器中图片错误状态下的背景色
         * @en Background for image error state in the image picker
         */
        imagePickerErrorBackground: 'rgba(0, 0, 0, 0.5)',
        /**
         * 图片选择器关闭按钮字体颜色
         * @en Font color of the close button of ImagePicker
         */
        imagePickerCloseColor: '#ffffff',
        /**
         * 图片选择器关闭按钮字体大小
         * @en Font size of the close button of ImagePicker
         */
        imagePickerCloseFontSize: getRem(12),
        /**
         * 图片选择器关闭按钮宽度
         * @en Width of the close button of ImagePicker
         */
        imagePickerCloseWidth: getRem(18),
        /**
         * 图片选择器关闭按钮高度
         * @en Height of the close button of ImagePicker
         */
        imagePickerCloseHeight: getRem(18),
        /**
         * 图片选择器关闭按钮背景色
         * @en Background of the close button of ImagePicker
         */
        imagePickerCloseBackground: 'rgba(0, 0, 0, 0.3)',
        /**
         * 图片选择器关闭按钮圆角值
         * @en Border radius of the close button of ImagePicker
         */
        imagePickerCloseBorderRadius: `0 ${getRem(2)}`,
        /**
         * 索引栏背景颜色
         * @en IndexBar background color
         */
        indexBarBackground: 'white',
        /**
         * 索引栏，激活状态下的，索引文字颜色
         * @en IndexBar, In active state, index text color
         */
        indexBarGroupActiveColor: useGlobal('primaryColor'),
        /**
         * 索引栏内容左填充宽度
         * @en IndexBar content left padding width
         */
        indexBarGroupLeftSpacing: getRem(16),
        /**
         * 索引栏索引标题高度
         * @en IndexBar index header height
         */
        indexBarGroupTitleHeight: getRem(24),
        /**
         * 索引栏标题背景颜色
         * @en IndexBar title background color
         */
        indexBarGroupTitleBackground: '#f7f8fa',
        /**
         * 索引栏标题字体颜色
         * @en IndexBar title text color
         */
        indexBarGroupTitleFontColor: useGlobal('subInfoFontColor'),
        /**
         * 索引栏索引标题字号
         * @en IndexBar index title font size
         */
        indexBarGroupTitleFontSize: getRem(14),
        /**
         * 索引栏内容子项高度
         * @en IndexBar content subitem height
         */
        indexBarGroupItemHeight: getRem(54),
        /**
         * 索引栏内容子项字号大小
         * @en IndexBar content sub-item font size
         */
        indexBarGroupItemFontSize: getRem(16),
        /**
         * 索引栏侧边栏激活索引颜色
         * @en IndexBar sidebar active index color
         */
        indexBarSidebarActiveColor: useGlobal('primaryColor'),
        /**
         * 索引栏侧边栏子项字号大小
         * @en The font size of the subitems in the sidebar of the IndexBar
         */
        indexBarSidebarItemFontSize: getRem(10),
        /**
         * 索引栏侧边栏子项字号行高
         * @en The line height of the subitems in the sidebar of the IndexBar
         */
        indexBarSidebarItemLineHeight: getRem(14),
        /**
         * 索引栏侧边栏子项高度
         * @en IndexBar sidebar child item height
         */
        indexBarSidebarItemPadding: `${getRem(2)} ${getRem(8)}`,
        /**
         * 索引栏侧边栏子项宽度
         * @en IndexBar sidebar child item width
         */
        indexBarSidebarItemWidth: getRem(10),
        /**
         * 索引栏侧边栏水滴提示气泡的内边距
         * @en The inner margin of the water drop prompt bubble in the sidebar of the IndexBar
         */
        indexBarSidebarSweatPadding: `0 ${getRem(8)}`,
        /**
         * 索引栏侧边栏水滴提示气泡背景颜色
         * @en IndexBar sidebar water drop prompt bubble background color
         */
        indexBarSidebarSweatBackground: '#323232',
        /**
         * 索引栏侧边栏水滴提示文案颜色
         * @en The color of the water drop prompt text in the sidebar of the IndexBar
         */
        indexBarSidebarSweatColor: 'white',
        /**
         * 索引栏侧边栏水滴离侧边栏的距离
         * @en The distance between the water droplets in the sidebar of the IndexBar and the sidebar
         */
        indexBarSidebarSweatRight: getRem(36),
        /**
         * 索引栏侧边栏水滴字号大小
         * @en IndexBar sidebar water drop font size
         */
        indexBarSidebarSweatFontSize: getRem(24),
        /**
         * 索引栏侧边栏水滴直径
         * @en IndexBar sidebar droplet diameter
         */
        indexBarSidebarSweatRadius: getRem(50),
        /**
         * 索引栏侧边栏三角气泡位置
         * @en The position of the triangle bubble in the sidebar of the IndexBar
         */
        indexBarSidebarSweatTrianglePosition: getRem(-27),
        /**
         * 索引栏侧边栏三角气泡的border
         * @en The border of the triangle bubble in the sidebar of the IndexBar
         */
        indexBarSidebarSweatTriangleBorder: `${getRem(18)} solid transparent`,
        /**
         * 索引栏侧边栏轻提示背景颜色
         * @en IndexBar sidebar light prompt background color
         */
        indexBarSidebarToastBackground: '#323232',
        /**
         * 索引栏侧边栏轻提示文案颜色
         * @en The color of the light prompt copy in the sidebar of the IndexBar
         */
        indexBarSidebarToastColor: 'white',
        /**
         * 索引栏侧边栏轻提示方框高度
         * @en The height of the light prompt box in the sidebar of the IndexBar
         */
        indexBarSidebarToastHeight: getRem(48),
        /**
         * 索引栏侧边栏轻提示圆角大小
         * @en The sidebar of the IndexBar lightly prompts the size of the rounded corners
         */
        indexBarSidebarToastRadius: getRem(4),
        /**
         * 索引栏侧边栏轻提示内边距
         * @en IndexBar sidebar light prompt padding
         */
        indexBarSidebarToastPadding: `0 ${getRem(8)}`,
        /**
         * 索引栏侧边栏轻提示字号大小
         * @en IndexBar sidebar light prompt font size
         */
        indexBarSidebarToastFontSize: getRem(24),
        /**
         * 步进器字体大小
         * @en Font size of Stepper
         */
        stepperFontSize: getRem(14),
        /**
         * 步进器方角边框样式
         * @en Square border style of Stepper
         */
        stepperSquareBorder: '1PX solid #f2f3f5',
        /**
         * 步进器方角边框半径
         * @en Square border radius of Stepper
         */
        stepperSquareBorderRadius: getRem(2),
        /**
         * 步进器方角样式背景颜色
         * @en Background color of Stepper square style
         */
        stepperSquareBackgroundColor: '#ffffff',
        /**
         * 步进器圆角按钮边框半径
         * @en Round button border radius of Stepper
         */
        stepperRoundButtonBorderRadius: '50%',
        /**
         * 步进器圆角输入框背景颜色
         * @en Rount input background color of Stepper
         */
        stepperRoundInputBackgroundColor: 'transparent',
        /**
         * 步进器按钮尺寸
         * @en Button size of Stepper
         */
        stepperButtonSize: getRem(28),
        /**
         * 步进器按钮图标尺寸
         * @en Button icon size of Stepper
         */
        stepperButtonIconSize: getRem(10),
        /**
         * 步进器默认背景颜色
         * @en Background default colr of Stepper
         */
        stepperDefaultBackgroundColor: '#f7f8fa',
        /**
         * 步进器内容字体颜色
         * @en Content text color of Stepper
         */
        stepperContentColor: '#1d2129',
        /**
         * 步进器禁用状态字体颜色
         * @en Text color of Stepper in disable status
         */
        stepperDisableColor: '#c9cdd4',
        /**
         * 步进器输入框宽度
         * @en Input width of Stepper
         */
        stepperInputWidth: getRem(40),
        /**
         * 步进器输入框长度
         * @en Input height of Stepper
         */
        stepperInputHeight: getRem(28),
        /**
         * 步进器输入框外边距
         * @en Input margin of Stepper
         */
        stepperInputMargin: '0 1PX',
        /*
         * 表单项标签字号
         * @en Font size of Form label
         */
        formItemLabelItemFontSize: getRem(16),
        /**
         * 表单项标签行高
         * @en Lineheight of Form label
         */
        formItemLabelItemLineHeight: getRem(54),
        /**
         * 表单项标签颜色
         * @en Color of Form label
         */
        formItemLabelItemColor: useGlobal('fontColor'),
        /**
         * 表单项标签右边距
         * @en Right padding of Form label
         */
        formItemLabelItemGutter: getRem(16),
        /**
         * 表单项标签宽度
         * @en Right padding of Form label
         */
        formItemLabelItemWidth: getRem(96),
        /**
         * 表单项分割线颜色
         * @en Form item divider color
         */
        formItemBorderDividerColor: 'rgba(0, 0, 0, 0.08)',
        /**
         * 表单项必选项星号颜色
         * @en Form item asterisk color
         */
        formItemLabelItemRequiredAsteriskColor: useGlobal('dangerColor'),
        /**
         * 表单项错误提示颜色
         * @en Form item error message color
         */
        formItemErrorMessageColor: useGlobal('dangerColor'),
        /**
         * 表单项警告提示颜色
         * @en Form item warning message color
         */
        formItemWarningMessageColor: useGlobal('warningColor'),
        /**
         * 时间轴节点的宽度
         * @en Width of the dot of TimeLine
         */
        timeLineDotWidth: getRem(9),
        /**
         * 时间轴节点的线颜色
         * @en Border color of the dot of TimeLine
         */
        timeLineDotBorderColor: useGlobal('primaryColor'),
        /**
         * 时间轴节点的背景色
         * @en Background color of the dot of TimeLine
         */
        timeLineDotBackgroundColor: useGlobal('backgroundColor'),
        /**
         * 时间轴轴线的宽度
         * @en Width of the Axis of TimeLine
         */
        timeLineAxisWidth: getRem(1),
        /**
         * 时间轴轴线的颜色
         * @en Color of the Axis of TimeLine
         */
        timeLineAxisColor: useGlobal('lineColor'),
        /**
         * 时间轴label的字体大小
         * @en Font size of the label of TimeLine
         */
        timeLineLabelFontSize: getRem(12),
        /**
         * 时间轴label的字体颜色
         * @en Font color of the label of TimeLine
         */
        timeLineLabelColor: useGlobal('subInfoFontColor'),
        /**
         * 时间轴content的上外边距（13 - 12 / 2）
         * @en Top margin of the Content of TimeLine
         */
        timeLineContentMarginTop: getRem(7),
        /**
         * 时间轴content的下外边距（13 + 12 / 2）
         * @en Bottom margin of the Content of TimeLine
         */
        timeLineContentMarginBottom: getRem(19),
        /**
         * 时间轴content的左外边距
         * @en Left margin of the Content of TimeLine
         */
        timeLineContentMarginLeft: getRem(8),
        /**
         * 时间轴content的圆角值
         * @en Border radius of the Content of TimeLine
         */
        timeLineContentBorderRadius: getRem(4),
        /**
         * 时间轴content的字体大小
         * @en Font size of the content of TimeLine
         */
        timeLineContentFontSize: getRem(16),
        /**
         * 时间轴content的背景色
         * @en Background color of the Content of TimeLine
         */
        timeLineContentBackgroundColor: useGlobal('lineColor'),
        /**
         * 时间轴content的字体颜色
         * @en Font color of the Content of TimeLine
         */
        timeLineContentColor: useGlobal('fontColor'),
        /**
         * 键盘背景颜色
         * @en Keyboard background color
         */
        keyboardBackground: '#f2f3f5',
        /**
         * 键盘内边距
         * @en Keyboard padding
         */
        keyboardContentPadding: getRem(8),
        /**
         * 键盘统一边距
         * @en Keyboard unified margin
         */
        keyboardUnifiedMargin: getRem(8),
        /**
         * 键盘右边一列确认键背景色
         * @en Keyboard right column confirm background
         */
        keyboardConfirmKeyBackground: '#165dff',
        /**
         * 键盘右边一列确认键字体颜色
         * @en Keyboard right column confirm color
         */
        keyboardConfirmKeyColor: '#ffffff',
        /**
         * 键盘右边一列确认键字体大小
         * @en Keyboard right column confirm font size
         */
        keyboardConfirmKeyFontSize: getRem(18),
        /**
         * 键盘按钮字重
         * @en Keyboard key button font weight
         */
        keyboardKeyFontWeight: '500',
        /**
         * 键盘按钮字体大小
         * @en Keyboard key button font size
         */
        keyboardKeyFontSize: getRem(22),
        /**
         * 键盘按钮中的图标大小
         * @en Keyboard key button icon size
         */
        keyboardKeyIconSize: getRem(26),
        /**
         * 键盘按钮字体行高
         * @en Keyboard key button font line height
         */
        keyboardKeyLineHeight: getRem(30),
        /**
         * 键盘按钮背景色
         * @en Keyboard key button background
         */
        keyboardKeyBackground: '#ffffff',
        /**
         * 键盘按钮背景色激活状态下
         * @en Keyboard key button background in active
         */
        keyboardKeyActiveBackground: '#e5e6eb',
        /**
         * 键盘按钮圆角
         * @en Keyboard key button rounded
         */
        keyboardKeyBorderRadius: getRem(4),
        /**
         * 键盘按钮高度
         * @en Keyboard key button height
         */
        keyboardKeyHeight: getRem(48),
        /**
         * 键盘按钮字体颜色
         * @en Keyboard key button font color
         */
        keyboardKeyColor: '#1d2129',
        /**
         * 分割线线条粗细
         * @en Thickness of divider line
         */
        dividerLineThickness: '1PX',
        /**
         * 分割线线条颜色
         * @en Color of divider line
         */
        dividerLineColor: useGlobal('lineColor'),
        /**
         * 分割线文本字体大小
         * @en Font size of divider content
         */
        dividerContentFontSize: getRem(14),
        /**
         * 分割线文本字体颜色
         * @en Font color of divider content
         */
        dividerContentFontColor: useGlobal('subFontColor'),
        /**
         * 分割线左对齐时左边长度
         */
        dividerLeftWidth: getRem(28),
        /**
         * 分割线右对齐时右边长度
         */
        dividerRightWidth: getRem(28),
        /**
         * 分割线文本左右padding
         * @en Padding of content
         */
        dividerContentPadding: getRem(12),
        /**
         * 分割线上下padding
         * @en Top and Bottom padding of divider
         */
        dividerPadding: getRem(16),
    };
}

const tokens = {
    ...globalTokens,
    ...getCompTokens(globalTokens),
    ...extend,
};

exports.getRem = getRem;
exports.getGlobalTokens = getGlobalTokens;
exports.getCompTokens = getCompTokens;
exports.useGlobal = useGlobal;
exports.default = tokens;
