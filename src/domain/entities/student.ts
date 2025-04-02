import { randomUUID } from "node:crypto"

export class Student{
  title: string
  id:string

  constructor(title:string, id?: string){
    this.title = title
     this.id = id ?? randomUUID()
  }
}
