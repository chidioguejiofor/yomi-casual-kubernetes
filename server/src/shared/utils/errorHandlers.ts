export const sequelizeErrorHandler = (error: {
  errors: Record<string, any>[];
}): [Record<string, any>, number, string] => {
  let statusCode = 400;

  const postgresErrors = error.errors || [];
  const parsedErrors = [];

  const objectErrors = {};
  for (const errItem of postgresErrors) {
    const currentErrors = objectErrors[errItem.path] || [];
    if (errItem.validatorKey === "is_null") {
      parsedErrors.push(`${errItem.path} cannot be empty`);
      currentErrors.push(`${errItem.path} cannot be empty`);
    } else if (errItem.validatorKey === "not_unique") {
      statusCode = 409;
      parsedErrors.push(`${errItem.path} already exists`);
      currentErrors.push(`${errItem.path} already exists`);
    }
    parsedErrors.push(errItem.message);
    objectErrors[errItem.path] = currentErrors;
  }

  return [parsedErrors, statusCode, "There was some errors in your request"];
};
