import Trip from '#models/trip'
import { createTripValidator } from '#validators/trip'
import type { HttpContext } from '@adonisjs/core/http'

export default class TripsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTripValidator)

    const { emails_to_invite, ...tripPayload } = payload
    const { ownerName, ownerEmail, startsAt, endsAt } = tripPayload

    const trip = await Trip.create({
      ...tripPayload,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
    })

    const emails = emails_to_invite.map((email) => ({ email }))
    const ownerData = { name: ownerName, email: ownerEmail }
    emails.unshift(ownerData)
    await trip.related('participants').createMany(emails)

    return response.created(trip)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const trip = await Trip.findByOrFail('id', params.id)
    return response.ok(trip)
  }

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}