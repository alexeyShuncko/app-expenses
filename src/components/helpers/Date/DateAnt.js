import { DatePicker } from 'antd';

const DateAnt = (props) => {
  const { RangePicker } = DatePicker;

  const disabledDate = (current) => {
    let customDate = props.po;
    return current && current > new Date(customDate);
  };

  return (
    <RangePicker
      placement={'bottomLeft'}
      // defaultValue={[
      //   (props.period.S && new Date(props.period.S)) || new Date(props.s),
      //   (props.period.Po && new Date(props.period.Po)) || new Date(props.po),
      // ]}
      disabledDate={disabledDate}
      onChange={props.onChangeDate}
    />
  );
};

export default DateAnt;
