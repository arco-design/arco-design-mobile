import React from 'react';
import { Avatar } from '../../../../../packages/arcodesign/components';

const getAvatarUrl = name => `https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/${name}`;
export default function AvatarDemo() {
    return (
        <div className="typical-demo-card typical-demo-avatar-box">
            <div className="avatar-box">
                <Avatar size="large" src={getAvatarUrl('avatar_m.png')} />
                <span className="size-text" style={{ marginTop: 4 }}>
                    56x56
                </span>
            </div>
            <div className="avatar-box">
                <Avatar size="medium" src={getAvatarUrl('avatar_x.png')} />
                <span className="size-text" style={{ marginTop: 8 }}>
                    48x48
                </span>
            </div>
            <div className="avatar-box">
                <Avatar size="small" src={getAvatarUrl('avatar_t.png')} />
                <span className="size-text" style={{ marginTop: 12 }}>
                    40x40
                </span>
            </div>
            <div className="avatar-box">
                <Avatar size="smaller" src={getAvatarUrl('avatar_z.png')} />
                <span className="size-text" style={{ marginTop: 16 }}>
                    32x32
                </span>
            </div>
            <div className="avatar-box">
                <Avatar size="ultra-small" src={getAvatarUrl('avatar_d.png')} />
                <span className="size-text" style={{ marginTop: 20 }}>
                    24x24
                </span>
            </div>
        </div>
    );
}
