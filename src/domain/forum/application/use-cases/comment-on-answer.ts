import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentsRepository } from '../repositories/answers-comments-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersCommentsRepository: AnswersCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.questionsRepository.findById(answerId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answersCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
