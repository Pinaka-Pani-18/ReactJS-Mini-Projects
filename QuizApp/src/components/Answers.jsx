/* eslint-disable react/prop-types */
const Answers = ({ id, answers, handleAnswer }) => {
  return (
    <div className="flex flex-col">
      {Object.keys(answers).map(
        (answer) =>
          answers[answer] !== null && (
            <div key={answer} onClick={() => handleAnswer(id, answer)}>
              {answers[answer]}
            </div>
          )
      )}
    </div>
  );
};

export default Answers;
