import factory from '@adonisjs/lucid/factories'
import Link from '#models/link'
import { TripFactory } from "./trip_factory.js"

export const LinkFactory = factory
  .define(Link, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      url: faker.internet.url(),
    }
  })
  .relation('trip', () => TripFactory)
  .build()