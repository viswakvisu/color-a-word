import React, { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import isAlpha from 'validator/es/lib/isAlpha';

import ColorsContext from './ColorsContext.js';

import './UserInput.css';

const UserInput = () => {
    const { isLoading, isReSearchNeed, findColors } = useContext(ColorsContext);
    const [val, setValue] = useState('');
    const [currentResultVal, setCurrentResultVal] = useState('');
    const handleChange = e => {
        setValue(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        const searchVal = val.trim().toLowerCase();
        if (searchVal !== '') {
            if (isAlpha(searchVal)) {
                if (searchVal !== currentResultVal || isReSearchNeed) {
                    setCurrentResultVal(searchVal);
                    findColors(searchVal);
                } else {
                    toast.info('Please enter different word for new search...', {
                        toastId: 'notDifferent'
                    });
                }
            } else {
                toast.info('Please enter any valid word to search...', {
                    toastId: 'notValid'
                });
            }
        } else {
            toast.info('Please enter any word to search...', {
                toastId: 'notPresent'
            });
        }
    };
    return (
        <form onSubmit={handleSubmit} className='input-form'>
            <input type="text" maxLength={50} placeholder={useMediaQuery({ query: '(min-width: 456px)' }) ? 'Enter a word. Only a-z letters(max 50). Eg: watermelon' : 'Enter a word (a-z) (max 50).'} value={val} onChange={handleChange} disabled={isLoading} className='user-input' />
            <input type="submit" value="Get Colors" disabled={isLoading} className='user-submit' />
        </form>
    );
};

export default UserInput;