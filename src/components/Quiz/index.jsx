import { QuestionAnswer } from "../QuestionAnswer";
import React, { useState } from "react";

import { Result } from "../Result";
import { ProgressBar } from "../ProgressBar";

import S from './styles.module.scss'

const QUESTIONS = [
  {
    id: 1,
    question: 'Qual é meu nome?',
    answers: ["Miguel", "Luis", "Matheus", "Ana"],
    correctAnswer: "Matheus",
  },
  {
    id: 2,
    question: 'Qual é minha idade?',
    answers: ['12', '2', '26', '32'],
    correctAnswer: '26',
  },
  {
    id: 3,
    question: 'O que eu sou?',
    answers: ['Desenvolvedor', 'Médico', 'Eletricista', 'jogador de Futebol'],
    correctAnswer: 'Desenvolvedor',
  },
]

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTakingQuiz, setIsTakingQuiz] = useState(true)
  const [isCurrentQuestionAnswer, setIsCurrentQuestionAnswer] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  
  const handleNextQuestion = () =>{
    if(currentQuestionNumber < QUESTIONS.length){
      setCurrentQuestionIndex (currentQuestionNumber)
    } else{
      setIsTakingQuiz(false)
    }
    setIsCurrentQuestionAnswer(false)
  }

  const handleAnswerQuestion = (event, question, userAnswer) =>{
    if(isCurrentQuestionAnswer) {
      return
    }
    const isCorrectAnswer = question.correctAnswer === userAnswer
    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
    event.currentTarget.classList.toggle(resultClassName)
    if(isCorrectAnswer){
      setCorrectAnswersCount(correctAnswersCount + 1)
    }
    
    setIsCurrentQuestionAnswer(true)
  }

  const handleTryAgain = () => {
    setIsTakingQuiz(true)
    setCurrentQuestionIndex(0)
    setCorrectAnswersCount(0)
  }
  console.log(correctAnswersCount)
  const quizSize = QUESTIONS.length
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1
  const navigationButtonText = currentQuestionNumber === quizSize ? 'ver resultado' : 'proxima pergunta'
  return (
    <div className={S.container}>
      <div className={S.card}>
        {isTakingQuiz ? (
          <div className={S.quiz}>
            <ProgressBar size={quizSize} currentStep={currentQuestionNumber} />
            <header className = {S.quizHeader} >
                <span>Pergunta {currentQuestionNumber}/{quizSize}</span>
                <p>{currentQuestion.question}</p>
            </header>

            <ul className={S.answers}>
                {currentQuestion.answers.map(answer => {
                  return(
                    <li key={answer}> 
                      <QuestionAnswer 
                        question = {currentQuestion}
                        answer={answer} 
                        handleAnswerQuestion = {handleAnswerQuestion} />
                    </li>
                  )
                  })}
            </ul>
            

            <button className={S.navigationBtn} onClick={handleNextQuestion} >
              {navigationButtonText}
            </button>
          </div>
        ) : (
          <Result
            correctAnswersCount = { correctAnswersCount}
            quizSize = {quizSize}
            handleTryAgain = {handleTryAgain}
          />
        )}
      </div>
    </div>
  )
}