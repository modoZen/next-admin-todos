import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationError } from "yup";

type ErrorType = {
  errorMessage: string;
  status: number;
};

export function handleError(error: unknown): ErrorType {
  if (error instanceof ValidationError) {
    return {
      errorMessage: `Validation error: ${error.errors}`,
      status: 400,
    };
  }

  if (error instanceof PrismaClientValidationError) {
    return {
      errorMessage: `Database error: ${error}`,
      status: 500,
    };
  }

  if (error instanceof Error) {
    return {
      errorMessage: error.message,
      status: 400,
    };
  }

  return {
    errorMessage: `Unknown error: ${error}`,
    status: 500,
  };
}
