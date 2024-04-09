import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls, defaultLocale, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { IconClose } from '../icon';
import Image from '../image';
import Grid from '../grid';
import AddIcon from './add-icon';
import { ImagePickerProps, ImagePickerRef, ImagePickItem } from './type';
import { useLatestRef } from '../_helpers';
import { Upload } from '../uploader/upload';

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
        disabled,
        deleteIcon,
        selectIcon,
        hideDelete = false,
        hideSelect = false,
        alwaysShowSelect = false,
        imageProps,
        renderLoading,
        renderError,
        selectAdapter,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useLatestRef<ImagePickItem[]>(images);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const uploadFunc = new Upload({ ...props, files: images }, fileRef, cacheRef);

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
                                onTouchStart={e => uploadFunc.handleTouchStart(e, image, index)}
                                onClick={e => uploadFunc.handleClick(e, image, index)}
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
                                    onClick={() => uploadFunc.deleteFile(index)}
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
                        onClick={uploadFunc.handleSelect}
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
                                    onChange={e => uploadFunc.handleChange(e)}
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
