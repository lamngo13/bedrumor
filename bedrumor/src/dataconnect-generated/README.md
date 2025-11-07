# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListImages*](#listimages)
- [**Mutations**](#mutations)
  - [*CreateImage*](#createimage)
  - [*UpdateImage*](#updateimage)
  - [*DeleteImage*](#deleteimage)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListImages
You can execute the `ListImages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listImages(): QueryPromise<ListImagesData, undefined>;

interface ListImagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListImagesData, undefined>;
}
export const listImagesRef: ListImagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listImages(dc: DataConnect): QueryPromise<ListImagesData, undefined>;

interface ListImagesRef {
  ...
  (dc: DataConnect): QueryRef<ListImagesData, undefined>;
}
export const listImagesRef: ListImagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listImagesRef:
```typescript
const name = listImagesRef.operationName;
console.log(name);
```

### Variables
The `ListImages` query has no variables.
### Return Type
Recall that executing the `ListImages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListImagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListImagesData {
  images: ({
    id: UUIDString;
    createdAt: TimestampString;
    name?: string | null;
    size?: number | null;
    url: string;
  } & Image_Key)[];
}
```
### Using `ListImages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listImages } from '@dataconnect/generated';


// Call the `listImages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listImages();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listImages(dataConnect);

console.log(data.images);

// Or, you can use the `Promise` API.
listImages().then((response) => {
  const data = response.data;
  console.log(data.images);
});
```

### Using `ListImages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listImagesRef } from '@dataconnect/generated';


// Call the `listImagesRef()` function to get a reference to the query.
const ref = listImagesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listImagesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.images);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.images);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateImage
You can execute the `CreateImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createImage(): MutationPromise<CreateImageData, undefined>;

interface CreateImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateImageData, undefined>;
}
export const createImageRef: CreateImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createImage(dc: DataConnect): MutationPromise<CreateImageData, undefined>;

interface CreateImageRef {
  ...
  (dc: DataConnect): MutationRef<CreateImageData, undefined>;
}
export const createImageRef: CreateImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createImageRef:
```typescript
const name = createImageRef.operationName;
console.log(name);
```

### Variables
The `CreateImage` mutation has no variables.
### Return Type
Recall that executing the `CreateImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateImageData {
  image_insert: Image_Key;
}
```
### Using `CreateImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createImage } from '@dataconnect/generated';


// Call the `createImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createImage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createImage(dataConnect);

console.log(data.image_insert);

// Or, you can use the `Promise` API.
createImage().then((response) => {
  const data = response.data;
  console.log(data.image_insert);
});
```

### Using `CreateImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createImageRef } from '@dataconnect/generated';


// Call the `createImageRef()` function to get a reference to the mutation.
const ref = createImageRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createImageRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.image_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.image_insert);
});
```

## UpdateImage
You can execute the `UpdateImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateImage(vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

interface UpdateImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
}
export const updateImageRef: UpdateImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateImage(dc: DataConnect, vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

interface UpdateImageRef {
  ...
  (dc: DataConnect, vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
}
export const updateImageRef: UpdateImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateImageRef:
```typescript
const name = updateImageRef.operationName;
console.log(name);
```

### Variables
The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateImageVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateImageData {
  image_update?: Image_Key | null;
}
```
### Using `UpdateImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateImage, UpdateImageVariables } from '@dataconnect/generated';

// The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`:
const updateImageVars: UpdateImageVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateImage(updateImageVars);
// Variables can be defined inline as well.
const { data } = await updateImage({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateImage(dataConnect, updateImageVars);

console.log(data.image_update);

// Or, you can use the `Promise` API.
updateImage(updateImageVars).then((response) => {
  const data = response.data;
  console.log(data.image_update);
});
```

### Using `UpdateImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateImageRef, UpdateImageVariables } from '@dataconnect/generated';

// The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`:
const updateImageVars: UpdateImageVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateImageRef()` function to get a reference to the mutation.
const ref = updateImageRef(updateImageVars);
// Variables can be defined inline as well.
const ref = updateImageRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateImageRef(dataConnect, updateImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.image_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.image_update);
});
```

## DeleteImage
You can execute the `DeleteImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteImage(vars: DeleteImageVariables): MutationPromise<DeleteImageData, DeleteImageVariables>;

interface DeleteImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteImageVariables): MutationRef<DeleteImageData, DeleteImageVariables>;
}
export const deleteImageRef: DeleteImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteImage(dc: DataConnect, vars: DeleteImageVariables): MutationPromise<DeleteImageData, DeleteImageVariables>;

interface DeleteImageRef {
  ...
  (dc: DataConnect, vars: DeleteImageVariables): MutationRef<DeleteImageData, DeleteImageVariables>;
}
export const deleteImageRef: DeleteImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteImageRef:
```typescript
const name = deleteImageRef.operationName;
console.log(name);
```

### Variables
The `DeleteImage` mutation requires an argument of type `DeleteImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteImageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteImageData {
  image_delete?: Image_Key | null;
}
```
### Using `DeleteImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteImage, DeleteImageVariables } from '@dataconnect/generated';

// The `DeleteImage` mutation requires an argument of type `DeleteImageVariables`:
const deleteImageVars: DeleteImageVariables = {
  id: ..., 
};

// Call the `deleteImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteImage(deleteImageVars);
// Variables can be defined inline as well.
const { data } = await deleteImage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteImage(dataConnect, deleteImageVars);

console.log(data.image_delete);

// Or, you can use the `Promise` API.
deleteImage(deleteImageVars).then((response) => {
  const data = response.data;
  console.log(data.image_delete);
});
```

### Using `DeleteImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteImageRef, DeleteImageVariables } from '@dataconnect/generated';

// The `DeleteImage` mutation requires an argument of type `DeleteImageVariables`:
const deleteImageVars: DeleteImageVariables = {
  id: ..., 
};

// Call the `deleteImageRef()` function to get a reference to the mutation.
const ref = deleteImageRef(deleteImageVars);
// Variables can be defined inline as well.
const ref = deleteImageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteImageRef(dataConnect, deleteImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.image_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.image_delete);
});
```

