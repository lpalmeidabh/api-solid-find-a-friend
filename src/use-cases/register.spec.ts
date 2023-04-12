import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'

import { RegisterUseCase } from './register'
import { OrganizationAlreadyExistsError } from './errors/user-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password: '123456',
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password: '123456',
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow to register with an already registered email', async () => {
    const email = 'ongdoscachorros@example.com'
    await sut.execute({
      name: 'ONG dos Cachorros',
      email,
      password: '123456',
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    await expect(() =>
      sut.execute({
        name: 'ONG dos Cachorros',
        email,
        password: '123456',
        zipcode: '12345678',
        address: 'Rua dos cachorros, 123',
        whatsapp: '11999999999',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
