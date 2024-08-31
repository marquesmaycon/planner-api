import factory from '@adonisjs/lucid/factories'
import Participant from '#models/participant'
import { TripFactory } from "./trip_factory.js"

export const ParticipantFactory = factory
  .define(Participant, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
  })
  .relation('trip', () => TripFactory)
  .build()