import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    editAnswer = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await editAnswer.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'authorId-1',
      content: 'conteúdo pergunta',
    })

    expect(inMemoryAnswerRepository.items).toEqual([
      expect.objectContaining({ title: 'pergunta teste' }),
    ])
  })
  it('should not be able to edit answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(() =>
      editAnswer.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'authorId-2',
        content: 'conteúdo pergunta',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
