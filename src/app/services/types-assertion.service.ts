import { Injectable } from '@angular/core';
import Ajv, { JSONSchemaType } from 'ajv';

@Injectable({
  providedIn: 'root',
})
export class TypesAssertionService {
  public valueFollowsSchema<T>(value: unknown, schema: JSONSchemaType<T>): value is T {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    return validate(value);
  }
}
