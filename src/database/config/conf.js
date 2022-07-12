const { DB_MIGRATION_TABLE } = process.env;

export default {
  development: {
    logging: false,
    dialect: 'sqlite',
    storage: 'cron.db',
    use_env_variable: false,
    ...(DB_MIGRATION_TABLE
      ? { migrationStorageTableName: DB_MIGRATION_TABLE }
      : {}),
  },
  test: {
    logging: false,
    dialect: 'sqlite',
    storage: 'cron.db',
    use_env_variable: false,
    ...(DB_MIGRATION_TABLE
      ? { migrationStorageTableName: DB_MIGRATION_TABLE }
      : {}),
  },
  staging: {
    logging: false,
    dialect: 'sqlite',
    storage: 'cron.db',
    use_env_variable: false,
    ...(DB_MIGRATION_TABLE
      ? { migrationStorageTableName: DB_MIGRATION_TABLE }
      : {}),
  },
  production: {
    logging: false,
    dialect: 'sqlite',
    storage: 'cron.db',
    use_env_variable: false,
    ...(DB_MIGRATION_TABLE
      ? { migrationStorageTableName: DB_MIGRATION_TABLE }
      : {}),
  },
};
