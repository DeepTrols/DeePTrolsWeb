import { getCasePayloadBySlug } from '../../utils/cases-repo'

// GET /api/cases/:slug — 公开读；返回 { detail, resources }，非法 slug 400、未知 slug 404
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid case slug' })
  }

  const payload = await getCasePayloadBySlug(slug)
  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Case not found' })
  }

  return payload
})
