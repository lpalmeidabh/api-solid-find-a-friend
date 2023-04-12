import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  age: 'BABY' | 'ADULT' | 'SENIOR'
  build: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'SMALL' | 'WIDE'
  description: string
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    build,
    independence,
    environment,
    description,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      build,
      independence,
      environment,
      description,
      organization_id,
    })

    return { pet }
  }
}
