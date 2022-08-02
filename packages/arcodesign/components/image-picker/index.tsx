import React, { useRef, forwardRef, Ref, useImperativeHandle, InputHTMLAttributes } from 'react';
import { cls, defaultLocale } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { IconClose } from '../icon';
import Image, { ImageProps } from '../image';
import Grid from '../grid';
import AddIcon from './add-icon';

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
     * @default 'loaded'
     */
    status: 'loaded' | 'loading' | 'error';
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
    imageProps?: ImageProps;
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
    // ValidateImage?: (files: File[], fileList: ImagePickItem[]) => void;
    onSelect?: (...args) => void;
    /**
     * 已选图片列表发生变化
     * @en The list of selected images changes
     */
    onChange?: (fileList: ImagePickItem[]) => Promise<void>;
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
    onLongPress?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        image: ImagePickItem,
        index: number,
    ) => void;
    /**
     * 图片选择适配器
     * @en Select Adaptor
     */
    selectAdapter: () => Promise<SelectCallback>;
}

export interface ImagePickerRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}

/**
 * 图片选择器组件
 * @en ImagePicker Component
 * @type 数据输入
 * @type_en Data Entry
 * @name 图片选择器
 * @name_en ImagePicker
 */
const ImagePicker = forwardRef((props: ImagePickerProps, ref: Ref<ImagePickerRef>) => {
    const {
        className = '',
        style,
        accept = 'image/*',
        multiple = false,
        capture,
        columns = 3,
        gutter = 8,
        limit = 0,
        images = [],
        maxSize,
        disabled,
        deleteIcon,
        selectIcon,
        hideDelete = false,
        hideSelect = false,
        alwaysShowSelect = false,
        imageProps,
        renderLoading,
        renderError,
        onLongPress,
        onClick,
        onChange = () => null,
        onMaxSizeExceed,
        onLimitExceed,
        upload,
        selectAdapter,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const parseFile = (file: AdapterFile) => {
        return new Promise((resolve, reject) => {
            if (file.url) {
                resolve(file.url);
            } else {
                const reader = new FileReader();
                reader.onload = e => {
                    const dataURL: string = e.target?.result as string;
                    if (!dataURL) {
                        reject(new Error('file parse error'));
                    }
                    resolve(dataURL);
                };
                reader.onerror = () => {
                    reject(new Error('file parse error'));
                };
                reader.readAsDataURL(file as File);
            }
        });
    };

    const handleChange = event => {
        const files =
            [...(event.target.files || [])].filter(file => {
                // 过滤maxSize
                if (maxSize && file.size > maxSize * 1024) {
                    onMaxSizeExceed && onMaxSizeExceed(file);
                    return false;
                }
                return true;
            }) || [];
        event.target.value = '';
        // 截断limit
        if (limit !== 0 && files.length + images.length > limit) {
            onLimitExceed && onLimitExceed(files);
            files.length = limit - images.length;
        }
        // 解析文件生成预览
        Promise.all(files.map(file => parseFile(file))).then(parseFiles => {
            const res = parseFiles.map((url, index) => ({
                url,
                status: upload ? 'loading' : 'loaded',
                file: files[index],
            })) as ImagePickItem[];
            const cacheRes = [...images, ...res];
            onChange(cacheRes);
            // 执行upload
            if (typeof upload === 'function') {
                const propsImageLength = images.length;
                files.forEach((_file, index) => {
                    upload(cacheRes[propsImageLength + index])
                        .then(data => {
                            cacheRes[propsImageLength + index] = {
                                ...cacheRes[propsImageLength + index],
                                ...data,
                            };
                        })
                        .catch(() => {
                            cacheRes[propsImageLength + index].status = 'error';
                        })
                        .finally(() => {
                            cacheRes[propsImageLength + index].status = 'loaded';
                            onChange([...cacheRes]);
                        });
                });
            }
        });
    };

    const handleDelete = (index: number) => {
        onChange(images.filter((_i, j) => j !== index));
    };

    // click && longPress
    let timeOutEvent;
    const handleTouchStart = (e, image, index) => {
        e.preventDefault();
        timeOutEvent = setTimeout(() => {
            timeOutEvent = 0;
            typeof onLongPress === 'function' && onLongPress(e, image, index);
        }, 750);
    };
    const handleTouchEnd = (e, image, index) => {
        clearTimeout(timeOutEvent);
        if (timeOutEvent !== 0) {
            typeof onClick === 'function' && onClick(e, image, index);
        }
    };

    const handleSelect = () => {
        selectAdapter
            ? selectAdapter().then(({ files }) => handleChange({ target: { files } }))
            : fileRef.current?.click();
    };

    const getGridData = (prefixCls, locale) => {
        const errorNode = (index: number) => {
            if (renderError) {
                return typeof renderError === 'function' ? renderError(index) : renderError;
            }
            return (
                <div className={`${prefixCls}-image-picker-error`}>
                    <p>{locale.ImagePicker.loadError}</p>
                </div>
            );
        };
        const loadingNode = (index: number) => {
            if (renderLoading) {
                return typeof renderLoading === 'function' ? renderLoading(index) : renderLoading;
            }
            return null;
        };
        const data = (limit && limit < images.length ? images.slice(0, limit) : images).map(
            (image, index) => {
                const { url, status } = image;
                return {
                    img: (
                        <div key={`${index}-${url}`} className={`${prefixCls}-image-picker-image`}>
                            <div
                                onTouchStart={e => handleTouchStart(e, image, index)}
                                onTouchEnd={e => handleTouchEnd(e, image, index)}
                                className={`${prefixCls}-image-picker-image-container`}
                            >
                                <Image
                                    showLoading
                                    showError
                                    {...(imageProps || {})}
                                    src={url}
                                    errorArea={errorNode(index)}
                                    loadingArea={loadingNode(index)}
                                    status={status || imageProps?.status}
                                />
                                <div className={`${prefixCls}-image-picker-image-mask`} />
                            </div>
                            {!hideDelete && (
                                <div
                                    className={`${prefixCls}-image-picker-close`}
                                    onClick={() => handleDelete(index)}
                                >
                                    {deleteIcon || (
                                        <div className={`${prefixCls}-image-picker-close-icon`}>
                                            <IconClose />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ),
                    title: '',
                };
            },
        );
        const showSelect = !hideSelect && images.length < (limit || Infinity);
        const disableSelect = disabled || (alwaysShowSelect && !showSelect);
        if (showSelect || alwaysShowSelect) {
            data.push({
                img: (
                    <div
                        className={cls(`${prefixCls}-image-picker-add`, {
                            [`${prefixCls}-image-picker-add-disabled`]: disableSelect,
                        })}
                        onClick={handleSelect}
                    >
                        <div className={`${prefixCls}-image-picker-add-container`}>
                            {selectIcon || (
                                <div className={`${prefixCls}-image-picker-add-icon`}>
                                    <AddIcon />
                                </div>
                            )}
                            {!selectAdapter ? (
                                <input
                                    capture={capture}
                                    accept={accept}
                                    multiple={multiple}
                                    type="file"
                                    onChange={handleChange}
                                    ref={fileRef}
                                />
                            ) : null}
                        </div>
                    </div>
                ),
                title: '',
            });
        }
        return data;
    };
    return (
        <ContextLayout>
            {({ prefixCls, locale = defaultLocale }) => (
                <div
                    className={cls(`${prefixCls}-image-picker`, className, {
                        [`${prefixCls}-image-picker-disabled`]: disabled,
                    })}
                    style={style}
                    ref={domRef}
                >
                    <div className={`${prefixCls}-image-picker-container`}>
                        <Grid
                            data={getGridData(prefixCls, locale)}
                            gutter={gutter}
                            columns={columns}
                        />
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});

export default ImagePicker;
