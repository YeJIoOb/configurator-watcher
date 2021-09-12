
export type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;

export interface IParser {
  string: IParseFunc<string>;
  integer: IParseFunc<number>;
  int: IParseFunc<number>;
  float: IParseFunc<number>;
  bool: IParseFunc<boolean>;
}

export class DefaultTypeParser implements IParser {
  string(value: unknown): string {
    if (typeof value === 'string') {
      return value;
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
}
