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

router.resource('trips', TripsController).apiOnly()
router.shallowResource('trips.participants', ParticipantsController).apiOnly()
router.shallowResource('trips.activities', ActivitiesController).apiOnly()
