import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

type NewsDatabase = PostgresJsDatabase<typeof schema>

let db: NewsDatabase | null = null

/**
 * 惰性单例：仅在 runtimeConfig.databaseUrl 配置时建连；
 * 未配置（本地开发无 PG）返回 null，由仓储层回退 data/*.ts 静态数据。
 */
export function useNewsDatabase(): NewsDatabase | null {
  if (db) {
    return db
  }

  const { databaseUrl } = useRuntimeConfig()
  if (!databaseUrl) {
    return null
  }

  db = drizzle(postgres(databaseUrl, { max: 5 }), { schema })
  return db
}
