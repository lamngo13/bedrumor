import { CreateImageData, ListImagesData, UpdateImageData, UpdateImageVariables, DeleteImageData, DeleteImageVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateImageOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateImageData, FirebaseError, undefined>;
export function injectCreateImage(options?: CreateImageOptions, injector?: Injector): CreateDataConnectMutationResult<CreateImageData, undefined, >;

export type ListImagesOptions = () => Omit<CreateDataConnectQueryOptions<ListImagesData, undefined>, 'queryFn'>;
export function injectListImages(options?: ListImagesOptions, injector?: Injector): CreateDataConnectQueryResult<ListImagesData, undefined>;

type UpdateImageOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateImageData, FirebaseError, UpdateImageVariables>;
export function injectUpdateImage(options?: UpdateImageOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateImageData, UpdateImageVariables, UpdateImageVariables>;

type DeleteImageOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteImageData, FirebaseError, DeleteImageVariables>;
export function injectDeleteImage(options?: DeleteImageOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteImageData, DeleteImageVariables, DeleteImageVariables>;
