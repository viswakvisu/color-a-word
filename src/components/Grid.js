import React, { useContext } from 'react';
import Masonry from 'react-masonry-component';
import Loader from 'react-loader';

import ColorsContext from './ColorsContext.js';

import './Grid.css';

const Grid = () => {
    const { isLoading, colors } = useContext(ColorsContext);
    return (
        <div>
            {isLoading ? <Loader /> : (
                <Masonry>
                    {colors.map(color => {
                        const { textColor, bgColor } = color;
                        const randomHeight = Math.floor(Math.random() * 200) + 200 + 'px';
                        return <div key={bgColor} className={bgColor === '#FFFAFA' ? 'grid-item special-item' : 'grid-item'} style={{ lineHeight: randomHeight, height: randomHeight, color: textColor, backgroundColor: bgColor }}>{bgColor}</div>
                    })}
                </Masonry>
            )}
        </div>
    );
};

export default Grid;