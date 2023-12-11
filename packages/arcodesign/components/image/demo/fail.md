## 加载失败提示 @en{Load Failure Message}

#### 4

手动设置了`status="error"`，则当图片加载完成时，会同时展示图片和加载失败内容。设置`slot="error"`可以自定义加载失败内容。
@en{If `status="error"` is set manually, when the image is loaded, the image and the failed content will be displayed at the same time. Set `slot="error"` to customize loading failure content.}

```js
import { Image } from '@arco-design/mobile-react';

export default function ImageDemo() {
    return (<div className="image-fit-demo">
        <div className="image-group">
            <Image
                status="error"
                showError={true}
                errorArea={<div className="image-retry-load">
                    <LoadFailFace />
                    <div style={{ marginTop: 8 }}>Load failed</div>
                </div>}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">Icon + Text</div>
        </div>
        <div className="image-group">
            <Image
                status="error"
                showError={true}
                errorArea={<div className="image-retry-load">Load failed</div>}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            />
            <div className="group-text">Text</div>
        </div>
        <div className="image-group">
            <Image
                status="error"
                showError={true}
                errorArea={<LoadFailPlaceholder />}
                src=""
            />
            <div className="group-text">Placeholder Status</div>
        </div>
    </div>);
}

function LoadFailFace() {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M12.5 24C6.15458 24 1 18.8454 1 12.5C1 6.15458 6.15458 1 12.5 1C18.8454 1 24 6.15458 24 12.5C24 18.8454 18.8454 24 12.5 24Z" stroke="white"/>
            <path d="M12.5298 14.6972C9.45045 14.736 8.2352 17.2113 8.1837 17.3181C8.07042 17.5511 8.1837 17.8229 8.43087 17.9199C8.67804 18.0267 8.96641 17.9199 9.06939 17.687C9.07969 17.6676 10.0684 15.5805 12.5401 15.6H12.5813C14.9088 15.6 15.9078 17.5996 15.949 17.687C16.0622 17.9102 16.3403 18.017 16.5875 17.9102C16.8346 17.8035 16.9376 17.5414 16.8243 17.3084C16.7729 17.2016 15.537 14.6875 12.571 14.6875C12.571 14.6972 12.5504 14.6972 12.5298 14.6972Z" fill="white" stroke="white" strokeWidth="0.2"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.8698 8.13965C17.4725 8.13965 17.9611 8.62825 17.9611 9.23097V10.868C17.9611 11.4707 17.4725 11.9593 16.8698 11.9593C16.267 11.9593 15.7784 11.4707 15.7784 10.868V9.23097C15.7784 8.62825 16.267 8.13965 16.8698 8.13965ZM8.13918 8.13965C8.7419 8.13965 9.2305 8.62825 9.2305 9.23097V10.868C9.2305 11.4707 8.7419 11.9593 8.13918 11.9593C7.53645 11.9593 7.04785 11.4707 7.04785 10.868V9.23097C7.04785 8.62825 7.53645 8.13965 8.13918 8.13965Z" fill="white"/>
        </svg>
    );
}

function LoadFailPlaceholder() {
    return (
        <svg width="32" height="31" viewBox="0 0 32 31" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M26.9964 2.20298C26.9468 1.53032 26.3853 1 25.7 1H2.3L2.20298 1.00357C1.53032 1.05319 1 1.61466 1 2.3V25.7L1.00357 25.797C1.05319 26.4697 1.61466 27 2.3 27H18.252C18.0875 26.3608 18 25.6906 18 25H3V3H25V17.0619C25.3276 17.021 25.6613 17 26 17C26.3387 17 26.6724 17.021 27 17.0619V2.3L26.9964 2.20298ZM21.9194 18.1175V12.0594C21.9194 11.9255 21.8663 11.7971 21.7716 11.7024C21.5745 11.5053 21.2548 11.5053 21.0577 11.7024L14.6748 18.0846L12.2685 15.6781C12.0713 15.481 11.7517 15.481 11.5546 15.6781L6.33889 20.8938C6.26811 20.9645 6.22824 21.0605 6.228 21.1606C6.22749 21.3697 6.39659 21.5396 6.60569 21.5401L12.0044 21.5539C12.0368 21.563 12.071 21.5678 12.1063 21.5678H18.7716C19.456 20.129 20.5573 18.9268 21.9194 18.1175ZM10.5664 10.2118V6.42578H6.78034V10.2118H10.5664Z" fill="#C9CDD4"/>
            <path d="M26 31C29.3137 31 32 28.3137 32 25C32 21.6863 29.3137 19 26 19C22.6863 19 20 21.6863 20 25C20 28.3137 22.6863 31 26 31Z" fill="#C9CDD4"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M28.7987 27.0083C28.8768 26.9302 28.8768 26.8036 28.7987 26.7255L27.0179 24.9447L28.7861 23.1764C28.8642 23.0983 28.8642 22.9717 28.7861 22.8936L28.0083 22.1157C27.9302 22.0376 27.8036 22.0376 27.7255 22.1157L25.9572 23.884L24.1318 22.0586C24.0537 21.9805 23.9271 21.9805 23.849 22.0586L23.0712 22.8364C22.9931 22.9145 22.9931 23.0411 23.0712 23.1192L24.8966 24.9447L23.0586 26.7827C22.9805 26.8608 22.9805 26.9874 23.0586 27.0655L23.8364 27.8433C23.9145 27.9214 24.0411 27.9214 24.1192 27.8433L25.9572 26.0053L27.7381 27.7861C27.8162 27.8642 27.9428 27.8642 28.0209 27.7861L28.7987 27.0083Z" fill="white"/>
        </svg>
    );
}
```

```less
.image-fit-demo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    &.fill {
        .@{prefix}-image {
            .rem(width, 64);
            .rem(height, 64);
        }
        .group-text {
            .rem(font-size, 12);
        }
    }
}
.image-group {
    display: inline-block;
    vertical-align: top;
    .group-text {
        .rem(font-size, 14);
        .rem(margin-top, 8);
        color: #939AA3;
        text-align: center;
    }
}
```
