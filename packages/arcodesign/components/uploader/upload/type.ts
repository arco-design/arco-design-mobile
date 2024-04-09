export interface AdapterFile {
    /**
     * 文件 url
     * @en Url of file
     */
    url?: string;
    /**
     * 文件大小
     * @en File size
     */
    size: number;
    /**
     * 文件名
     * @en File name
     */
    name: string;
}

export interface SelectCallback {
    /**
     * 文件列表
     * @en File list
     */
    files: AdapterFile[];
}

export interface CommonFileItem {
    /**
     * 文件地址
     * @en file Url
     */
    url?: string;
    /**
     * 文件
     * @en File
     */
    file?: File;
    /**
     * 文件状态
     * @en Image Status
     * @default 以文件自身加载状态而定
     * @default_en According to inner status of the image
     */
    status?: 'loaded' | 'loading' | 'error';
}

export interface UploadCommonProps<FileItem extends CommonFileItem = CommonFileItem> {
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
     * 文件大小限制，单位为K
     * @en File size limit, in K
     */
    maxSize?: number;
    /**
     * 文件超过限制大小
     * @en Image exceeds size limit
     */
    onMaxSizeExceed?: (file: File) => void;
    /**
     * 最多选择文件数，超出数量自动隐藏上传按钮，0表示不做限制
     * @en Max pictures can choose, 0 means no restriction
     * @default 0
     */
    limit?: number;
    /**
     * 选择文件数超过限制
     * @en The number of pictures exceeds the limit
     */
    onLimitExceed?: (files: File[]) => void;
    /**
     * 已选择文件列表
     * @en Selected files list
     */
    files: FileItem[];
    /**
     * 删除点击事件
     * @en Delete area click event
     */
    onDeleteClick?: (index: number) => void;
    /**
     * 上传文件点击事件
     * @en Upload area click event
     */
    onUploadClick?: () => void;
    /**
     * 文件选择适配器
     * @en Select adaptor
     */
    selectAdapter?: () => Promise<SelectCallback>;
    /**
     * 文件点击
     * @en click event
     */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>, file: FileItem, index: number) => void;
    /**
     * 文件长按事件
     * @en long press event
     */
    onLongPress?: (e: React.TouchEvent<HTMLElement>, file: FileItem, index: number) => void;
}
