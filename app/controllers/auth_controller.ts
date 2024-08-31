import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create(data)

    return User.accessTokens.create(user)
  }

  public async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  public async logout({ auth, response }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user?.currentAccessToken.identifier)

    return response.ok({ message: 'Logged out successfully' })
  }

  public async me({ auth, response }: HttpContext) {
    await auth.check()

    return response.ok(auth.user)
  }
}