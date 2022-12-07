export interface IDatabaseConfigAttributes {
  username?: string
  password?: string
  database?: string
  host?: string
  port?: number | string
  dialect?: string
  urlDataBase?: string
}

export interface IDataBaseConfig {
  development: IDatabaseConfigAttributes
  test: IDatabaseConfigAttributes
  production: IDatabaseConfigAttributes
}
