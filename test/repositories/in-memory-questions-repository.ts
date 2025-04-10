import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  items: Question[] = []
  async create(question: Question) {
    this.items.push(question)
  }

  async findBySlug(slug: string) {
    const slugQuestion = this.items.find((item) => item.slug.value === slug)

    if (!slugQuestion) return null

    return slugQuestion
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    return question ?? null
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question
  }
}
