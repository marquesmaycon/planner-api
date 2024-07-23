import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new participant.
 */
export const createActivityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    startsAt: vine.string(),
  })
)

export const editActivityValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    startsAt: vine.string().optional(),
    isDone: vine.boolean().optional(),
  })
)