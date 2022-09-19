import s from '../../Hedgehog/Hedgehog.module.css';
import HedgehogFunc from '../HedgehodFunc/HedgehogFunc';
import connect from './../../Main/Main';
import { addText } from './../../../../Redux/diagrammReducer';



    const ValidTextFunc = (e) => {
        const regex1 = /[^А-ЯЁа-яё]/
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            let Hedgehog= document.getElementById('myPopup')
            if (Hedgehog.classList.value===s.popuptext){
            HedgehogFunc (addText,'Переключи на русский язык ...')
            }
        }
        e.target.value = e.target.value.replace(regex1, '')
    }

    let mapStateToProps = (state) => {
        return {
            diagramm: state.expenses
        }
    }

    export default connect (mapStateToProps,{addText})(ValidTextFunc)

