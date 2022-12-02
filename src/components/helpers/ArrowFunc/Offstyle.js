import s from '../../Arrow/ArrowValidate.module.css';

const OffStyle = (idInput) => {
  idInput.map((a) => {
    let error = document.getElementById(a);
    error.classList.remove(s.error);
  });
};
export default OffStyle;
