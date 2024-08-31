import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { UserFactory } from "#database/factories/user_factory"
import { faker } from '@faker-js/faker';
import Trip from "#models/trip";

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const me = await UserFactory.apply('me')
      .with('trips', 5, trip => trip
        .apply('mine', 'soon')
        .with('activities', 6, act => act.apply('mine'))
        .with('links', 3)
        .with('participants', 4)
      )
      .create()

    const users = await UserFactory
      .merge([{ email: 'fulano@mail.com' }, { email: 'ciclano@mail.com' }, { email: 'beltrana@mail.com' }])
      .with('trips', 5, trip => trip
        .apply('soon')
        .with('activities', 6)
        .with('links', 6)
        .with('participants', 4)
      )
      .createMany(3)


    await Promise.all([me, ...users].map(async user => {
      const trips = await user.related('trips').query().select('id', 'startsAt', 'endsAt')
      await Promise.all(trips.map(this.setActivityDate))
    }))
  }

  async setActivityDate(trip: Trip) {
    const activities = await trip.related('activities').query()
    await Promise.all(activities.map(act => {
      const startsAt = faker.date.between({ from: trip.startsAt, to: trip.endsAt })
      return act.merge({ startsAt: startsAt.toISOString() }).save()
    }))
  }
}