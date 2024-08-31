import factory from '@adonisjs/lucid/factories'
import Trip from '#models/trip'
import { UserFactory } from "./user_factory.js"
import { ParticipantFactory } from "./participant_factory.js"
import { LinkFactory } from "./link_factory.js"
import { ActivityFactory } from "./activity_factory.js"
import { DateTime } from "luxon"

export const TripFactory = factory
  .define(Trip, async ({ faker }) => {
    const start = faker.date.soon({ days: faker.number.int({ min: 1, max: 15 }) })
    const end = DateTime.fromJSDate(start).plus({ days: faker.number.int({ min: 1, max: 15 }) })

    return {
      destination: faker.location.city(),
      startsAt: start.toISOString(),
      endsAt: end.toISO()!,
    }
  })
  .relation('user', () => UserFactory)
  .relation('participants', () => ParticipantFactory)
  .relation('activities', () => ActivityFactory)
  .relation('links', () => LinkFactory)
  .state('soon', (row, { faker }) => {
    const start = faker.date.soon({ days: faker.number.int({ min: 1, max: 15 }) })
    const end = DateTime.fromJSDate(start).plus({ days: faker.number.int({ min: 1, max: 15 }) })

    row.startsAt = start.toISOString()
    row.endsAt = end.toISO()!
  })
  .state('mine', row => row.userId = 1)
  .build()  