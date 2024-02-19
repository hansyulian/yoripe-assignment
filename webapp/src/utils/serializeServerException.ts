export type ServerException = {
  statusCode: number;
  message: string;
}

const exceptionMessageMap: Record<string, string> = {
  InvalidCredential: 'Invalid credential',
}

export function serializeServerException(serverException: ServerException) {
  const mappedExceptionMessage = exceptionMessageMap[serverException.message] || serverException.message;
  return mappedExceptionMessage
}