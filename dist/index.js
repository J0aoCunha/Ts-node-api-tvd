'use strict'
const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
)

// src/index.ts
const import_fastify = __toESM(require('fastify'))

// src/lib/prisma.ts
const import_client = require('@prisma/client')
const prisma = new import_client.PrismaClient({
  log: ['query'],
})

// src/routes/chars.ts
const import_zod = require('zod')
async function CharsRoutes(app2) {
  app2.get('/chars', async () => {
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
  app2.get('/chars/:id', async (req) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid(),
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
  app2.post('/chars', async (req) => {
    const bodySchema = import_zod.z.object({
      description: import_zod.z.string(),
      name: import_zod.z.string(),
      imageURL: import_zod.z.string(),
      type: import_zod.z.string(),
      actorName: import_zod.z.string(),
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
  app2.put('/chars/:id', async (req) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)
    const bodySchema = import_zod.z.object({
      description: import_zod.z.string(),
      name: import_zod.z.string(),
      imageURL: import_zod.z.string(),
      type: import_zod.z.string(),
      actorName: import_zod.z.string(),
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
  app2.delete('/chars/:id', async (req) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)
    await prisma.characters.delete({
      where: {
        id,
      },
    })
  })
}

// src/index.ts
const app = (0, import_fastify.default)()
app.register(CharsRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('\u{1FA90} A API esta rodando na porta 3333')
  })
