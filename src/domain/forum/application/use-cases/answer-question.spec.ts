import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const { answer } = await answerQuestion.execute({
    questionId: '2',
    authorId: '2',
    content: 'resposta',
  })

  expect(answer.content).toEqual('resposta')
})
