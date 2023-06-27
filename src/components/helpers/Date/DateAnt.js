import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const DateAnt = (props) => {
  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY-MM-DD';

  const disabledDate = (current) => {
    let customDate = props.po;
    return current && current > dayjs(customDate, dateFormat);
  };

  return (
    <RangePicker
      placement={'bottomLeft'}
      defaultValue={[
        (props.period.S && dayjs(props.period.S, dateFormat)) ||
          dayjs(props.s, dateFormat),
        (props.period.Po && dayjs(props.period.Po, dateFormat)) ||
          dayjs(props.po, dateFormat),
      ]}
      format={dateFormat}
      disabledDate={disabledDate}
      onChange={props.onChangeDate}
    />
  );
};

export default DateAnt;
