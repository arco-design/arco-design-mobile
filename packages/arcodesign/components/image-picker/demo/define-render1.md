## 自定义选择/删除图标 @en{Define Select&Delete Icon}

#### 5

```js
import { ImagePicker } from '@arco-design/mobile-react';
const DeleteIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
            width="11.5787"
            height="1.11647"
            rx="0.2"
            transform="matrix(0.705389 0.70882 -0.705389 0.70882 1.28711 0.500977)"
            fill="white"
        />
        <rect
            width="11.5787"
            height="1.11647"
            rx="0.2"
            transform="matrix(0.705389 -0.70882 0.705389 0.70882 0.545898 8.70703)"
            fill="white"
        />
    </svg>
);
const SelectIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.69432 4.49173C9.87623 4.04355 10.3142 3.75 10.8011 3.75H19.1536C19.6303 3.75 20.0612 4.03159 20.2496 4.46618L20.9659 6.11842H26.8125C27.5374 6.11842 28.125 6.64861 28.125 7.30263V25.0658C28.125 25.7198 27.5374 26.25 26.8125 26.25H3.1875C2.46263 26.25 1.875 25.7198 1.875 25.0658V7.30263C1.875 6.64861 2.46263 6.11842 3.1875 6.11842H9.03409L9.69432 4.49173ZM15 21.8385C18.1066 21.8385 20.625 19.3201 20.625 16.2135C20.625 13.1069 18.1066 10.5885 15 10.5885C11.8934 10.5885 9.375 13.1069 9.375 16.2135C9.375 19.3201 11.8934 21.8385 15 21.8385ZM15 19.9635C17.0711 19.9635 18.75 18.2845 18.75 16.2135C18.75 14.1424 17.0711 12.4635 15 12.4635C12.9289 12.4635 11.25 14.1424 11.25 16.2135C11.25 18.2845 12.9289 19.9635 15 19.9635Z"
                fill="#86909C"
            />
        </g>
    </svg>
);

export default function ImagePickerDemo() {
    const [images, setImages] = React.useState([
        { url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
    ]);

    return (
        <div>
            <ImagePicker
                images={images}
                onChange={setImages}
                deleteIcon={
                    <div className="custom-delete custom-delete-bg">
                        <DeleteIcon />
                    </div>
                }
                selectIcon={
                    <div>
                        <SelectIcon />
                        <p style={{ fontSize: 12 }}>Photo / Video</p>
                    </div>
                }
            />
            <div className="demo-space" />
            <ImagePicker
                images={images}
                onChange={setImages}
                deleteIcon={
                    <div className="custom-delete">
                        <DeleteIcon />
                    </div>
                }
                selectIcon={
                    <div>
                        <SelectIcon />
                        <p style={{ fontSize: 12 }}>Photo / Video</p>
                    </div>
                }
            />
        </div>
    );
}
```
