// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/user_service/user/request.proto

export interface UpdateUserRequest {
  userId?: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  _email?: 'email';
  _password?: 'password';
  _name?: 'name';
  _phone?: 'phone';
}

export interface UpdateUserRequest__Output {
  userId: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  _email: 'email';
  _password: 'password';
  _name: 'name';
  _phone: 'phone';
}
