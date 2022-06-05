## 从缩略图打开 @en{Open from Thumbnail}

#### 2

```js
import { Image, ImagePreview } from '@arco-design/mobile-react';

export default function ImagePreviewDemo() {
    const [openIndex, setOpenIndex] = React.useState(-1);
    const imagesRef = React.useRef([]);
    const thumbs = [
        'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
        'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
        'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
    ];
    return (<div className="image-fit-demo">
        {thumbs.map((thumb, index)=> (
            <Image
                key={index}
                src={thumb}
                position="center center"
                onClick={() => setOpenIndex(index)}
                ref={(ref) => { imagesRef.current[index] = ref; }}
            />
        ))}
        <ImagePreview
            openIndex={openIndex}
            close={() => setOpenIndex(-1)}
            onImageDoubleClick={(index) => console.log('dbl click', index)}
            onImageLongTap={(index, image) => {
                alert('long tap');
                console.log('long tap', index, image);
            }}
            // spaceBetween={30}
            thumbPosition="center top"
            getThumbBounds={(index) => imagesRef.current[index]?.dom?.getBoundingClientRect()}
            images={[{
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
                fallbackSrc: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
            },
            {
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
                fallbackSrc: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
            },
            {
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
                fallbackSrc: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
            }]}
        />
    </div>);
}
```
