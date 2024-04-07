## 自定义上传列表 @en{Customize Upload List}

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
});

export default function UploaderDemo() {
    const [files, setFiles] = React.useState([
        {
            file,
            status: 'loaded',
            url: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
        },
        {
            file,
            status: 'loading',
            url: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
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
                                    [`demo-uploader-list-item-text-loading`]:
                                        status === 'loading',
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
                                        <Loading type="circle" radius={7} />
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
        display: flex;
        align-items: center;
        .rem(height, 56);
        .rem(margin-top, 16);
        .onepx-border-var(all, line-color, 0.04rem);
        &-image {
            .rem(width, 56);
            .rem(height, 56);
            .rem(border-top-left-radius, 2);
            .rem(border-bottom-left-radius, 2);
            overflow: hidden;
        }
        &-text {
            .rem(font-size, 14);
            .use-var(color, font-color);
            font-weight: 400;
            flex: 1;
            .set-prop-with-rtl(margin-left, 0.24rem);
            display: flex;
            align-items: center;
            &-error {
                .use-var(color, danger-color);
            }
            &-loading {
                .use-var(color, sub-info-font-color);
            }
        }
        &-warning {
            line-height: 0;
            .set-prop-with-rtl(margin-left, 0.24rem);
        }
        &-loaded {
            line-height: 0;
            .rem(font-size, 16);
            .use-var(color, success-color);
        }
        &-error {
            .rem(font-size, 12);
            .use-var(color, danger-color);
            font-weight: 400;
        }
        &-delete {
            line-height: 0;
            .rem(padding, 12);
            .rem(font-size, 16);
            .use-var(color, sub-font-color);
        }
    }
}
```
