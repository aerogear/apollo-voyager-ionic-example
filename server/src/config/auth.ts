import { CrudServicesAuthConfig } from "@graphback/keycloak-authz"

export const authConfig: CrudServicesAuthConfig = {
  Task: {
    create: { roles: [] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  }
}