import { randomUUID } from "node:crypto"

interface QuestionProps{
  title:string
  content:string
  authorId:string
}

export class Question{
  title: string
  content: string
  id:string
  authorId: string

  constructor(props: QuestionProps, id?: string){
    this.title = props.title
    this.content = props.content
    this.id = id ?? randomUUID()
    this.authorId = props.authorId
  }
}
