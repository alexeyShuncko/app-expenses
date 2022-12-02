import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
  return (
    <div className={s.valid}>
      <div className={s.message} id={props.idMessage}>
        {props.textMessage}
      </div>
    </div>
  );
};

export default Message;
