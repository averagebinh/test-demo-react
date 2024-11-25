import React, { useEffect, useState } from 'react';
import { getHistory } from '../../services/apiServices';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const History = () => {
  const { t } = useTranslation();
  const [newData, setNewData] = useState('');
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    let res = await getHistory();
    console.log('res ', res);
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item.quizHistory.name ?? '',
          id: item.id,
          date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A'),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setNewData(newData);
    }
  };

  return (
    <div>
      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Quiz Name</th>
            <th scope='col'>Total Question</th>
            <th scope='col'>Total Correct</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>
        <tbody>
          {newData &&
            newData.length > 0 &&
            newData.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          {newData && newData.length === 0 && (
            <tr>
              <td colSpan={'4'}> Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
