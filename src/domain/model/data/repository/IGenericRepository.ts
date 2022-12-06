export type GenericId = number | string

export interface IGenericRepository<T> {
    getAll: () => Promise<T[]>
    getById: (id: GenericId) => Promise<T>
    create: (args: T) => Promise<T>
    update: (args: T) => Promise<T>
    delete: (id: GenericId) => Promise<void>
}