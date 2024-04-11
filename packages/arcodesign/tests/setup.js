import React from "react";
React.useLayoutEffect = React.useEffect;


if (typeof window !== 'undefined') {
    window.matchMedia = () => {};
}
