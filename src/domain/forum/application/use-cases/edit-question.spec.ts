import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    editQuestion = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await editQuestion.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'authorId-1',
      title: 'pergunta teste',
      content: 'conteúdo pergunta',
    })

    expect(inMemoryQuestionsRepository.items).toEqual([
      expect.objectContaining({ title: 'pergunta teste' }),
    ])
  })
  it('should not be able to edit question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorId-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      editQuestion.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'authorId-2',
        title: 'pergunta teste',
        content: 'conteúdo pergunta',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
