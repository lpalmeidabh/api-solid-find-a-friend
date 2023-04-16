import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,

      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find(
      (organization) => organization.id === id,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const user = this.items.find((organization) => organization.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
