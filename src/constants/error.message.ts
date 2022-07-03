export const ERROR_MESSAGES = {
  INTERNAL_EXCEPTION: 'Internal Server Exception',
  INVALID_TOKEN: 'Invalid Token',
  TOKEN_EXPIRED: 'Token Expired',
  ACTIVE_COMPANY_UNRESOLVED: 'Unable to determine active company',
  ROLE_NOT_FOUND: 'Role not found',
  DUPLICATE_AUTH0_ID: 'Duplicate Auth0 Id',
  FORBIDDEN: 'Forbidden resource',
  EXTERNAL_SERVICE_ERROR: 'External service error',
  INVALID_MONGO_ID: 'Invalid Mongo Id',
  CUSTOMER:{
    NO_USER_FOUND: { MSG: 'Invalid Email Id or Password', CODE: 'C1' }
  },
  ORDER: {
    INVALID_ORDER_ID: { MSG: 'Invalid Order Id', CODE: 'O12121' },
  },
};
