import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { Promise } from 'es6-promise';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Button from '../button';
import { AdapterFile, UploaderRef, UploaderProps, FileItem } from './type';
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
        maxSize,
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
        upload,
        onChange = () => null,
        onMaxSizeExceed,
        onLimitExceed,
        onClick,
        selectAdapter,
        onUploadClick,
        onDeleteClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useLatestRef<FileItem[]>(files);

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

    // 解析文件生成预览
    const handleFile = (newFiles: File[]) => {
        Promise.all(newFiles.map(file => parseFile(file))).then(parseFiles => {
            const res = parseFiles.map((url, index) => ({
                url,
                status: typeof upload === 'function' ? 'loading' : 'loaded',
                file: newFiles[index],
            })) as FileItem[];
            cacheRef.current = [...cacheRef.current, ...res];
            onChange([...cacheRef.current]);
            // 执行upload
            if (typeof upload === 'function') {
                newFiles.forEach(_file => {
                    upload(cacheRef.current.find(({ file }) => file === _file) as FileItem)
                        .then(data => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            if (index !== -1) {
                                cacheRef.current[index] = {
                                    ...cacheRef.current[index],
                                    ...data,
                                    status: undefined,
                                };
                            }
                        })
                        .catch(() => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            if (index !== -1) {
                                cacheRef.current[index].status = 'error';
                            }
                        })
                        .finally(() => {
                            onChange([...cacheRef.current]);
                        });
                });
            }
        });
    };

    const handleChange = (event, fromAdapter?: boolean) => {
        const newFiles =
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
        if (limit !== 0 && newFiles.length + files.length > limit) {
            onLimitExceed && onLimitExceed(newFiles);
            newFiles.length = limit - files.length;
        }
        handleFile(newFiles);
    };

    const deleteFile = (index: number) => {
        onDeleteClick && onDeleteClick(index);
        onChange(files.filter((_i, j) => j !== index));
    };

    const retryUpload = (index: number) => {
        deleteFile(index);
        handleFile([files[index].file]);
    };

    // // click && longPress
    let timeOutEvent;
    const handleTouchStart = () => {
        timeOutEvent = setTimeout(() => {
            timeOutEvent = 0;
        }, 750);
    };
    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        file: FileItem,
        index: number,
    ) => {
        clearTimeout(timeOutEvent);
        if (timeOutEvent !== 0) {
            onClick?.(e, file, index);
        }
    };

    const handleSelect = (e: React.MouseEvent) => {
        if (e.target !== fileRef.current) {
            onUploadClick && onUploadClick();
            selectAdapter
                ? selectAdapter().then(({ adapterFiles }) =>
                      handleChange({ target: { adapterFiles } }, true),
                  )
                : fileRef.current?.click();
        }
    };

    const uploaderSelect = prefixCls => {
        const showSelect = files.length < (limit || Infinity);

        return (
            (showSelect || alwaysShowSelect) && (
                <div className={`${prefixCls}-uploader-add`} onClick={handleSelect}>
                    <input
                        type="file"
                        accept={accept}
                        capture={capture}
                        onChange={e => handleChange(e)}
                        multiple={multiple}
                        ref={fileRef}
                        disabled={disabled}
                    />
                    {(renderUploadArea && renderUploadArea()) || (
                        <Button
                            className={`${prefixCls}-uploader-add-button`}
                            size="small"
                            icon={<IconUpload />}
                        >
                            点击上传
                        </Button>
                    )}
                </div>
            )
        );
    };

    const getUploadList = prefixCls => {
        return (
            (renderFileList && renderFileList({ retryUpload, deleteFile })) || (
                <div className={`${prefixCls}-uploader-list`}>
                    {(limit && limit < files.length ? files.slice(0, limit) : files).map(
                        (fileItem, index) => {
                            const { file, status } = fileItem;
                            return (
                                <div className={`${prefixCls}-uploader-list-item`} key={index}>
                                    <div
                                        className={`${prefixCls}-uploader-list-item-container`}
                                        onTouchStart={() => handleTouchStart()}
                                        onClick={e => handleClick(e, fileItem, index)}
                                    >
                                        <div className={`${prefixCls}-uploader-list-item-wrapper`}>
                                            <div className={`${prefixCls}-uploader-list-item-file`}>
                                                {(renderFileIndexArea &&
                                                    renderFileIndexArea(fileItem, index)) || (
                                                    <IconFile />
                                                )}
                                            </div>
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
                                                {(status === 'loaded' || status === undefined) &&
                                                    ((renderLoadedArea &&
                                                        renderLoadedArea(fileItem, index)) || (
                                                        <div
                                                            className={`${prefixCls}-uploader-list-item-loaded`}
                                                        >
                                                            <IconCheck />
                                                        </div>
                                                    ))}
                                                {status === 'loading' &&
                                                    ((renderLoadingArea &&
                                                        renderLoadingArea(fileItem, index)) || (
                                                        <div
                                                            className={`${prefixCls}-uploader-list-item-loading`}
                                                        >
                                                            <Loading type="arc" radius={8} />
                                                        </div>
                                                    ))}
                                                {status === 'error' && (
                                                    <div onClick={() => retryUpload(index)}>
                                                        {(renderErrorArea &&
                                                            renderErrorArea(fileItem, index)) || (
                                                            <span
                                                                className={`${prefixCls}-uploader-list-item-error`}
                                                            >
                                                                点击重试
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className={`${prefixCls}-uploader-list-item-delete`}
                                        onClick={() => deleteFile(index)}
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
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-uploader`, className, {
                        [`${prefixCls}-uploader-disabled`]: disabled,
                    })}
                    style={style}
                    ref={domRef}
                >
                    <div className={`${prefixCls}-uploader-container`}>
                        {uploaderSelect(prefixCls)}
                        {getUploadList(prefixCls)}
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
