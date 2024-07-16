/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import TripsController from '#controllers/trips_controller'
import router from '@adonisjs/core/services/router'

router.resource('trips', TripsController).apiOnly()
