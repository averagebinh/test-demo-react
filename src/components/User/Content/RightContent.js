const RightContent = (props) => {
  const { dataQuiz } = props;
  console.log('dataQuiz ', dataQuiz);
  return (
    <>
      <div className='main-timer'>10:10</div>
      <div className='main-question'>
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((data, index) => {
            return <div className='question'>{index + 1} </div>;
          })}
      </div>
    </>
  );
};

export default RightContent;
