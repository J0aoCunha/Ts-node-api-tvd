import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { number, string, z } from 'zod'

export async function CharsRoutes(app: FastifyInstance) {
  // Endpoint para obter todos os personagens
  app.get('/chars', async () => {
    const chars = await prisma.characters.findMany({
      include: {
        seasons: true,
      },
      orderBy: {
        name: 'desc',
      },
    })

    return chars.map((char) => {
      return {
        id: char.id,
        name: char.name,
        description: char.description.substring(0, 200).concat('...'),
        imageURL: char.imageURL,
        type: char.type,
        actorName: char.actorName,
        seasons: char.seasons.map((season) => season.season),
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
      include: {
        seasons: true,
      },
    })

    return {
      id: char.id,
      name: char.name,
      description: char.description,
      imageURL: char.imageURL,
      type: char.type,
      actorName: char.actorName,
      seasons: char.seasons.map((season) => season.season),
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
      seasons: z.array(z.number()), // Modifique para aceitar números inteiros
    })

    const { description, name, imageURL, type, actorName, seasons } =
      bodySchema.parse(req.body)

    const createdChar = await prisma.characters.create({
      data: {
        name,
        actorName,
        description,
        imageURL,
        type,
        seasons: {
          create: seasons.map((season) => ({ season })),
        },
      },
      include: {
        seasons: true,
      },
    })

    return {
      id: createdChar.id,
      name: createdChar.name,
      description: createdChar.description,
      imageURL: createdChar.imageURL,
      type: createdChar.type,
      actorName: createdChar.actorName,
      seasons: createdChar.seasons.map((season) => season.season),
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
      seasons: z.array(z.number()),
    })

    const { description, name, imageURL, type, actorName, seasons } =
      bodySchema.parse(req.body)

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
        seasons: {
          deleteMany: {}, // Deleta todas as associações de temporadas existentes
          create: seasons.map((season) => ({ season })),
        },
      },
      include: {
        seasons: true,
      },
    })
  })

  // Endpoint para deletar um personagem por ID
  // app.delete('/chars/:id', async (req) => {
  //   const paramsSchema = z.object({
  //     id: z.string().uuid(),
  //   })
  //   const paramsSchemas = z.object({
  //     id: z.string().uuid(),
  //   })

  //   const { id } = paramsSchema.parse(req.params)

  //   // Desassocie o personagem das temporadas sem excluir as temporadas
  //   await prisma.characters.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       seasons: {
  //         disconnect: [],
  //       },
  //     },
  //   })
  //   console.log()

  //   // Agora você pode excluir o próprio personagem
  //   await prisma.characters.delete({
  //     where: {
  //       id,
  //     },
  //   })
  // })
}
