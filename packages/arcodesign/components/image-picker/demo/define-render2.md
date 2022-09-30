## 自定义 loading/error 状态 @en{Define Loading&Error Layout}

#### 6

```js
import { ImagePicker } from '@arco-design/mobile-react';
const SadEmoji = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.5 24C6.15458 24 1 18.8454 1 12.5C1 6.15458 6.15458 1 12.5 1C18.8454 1 24 6.15458 24 12.5C24 18.8454 18.8454 24 12.5 24Z"
            stroke="white"
        />
        <path
            d="M12.5298 14.6972C9.45045 14.736 8.2352 17.2113 8.1837 17.3181C8.07042 17.5511 8.1837 17.8229 8.43087 17.9199C8.67804 18.0267 8.96641 17.9199 9.06939 17.687C9.07969 17.6676 10.0684 15.5805 12.5401 15.6H12.5813C14.9088 15.6 15.9078 17.5996 15.949 17.687C16.0622 17.9102 16.3403 18.017 16.5875 17.9102C16.8346 17.8035 16.9376 17.5414 16.8243 17.3084C16.7729 17.2016 15.537 14.6875 12.571 14.6875C12.571 14.6972 12.5504 14.6972 12.5298 14.6972Z"
            fill="white"
            stroke="white"
            strokeWidth="0.2"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8698 8.13965C17.4725 8.13965 17.9611 8.62825 17.9611 9.23097V10.868C17.9611 11.4707 17.4725 11.9593 16.8698 11.9593C16.267 11.9593 15.7784 11.4707 15.7784 10.868V9.23097C15.7784 8.62825 16.267 8.13965 16.8698 8.13965ZM8.13918 8.13965C8.7419 8.13965 9.2305 8.62825 9.2305 9.23097V10.868C9.2305 11.4707 8.7419 11.9593 8.13918 11.9593C7.53645 11.9593 7.04785 11.4707 7.04785 10.868V9.23097C7.04785 8.62825 7.53645 8.13965 8.13918 8.13965Z"
            fill="white"
        />
    </svg>
);

export default function ImagePickerDemo1() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg', status: 'error' },
    ]);
    const renderLoading1 = () => <div className="loading1">Loading...</div>;
    const renderError1 = () => (
        <div className="load-error1">
            <div>
                <SadEmoji />
                <p>Load failed</p>
            </div>
        </div>
    );
    return (
        <div>
            <ImagePicker
                images={images}
                onChange={setImages}
                renderLoading={renderLoading1}
                imageProps={{ status: 'loading' }}
            />
            <div className="demo-space" />
            <ImagePicker
                images={images}
                onChange={setImages}
                renderError={renderError1}
            />
        </div>
    );
}
```
