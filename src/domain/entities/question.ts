import { randomUUID } from "node:crypto"

export class Question{
  title: string
  content: string
  id:string

  constructor(title:string, content:string,id?: string){
    this.title = title
    this.content = content
     this.id = id ?? randomUUID()
  }
}
