import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type APIErrorProps = {
  response: Response;
  payload: any;
};

class APIError extends Error {
  public response: Response;
  public payload: any;

  constructor({ response, payload }: APIErrorProps) {
    super();
    this.name = "APIError";
    this.response = response;
    this.payload = payload;
    this.message =
      payload?.message || `${response.status} :::: ${response.statusText}`;
  }

  public setFormAPIErrors<T extends FieldValues>(
    error: APIError,
    setError: UseFormSetError<T>
  ) {
    error.payload.fields.forEach((field: Path<T>) =>
      setError(field, {
        message: error.message,
      })
    );
  }
}

export default APIError;
