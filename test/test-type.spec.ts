import {
  Configurator,
  DotEnvFileProvider,
  DefaultTypeParser
} from '../src'

export class MyTypeParser extends DefaultTypeParser {
  array(value: unknown) {
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
}

type MyConfigType = { fool: number };

const configurator = new Configurator<
  MyTypeParser
>({
  providers: [
    new DotEnvFileProvider({ path: '.env' })
  ],
  parser: new MyTypeParser()
})