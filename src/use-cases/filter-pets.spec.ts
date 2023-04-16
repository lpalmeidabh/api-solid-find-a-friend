import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { describe, it, expect, beforeEach } from 'vitest'
import { FilterPetsUseCase } from './filter-pets'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: FilterPetsUseCase

describe('List Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should filter pet list', async () => {
    const organization = await organizationsRepository.create({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password_hash: await hash('123456', 6),
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    await petsRepository.create({
      name: 'Cachorro',
      city: 'Belo Horizonte',
      age: 'BABY',
      build: 'SMALL',
      independence: 'LOW',
      environment: 'SMALL',
      description: 'Cachorro muito legal',
      organization: {
        connect: {
          id: organization.id,
        },
      },
    })

    const { pets } = await sut.execute({
      city: 'Belo Horizonte',
      age: 'BABY',
      build: null,
      independence: null,
      environment: null,
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Cachorro',
        age: 'BABY',
        build: 'SMALL',
        independence: 'LOW',
        environment: 'SMALL',
        description: 'Cachorro muito legal',
      }),
    ])
  })
})
