import Activity from '#models/activity'
import Trip from '#models/trip'
import { activityValidator } from '#validators/activity'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'


export default class ActivitiesController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const { trip_id } = params

    const trip = await Trip.findOrFail(trip_id)
    const tripDays = DateTime.fromISO(trip.ends_at).diff(DateTime.fromISO(trip.starts_at), 'days').days
    const allActivities = await Activity.query().where({ trip_id }).orderBy('starts_at', 'desc')

    const activitiesByDay = Array.from({ length: tripDays + 1 }, (_, i) => {
      const date = DateTime.fromISO(trip.starts_at).plus({ days: i }).toISODate()
      const activities = allActivities.filter(activity => DateTime.fromISO(activity.starts_at).toISODate() === date)

      return { date, activities }
    })

    return response.ok(activitiesByDay)
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

  async getActivitiesByDay({ params, response }: HttpContext) {
    const { trip_id } = params

    const trip = await Trip.findOrFail(trip_id)
    const tripDays = DateTime.fromISO(trip.ends_at).diff(DateTime.fromISO(trip.starts_at), 'days').days
    const allActivities = await Activity.query().where({ trip_id }).orderBy('starts_at', 'desc')

    const activitiesByDay = Array.from({ length: tripDays + 1 }, (_, i) => {
      const date = DateTime.fromISO(trip.starts_at).plus({ days: i }).toISODate()
      const activities = allActivities.filter(activity => DateTime.fromISO(activity.starts_at).toISODate() === date)

      return { date, activities }
    })

    return response.ok(activitiesByDay)
  }
}