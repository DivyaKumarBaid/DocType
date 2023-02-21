import anime from 'animejs';
import React from 'react'

const Loader = ({ color, size, stokeWidth }) => {
    React.useEffect(() => {
        anime({
            targets: '.p1',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1800,
            delay: function (el, i) { return i * 150 },
            direction: 'alternate',
            loop: true
        });
    }, [])
    return (
        <div>
            <svg id="svgLoader" viewBox="0 0 259.02 459.18" width={size || 150}>
                <polygon className='p1' points="148.22 306.96 146.31 66.24 245.2 1.84 245.2 365.98 148.22 306.96" fill="none" stroke={color || "#fff"} strokeWidth={stokeWidth || "5"} strokeDasharray={1000} />

                <polygon className='p1' points="245.2 1.84 258.02 5.34 258.02 358.01 245.2 365.98 245.2 1.84" fill="none" stroke={color || "#fff"} strokeWidth={stokeWidth || "5"} strokeDasharray={1000} />

                <path className='p1' d="M4,393.53a3.06,3.06,0,0,1-2.15-.9A3,3,0,0,1,1,390.5l.26-95A3,3,0,0,1,2.69,293L258,134.88v102a3,3,0,0,1-1.44,2.57L5.59,393.08A3,3,0,0,1,4,393.53Z" fill="none" stroke={color || "#fff"} strokeWidth={stokeWidth || "5"} strokeDasharray={1000} />

                <path className='p1' d="M13,419.16a3,3,0,0,1-1.58-5.57L258,260.68v97.91c-63.16,39.24-96.89,60.18-97.56,60.55l-.34.15a3.1,3.1,0,0,1-1.05.19h0Z" fill="none" stroke={color || "#fff"} strokeWidth={stokeWidth || "5"} strokeDasharray={1000} />

                <path className='p1' d="M190.48,424.52A3,3,0,0,1,191.9,422L258,380.82v34.44a3,3,0,0,1-1.46,2.58l-66,39.57Z" fill="none" stroke={color || "#fff"} strokeWidth={stokeWidth || "5"} strokeDasharray={1000} />
            </svg>

        </div>
    )
}
export default Loader;
