export type AuthTokenResponse_T = {
  token: string;
};

export type User_T = {
  _id: string;
  email?: string | null;
  name?: string | null;
  avatar?: string | null;
  extra_details?: string | null;
  skills?: string | null;
  profession?: string | null;
  details?: string | null;
  dateCreated?: string | null;
};

export type UserQuery_T = {
  limit?: number;
  skip?: number;
};
