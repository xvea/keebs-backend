import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBuildDto {
  @IsString()
  @MinLength(3)
  buildName: string;

  @IsString()
  @MinLength(3)
  baseKit: string;

  @IsString()
  @IsIn(['40%', '60%', '65%', '75%', 'TKL', '100%'])
  layoutSize: string;

  @IsString()
  @MinLength(2)
  mountingStyle: string;

  @IsString()
  @MinLength(2)
  switchModel: string;

  @IsString()
  @IsIn(['Linear', 'Tactile', 'Clicky'])
  switchType: string;

  @IsString()
  @MinLength(2)
  keycapSet: string;

  @IsString()
  @IsIn(['Thocky', 'Clacky', 'Creamy', 'Silent', 'Marbly'])
  soundProfile: string;

  @IsNumber()
  @Min(0)
  estimatedCost: number;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
