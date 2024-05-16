import React from "react";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setQuestions(questions.filter((question) => question.id !== id));
      }
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={deleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
