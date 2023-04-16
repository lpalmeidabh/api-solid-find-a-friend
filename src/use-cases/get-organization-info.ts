import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationInfoUseCaseRequest {
  organizationId: string
}

interface GetOrganizationInfoUseCaseResponse {
  organization: Organization
}

export class GetOrganizationInfoUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationInfoUseCaseRequest): Promise<GetOrganizationInfoUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }
    return { organization }
  }
}
