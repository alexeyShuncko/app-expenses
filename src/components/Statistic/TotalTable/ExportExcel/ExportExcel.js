import { Button } from 'antd';
import Converter_V_HEX from '../../../helpers/converter/converterHEX';
import { DataTransformation } from '../../../helpers/DataTransformation/DataTransformation';
const ExcelJS = require('exceljs');

const ExportExcel = ({ diagramm, periodS, periodPo }) => {
  let arrData = [];

  const categ =
    diagramm.tableSelect === 'расходов'
      ? diagramm.category
      : diagramm.income.data;

  let result = categ.map((a) => {
    return {
      name: a.name,
      color: a.color,
      data: a.data.filter(
        (b) =>
          b.created >= (periodS || diagramm.today.s) &&
          b.created <= (periodPo || diagramm.today.po)
      ),
    };
  });

  result.forEach((category) => {
    category.data.forEach((rec) => {
      arrData.push({
        name: category.name,
        color: Converter_V_HEX(category.color).slice(1),
        amount: rec.amount,
        created: new Date(rec.created),
        id: rec.id,
      });
    });
  });

  const clickHandler = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `${DataTransformation(
        periodS || diagramm.today.s
      )} - ${DataTransformation(periodPo || diagramm.today.po)}`
    );

    worksheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      totalsRow: true,
      style: {
        theme: 'TableStyleMedium11',
        showRowStripes: true,
        //showColumnStripes: true,
      },
      columns: [
        {
          name: 'Имя',
          filterButton: true,
          totalsRowLabel: 'Всего:',
        },
        { name: 'Дата', filterButton: true },
        { name: 'Сумма', filterButton: true, totalsRowFunction: 'sum' },
      ],
      rows: arrData.map((el) => [el.name, el.created, el.amount]),
    });

    const table = worksheet.getTable('MyTable');

    for (let i = 0; i < table.table.rows.length; i++) {
      for (let j = 0; j < table.table.columns.length; j++) {
        worksheet.getRow(i + 2).findCell(j + 1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: arrData[i]?.color },
        };
      }
    }

    table.commit();

    worksheet.views = [
      {
        state: 'frozen',
        xSplit: 0,
        ySplit: 1,
      },
    ];

    worksheet.getColumn(1).width = 22;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 15;
    worksheet.getRow(1).font = {
      bold: true,
      size: 13,
    };
    worksheet.lastRow.font = {
      bold: true,
      size: 13,
    };
    worksheet.lastRow.findCell(1).border = {
      right: {
        color: { argb: 'A5A5A5' },
        style: 'thin',
      },
    };

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Таблица ${diagramm.tableSelect}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
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
