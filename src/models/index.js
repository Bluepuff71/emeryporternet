// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Character, S3Object } = initSchema(schema);

export {
  Character,
  S3Object
};