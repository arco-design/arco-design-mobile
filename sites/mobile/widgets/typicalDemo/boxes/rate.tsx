import React, { useEffect, useRef, useState } from 'react';
import { Rate } from '../../../../../packages/arcodesign/components';
import Emoji1 from '../statics/first';
import Emoji1Grey from '../statics/first-grey';
import Emoji2 from '../statics/second';
import Emoji2Grey from '../statics/second-grey';
import Emoji3 from '../statics/third';
import Emoji3Grey from '../statics/third-grey';
import Emoji4 from '../statics/forth';
import Emoji4Grey from '../statics/forth-grey';
import Emoji5 from '../statics/fifth';
import Emoji5Grey from '../statics/fifth-grey';

import Love from '../statics/love';

enum EEmojiOrder {
    First = 1,
    Second = 2,
    Third = 3,
    Forth = 4,
    Fifth = 5,
}
export default function RateDemo() {
    const timerRef = useRef<any>(-1);
    const [firstValue, setFirstValue] = useState(0);
    const firstValueRef = useRef<number>(0);
    const showEmoji = (index: number, isActive: boolean) => {
        switch (index) {
            case EEmojiOrder.First:
                return isActive ? <Emoji1 /> : <Emoji1Grey />;
            case EEmojiOrder.Second:
                return isActive ? <Emoji2 /> : <Emoji2Grey />;
            case EEmojiOrder.Third:
                return isActive ? <Emoji3 /> : <Emoji3Grey />;
            case EEmojiOrder.Forth:
                return isActive ? <Emoji4 /> : <Emoji4Grey />;
            case EEmojiOrder.Fifth:
                return isActive ? <Emoji5 /> : <Emoji5Grey />;
            default:
                return null;
        }
    };
    function jumpAnimation() {
        firstValueRef.current++;
        setFirstValue(firstValueRef.current);
        if (firstValueRef.current === 5) {
            timerRef.current && clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(jumpAnimation, 800);
        }
    }
    useEffect(() => {
        jumpAnimation();
    }, []);
    return (
        <div className="typical-demo-card typical-demo-rate-box">
            <Rate
                className="rate-love"
                value={firstValue}
                icons={{ active: <Love className="love active" />, normal: <Love /> }}
            />
            <Rate
                defaultValue={4}
                icons={{
                    active: index => showEmoji(index + 1, true),
                    normal: index => showEmoji(index + 1, false),
                }}
            />
            <Rate
                defaultValue={0}
                icons={{
                    active: index => showEmoji(index + 1, true),
                    normal: index => showEmoji(index + 1, false),
                }}
            />
        </div>
    );
}
