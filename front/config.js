let isProduction;

if (process.env.NEXT_PUBLIC_NODE_ENV === undefined) {
  isProduction = process.env.NODE_ENV === 'production';
} else {
  isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
}

let demoMaxObjs;

if (isProduction) {
  demoMaxObjs = 1000;
} else {
  demoMaxObjs = 10;
}

let databaseUrl;

if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.DATABASE_URL_TEST;
} else {
  databaseUrl = process.env.DATABASE_URL;
}

export const apiPath = '/api';
export const appName = 'Conduit';
export const articleLimit = 10;
export const defaultProfileImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
export const maxObjsInMemory = 10000;
export const fallback = 'blocking';
export const googleAnalyticsId = 'UA-47867706-3';
export const isDemo = process.env.NEXT_PUBLIC_DEMO === 'true';
export const port = process.env.PORT || 3000;
export const prerenderAll = false;
export const postgres = process.env.REALWORLD_PG === 'true';
export const revalidate = 10;
export const secret = isProduction ? process.env.SECRET : 'secret';
export const verbose = process.env.VERBOSE;
export const blacklistTags = new Set(['cypress']);

export const development = {
  dialect: 'sqlite',
  logging: true,
  storage: 'db.sqlite3',
};

export const production = {
  url:
    databaseUrl ||
    'postgres://realworld_next_user:a@localhost:5432/realworld_next',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: true,
};

export const isProductionNext =
  process.env.NODE_ENV_NEXT_SERVER_ONLY === undefined
    ? isProduction
    : process.env.NODE_ENV_NEXT_SERVER_ONLY === 'production';

export default {
  apiPath,
  appName,
  articleLimit,
  defaultProfileImage,
  demoMaxObjs,
  maxObjsInMemory,
  fallback,
  googleAnalyticsId,
  isDemo,
  isProduction,
  isProductionNext,
  port,
  prerenderAll,
  postgres,
  revalidate,
  secret,
  verbose,
  blacklistTags,
  development,
  production,
};