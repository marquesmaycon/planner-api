import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { TripFactory } from "./trip_factory.js"

export const ActivityFactory = factory
  .define(Activity, async ({ faker }) => {
    return {
      name: faker.lorem.words(3),
      isDone: false,
      startsAt: faker.date.recent().toISOString(),
    }
  })
  .relation('trip', () => TripFactory)
  .state('mine', row => row.tripId = 1)
  .build()