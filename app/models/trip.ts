import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import Participant from './participant.js'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare destination: string

  @column()
  declare startsAt: string

  @column()
  declare endsAt: string

  @column()
  declare ownerName: string

  @column()
  declare ownerEmail: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @hasMany(() => Participant, { foreignKey: 'trip_id' })
  declare participants: HasMany<typeof Participant>
}