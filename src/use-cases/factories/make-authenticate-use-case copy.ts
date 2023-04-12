import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(organizationsRepository)

  return registerUseCase
}
