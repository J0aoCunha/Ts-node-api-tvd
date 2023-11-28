import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function CharsRoutes(app: FastifyInstance) {
  app.get('/chars', async () => {
    const chars = await prisma.characters.findMany({
      orderBy: {
        name: 'desc',
      },
    })

    return chars.map((chars) => {
      return {
        id: chars.id,
        name: chars.name,
        description: chars.description.substring(0, 200).concat('...'),
        imageURL: chars.imageURL,
        type: chars.type,
        actorName: chars.actorName,
      }
    })
  })

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

    return char
  })

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

    const char = await prisma.characters.create({
      data: {
        name,
        actorName,
        description,
        imageURL,
        type,
      },
    })

    return char
  })

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

  app.delete('/chars', async (req) => {
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
