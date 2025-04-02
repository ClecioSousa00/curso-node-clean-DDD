
import {expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer',() =>{
  const answerQuestion =new AnswerQuestionUseCase()

  const {answer} = answerQuestion.execute({
    questionId:'2',
    instructorId:'2',
    content:'resposta'
  })

  expect(answer.content).toEqual('resposta')
})