//import React from 'react';
import s from '../../Hedgehog/Hedgehog.module.css';

import HedgehogFunc from '../HedgehodFunc/HedgehogFunc';
import { addText } from '../../../../Redux/diagrammReducer';



    export const ValidTextFunc = (e) => {
        const regex1 = /[^А-ЯЁа-яё]/
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            let Hedgehog= document.getElementById('myPopup')
            if (Hedgehog.classList.value===s.popuptext){
            HedgehogFunc(addText, 'Переключи на русский язык ...')
            }
        }
        e.target.value = e.target.value.replace(regex1, '')
    }

