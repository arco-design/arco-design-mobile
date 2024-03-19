import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { Promise } from 'es6-promise';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Button from '../button';
import { AdapterFile, UploaderRef, UploaderProps, FilePickItem } from './type';
import { useLatestRef } from '../_helpers';
import { IconUpload, IconDelete, IconCheck, IconFile } from '../icon';
import Loading from '../loading';

export * from './type';

const Uploader = forwardRef((props: UploaderProps, ref: Ref<UploaderRef>) => {
    const {
        className = '',
        style,
        files = [],
        accept = '*',
        multiple = false,
        capture,
        limit = 0,
        maxSize,
        hideFile = false,
        hideDelete = false,
        hideSelect = false,
        hideStatus = false,
        alwaysShowSelect = false,
        disabled,
        deleteIcon,
        uploadIcon,
        loadedIcon,
        loadingIcon,
        errorIcon,
        fileIcon,
        renderButton,
        renderFileList,
        upload,
        onChange = () => null,
        onMaxSizeExceed,
        onLimitExceed,
        onClick,
        onLongPress,
        selectAdapter,
        onSelectClick,
        onDeleteClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useLatestRef<FilePickItem[]>(files);

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
            })) as FilePickItem[];
            cacheRef.current = [...cacheRef.current, ...res];
            onChange([...cacheRef.current]);
            // 执行upload
            if (typeof upload === 'function') {
                newFiles.forEach(_file => {
                    upload(cacheRef.current.find(({ file }) => file === _file) as FilePickItem)
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

    const handleDelete = (index: number) => {
        onDeleteClick && onDeleteClick(index);
        onChange(files.filter((_i, j) => j !== index));
    };

    const reUpload = (index: number) => {
        handleDelete(index);
        handleFile([files[index].file]);
    };

    // // click && longPress
    let timeOutEvent;
    const handleTouchStart = (
        e: React.TouchEvent<HTMLDivElement>,
        file: FilePickItem,
        index: number,
    ) => {
        timeOutEvent = setTimeout(() => {
            timeOutEvent = 0;
            onLongPress?.(e, file, index);
        }, 750);
    };
    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        file: FilePickItem,
        index: number,
    ) => {
        clearTimeout(timeOutEvent);
        if (timeOutEvent !== 0) {
            onClick?.(e, file, index);
        }
    };

    const handleSelect = (e: React.MouseEvent) => {
        if (e.target !== fileRef.current) {
            onSelectClick && onSelectClick();
            selectAdapter
                ? selectAdapter().then(({ adapterFiles }) =>
                      handleChange({ target: { adapterFiles } }, true),
                  )
                : fileRef.current?.click();
        }
    };

    const uploaderSelect = prefixCls => {
        const showSelect = !hideSelect && files.length < (limit || Infinity);

        const buttonNode = () => {
            if (renderButton) {
                return typeof renderButton === 'function' ? renderButton() : renderButton;
            }
            return (
                <Button
                    className={`${prefixCls}-uploader-add-button`}
                    size="small"
                    icon={uploadIcon || <IconUpload />}
                >
                    点击上传
                </Button>
            );
        };

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
                    {buttonNode()}
                </div>
            )
        );
    };

    const getUploadList = prefixCls => {
        const uploadListNode = () => {
            if (renderFileList) {
                return typeof renderFileList === 'function'
                    ? renderFileList(props)
                    : renderFileList;
            }
            return null;
        };

        return (
            uploadListNode() || (
                <div className={`${prefixCls}-uploader-list`}>
                    {(limit && limit < files.length ? files.slice(0, limit) : files).map(
                        (fileItem, index) => {
                            const { file, status } = fileItem;
                            return (
                                <div className={`${prefixCls}-uploader-list-item`} key={index}>
                                    <div
                                        className={`${prefixCls}-uploader-list-item-container`}
                                        onTouchStart={e => handleTouchStart(e, fileItem, index)}
                                        onClick={e => handleClick(e, fileItem, index)}
                                    >
                                        <div className={`${prefixCls}-uploader-list-item-wrapper`}>
                                            {!hideFile && (
                                                <div
                                                    className={`${prefixCls}-uploader-list-item-file`}
                                                >
                                                    {fileIcon || <IconFile />}
                                                </div>
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
                                                {(status === 'loaded' || status === undefined) &&
                                                    (loadedIcon || (
                                                        <div
                                                            className={`${prefixCls}-uploader-list-item-loaded`}
                                                        >
                                                            <IconCheck />
                                                        </div>
                                                    ))}
                                                {status === 'loading' &&
                                                    (loadingIcon || (
                                                        <div
                                                            className={`${prefixCls}-uploader-list-item-loading`}
                                                        >
                                                            <Loading type="arc" radius={8} />
                                                        </div>
                                                    ))}
                                                {status === 'error' && (
                                                    <div onClick={() => reUpload(index)}>
                                                        {errorIcon || (
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
                                    {!hideDelete && (
                                        <div
                                            className={`${prefixCls}-uploader-list-item-delete`}
                                            onClick={() => handleDelete(index)}
                                        >
                                            {deleteIcon || <IconDelete />}
                                        </div>
                                    )}
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
