import React, { useRef, MouseEvent, useContext } from 'react';
import CodePopover from '../components/code-img-pop';
import Img from '../components/img';
import { GlobalContext } from '../setting';
import { localeMap } from '../locale';
import './index.less';

const baseClass = 'home-banner';
interface IProps {
    gotoComponentBase: () => void;
}

export default function HomeBanner({ gotoComponentBase }: IProps) {
    const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const bubble1Ref = useRef<HTMLDivElement>(null);
    const bubble2Ref = useRef<HTMLDivElement>(null);
    const bubble3Ref = useRef<HTMLDivElement>(null);
    const bubble4Ref = useRef<HTMLDivElement>(null);
    const { language, isMobile } = useContext(GlobalContext);
    const maxMoveZone = [
        { x: 0, y: 0, maxX: -24, maxY: 0 },
        { x: 0, y: 0, maxX: -20, maxY: -88 },
        { x: 0, y: 0, maxX: -8, maxY: -18 },
        { x: 0, y: 0, maxX: -48, maxY: 0 },
    ];
    const transformAnimation = (deltaX: number, deltaY: number, index: number) => {
        const { maxX, maxY, x, y } = maxMoveZone[index];
        const lastX = Math.min(0, Math.max(deltaX + x, maxX));
        const lastY = Math.min(0, Math.max(deltaY + y, maxY));
        maxMoveZone[index].x = lastX;
        maxMoveZone[index].y = lastY;
        return `translate(${lastX}px, ${lastY}px)`;
    };
    const bubbleStart = (e: MouseEvent) => {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
    };
    const bubbleMove = (e: MouseEvent) => {
        const { x, y } = lastPosRef.current;
        const deltaX = e.clientX - x;
        const deltaY = e.clientY - y;
        const refs = [bubble1Ref, bubble2Ref, bubble3Ref, bubble4Ref];
        refs.map((ref, index) => {
            ref.current &&
                (ref.current.style.transform = transformAnimation(deltaX, deltaY, index));
        });
        lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    return (
        <header
            className={`${baseClass} ${isMobile ? `${baseClass}-mobile` : ''}`}
            onMouseMove={bubbleMove}
            onMouseEnter={bubbleStart}
        >
            <div className={`${baseClass}-bubble1`} ref={bubble1Ref} />
            <div className={`${baseClass}-bubble2`} ref={bubble2Ref} />
            <div className={`${baseClass}-bubble3`} ref={bubble3Ref} />
            <div className={`${baseClass}-bubble4`} ref={bubble4Ref} />
            <div className={`${baseClass}-body`}>
                <div className={`${baseClass}-body-title`}>
                    <Img name="Arco_Design_Mobile.svg" />
                </div>
                <div className={`${baseClass}-body-sub-title`}>
                    {localeMap.HomeBannerSlogan[language]}
                </div>
                <div className={`${baseClass}-body-btn-group`}>
                    <div className="btn primary-btn" onClick={gotoComponentBase}>
                        <span className="start-btn-icon" />
                        {localeMap.HomeStartButton[language]}
                    </div>
                    <CodePopover appName="arco-design" className="secondary-btn-wrap">
                        <div className="btn secondary-btn">
                            {isMobile
                                ? localeMap.HomeQRButtonMobile[language]
                                : localeMap.HomeQRButton[language]}
                        </div>
                    </CodePopover>
                </div>
            </div>
        </header>
    );
}
