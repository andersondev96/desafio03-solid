import { OrganizationEmailAlreadyExistsError } from '@/use-cases/errors/organization-email-already-exists-error'
import { makeAuthenticationUseCase } from '@/use-cases/factories/make-authentication-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticationBodySchema.parse(request.body)

  const authenticationUseCase = makeAuthenticationUseCase()

  try {
    const { organization } = await authenticationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof OrganizationEmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
