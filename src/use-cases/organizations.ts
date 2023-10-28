import { OrganizationRepository } from "@/repositories/organization-repository"
import { Organization } from "@prisma/client"
import { hash } from "bcryptjs"
import { OrganizationEmailAlreadyExistsError } from "./errors/organization-email-already-exists-error"

interface OrganizationUseCaseRequest {
    responsible: string
    email: string
    cep: string
    address: string
    latitude: number,
    longitude: number,
    whatsapp: string
    password: string
}

interface OrganizationUseCaseReturn {
    organization: Organization
}


export class OrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute({
        responsible,
        email,
        cep,
        address,
        latitude,
        longitude,
        whatsapp,
        password
    }: OrganizationUseCaseRequest): Promise<OrganizationUseCaseReturn> {

    const password_hash = await hash(password, 6)

    const emailAlreadyExists = await this.organizationRepository.findByEmail(email)
    
      if (emailAlreadyExists) {
       throw new OrganizationEmailAlreadyExistsError()
      }

      const organization = await this.organizationRepository.create({
          responsible,
          email,
          cep,
          address,
          latitude,
          longitude,
          whatsapp,
          password_hash,
        })

        return {
            organization
        }
    }
}