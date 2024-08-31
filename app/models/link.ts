import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Trip from './trip.js'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tripId: number

  @column()
  declare title: string | null

  @column()
  declare url: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Trip, { foreignKey: 'id' })
  declare trip: BelongsTo<typeof Trip>
}