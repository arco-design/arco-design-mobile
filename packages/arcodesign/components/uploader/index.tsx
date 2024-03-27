import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls, defaultLocale, componentWrapper, Upload } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Button from '../button';
import { UploaderRef, UploaderProps, FileItem } from './type';
import { useLatestRef } from '../_helpers';
import { IconUpload, IconDelete, IconCheck, IconFile } from '../icon';
import Loading from '../loading';

export * from './type';

const Uploader = forwardRef((props: UploaderProps, ref: Ref<UploaderRef>) => {
    const {
        className = '',
        style,
        files = [],
        accept = undefined,
        multiple = false,
        capture,
        limit = 0,
        hideStatus = false,
        alwaysShowSelect = false,
        disabled,
        renderDeleteArea,
        renderLoadedArea,
        renderLoadingArea,
        renderErrorArea,
        renderFileIndexArea,
        renderUploadArea,
        renderFileList,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useLatestRef<FileItem[]>(files);

    const uploadFunc = new Upload(props, fileRef, cacheRef);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const uploaderSelect = (prefixCls, locale) => {
        const showSelect = files.length < (limit || Infinity);
        return (
            (showSelect || alwaysShowSelect) && (
                <div className={`${prefixCls}-uploader-add`} onClick={uploadFunc.handleSelect}>
                    <input
                        type="file"
                        accept={accept}
                        capture={capture}
                        onChange={e => uploadFunc.handleChange(e)}
                        multiple={multiple}
                        ref={fileRef}
                    />
                    {(renderUploadArea && renderUploadArea()) || (
                        <Button
                            className={`${prefixCls}-uploader-add-button`}
                            size="medium"
                            icon={<IconUpload />}
                            disabled={disabled}
                        >
                            {locale.Uploader.uploadBtn}
                        </Button>
                    )}
                </div>
            )
        );
    };

    const getUploadList = (prefixCls, locale) => {
        const generateItemArea = (fileItem, index, render, part, defaultArea) => {
            if (render) {
                const node = render(fileItem, index);
                return node ? (
                    <div className={`${prefixCls}-uploader-list-item-${part}`}>{node}</div>
                ) : (
                    node
                );
            }
            return <div className={`${prefixCls}-uploader-list-item-${part}`}>{defaultArea}</div>;
        };

        return (
            (renderFileList &&
                renderFileList({
                    retryUpload: uploadFunc.retryUpload,
                    deleteFile: uploadFunc.deleteFile,
                })) || (
                <div className={`${prefixCls}-uploader-list`}>
                    {(limit && limit < files.length ? files.slice(0, limit) : files).map(
                        (fileItem, index) => {
                            const { file, status } = fileItem;
                            return (
                                <div
                                    className={`${prefixCls}-uploader-list-item`}
                                    key={index}
                                    onClick={e => uploadFunc.handleClick(e, fileItem, index)}
                                >
                                    <div className={`${prefixCls}-uploader-list-item-container`}>
                                        <div className={`${prefixCls}-uploader-list-item-wrapper`}>
                                            {generateItemArea(
                                                fileItem,
                                                index,
                                                renderFileIndexArea,
                                                'file',
                                                <IconFile />,
                                            )}
                                            <div
                                                className={cls(
                                                    `${prefixCls}-uploader-list-item-text`,
                                                    {
                                                        [`${prefixCls}-uploader-list-item-text-error`]:
                                                            status === 'error',
                                                    },
                                                )}
                                            >
                                                {file.name}
                                            </div>
                                        </div>
                                        {!hideStatus && (
                                            <div
                                                className={`${prefixCls}-uploader-list-item-status`}
                                            >
                                                {status === 'loaded' &&
                                                    generateItemArea(
                                                        fileItem,
                                                        index,
                                                        renderLoadedArea,
                                                        'loaded',
                                                        <IconCheck />,
                                                    )}
                                                {status === 'loading' &&
                                                    generateItemArea(
                                                        fileItem,
                                                        index,
                                                        renderLoadingArea,
                                                        'loading',
                                                        <Loading type="circle" radius={8} />,
                                                    )}
                                                {status === 'error' && (
                                                    <div
                                                        onClick={() =>
                                                            uploadFunc.retryUpload(index)
                                                        }
                                                    >
                                                        {generateItemArea(
                                                            fileItem,
                                                            index,
                                                            renderErrorArea,
                                                            'error',
                                                            <span>
                                                                {locale.Uploader.retryUpload}
                                                            </span>,
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className={cls(`${prefixCls}-uploader-list-item-delete`, {
                                            [`${prefixCls}-uploader-list-item-delete-disabled`]:
                                                disabled,
                                        })}
                                        onClick={() => uploadFunc.deleteFile(index)}
                                    >
                                        {(renderDeleteArea &&
                                            renderDeleteArea(fileItem, index)) || <IconDelete />}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            )
        );
    };

    return (
        <ContextLayout>
            {({ prefixCls, locale = defaultLocale }) => (
                <div
                    className={cls(`${prefixCls}-uploader`, className, {
                        [`${prefixCls}-uploader-disabled`]: disabled,
                    })}
                    style={style}
                    ref={domRef}
                >
                    <div className={`${prefixCls}-uploader-container`}>
                        {uploaderSelect(prefixCls, locale)}
                        {getUploadList(prefixCls, locale)}
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 文件上传组件
 * @en Uploader Component
 * @type 数据录入
 * @type_en Data Entry
 * @name 文件上传
 * @name_en Uploader
 * @displayName Uploader
 */
export default componentWrapper(Uploader, 'Uploader');
