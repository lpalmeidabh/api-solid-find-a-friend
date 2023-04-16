import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  list(
    city: string,
    age: string | null,
    build: string | null,
    independence: string | null,
    environment: string | null,
  ): Promise<Pet[]>
}
