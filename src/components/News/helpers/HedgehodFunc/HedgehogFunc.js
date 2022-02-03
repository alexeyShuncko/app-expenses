//import React from 'react';
import s from '../../Hedgehog/Hedgehog.module.css';


 const HedgehogFunc = (addText,text) => {

    addText(text)

    let popup = document.getElementById("myPopup");
    popup.classList.toggle(s.show);
    setTimeout(() => {
        popup.classList.remove(s.show)
    }, 4000)
}


export default HedgehogFunc



