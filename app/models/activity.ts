import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Trip from './trip.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare trip_id: number

  @column()
  declare name: string

  @column()
  declare starts_at: string

  @column()
  declare is_done: boolean

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @belongsTo(() => Trip, { foreignKey: 'id' })
  declare trip: BelongsTo<typeof Trip>
}