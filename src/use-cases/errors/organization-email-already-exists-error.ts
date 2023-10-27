
export class OrganizationEmailAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.')
    }
}