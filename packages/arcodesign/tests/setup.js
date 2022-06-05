import React from "react";
React.useLayoutEffect = React.useEffect;

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

if (typeof window !== 'undefined') {
    window.matchMedia = () => {};
}
