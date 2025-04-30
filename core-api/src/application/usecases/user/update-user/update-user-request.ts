type UpdateUserRequest = {
  id: number;
  name: string;
  password: string;
  repeatedPassword: string;
  image: string;
};

export default UpdateUserRequest;
