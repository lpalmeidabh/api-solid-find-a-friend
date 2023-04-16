import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FilterPetsUseCaseRequest {
  city: string
  age: string | null
  build: string | null
  independence: string | null
  environment: string | null
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    build,
    independence,
    environment,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.list(
      city,
      age,
      build,
      independence,
      environment,
    )

    return { pets }
  }
}
