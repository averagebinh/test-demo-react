import { useEffect, useState } from 'react';
import './TableQuiz.scss';
import {
  deleteQuiz,
  getAllQuizForAdmin,
} from '../../../../services/apiServices';

import ModalUpdateQuiz from './ModalUpdateQuiz';
import { toast } from 'react-toastify';
import ModalDeleteUser from '../ModalDeleteUser';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import { useTranslation } from 'react-i18next';

const TableQuiz = (props) => {
  const { t } = useTranslation();
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setDataUpdateQuiz({});
    setDataDeleteQuiz({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      // console.log('List quiz', res.DT);
    }
  };
  const handleClickBtnUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };
  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  return (
    <>
      <div>{t('admin.manageQuiz.tableQuiz.title')}</div>
      <table className='table table-hover table-bordered my-2'>
        <thead>
          <tr>
            <th scope='col'>{t('admin.manageQuiz.tableQuiz.id')}</th>
            <th scope='col'>{t('admin.manageQuiz.tableQuiz.name')}</th>
            <th scope='col'>{t('admin.manageQuiz.tableQuiz.description')}</th>
            <th scope='col'>{t('admin.manageQuiz.tableQuiz.type')}</th>
            <th scope='col'>{t('admin.manageQuiz.tableQuiz.action')}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: 'flex', gap: '15px' }}>
                    <button
                      className='btn btn-warning'
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      {t('admin.manageQuiz.tableQuiz.buttons.edit')}
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      {t('admin.manageQuiz.tableQuiz.buttons.delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        fetchQuiz={fetchQuiz}
        setDataUpdateQuiz={setDataUpdateQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
