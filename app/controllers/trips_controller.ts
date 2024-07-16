import Trip from '#models/trip'
import { createTripValidator } from '#validators/trip'
import type { HttpContext } from '@adonisjs/core/http'

export default class TripsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTripValidator)
    
    const trip = await Trip.create({
      destination: payload.destination,
      starts_at: new Date(payload.starts_at).toISOString(),
      ends_at: new Date(payload.starts_at).toISOString(),
      owner_name: payload.owner_name, 
      owner_email: payload.owner_email,
    })

    const emails = payload.emails_to_invite.map((email) => ({ email }))
    await trip.related('participants').createMany(emails)
    await trip.load('participants')

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