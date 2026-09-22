import { getNewsPayloadById } from '../../utils/news-repo'

// GET /api/news/:id — 公开读；返回 { item, detail }，未知 id 404
export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'id')
  const id = Number(raw)
  if (!raw || !Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news id' })
  }

  const payload = await getNewsPayloadById(id)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'News not found' })
  }

  return payload
})
