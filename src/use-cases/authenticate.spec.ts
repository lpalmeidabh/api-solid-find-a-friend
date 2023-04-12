import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'

import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
    await organizationsRepository.create({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password_hash: await hash('123456', 6),
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })
  })

  it('should be able to authenticate', async () => {
    const { organization } = await sut.execute({
      email: 'ongdoscachorros@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'ongdosgatos@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with invalid password', async () => {
    await expect(
      sut.execute({
        email: 'ongdoscachorros@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
