import {
  Configurator,
  DotEnvFileProvider,
  DefaultTypeParser,
  ProcessEnvProvider
} from '../../src'
import * as fs from 'fs';
import { expect } from 'chai';

interface IObj { }

export class MyTypeParser extends DefaultTypeParser {
  myParse(value: unknown, defaultValue?: IObj) {
    return {} as IObj;
  }
}

interface ConfigO {
  TEST: string;
  MY_ARRAY: number[];
  STR_ARRAY: string[];
  SPOON: string;
  FOO: { bar: number };
}

const w8 = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Test not throw error", () => {
  let config: Configurator<ConfigO, MyTypeParser>;
  let initialDotEnvFile: Buffer;
  before(async () => {
    initialDotEnvFile = fs.readFileSync('./test/base/.env');
    process.env['SPOON'] = "not exists"
    config = new Configurator<
      ConfigO,
      MyTypeParser
    >({
      providers: [
        new DotEnvFileProvider({ path: './test/base/.env', watch: true }),
        new DotEnvFileProvider({ path: './test/base/.env.dev' }),
        new ProcessEnvProvider(),
      ],
      parser: new MyTypeParser(),
      watchProviders: true,
      watchInterval: 100
    })
    await config.start();
  })

  after(async () => {
    fs.writeFileSync('./test/base/.env', initialDotEnvFile);
    config.stopWatch();
  })

  it("TEST field must be foo", async () => {
    const test = config.getConfigValue("TEST", "string");
    expect(test).to.equal('foo');
  });

  it("MY_ARRAY field must be [1, 2, 3, 4]", async () => {
    const myArray = config.getConfigValue("MY_ARRAY", "numArray");
    expect(myArray).to.deep.eq([1, 2, 3, 4]);
  });

  it(`STR_ARRAY field must be ["foo", "bar"]`, async () => {
    const strArray = config.getConfigValue("STR_ARRAY", "strArray");
    expect(strArray).to.deep.eq(["foo", "bar"]);
  });

  it(`SPOON. ProcessEnv priority test`, async () => {
    const spoon = config.getConfigValue("SPOON", "string");
    expect(spoon).to.be.eq('not exists');
  });

  it("TEST update check field", async () => {
    const test = config.getConfigValue("TEST", "string");
    expect(test).to.equal('foo');
    fs.writeFileSync('./test/base/.env', `TEST=42
MY_ARRAY=[1,2,3,4]
STR_ARRAY=["foo","bar"]
SPOON=exists`);

    await w8(200);

    const newTest = config.getConfigValue("TEST", "string");
    expect(newTest).to.equal('42');
  })
})
