
export class Slug{
  value: string

  constructor(value: string){
    this.value = value
  }

  static createFromText(text: string){
    const slugText = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w-]+/g, ''); // Remove caracteres especiais

  return new Slug(slugText);
  }
}