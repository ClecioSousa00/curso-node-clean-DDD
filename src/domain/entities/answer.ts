import { randomUUID } from "node:crypto"

interface AnswerProps{
  content:string
  authorId:string
  questionId:string
}

export class Answer{
  id:string
  content: string
  authorId: string
  questionId:string

  constructor( props: AnswerProps, id?: string){
    this.content = props.content
    this.id = id ?? randomUUID()
    this.authorId= props.authorId
    this.questionId = props.questionId
  }
}
