import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { OrganizationEmailAlreadyExistsError } from './errors/organization-email-already-exists-error'
import { OrganizationUseCase } from './organizations'

describe('Organizations use case', () => {

    it('should hash organization register password upon registration', async () => {
        const organizationRepository = new InMemoryOrganizationRepository()
        const organizationUseCase = new OrganizationUseCase(organizationRepository)

        const { organization } = await organizationUseCase.execute({
            responsible: 'John Doe',
	        email: 'john.doe@example.com',
            cep: '9999999',
            address: 'Rua principal',
            latitude: 999,
            longitude: 999,
            whatsapp: '99999999',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare(
            '123456',
            organization.password_hash
        )

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('should not be able to register organization with same email twice', async () => {
        const organizationRepository = new InMemoryOrganizationRepository()
        const organizationUseCase = new OrganizationUseCase(organizationRepository)

        const email = 'john.doe@example.com'

        await organizationUseCase.execute({
            responsible: 'John Doe',
	        email,
            cep: '9999999',
            address: 'Rua principal',
            latitude: 999,
            longitude: 999,
            whatsapp: '99999999',
            password: '123456'
        })

        await expect(
            organizationUseCase.execute({
                responsible: 'John Doe',
                email,
                cep: '9999999',
                address: 'Rua principal',
                latitude: 999,
                longitude: 999,
                whatsapp: '99999999',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(OrganizationEmailAlreadyExistsError)
    })

    it('should able to register organization', async () => {
        const organizationRepository = new InMemoryOrganizationRepository()
        const organizationUseCase = new OrganizationUseCase(organizationRepository)

        const { organization } = await organizationUseCase.execute({
            responsible: 'John Doe',
	        email: 'john.doe@example.com',
            cep: '9999999',
            address: 'Rua principal',
            latitude: 999,
            longitude: 999,
            whatsapp: '99999999',
            password: '123456'
        })

        expect(organization).toHaveProperty('id')
    })
})
