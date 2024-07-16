import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new participant.
 */
export const participantValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string(),
  })
)