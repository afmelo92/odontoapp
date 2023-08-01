import HttpClient from "./HttpClient";

const httpClient = new HttpClient("http://localhost:3333");

type AuthRequest = {
  user_id?: string;
  user_token: string;
};

const getUserPatients = async ({ user_id, user_token }: AuthRequest) => {
  return httpClient.get({
    path: `/patients/${user_id}`,
    options: {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    },
  });
};

const getUserProstheticOrders = async ({ user_token }: AuthRequest) => {
  return httpClient.get({
    path: `/prosthetics/orders`,
    options: {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    },
  });
};

export { getUserPatients, getUserProstheticOrders };
