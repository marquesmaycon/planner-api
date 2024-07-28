import Participant from '#models/participant'
import { createParticipantValidator, editParticipantValidator } from '#validators/participant'
import type { HttpContext } from '@adonisjs/core/http'

export default class ParticipantsController {
  /**
   * Display a list of resource
   */
  async index({ response, params }: HttpContext) {
    const { trip_id } = params

    const participants = await Participant.query().where({ trip_id })

    return response.ok(participants)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, params }: HttpContext) {
    const { trip_id } = params
    const payload = await request.validateUsing(createParticipantValidator)

    const participant = await Participant.create({ ...payload, trip_id })

    return response.created(participant)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, response, request }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(editParticipantValidator)

    const participant = await Participant.findOrFail(id)
    participant.merge(payload)
    await participant.save()

    return response.ok(participant)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const participant = await Participant.findOrFail(id)

    await participant.delete()

    return response.noContent()
  }
}