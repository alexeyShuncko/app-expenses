//import React from 'react';
import { useState } from 'react';
import s from '../../Hedgehog/Hedgehog.module.css';


 const HedgehogFunc = (addText,text) => {

//let [activ,setActiv]= useState(false)
let popup = document.getElementById("myPopup");

if (!popup.classList.contains(s.show)) {
    addText(text)
    popup.classList.toggle(s.show);
    //setActiv(true)
}
else if (popup.classList.contains(s.show)) {
    popup.classList.toggle(s.show);
}
   
   


    //if (!popup.classList.contains(s.show)) {
       // popup.classList.toggle(s.show);
        //  setTimeout(() => {
        //      popup.classList.remove(s.show)
        //  }, 4000)
     //}
        
    
   
}
export default HedgehogFunc





