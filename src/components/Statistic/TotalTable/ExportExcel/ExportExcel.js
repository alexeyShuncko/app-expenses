import { Button } from 'antd';
import React from 'react';

const ExportExcel = (props) => {
  return (
    <div style={{ marginLeft: '10px' }}>
      <Button type="primary" title="Экcпортировать данные в Excel">
        Экспорт
      </Button>
    </div>
  );
};
export default ExportExcel;
