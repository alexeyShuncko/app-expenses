import { useEffect, useState } from 'react';

const Ticker = (props) => {
  const [arrTest, setArrTest] = useState([]);
  let count = 19;
  // Побуквенный вывод
  const strTest = 'Основные тонкости: ';

  useEffect(() => {
    if (arrTest.length !== count) {
      const idInt = setInterval(() => {
        setArrTest([...arrTest, strTest[count - (count - arrTest.length)]]);
      }, 50);

      return () => clearInterval(idInt);
    }
  }, [arrTest, count]);

  return <span>{arrTest.join('')}</span>;
};
export default Ticker;
