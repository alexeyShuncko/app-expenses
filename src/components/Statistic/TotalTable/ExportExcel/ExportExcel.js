import { Button } from 'antd';
import React from 'react';

const ExportExcel = ({ addText, addActivHedgehog }) => {
  const clickHandler = () => {
    addText('Функционал в стадии разработки...');
    addActivHedgehog(true);
  };
  return (
    <div style={{ marginLeft: '10px' }}>
      <Button
        type="primary"
        title="Экcпортировать данные в Excel"
        onClick={clickHandler}>
        Экспорт
      </Button>
    </div>
  );
};
export default ExportExcel;
