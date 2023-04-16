import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { describe, it, expect, beforeEach } from 'vitest'
import { GetPetInfoUseCase } from './get-pet-info'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository

// sut stands for System Under Test
let sut: GetPetInfoUseCase

describe('Pet Info Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetInfoUseCase(petsRepository)
  })

  it('should retrieve pet info', async () => {
    const organization = await organizationsRepository.create({
      name: 'ONG dos Cachorros',
      email: 'ongdoscachorros@example.com',
      password_hash: await hash('123456', 6),
      zipcode: '12345678',
      address: 'Rua dos cachorros, 123',
      whatsapp: '11999999999',
    })

    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
  })
})
