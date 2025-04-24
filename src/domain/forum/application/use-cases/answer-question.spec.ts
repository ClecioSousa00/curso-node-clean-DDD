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
    const result = await answerQuestions.execute({
      questionId: '2',
      authorId: '2',
      content: 'resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
