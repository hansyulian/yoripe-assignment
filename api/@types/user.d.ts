type UserRegisterPayload = {
  fullname: string;
  email: string;
  password: string;
};

type UserLoginPayload = {
  email: string;
  password: string;
};

type RequestUserData = {
  email: string;
  id: string;
};
