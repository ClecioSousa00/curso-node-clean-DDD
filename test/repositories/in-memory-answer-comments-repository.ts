import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answers-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  items: AnswerComment[] = []
  async create(answer: AnswerComment) {
    this.items.push(answer)
  }
}
