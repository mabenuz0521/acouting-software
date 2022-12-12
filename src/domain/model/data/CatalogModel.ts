export interface ICatalog {
  id?: number
  name: string
  catalogId?: number

  /**
   * The above fields only to present data besides of consumers
   */
  subCatalog?: ICatalog[]
}
