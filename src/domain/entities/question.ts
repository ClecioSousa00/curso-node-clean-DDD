import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps{
  title:string
  content:string
  authorId:string
  slug: Slug
}

export class Question{
  title: string
  content: string
  id:string
  authorId: string
  slug: Slug


  constructor(props: QuestionProps, id?: string){
    this.title = props.title
    this.content = props.content
    this.id = id ?? randomUUID()
    this.authorId = props.authorId
    this.slug = props.slug
  }
}
