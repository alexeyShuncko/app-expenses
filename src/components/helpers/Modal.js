import { Modal } from 'antd';
import React, { useState } from 'react';

const MyModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const variant = () => {
    if (props.select === 'расходов') {
      return 'expenses';
    } else return 'incomes';
  };

  const handleOk = () => {
    setConfirmLoading(true);
    props.deleteAppRecording(variant(), props.idDelet).then(() => {
      setConfirmLoading(false);
      props.setVisible(false);
      props.addText(`Запись из ${props.select} удалена...`);
      props.addActivHedgehog(true);
    });
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title={props.title}
        open={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{props.modalText}</p>
      </Modal>
    </>
  );
};

export default MyModal;
