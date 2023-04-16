import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { describe, it, expect, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'
import { GetOrganizationInfoUseCase } from './get-organization-info'

let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: GetOrganizationInfoUseCase

describe('Pet Info Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationInfoUseCase(organizationsRepository)
  })

  it('should retrieve pet info', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password_hash: await hash('123456', 6),
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.id).toEqual(createdOrganization.id)
  })
})
