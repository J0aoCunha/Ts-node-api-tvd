import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function CharsRoutes(app: FastifyInstance) {
  // Endpoint para obter todos os personagens
  app.get('/chars', async () => {
    const chars = await prisma.characters.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return chars.map((char) => {
      return {
        id: char.id,
        name: char.name,
        description: char.description.substring(0, 350).concat('...'),
        imageURL: char.imageURL,
        type: char.type,
        actorName: char.actorName,
      }
    })
  })

  // Endpoint para obter um personagem por ID
  app.get('/chars/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const char = await prisma.characters.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return {
      id: char.id,
      name: char.name,
      description: char.description,
      imageURL: char.imageURL,
      type: char.type,
      actorName: char.actorName,
    }
  })

  // Endpoint para criar um novo personagem
  app.post('/chars', async (req) => {
    const bodySchema = z.object({
      description: z.string(),
      name: z.string(),
      imageURL: z.string(),
      type: z.string(),
      actorName: z.string(),
    })

    const { description, name, imageURL, type, actorName } = bodySchema.parse(
      req.body,
    )

    const createdChar = await prisma.characters.create({
      data: {
        name,
        actorName,
        description,
        imageURL,
        type,
      },
    })

    return {
      id: createdChar.id,
      name: createdChar.name,
      description: createdChar.description,
      imageURL: createdChar.imageURL,
      type: createdChar.type,
      actorName: createdChar.actorName,
    }
  })

  // Endpoint para atualizar um personagem por ID
  app.put('/chars/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      description: z.string(),
      name: z.string(),
      imageURL: z.string(),
      type: z.string(),
      actorName: z.string(),
    })

    const { description, name, imageURL, type, actorName } = bodySchema.parse(
      req.body,
    )

    await prisma.characters.update({
      where: {
        id,
      },
      data: {
        name,
        actorName,
        description,
        imageURL,
        type,
      },
    })
  })

  // Endpoint para deletar um personagem por ID
  app.delete('/chars/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.characters.delete({
      where: {
        id,
      },
    })
  })
}
