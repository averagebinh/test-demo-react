import _ from 'lodash';
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) return <></>;

  return (
    <>
      {data.image && (
        <div className='q-image'>
          <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
        </div>
      )}
      <div className='question'>
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className='answer'>
        {data.answers &&
          data.answers.length &&
          data.answers.map((answer, index) => {
            return (
              <div key={`${index}-answer`} className='a-child'>
                <div class='form-check'>
                  <input class='form-check-input' type='checkbox' value='' />
                  <label class='form-check-label'>{answer.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
