import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest{
  authorId: string
  questionId:string
  content:string
}

export class AnswerQuestionUseCase{
  execute({authorId,questionId,content}: AnswerQuestionUseCaseRequest){

    const answer = new Answer({
      authorId,
      content,
      questionId
    })

    return {
      answer
    }

  }
}