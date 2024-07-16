import Activity from '#models/activity'
import { activityValidator } from '#validators/activity'
import type { HttpContext } from '@adonisjs/core/http'

export default class ActivitiesController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const { trip_id } = params

    const activites = Activity.query().where({ trip_id })
    return response.ok(activites)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const { trip_id } = params
    const payload = await request.validateUsing(activityValidator)

    const activity = await Activity.create({ ...payload, trip_id })

    return response.created(activity)
  }

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(activityValidator)

    const activity = await Activity.findOrFail(id)
    activity.merge(payload)
    await activity.save()

    return response.ok(activity)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params

    const activity = await Activity.findOrFail(id)
    await activity.delete()
    
    return response.noContent()
  }
}