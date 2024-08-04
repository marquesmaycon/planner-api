/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import TripsController from '#controllers/trips_controller'
import ParticipantsController from '#controllers/participants_controller'
import ActivitiesController from '#controllers/activities_controller'
import LinksController from '#controllers/links_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.group(() => {
    router.delete('logout', [AuthController, 'logout'])
    router.get('me', [AuthController, 'me'])
  }).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.resource('trips', TripsController).apiOnly()
  router.get('trips/:trip_id/activities/by-day', [ActivitiesController, 'getActivitiesByDay'])
  router.shallowResource('trips.participants', ParticipantsController).apiOnly().except(['show'])
  router.shallowResource('trips.activities', ActivitiesController).apiOnly().except(['show'])
  router.shallowResource('trips.links', LinksController).apiOnly().except(['show'])
}).use(middleware.auth())


