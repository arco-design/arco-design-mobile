## 自定义上传列表 @en{Defined Upload List}

#### 6

```js
import { Uploader, Loading, Image } from '@arco-design/mobile-react';
import IconCheck from '@arco-design/mobile-react/esm/icon/IconCheck';
import IconDelete from '@arco-design/mobile-react/esm/icon/IconDelete';
import IconWarnCircle from '@arco-design/mobile-react/esm/icon/IconWarnCircle';
import { cls } from '@arco-design/mobile-utils';

const mimeType = 'text/plain';
const blob = new Blob([''], { type: mimeType });
const file = new File([blob], 'user.png', {
    type: mimeType,
    lastModified: new Date().getTime(),
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([
        {
            file,
            status: 'loaded',
            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
        },
        {
            file,
            status: 'loading',
            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
        },
        { file, status: 'error' },
    ]);

    const fileList = fileListMethods => {
        return (
            <div className={`demo-uploader-list`}>
                {files.map((fileItem, index) => {
                    const { file, status, url } = fileItem;
                    return (
                        <div className={`demo-uploader-list-item`} key={index}>
                            <Image className={`demo-uploader-list-item-image`} src={url} />
                            <div
                                className={cls(`demo-uploader-list-item-text`, {
                                    [`demo-uploader-list-item-text-error`]: status === 'error',
                                })}
                            >
                                <span>{file.name}</span>
                                {status === 'error' && (
                                    <IconWarnCircle className={`demo-uploader-list-item-warning`} />
                                )}
                            </div>
                            <div className={`demo-uploader-list-item-status`}>
                                {status === 'loaded' && (
                                    <div className={`demo-uploader-list-item-loaded`}>
                                        <IconCheck />
                                    </div>
                                )}
                                {status === 'loading' && (
                                    <div className={`demo-uploader-list-item-loading`}>
                                        <Loading type="circle" radius={8} />
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div onClick={() => fileListMethods.retryUpload(index)}>
                                        <span className={`demo-uploader-list-item-error`}>
                                            重试
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
        border: solid 0.5px rgba(229, 230, 235, 1);
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
            display: flex;
            align-items: center;
            &-error {
                color: rgba(245, 63, 63, 1);
            }
        }
        &-warning {
            line-height: 0;
            margin-left: 12px;
        }
        &-loaded {
            line-height: 0;
            font-size: 16px;
            color: #00b42a;
        }
        &-error {
            font-size: 12px;
            color: rgba(245, 63, 63, 1);
            font-weight: 400;
        }
        &-delete {
            line-height: 0;
            margin: 12px;
            font-size: 16px;
        }
    }
}
```
