import React, { useState } from 'react';
import s from './Hedgehog.module.css';
import hedgehog from '../../image/hedgehog.png';
import { useNavigate } from 'react-router-dom';

const Hedgehog = (props) => {
  let [count, setCount] = useState(0);
  let navigate = useNavigate();

  const hedgOff = () => {
    if (
      props.category[0].data.length === 0 &&
      props.category[1].data.length === 0 &&
      props.category[2].data.length === 0 &&
      props.category[3].data.length === 0 &&
      count === 0
    ) {
      navigate('/about');
      setCount(1);
    }
    props.addActivHedgehog(false);
  };

  const preMessage = () => {
    props.addActivHedgehog(true);
  };

  return (
    <div className={s.popup}>
      <span
        tabIndex="2"
        onBlur={hedgOff}
        className={!props.activHedgehog ? s.popuptext : s.show}
        id="myPopup">
        {props.text}
      </span>
      <img src={hedgehog} alt="Ёжик" onClick={preMessage} />
    </div>
  );
};

export default Hedgehog;
