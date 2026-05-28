export interface IPostMailRequestDto {
  email: string;
  message: string;
  name: string;
  subject?: null | string;
}

export interface IPostMailErrorResponseDto {
  errors?: string[];
}
