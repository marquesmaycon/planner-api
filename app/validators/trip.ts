import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createTripValidator = vine.compile(vine.object({
  destination: vine.string(),
  starts_at: vine.string(),
  ends_at: vine.string(),
  emails_to_invite: vine.array(vine.string()),
  owner_name: vine.string(),
  owner_email: vine.string(),
}))

const messages = {
  required: 'O campo {{ field }} é obrigatório',
}

createTripValidator.messagesProvider = new SimpleMessagesProvider(messages)