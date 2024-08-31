import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { UserFactory } from "#database/factories/user_factory"

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

    await UserFactory
      .with('trips', 3, trip => trip
        .apply('soon')
        .with('activities', 4, act => act.apply('soon'))
        .with('links', 2)
        .with('participants', 3)
      )
      .createMany(5)
  }
}