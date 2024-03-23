import { InputHTMLAttributes } from 'react';

export interface FileItem {
    /**
     * 文件地址
     * @en file Url
     */
    url?: string;
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
     * @en Selected files list
     */
    files: FileItem[];
    /**
     * 可以选择的文件类型
     * @en Available file types
     * @default undefined
     */
    accept?: InputHTMLAttributes<unknown>['accept'];
    /**
     * 是否支持多选
     * @en Whether to support multiple selection
     */
    multiple?: boolean;
    /**
     * 文件选取模式 File selection mode [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     * @en Whether To Support Multiple Selection [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     */
    capture?: InputHTMLAttributes<unknown>['capture'];
    /**
     * 最多选择文件数，超出数量自动隐藏上传按钮，0表示不做限制
     * @en Max pictures can choose
     * @default 0
     */
    limit?: number;
    /**
     * 文件大小限制，单位为K
     * @en File size limit, in K
     */
    maxSize?: number;
    /**
     * 是否隐藏文件上传状态
     * @en Whether to hide file upload status
     * @default false
     */
    hideStatus?: boolean;
    /**
     * 是否总是展示选择Icon，默认情况下当文件数量超出limit值时会自动隐藏选择Icon
     * @en Whether to always show Select Icon
     * @default false
     */
    alwaysShowSelect?: boolean;
    /**
     * 禁用选择和删除图片
     * @en Disable select & delete image
     */
    disabled?: boolean;
    /**
     * 自定义删除区域
     * @en Defined delete area
     */
    renderDeleteArea?: (fileItem: FileItem, index: number) => React.ReactNode;
    /**
     * 自定义上传成功区域
     * @en Defined loaded area
     */
    renderLoadedArea?: (fileItem: FileItem, index: number) => React.ReactNode;
    /**
     * 自定义上传中区域
     * @en Defined loading area
     */
    renderLoadingArea?: (fileItem: FileItem, index: number) => React.ReactNode;
    /**
     * 自定义上传失败区域
     * @en Defined error area
     */
    renderErrorArea?: (fileItem: FileItem, index: number) => React.ReactNode;
    /**
     * 自定义文件索引区域
     * @en Defined file index area
     */
    renderFileIndexArea?: (fileItem: FileItem, index: number) => React.ReactNode;
    /**
     * 自定义上传按钮区域
     * @en Defined upload button area
     */
    renderUploadArea?: () => React.ReactNode;
    /**
     * 自定义上传文件列表展示
     * @en Defined file list display
     */
    renderFileList?: (methods: FileListMethods) => React.ReactNode;
    /**
     * 上传方法
     * @en Upload function
     */
    upload?: (file: FileItem) => Promise<FileItem | null>;
    /**
     * 已选文件列表发生变化
     * @en The list of selected files changes
     */
    onChange?: (fileList: FileItem[]) => void;
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
        image: FileItem,
        index: number,
    ) => void;
    /**
     * 文件选择适配器
     * @en Select Adaptor
     */
    selectAdapter?: () => Promise<SelectCallback>;
    /**
     * 上传文件点击事件
     * @en Upload Area Click Event
     */
    onUploadClick?: () => void;
    /**
     * 删除点击事件
     * @en Delete area click event
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

export interface FileListMethods {
    /**
     * 重新上传
     * @en Retry to upload
     */
    retryUpload: (index: number) => void;
    /**
     * 删除文件
     * @en Delete file
     */
    deleteFile: (index: number) => void;
}
