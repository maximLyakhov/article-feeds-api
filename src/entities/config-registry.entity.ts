export interface ConfigRegistryEntity {
  dynamodb_version: number;
  type: ConfigRegistryType;
  key: string;
  id: string;
  id_client: string;
  value: string;
  creation_date: Date;
  db_last_modified: Date;
}

export enum ConfigRegistryType {
  Translations = 'translations',
  FeatureFlags = 'featureFlags',
  ClientConfiguration = 'clientConfiguration',
  PageConfiguration = 'pageConfiguration',
  Similarity = 'similarity',
  EditorConfiguration = 'editorConfiguration',
}
