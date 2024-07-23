import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new participant.
 */
export const activityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    startsAt: vine.string(),
  })
)