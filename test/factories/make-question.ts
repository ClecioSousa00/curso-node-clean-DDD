import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export const makeQuestion = (override: Partial<QuestionProps> = {}) => {
  const question = Question.create({
    title: 'test question',
    authorId: new UniqueEntityID(),
    slug: Slug.create('test-question'),
    content: ' test question',
    ...override,
  })

  return question
}
