import React from 'react';
import s from './AddSalaryDate.module.css';
import { Form, Select, Space, Button, DatePicker } from 'antd';

const AddSalaryDate = (props) => {
  const [form] = Form.useForm();

  const returnSetting = () => {
    window.history.back();
  };

  const onFinish = (values) => {
    const day = () => {
      if (values.date._d.getDate() < 10) {
        return `0${values.date._d.getDate()}`;
      } else return values.date._d.getDate();
    };

    const index = () => (values.name === 'Зарплата' ? 1 : 3);

    props.updateSalary(
      day(),
      props.diagramm.income.salary.find((a) => a.source === index())
        .salary_month > 12
        ? props.diagramm.income.data
            .find((a) => a.name === values.name)
            .data.find(
              (a) =>
                a.created.slice(5, 7) === props.diagramm.today.po.slice(5, 7)
            )
          ? Number(props.diagramm.today.po.slice(5, 7)) + 1
          : props.diagramm.today.po.slice(5, 7)
        : props.diagramm.income.salary.find((a) => a.source === index())
            .salary_month,
      props.diagramm.income.salary.find((a) => a.source === index()).source,
      props.diagramm.income.salary.find((a) => a.source === index()).id
    );

    props.addText(
      `${values.name} ${values.date._d.getDate()}-го числа, я запомнил  ...`
    );
    props.addActivHedgehog(true);
    form.resetFields();
  };

  const deleteDate = () => {
    props.updateSalary(
      1,
      13,
      3,
      props.diagramm.income.salary.find((a) => a.source === 3).id
    );
    props.addText(`Дата Аванса удалена ...`);
    props.addActivHedgehog(true);
  };

  const deleteSalary = () => {
    props.updateSalary(
      1,
      13,
      1,
      props.diagramm.income.salary.find((a) => a.source === 1).id
    );
    props.addText(`Дата Зарплаты удалена ...`);
    props.addActivHedgehog(true);
  };

  return (
    <div className={s.container}>
      <div className={s.title}>Добавление/изменение даты доходов</div>

      <div className={s.salaryDay}>
        <Form
          className={s.form}
          form={form}
          name="deleteCategory"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 9 }}
          onFinish={onFinish}
          initialValues={{ name: 'Зарплата' }}
          //onFinishFailed={onFinishFailed}
          autoComplete="off">
          <div className={s.dateSalary}>
            {props.diagramm.income.salary.find((a) => a.source === 3)
              .salary_month < 13 && (
              <div className={s.dateItem}>
                <div>
                  Аванс:{' '}
                  {
                    props.diagramm.income.salary.find((a) => a.source === 3)
                      .salary_day
                  }
                  -го числа.
                </div>
                <Button type="primary" danger size="small" onClick={deleteDate}>
                  Удалить
                </Button>
              </div>
            )}
            {props.diagramm.income.salary.find((a) => a.source === 1)
              .salary_month < 13 && (
              <div className={s.dateItem}>
                <div>
                  Зарплата:{' '}
                  {
                    props.diagramm.income.salary.find((a) => a.source === 1)
                      .salary_day
                  }
                  -го числа.
                </div>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={deleteSalary}>
                  Удалить
                </Button>
              </div>
            )}
          </div>

          <Form.Item label="Доход" name="name">
            <Select>
              <Select.Option value="Зарплата">Зарплата</Select.Option>
              <Select.Option value="Аванс">Аванс</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Дата"
            name="date"
            rules={[{ required: true, message: 'Выберите дату!' }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item style={{ marginTop: 30 }} wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Добавить дату
              </Button>
              <Button type="primary" danger onClick={returnSetting}>
                Назад
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div className={s.instruction}>
          <div>
            <div>1) Выберите доход из выпадающего списка</div>
            <div>2) Нажав на поле "Дата", выберите дату дохода</div>
            <div>3) Нажмите кнопку "Добавить дату"</div>
            {(props.diagramm.income.salary.find((a) => a.source === 1)
              .salary_month < 13 ||
              props.diagramm.income.salary.find((a) => a.source === 3)
                .salary_month < 13) && (
              <div>
                * Если вы хотите удалить напоминание о дате дохода, нажмите
                кнопку "Удалить" рядом с нужным доходом
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalaryDate;
