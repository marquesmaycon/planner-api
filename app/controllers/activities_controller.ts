import Activity from '#models/activity'
import Trip from '#models/trip'
import { createActivityValidator, editActivityValidator } from '#validators/activity'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'


export default class ActivitiesController {
  /**
   * Display a list of resource
   */
  async index({ params, response }: HttpContext) {
    const { trip_id } = params

    const trip = await Trip.findOrFail(trip_id)
    const tripDays = DateTime.fromISO(trip.endsAt).diff(DateTime.fromISO(trip.startsAt), 'days').days
    const allActivities = await Activity.query().where({ tripId: trip_id }).orderBy('startsAt', 'desc')

    const activitiesByDay = Array.from({ length: tripDays + 1 }, (_, i) => {
      const date = DateTime.fromISO(trip.startsAt).plus({ days: i }).toISODate()
      const activities = allActivities.filter(activity => DateTime.fromISO(activity.startsAt).toISODate() === date)

      return { date, activities }
    })

    return response.ok(activitiesByDay)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const { trip_id } = params
    const payload = await request.validateUsing(createActivityValidator)

    const activity = await Activity.create({ ...payload, tripId: trip_id })

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
    const payload = await request.validateUsing(editActivityValidator)

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
    const tripDays = DateTime.fromISO(trip.endsAt).diff(DateTime.fromISO(trip.startsAt), 'days').days
    const allActivities = await Activity.query().where({ tripId: trip_id }).orderBy('startsAt', 'desc')

    const activitiesByDay = Array.from({ length: tripDays + 1 }, (_, i) => {
      const date = DateTime.fromISO(trip.startsAt).plus({ days: i }).toISODate()
      const activities = allActivities.filter(activity => DateTime.fromISO(activity.startsAt).toISODate() === date)
      return { date, activities }
    })
    const currentTimeZone = DateTime.local().zoneName;

    console.log(`Fuso horário atual: ${currentTimeZone}`);
    return response.ok(activitiesByDay)
  }
}