import APIError from "@/utils/APIError";

type MakeRequestProps = {
  path: string;
  options: RequestInit;
};

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest({ path, options }: MakeRequestProps) {
    const headers = new Headers();

    if (options.body) {
      headers.append("Content-Type", "application/json");
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) =>
        headers.append(key, value)
      );
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: options?.body,
      headers,
    });

    let body = null;

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError({ response, payload: body });
  }

  public post({ path, options }: MakeRequestProps) {
    return this.makeRequest({
      path,
      options: {
        ...options,
        method: "POST",
        headers: options?.headers,
        body: options?.body,
      },
    });
  }

  public get({ path, options }: MakeRequestProps) {
    return this.makeRequest({
      path,
      options: {
        ...options,
        method: "GET",
        headers: options?.headers,
      },
    });
  }

  public put({ path, options }: MakeRequestProps) {
    return this.makeRequest({
      path,
      options: {
        ...options,
        method: "PUT",
        headers: options?.headers,
        body: options?.body,
      },
    });
  }

  public delete({ path, options }: MakeRequestProps) {
    return this.makeRequest({
      path,
      options: {
        ...options,
        method: "DELETE",
        headers: options?.headers,
      },
    });
  }
}

export default HttpClient;
