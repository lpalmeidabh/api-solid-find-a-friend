import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      city: data.city,
      age: data.age ?? 'ADULT',
      build: data.build ?? 'SMALL',
      independence: data.independence ?? 'MEDIUM',
      environment: data.environment ?? 'SMALL',
      description: data.description,

      organization_id: randomUUID(),
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async list(
    city: string,
    age: string | null,
    build: string | null,
    independence: string | null,
    environment: string | null,
  ) {
    let pets = this.items.filter((pet) => pet.city === city)
    if (age) pets = pets.filter((pet) => pet.age === age)
    if (build) pets = pets.filter((pet) => pet.build === build)
    if (independence)
      pets = pets.filter((pet) => pet.independence === independence)
    if (environment)
      pets = pets.filter((pet) => pet.environment === environment)

    return pets
  }
}
