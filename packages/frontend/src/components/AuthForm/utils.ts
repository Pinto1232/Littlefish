import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export type CustomFetchBaseQueryError = FetchBaseQueryError & {
  data?: {
    message?: string;
  };
};

export const isFetchBaseQueryError = (
  error: unknown
): error is CustomFetchBaseQueryError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "status" in error
  );
};

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string | undefined {
  if (!error) return undefined;
  if ('data' in error && typeof error.data === 'string') {
    return error.data;
  }
  if ('message' in error) {
    return error.message;
  }
  return 'An unknown error occurred';
}