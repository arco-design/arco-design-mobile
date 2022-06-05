## 加载中 @en{Loading}

#### 3

如果手动设置了`status`，则会以手动设置的值为准。设置`loadingArea`可以自定义加载中内容。
@en{If `status` is set manually, the manually set value will prevail. Set `loadingArea` to customize the loading content.}
```js
import { Image } from '@arco-design/mobile-react';

export default function ImageDemo() {
    return (<div className="image-fit-demo">
        <div className="image-group">
            <Image
                status="loading"
                showLoading={true}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">loading</div>
        </div>
        <div className="image-group">
            <Image
                status="loading"
                showLoading={true}
                loadingArea={<div className="image-loading-demo">50%</div>}
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
            />
            <div className="group-text">Text loading</div>
        </div>
        <div className="image-group">
            <Image
                status="loading"
                showLoading={true}
                loadingArea={<LoadingPicture />}
                src=""
            />
            <div className="group-text">Load placeholder</div>
        </div>
    </div>);
}

function LoadingPicture() {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M24.7 0C25.3853 0 25.9468 0.530321 25.9964 1.20298L26 1.3V24.7C26 25.3853 25.4697 25.9468 24.797 25.9964L24.7 26H1.3C0.614665 26 0.0531927 25.4697 0.00356573 24.797L0 24.7V1.3C0 0.614665 0.530321 0.0531927 1.20298 0.00356573L1.3 0H24.7ZM24 2H2V24H24V2ZM20.7716 10.7024C20.8663 10.7971 20.9194 10.9255 20.9194 11.0594V20.1892C20.9194 20.3983 20.7499 20.5678 20.5408 20.5678H11.1063C11.071 20.5678 11.0368 20.563 11.0044 20.5539L5.60569 20.5401C5.39659 20.5396 5.22749 20.3697 5.228 20.1606C5.22824 20.0605 5.26811 19.9645 5.33889 19.8938L10.5546 14.6781C10.7517 14.481 11.0713 14.481 11.2685 14.6781L13.6748 17.0846L20.0577 10.7024C20.2548 10.5053 20.5745 10.5053 20.7716 10.7024ZM9.5664 5.42578V9.21184H5.78034V5.42578H9.5664Z" fill="#C9CDD4"/>
        </svg>
    );
}
```
