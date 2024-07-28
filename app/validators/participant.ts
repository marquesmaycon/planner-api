import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new participant.
 */
export const createParticipantValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string(),
  })
)

export const editParticipantValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    email: vine.string().optional(),
    isConfirmed: vine.boolean().optional(),
  })
)