import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('Create Question Use Case', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '2',
    content: 'resposta',
    title: 'nova pergunta',
  })

  expect(question.content).toEqual('resposta')
  expect(question.id).toBeTruthy()
})
