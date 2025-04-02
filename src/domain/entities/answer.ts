import { randomUUID } from "node:crypto"

export class Answer{
  content: string
  id:string

  constructor( content:string,id?: string){
    this.content = content
    this.id = id ?? randomUUID()
  }
}
