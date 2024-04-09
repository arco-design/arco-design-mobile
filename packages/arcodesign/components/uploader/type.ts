import { InputHTMLAttributes } from 'react';
import { UploadCommonProps, CommonFileItem } from './upload/type';

export interface FileItem extends CommonFileItem {
    /**
     * 文件
     * @en File
     */
    file: File;
}

export interface UploaderProps extends UploadCommonProps {
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
