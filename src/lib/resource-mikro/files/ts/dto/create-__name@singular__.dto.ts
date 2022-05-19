import { IsNotEmpty, IsString } from 'class-validator';

export class Create<%= singular(classify(name)) %>Dto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  appId?: string;
}
