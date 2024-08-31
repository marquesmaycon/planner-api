import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { TripFactory } from "./trip_factory.js"

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456',
    }
  })
  .relation('trips', () => TripFactory)
  .state('me', (user) => {
    user.email = 'mayconmarquesh@gmail.com'
    user.password = '123456'
  })
  .build()