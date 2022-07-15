import React from 'react';
import { CountDown } from '../../../../../packages/arcodesign/components';

export default function CountDownDemo() {
    function padZero(time) {
        return time >= 10 ? time : `0${time}`;
    }

    return (
        <div className="typical-demo-card typical-demo-cd-box">
            <CountDown
                time={16569e3}
                renderChild={timeData => (
                    <>
                        <span className="block">{padZero(timeData.hours)}</span>
                        <span className="colon">:</span>
                        <span className="block">{padZero(timeData.minutes)}</span>
                        <span className="colon">:</span>
                        <span className="block">{padZero(timeData.seconds)}</span>
                    </>
                )}
            />
        </div>
    );
}
