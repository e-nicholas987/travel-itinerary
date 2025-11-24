export const getApiError = (error: unknown): string => {
  if (typeof error === "object" && error) {
    if (
      "data" in error &&
      typeof error.data === "object" &&
      error.data &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      return error.data.message;
    }
  }
  return "Something went wrong";
};
