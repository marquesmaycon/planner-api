import Link from '#models/link'
import { linkValidator } from '#validators/link'
import type { HttpContext } from '@adonisjs/core/http'

export default class LinksController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const { trip_id } = params

    const links = await Link.query().where({ tripId: trip_id })
    return response.ok(links)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const { trip_id } = params
    const payload = await request.validateUsing(linkValidator)

    const link = await Link.create({ ...payload, tripId: trip_id })

    return response.created(link)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(linkValidator)

    const link = await Link.findOrFail(id)
    link.merge(payload)
    await link.save()

    return response.ok(link)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params

    const link = await Link.findOrFail(id)
    await link.delete()

    return response.noContent()
  }
}