//import React from 'react';
import s from '../../Arrow/ArrowValidate.module.css';


 const ArrowFunc = (idArrow, idInput, idButton) => {

   let button = document.getElementById(idButton)
   button.disabled= true
   setTimeout(() => {
      button.disabled = false
   }, 4000)

    let show = document.getElementById(idArrow)
    show.classList.toggle(s.show)
    setTimeout(() => {
       show.classList.remove(s.show)
    }, 3900)

    let error = document.getElementById(idInput)
   error.classList.toggle(s.error,true) 
    error.focus()
}


export default ArrowFunc



