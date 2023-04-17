import { InputHTMLAttributes } from 'react';
import { ImageProps } from '../image';

export interface ImagePickItem {
    /**
     * 图片地址
     * @en Image Url
     */
    url: string;
    /**
     * 图片文件
     * @en Image File
     */
    file?: File;
    /**
     * 图片状态
     * @en Image Status
     * @default 以图片自身加载状态而定
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
    files: AdapterFile[];
}
export interface ImagePickerProps {
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
     * 已选择图片列表
     * @en selected images list
     */
    images: ImagePickItem[];
    /**
     * 可以选择的文件类型
     * @en Available File Types
     * @default 'image/*'
     */
    accept?: string;
    /**
     * 是否支持多选
     * @en Whether To Support Multiple Selection
     */
    multiple?: boolean;
    /**
     * 图片选取模式 Image selection mode [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     * @en Whether To Support Multiple Selection [capture MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     */
    capture?: InputHTMLAttributes<unknown>['capture'];
    /**
     * 一行展示图片张数
     * @en The Number Of Pictures Displayed In A Row
     * @default 3
     */
    columns?: number;
    /**
     * 格子间的间距
     * @en spacing between grids
     * @default 8
     */
    gutter?: number;
    /**
     * 最多选择图片张数，超出数量自动隐藏上传按钮，0表示不做限制
     * @en max Pictures Can Choose
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
     * 是否总是展示选择Icon，默认情况下当图片数量超出limit值时会自动隐藏选择Icon
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
     * 自定义选择图标
     * @en Defined Select Icon
     */
    selectIcon?: React.ReactNode;
    /**
     * 透传给图片的属性
     * @en Attributes passed through to the image
     */
    imageProps?: Partial<ImageProps>;
    /**
     * 自定义上传失败展示
     * @en Defined upload failed display
     */
    renderError?: (index?: number) => React.ReactNode | React.ReactNode;
    /**
     * 自定义上传中展示
     * @en Defined uploading display
     */
    renderLoading?: (index?: number) => React.ReactNode | React.ReactNode;
    /**
     * 上传方法
     * @en upload function
     */
    upload?: (file: ImagePickItem) => Promise<ImagePickItem | null>;
    /**
     * 已选图片列表发生变化
     * @en The list of selected images changes
     */
    onChange?: (fileList: ImagePickItem[]) => void;
    /**
     * 图片超过限制大小
     * @en Image exceeds size limit
     */
    onMaxSizeExceed?: (file: File) => void;
    /**
     * 选择张数超过限制
     * @en The number of pictures exceeds the limit
     */
    onLimitExceed?: (files: File[]) => void;
    /**
     * 图片点击
     * @en click event
     */
    onClick?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        image: ImagePickItem,
        index: number,
    ) => void;
    /**
     * 图片长按事件
     * @en long press event
     */
    onLongPress?: (e: React.TouchEvent<HTMLElement>, image: ImagePickItem, index: number) => void;
    /**
     * 图片选择适配器
     * @en Select Adaptor
     */
    selectAdapter?: () => Promise<SelectCallback>;
    /**
     * 选图点击事件
     * @en Select Icon Click Event
     */
    onSelectClick?: () => void;
    /**
     * 删除点击事件
     * @en Delete Icon Click Event
     */
    onDeleteClick?: (index: number) => void;
}

export interface ImagePickerRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}
