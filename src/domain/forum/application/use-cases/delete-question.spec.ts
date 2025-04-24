import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let deleteQuestion: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    deleteQuestion = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await deleteQuestion.execute({
      questionId: 'question-1',
      authorId: 'authorId-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await deleteQuestion.execute({
      questionId: 'question-1',
      authorId: 'authorId-2',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
