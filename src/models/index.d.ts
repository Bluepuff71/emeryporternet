import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly key: string;
  readonly region: string;
  constructor(init: ModelInit<S3Object>);
}

type CharacterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Character {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly audio?: S3Object | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Character, CharacterMetaData>);
  static copyOf(source: Character, mutator: (draft: MutableModel<Character, CharacterMetaData>) => MutableModel<Character, CharacterMetaData> | void): Character;
}