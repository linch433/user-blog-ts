export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
  dateCreated?: string;
}

export interface IGeneralQuery {
  limit?: number;
  skip?: number;
}

export interface INewUser {
  email: string;
  password: string;
  name: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
}
