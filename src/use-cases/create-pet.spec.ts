import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: CreatePetUseCase

describe('Pet Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const organization = await organizationsRepository.create({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password_hash: await hash('123456', 6),
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    const { pet } = await sut.execute({
      name: 'Cachorro',
      age: 'BABY',
      build: 'SMALL',
      independence: 'LOW',
      environment: 'SMALL',
      description: 'Cachorro muito legal',
      organization_id: organization.id,
    })

    console.log(pet)
    expect(pet.id).toEqual(expect.any(String))
  })
})
