import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ContactTypes,
  DocumentTypes,
  GenderTypes,
  MaritalStatuses,
  RelationshipTypes,
  VerificationStatuses,
} from 'src/common/constants/enums';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly municipality: string;

  @IsString()
  @IsNotEmpty()
  readonly district: string;

  @IsString()
  @IsNotEmpty()
  readonly province: string;
}

class MedicalInfoDto {
  readonly conditions?: string;
  readonly primaryPhysicianName?: string;
  readonly primaryPhysicianContact?: string;
}

class EmergencyContactDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ContactTypes)
  readonly contactType: string;

  @IsString()
  @IsNotEmpty()
  readonly fullname: string;

  @IsOptional()
  @IsEnum(RelationshipTypes)
  readonly relation?: string;

  @IsArray()
  @IsNotEmpty()
  readonly phoneNumbers: string[];

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly address?: string;
}

class OccupationDto {
  @IsString()
  @IsNotEmpty()
  readonly industry: string;

  @IsString()
  @IsNotEmpty()
  readonly subIndustry: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class GovtDocsDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(DocumentTypes)
  readonly docType: string;

  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;

  @IsString()
  @IsEnum(VerificationStatuses)
  readonly status?: string;
}

export class UpdateUserInfoDto {
  @IsString()
  @IsNotEmpty()
  readonly fullname?: string;

  @IsDate()
  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(GenderTypes)
  readonly gender?: string;

  @IsEnum(MaritalStatuses)
  @IsOptional()
  readonly maritalStatus?: string;

  @IsOptional()
  readonly permanetAddress?: AddressDto;

  @IsOptional()
  readonly temporaryAddress?: AddressDto;

  @IsOptional()
  readonly isSameAddress?: boolean;

  @IsOptional()
  readonly medicalInfo?: MedicalInfoDto;

  @IsOptional()
  readonly occupation?: OccupationDto;

  @IsOptional()
  readonly emergencyContacts?: EmergencyContactDto[];

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  govtDocs?: GovtDocsDto[];
}
