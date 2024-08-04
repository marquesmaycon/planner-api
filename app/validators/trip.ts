import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createTripValidator = vine.compile(vine.object({
  destination: vine.string(),
  startsAt: vine.string(),
  endsAt: vine.string(),
  emails_to_invite: vine.array(vine.string())
}))

export const editTripValidator = vine.compile(vine.object({
  destination: vine.string(),
  startsAt: vine.string(),
  endsAt: vine.string(),
}))

const messages = {
  required: 'O campo {{ field }} é obrigatório',
}

createTripValidator.messagesProvider = new SimpleMessagesProvider(messages)
editTripValidator.messagesProvider = new SimpleMessagesProvider(messages)