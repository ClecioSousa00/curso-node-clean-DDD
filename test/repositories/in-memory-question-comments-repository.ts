import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/questions-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionsCommentsRepository
{
  items: QuestionComment[] = []
  async create(question: QuestionComment) {
    this.items.push(question)
  }
}
