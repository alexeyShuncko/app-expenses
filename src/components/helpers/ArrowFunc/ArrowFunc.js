//import React from 'react';
import s from '../../Arrow/ArrowValidate.module.css';


 const ArrowFunc = (idArrow, idInput, classButton) => {

if (classButton) {
   let button = document.getElementsByClassName(classButton)
   let arr = Array.from(button)
   arr.map(a =>  a.disabled = true)
   setTimeout(() => {arr.map(a=>
       a.disabled = false)
   }, 4000)
}


if (idArrow) {
   let show = document.getElementById(idArrow)
   show.classList.toggle(s.show)
   setTimeout(() => {
      show.classList.remove(s.show)
   }, 3900)
}
   
if (idInput) {
   let error = document.getElementById(idInput)
   error.classList.toggle(s.error,true)
    error.focus()
}
    
}


export default ArrowFunc



