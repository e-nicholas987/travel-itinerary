import { getApiError } from "@/lib/utils/getApiError";

export const useGetApiError = ({
  message,
  error,
}: {
  message: unknown;
  error: unknown;
}) => {
  if (typeof message === "string" && message.includes("error")) {
    return message;
  }
  if (
    message &&
    typeof message === "object" &&
    "message" in message &&
    typeof message.message === "string" &&
    message.message.includes("error")
  ) {
    return message.message;
  }

  if (error) {
    return getApiError(error);
  }

  return undefined;
};
