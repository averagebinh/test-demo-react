import Select from 'react-select';
import { useState, useEffect } from 'react';
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AssignQuiz = (props) => {
  const { t } = useTranslation();
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
      // console.log('List quiz', res.DT);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUsers();
    // console.log('res', res);
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(users);
      // console.log('List quiz', res.DT);
    }
  };

  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    console.log('>>>check res', res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className='assign-quiz-container row'>
      <div className='col-6 form-group'>
        <label className='mb-2'>
          {t('admin.manageQuiz.assignQuiz.select-1')}
        </label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className='col-6 form-group'>
        <label className='mb-2'>
          {t('admin.manageQuiz.assignQuiz.select-2')}
        </label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>

      <div>
        <button onClick={() => handleAssign()} className='btn btn-warning mt-3'>
          {t('admin.manageQuiz.assignQuiz.button')}
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
