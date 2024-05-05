import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  LECTURER = 'LECTURER',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role' });
