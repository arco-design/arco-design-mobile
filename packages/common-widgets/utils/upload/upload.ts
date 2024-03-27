import React from 'react';
import { AdapterFile, FileItem, CommonProps } from './type';

export class Upload {
    props: CommonProps;

    fileRef: React.MutableRefObject<HTMLInputElement | null>;

    cacheRef: React.MutableRefObject<FileItem[]>;

    // click && longPress
    timeOutEvent: NodeJS.Timeout | number;

    constructor(props: CommonProps, fileRef: any, cacheRef: any) {
        this.props = { ...props };
        this.fileRef = fileRef;
        this.cacheRef = cacheRef;
        this.init();
    }

    init() {
        !this.props.files && (this.props.files = []);
        !this.props.limit && (this.props.limit = 0);
        !this.props.onChange && (this.props.onChange = () => null);
    }

    // 解析文件生成预览
    handleFile = (newFiles: File[]) => {
        Promise.all(newFiles.map(file => parseFile(file))).then(parseFiles => {
            const res = parseFiles.map((url, index) => ({
                url,
                status: typeof this.props.upload === 'function' ? 'loading' : 'loaded',
                file: newFiles[index],
            })) as FileItem[];
            this.cacheRef.current = [...this.cacheRef.current, ...res];
            this.props.onChange!([...this.cacheRef.current]);
            // 执行upload
            if (typeof this.props.upload === 'function') {
                newFiles.forEach(_file => {
                    this.props.upload!(
                        this.cacheRef.current.find(({ file }) => file === _file) as FileItem,
                    )
                        .then(data => {
                            const index = this.cacheRef.current.findIndex(
                                ({ file }) => file === _file,
                            );
                            if (index !== -1) {
                                this.cacheRef.current[index] = {
                                    ...this.cacheRef.current[index],
                                    ...data,
                                    status: 'loaded',
                                };
                            }
                        })
                        .catch(() => {
                            const index = this.cacheRef.current.findIndex(
                                ({ file }) => file === _file,
                            );
                            if (index !== -1) {
                                this.cacheRef.current[index].status = 'error';
                            }
                        })
                        .finally(() => {
                            this.props.onChange!([...this.cacheRef.current]);
                        });
                });
            }
        });
    };

    handleChange = (event, fromAdapter?: boolean) => {
        const newFiles =
            (Array.prototype.filter.call(event.target.files || [], file => {
                // 过滤maxSize
                if (this.props.maxSize && file.size > this.props.maxSize * 1024) {
                    this.props.onMaxSizeExceed && this.props.onMaxSizeExceed(file);
                    return false;
                }
                return true;
            }) as File[]) || [];
        if (!fromAdapter) {
            event.target.value = '';
        }
        // 截断limit
        if (
            this.props.limit !== 0 &&
            newFiles.length + this.props.files.length > this.props.limit!
        ) {
            this.props.onLimitExceed && this.props.onLimitExceed(newFiles);
            newFiles.length = this.props.limit! - this.props.files.length;
        }
        this.handleFile(newFiles);
    };

    deleteFile = (index: number) => {
        this.props.onDeleteClick && this.props.onDeleteClick(index);
        this.props.onChange!(this.props.files.filter((_i, j) => j !== index));
    };

    // 重新上传
    retryUpload = (index: number) => {
        this.deleteFile(index);
        this.handleFile([this.props.files[index].file as File]);
    };

    handleSelect = (e: React.MouseEvent) => {
        if (e.target !== this.fileRef.current) {
            this.props.onUploadClick && this.props.onUploadClick();
            this.props.selectAdapter
                ? this.props
                      .selectAdapter()
                      .then(value => this.handleChange({ target: { files: value.files } }, true))
                : this.fileRef.current?.click();
        }
    };

    handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        file: FileItem,
        index: number,
    ) => {
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent !== 0) {
            this.props.onClick?.(e, file, index);
        }
    };

    handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, image: FileItem, index: number) => {
        this.timeOutEvent = setTimeout(() => {
            this.timeOutEvent = 0;
            this.props.onLongPress?.(e, image, index);
        }, 750);
    };
}

export const parseFile = (file: AdapterFile) => {
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
