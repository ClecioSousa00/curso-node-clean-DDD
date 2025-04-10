import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let deleteAnswer: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    deleteAnswer = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete answer', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newQuestion)

    await deleteAnswer.execute({
      answerId: 'answer-1',
      authorId: 'authorId-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })
  it('should not be able to delete answer from another user', async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryAnswerRepository.create(newQuestion)

    await expect(() =>
      deleteAnswer.execute({
        answerId: 'answer-1',
        authorId: 'authorId-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
