## 自定义上传列表 @en{Defined Upload List}

#### 6

```js
import { Uploader, Loading, Image } from '@arco-design/mobile-react';
import IconCheck from '@arco-design/mobile-react/esm/icon/IconCheck';
import IconDelete from '@arco-design/mobile-react/esm/icon/IconDelete';
import { cls } from '@arco-design/mobile-utils';

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([]);

    const fileList = fileListMethods => {
        return (
            <div className={`demo-uploader-list`}>
                {files.map((fileItem, index) => {
                    const { file, status } = fileItem;
                    return (
                        <div className={`demo-uploader-list-item`} key={index}>
                            <Image className={`demo-uploader-list-item-image`} src={fileItem.url} />
                            <div
                                className={cls(`demo-uploader-list-item-text`, {
                                    [`demo-uploader-list-item-text-error`]: status === 'error',
                                })}
                            >
                                {file.name}
                            </div>
                            <div className={`demo-uploader-list-item-status`}>
                                {status === 'loaded' && (
                                    <div className={`demo-uploader-list-item-loaded`}>
                                        <IconCheck />
                                    </div>
                                )}
                                {status === 'loading' && (
                                    <div className={`demo-uploader-list-item-loading`}>
                                        <Loading type="arc" radius={8} />
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div onClick={() => fileListMethods.retryUpload(index)}>
                                        <span className={`demo-uploader-list-item-error`}>
                                            点击重试
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`demo-uploader-list-item-delete`}
                                onClick={() => fileListMethods.deleteFile(index)}
                            >
                                <IconDelete />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Uploader accept="image/*" files={files} onChange={setFiles} renderFileList={fileList} />
    );
}
```

```less
.demo-uploader-list {
    width: 100%;
    &-item {
        height: 56px;
        display: flex;
        align-items: center;
        margin-top: 16px;
        &-image {
            width: 56px;
            height: 56px;
            border-radius: 2px 0 0 2px;
        }
        &-text {
            font-size: 14px;
            color: rgba(29, 33, 41, 1);
            font-weight: 400;
            flex: 1;
            margin-left: 12px;
            &-error {
                color: rgba(245, 63, 63, 1);
            }
        }
        &-loaded {
            line-height: 0;
            .use-var(font-size, uploader-loaded-icon-font-size);
            .use-var(color, success-color);
        }
        &-error {
            .use-var(font-size, uploader-error-text-font-size);
            .use-var(color, primary-color);
            font-weight: 400;
        }
        &-delete {
            line-height: 0;
            margin: 12px;
            .use-var(font-size, uploader-delete-icon-font-size);
            &-disabled {
                .use-var(color, uploader-disabled-delete-icon-color);
            }
        }
    }
}
```
