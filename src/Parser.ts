export interface IParser {
  string: IParseFunc<string>;
  integer: IParseFunc<number>;
  int: IParseFunc<number>;
  float: IParseFunc<number>;
  bool: IParseFunc<boolean>;
  strArray: IParseFunc<Array<string>>;
  numArray: IParseFunc<Array<number>>;
  obj: <T>(value: unknown, defaultValue?: T) => T;
}

export type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;

export class DefaultTypeParser implements IParser {
  string(value: unknown): string {
    if (typeof value === 'string') {
      return value; ``
    } else if (value instanceof Object) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  }
  integer(value: unknown, defaultValue?: number) {
    if (isNaN(Number(value))) {
      return defaultValue;
    } else {
      let val = parseInt(String(value), 10);
      return val;
    }
  }
  int(value: unknown, defaultValue?: number): number {
    return this.integer(value, defaultValue);
  }
  float(value: unknown, defaultValue?: number): number {
    if (isNaN(Number(value))) {
      return defaultValue;
    } else {
      let val = parseFloat(String(value));
      return val;
    }
  }
  bool(value: unknown, defaultValue?: boolean): boolean {
    if (typeof value === 'undefined') {
      return defaultValue || false;
    }
    switch (String(value).toLowerCase()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
        return false;
      default:
        throw new Error(`cannot cast "${value}" to boolean (${value})`);
    }
  }
  strArray(value: unknown): Array<string> {
    if (value instanceof Array) {
      return value;
    } else if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (err) {
        if (value.includes(',')) {
          return value.split(',');
        }
      }
    }
  }
  numArray(value: unknown): Array<number> {
    if (value instanceof Array) {
      return value;
    } else if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (err) {
        if (value.includes(',')) {
          return value.split(',').map(a => Number(a));
        }
      }
    }
  }
  obj<T>(value: unknown): T {
    try {
      return JSON.parse(value as string);
    } catch (err) {
      return {} as T;
    }
  }
}
