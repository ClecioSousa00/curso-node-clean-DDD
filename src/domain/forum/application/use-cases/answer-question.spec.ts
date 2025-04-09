import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let answerQuestions: AnswerQuestionUseCase

describe('Create Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    answerQuestions = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a answer questions', async () => {
    const { answer } = await answerQuestions.execute({
      questionId: '2',
      authorId: '2',
      content: 'resposta',
    })

    expect(answer.content).toEqual('resposta')
  })
})
