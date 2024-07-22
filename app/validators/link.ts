import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new participant.
 */
export const linkValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    url: vine.string().url(),
  })
)