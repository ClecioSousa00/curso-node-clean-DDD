import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    getQuestionBySlug = new GetQuestionBySlugUseCase(
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = Question.create({
      title: 'test question',
      authorId: new UniqueEntityID(),
      slug: Slug.create('test-question'),
      content: ' test question',
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await getQuestionBySlug.execute({
      slug: 'test-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
