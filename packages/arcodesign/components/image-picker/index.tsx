import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { Promise } from 'es6-promise';
import { cls, defaultLocale, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { IconClose } from '../icon';
import Image from '../image';
import Grid from '../grid';
import AddIcon from './add-icon';
import { AdapterFile, ImagePickerProps, ImagePickerRef, ImagePickItem } from './type';

export * from './type';

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
        onSelectClick,
        onDeleteClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useRef<ImagePickItem[]>([]);

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

    const handleChange = (event, fromAdapter?: boolean) => {
        const files =
            (Array.prototype.filter.call(event.target.files || [], file => {
                // 过滤maxSize
                if (maxSize && file.size > maxSize * 1024) {
                    onMaxSizeExceed && onMaxSizeExceed(file);
                    return false;
                }
                return true;
            }) as File[]) || [];
        if (!fromAdapter) {
            event.target.value = '';
        }
        // 截断limit
        if (limit !== 0 && files.length + images.length > limit) {
            onLimitExceed && onLimitExceed(files);
            files.length = limit - images.length;
        }
        // 解析文件生成预览
        Promise.all(files.map(file => parseFile(file))).then(parseFiles => {
            const res = parseFiles.map((url, index) => ({
                url,
                status: typeof upload === 'function' ? 'loading' : 'loaded',
                file: files[index],
            })) as ImagePickItem[];
            cacheRef.current = [...images, ...res];
            onChange([...cacheRef.current]);
            // 执行upload
            if (typeof upload === 'function') {
                files.forEach(_file => {
                    upload(cacheRef.current.find(({ file }) => file === _file) as ImagePickItem)
                        .then(data => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            cacheRef.current[index] = {
                                ...cacheRef.current[index],
                                ...data,
                                status: undefined,
                            };
                        })
                        .catch(() => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            cacheRef.current[index].status = 'error';
                        })
                        .finally(() => {
                            onChange([...cacheRef.current]);
                        });
                });
            }
        });
    };

    const handleDelete = (index: number) => {
        onDeleteClick && onDeleteClick(index);
        onChange(images.filter((_i, j) => j !== index));
    };

    // click && longPress
    let timeOutEvent;
    const handleTouchStart = (
        e: React.TouchEvent<HTMLDivElement>,
        image: ImagePickItem,
        index: number,
    ) => {
        timeOutEvent = setTimeout(() => {
            timeOutEvent = 0;
            onLongPress?.(e, image, index);
        }, 750);
    };
    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        image: ImagePickItem,
        index: number,
    ) => {
        clearTimeout(timeOutEvent);
        if (timeOutEvent !== 0) {
            onClick?.(e, image, index);
        }
    };

    const handleSelect = (e: React.MouseEvent) => {
        if (e.target !== fileRef.current) {
            onSelectClick && onSelectClick();
            selectAdapter
                ? selectAdapter().then(({ files }) => handleChange({ target: { files } }, true))
                : fileRef.current?.click();
        }
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
                                onClick={e => handleClick(e, image, index)}
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
                                    onChange={e => handleChange(e)}
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

/**
 * 图片选择器组件
 * @en ImagePicker Component
 * @type 数据录入
 * @type_en Data Entry
 * @name 图片选择器
 * @name_en ImagePicker
 * @displayName ImagePicker
 */
export default componentWrapper(ImagePicker, 'ImagePicker');
