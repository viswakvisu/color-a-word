import React, { useState } from 'react';
import { get } from 'axios';
import { isArray, forEach, uniq } from 'lodash';
import ColorThief from 'color-thief-browser';
import rgb2hex from 'rgb2hex';
import { contrastColor } from 'contrast-color';
import { toast } from 'react-toastify';

import { ColorsProvider } from './ColorsContext.js';

const ColorsContextProvider = props => {
    const [colors, setColors] = useState([]);
    const [isReSearchNeed, setIsReSearchNeed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const findColors = word => {
        setIsLoading(true);
        setIsReSearchNeed(false);
        setColors([]);
        get('https://viswasapigateway.herokuapp.com', {
            params: {
                word
            }
        })
            .then(res => {
                const { status, data } = res;
                if (status === 200 && data) {
                    const { photos } = data;
                    if (photos && isArray(photos) && photos.length) {
                        const res = [];
                        const colorThief = new ColorThief();
                        forEach(photos, (photo, i) => {
                            const { src } = photo;
                            if (src && src.tiny) {
                                const img = new Image();
                                img.addEventListener('load', () => {
                                    const dominantColor = colorThief.getColor(img);
                                    const dominantColorHex = rgb2hex(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`).hex;
                                    const contrastColorHex = contrastColor({ bgColor: dominantColorHex });
                                    res.push({ bgColor: `#${dominantColorHex.slice(1).toUpperCase()}`, textColor: contrastColorHex });
                                    const avgColorHex = photo.avg_color;
                                    const avgContrastColorHex = contrastColor({ bgColor: avgColorHex });
                                    res.push({ bgColor: avgColorHex, textColor: avgContrastColorHex });
                                    if (i === photos.length - 1) {
                                        setColors(uniq(res));
                                        setIsLoading(false);
                                    }
                                });
                                img.crossOrigin = 'Anonymous';
                                img.src = src.tiny;
                            }
                        });
                    } else {
                        setIsLoading(false);
                        toast.info('Sorry, no data found. Please try with different word...');
                    }
                } else {
                    setIsLoading(false);
                    setIsReSearchNeed(true);
                    toast.error('Something went wrong. Please try again later...');
                }
            })
            .catch(err => {
                setIsLoading(false);
                setIsReSearchNeed(true);
                toast.error('Something went wrong. Please try again later...');
            });
    };

    return (
        <ColorsProvider value={{ colors, isLoading, isReSearchNeed, findColors }}>
            {props.children}
        </ColorsProvider>
    );
}

export default ColorsContextProvider;