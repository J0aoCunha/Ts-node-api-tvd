'use strict'
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __hasOwnProp = Object.prototype.hasOwnProperty
const __export = (target, all) => {
  for (const name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
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
const __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod)

// src/routes/chars.ts
const chars_exports = {}
__export(chars_exports, {
  CharsRoutes: () => CharsRoutes,
})
module.exports = __toCommonJS(chars_exports)

// src/lib/prisma.ts
const import_client = require('@prisma/client')
const prisma = new import_client.PrismaClient({
  log: ['query'],
})

// src/routes/chars.ts
const import_zod = require('zod')
async function CharsRoutes(app) {
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
  app.get('/chars/:id', async (req) => {
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
  app.post('/chars', async (req) => {
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
  app.put('/chars/:id', async (req) => {
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
  app.delete('/chars/:id', async (req) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    CharsRoutes,
  })
