import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import Participant from './participant.js'
import User from "./user.js"
import Activity from "./activity.js"
import Link from "./link.js"

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare destination: string

  @column()
  declare startsAt: string

  @column()
  declare endsAt: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Participant)
  declare participants: HasMany<typeof Participant>

  @hasMany(() => Activity)
  declare activities: HasMany<typeof Activity>
  
  @hasMany(() => Link)
  declare links: HasMany<typeof Link>
}