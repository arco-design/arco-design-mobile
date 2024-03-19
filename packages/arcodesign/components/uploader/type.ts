import { InputHTMLAttributes } from 'react';

export interface FilePickItem {
    /**
     * 文件地址
     * @en file Url
     */
    url: string;
    /**
     * 文件
     * @en File
     */
    file: File;
    /**
     * 文件状态
     * @en Image Status
     * @default 以文件自身加载状态而定
     * @default_en According to inner status of the image
     */
    status?: 'loaded' | 'loading' | 'error';
}
export interface AdapterFile {
    url?: string;
    size: number;
    name: string;
}
export interface SelectCallback {
    adapterFiles: AdapterFile[];
}
export interface UploaderProps {
    /**
     * 自定义类名
     * @en Custom className
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 已选择文件列表
     * @en selected files list
     */
    files: FilePickItem[];
    /**
     * 可以选择的文件类型
     * @en Available File Types
     * @default 'file'
     */
    accept?: string;
    /**
     * 是否支持多选
     * @en Whether To Support Multiple Selection
     */
    multiple?: boolean;
    /**
     * 文件选取模式 File selection mode [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     * @en Whether To Support Multiple Selection [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     */
    capture?: InputHTMLAttributes<unknown>['capture'];
    /**
     * 最多选择文件张数，超出数量自动隐藏上传按钮，0表示不做限制
     * @en max Pictures Can Choose
     * @default 0
     */
    limit?: number;
    /**
     * 文件大小限制，单位为K
     * @en File size limit, in K
     */
    maxSize?: number;
    /**
     * 是否隐藏删除Icon
     * @en Whether to hide delete Icon
     * @default false
     */
    hideDelete?: boolean;
    /**
     * 是否隐藏选择Icon
     * @en Whether to hide Select Icon
     * @default false
     */
    hideSelect?: boolean;
    /**
     * 是否隐藏文件Icon
     * @en Whether to hide file Icon
     * @default false
     */
    hideFile?: boolean;
    /**
     * 是否隐藏文件上传状态
     * @en Whether to hide file upload status
     * @default false
     */
    hideStatus?: boolean;
    /**
     * 是否总是展示选择Icon，默认情况下当文件数量超出limit值时会自动禁用选择Icon
     * @en Whether to always show Select Icon
     * @default false
     */
    alwaysShowSelect?: boolean;
    /**
     * 禁用选择和删除图片
     * @en Disable Select & Delete Image
     */
    disabled?: boolean;
    /**
     * 自定义删除图标
     * @en Defined Delete Icon
     */
    deleteIcon?: React.ReactNode;
    /**
     * 自定义上传图标
     * @en Defined Upload Icon
     */
    uploadIcon?: React.ReactNode;
    /**
     * 自定义上传图标
     * @en Defined Loaded Icon
     */
    loadedIcon?: React.ReactNode;
    /**
     * 自定义上传图标
     * @en Defined Loading Icon
     */
    loadingIcon?: React.ReactNode;
    /**
     * 自定义上传图标
     * @en Defined Error Icon
     */
    errorIcon?: React.ReactNode;
    /**
     * 自定义文件图标
     * @en Defined File Icon
     */
    fileIcon?: React.ReactNode;
    /**
     * 自定义上传按钮展示
     * @en Defined upload failed display
     */
    renderButton?: () => React.ReactNode | React.ReactNode;
    /**
     * 自定义上传文件列表展示
     * @en Defined uploading display
     */
    renderFileList?: (props: UploaderProps) => React.ReactNode | React.ReactNode;
    /**
     * 上传方法
     * @en upload function
     */
    upload?: (file: FilePickItem) => Promise<FilePickItem | null>;
    /**
     * 已选文件列表发生变化
     * @en The list of selected files changes
     */
    onChange?: (fileList: FilePickItem[]) => void;
    /**
     * 文件超过限制大小
     * @en Image exceeds size limit
     */
    onMaxSizeExceed?: (file: File) => void;
    /**
     * 选择文件数超过限制
     * @en The number of pictures exceeds the limit
     */
    onLimitExceed?: (files: File[]) => void;
    /**
     * 文件点击
     * @en click event
     */
    onClick?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        image: FilePickItem,
        index: number,
    ) => void;
    /**
     * 文件长按事件
     * @en long press event
     */
    onLongPress?: (e: React.TouchEvent<HTMLElement>, image: FilePickItem, index: number) => void;
    /**
     * 文件选择适配器
     * @en Select Adaptor
     */
    selectAdapter?: () => Promise<SelectCallback>;
    /**
     * 选文件点击事件
     * @en Select Icon Click Event
     */
    onSelectClick?: () => void;
    /**
     * 删除点击事件
     * @en Delete Icon Click Event
     */
    onDeleteClick?: (index: number) => void;
}

export interface UploaderRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}
