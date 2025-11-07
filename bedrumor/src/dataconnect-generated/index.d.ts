import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateImageData {
  image_insert: Image_Key;
}

export interface DeleteImageData {
  image_delete?: Image_Key | null;
}

export interface DeleteImageVariables {
  id: UUIDString;
}

export interface Image_Key {
  id: UUIDString;
  __typename?: 'Image_Key';
}

export interface ListImagesData {
  images: ({
    id: UUIDString;
    createdAt: TimestampString;
    name?: string | null;
    size?: number | null;
    url: string;
  } & Image_Key)[];
}

export interface UpdateImageData {
  image_update?: Image_Key | null;
}

export interface UpdateImageVariables {
  id: UUIDString;
  name?: string | null;
}

interface CreateImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateImageData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateImageData, undefined>;
  operationName: string;
}
export const createImageRef: CreateImageRef;

export function createImage(): MutationPromise<CreateImageData, undefined>;
export function createImage(dc: DataConnect): MutationPromise<CreateImageData, undefined>;

interface ListImagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListImagesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListImagesData, undefined>;
  operationName: string;
}
export const listImagesRef: ListImagesRef;

export function listImages(): QueryPromise<ListImagesData, undefined>;
export function listImages(dc: DataConnect): QueryPromise<ListImagesData, undefined>;

interface UpdateImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
  operationName: string;
}
export const updateImageRef: UpdateImageRef;

export function updateImage(vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;
export function updateImage(dc: DataConnect, vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

interface DeleteImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteImageVariables): MutationRef<DeleteImageData, DeleteImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteImageVariables): MutationRef<DeleteImageData, DeleteImageVariables>;
  operationName: string;
}
export const deleteImageRef: DeleteImageRef;

export function deleteImage(vars: DeleteImageVariables): MutationPromise<DeleteImageData, DeleteImageVariables>;
export function deleteImage(dc: DataConnect, vars: DeleteImageVariables): MutationPromise<DeleteImageData, DeleteImageVariables>;

