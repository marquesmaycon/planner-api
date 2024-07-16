import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Participant from './participant.js'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare destination: string

  @column()
  declare starts_at: string

  @column()
  declare ends_at: string

  @column()
  declare owner_name: string

  @column()
  declare owner_email: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
  
  @hasMany(() => Participant, { foreignKey: 'trip_id' })
  declare participants: HasMany<typeof Participant>
}