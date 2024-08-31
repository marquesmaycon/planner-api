import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { UserFactory } from "#database/factories/user_factory"
import { ActivityFactory } from "#database/factories/activity_factory"
import { faker } from '@faker-js/faker';
import Trip from "#models/trip";

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    await UserFactory.apply('me')
      .with('trips', 5, trip => trip
        .apply('mine', 'soon')
        .with('activities', 6, act => act.apply('mine'))
        .with('links', 3)
        .with('participants', 4)
      )
      .create()

    const users = await UserFactory
      .with('trips', 3, trip => trip
        .apply('soon')
        .with('links', 2)
        .with('participants', 3)
      )
      .createMany(5)

    await Promise.all(users.map(async user => {
      const trips = await user.related('trips').query().select('id', 'startsAt', 'endsAt')
      await Promise.all(trips.map(this.createActivityForTrip))
    }))
  }

  async createActivityForTrip({ id, startsAt, endsAt }: Trip) {
    const activitiesNumber = faker.number.int({ min: 3, max: 6 })
    const starts = faker.date.between({ from: startsAt, to: endsAt })

    const fakeData = Array.from({ length: activitiesNumber }, () => ({
      tripId: id,
      startsAt: starts.toISOString()
    }))

    await ActivityFactory.merge(fakeData).createMany(activitiesNumber)
  }
}