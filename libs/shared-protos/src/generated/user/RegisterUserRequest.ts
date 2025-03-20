// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/user_service/user/request.proto

export interface RegisterUserRequest {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  phone?: string;
  _phone?: 'phone';
}

export interface RegisterUserRequest__Output {
  email: string;
  password: string;
  name: string;
  role: string;
  phone?: string;
  _phone: 'phone';
}
