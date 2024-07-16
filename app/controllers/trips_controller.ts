import Trip from '#models/trip'
import { createTripValidator } from '#validators/trip'
import type { HttpContext } from '@adonisjs/core/http'

export default class TripsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTripValidator)
    const { destination, starts_at, ends_at, owner_email, owner_name, emails_to_invite } = payload
    
    const trip = await Trip.create({
      destination: destination,
      starts_at: new Date(starts_at).toISOString(),
      ends_at: new Date(ends_at).toISOString(),
      owner_name: owner_name,
      owner_email: owner_email,
    })

    const emails = emails_to_invite.map((email) => ({ email }))
    const ownerData = { name: owner_name, email: owner_email }

    await trip.related('participants').createMany([...emails, ownerData])
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