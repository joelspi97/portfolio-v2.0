export interface IPostMailRequestDto {
  email: string;
  message: string;
  name: string;
  subject?: string;
}

export interface IPostMailErrorResponseDto {
  errors?: string[];
}
