import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let commentOnQuestionUseCase: CommentOnAnswerUseCase

describe('Comment on Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    commentOnQuestionUseCase = new CommentOnAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await commentOnQuestionUseCase.execute({
      authorId: question.authorId.toString(),
      answerId: question.id.toString(),
      content: 'novo comentário',
    })

    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
      'novo comentário',
    )
  })
})
