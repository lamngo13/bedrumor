import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'bedrumor',
  location: 'us-east4'
};

export const createImageRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateImage');
}
createImageRef.operationName = 'CreateImage';

export function createImage(dc) {
  return executeMutation(createImageRef(dc));
}

export const listImagesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListImages');
}
listImagesRef.operationName = 'ListImages';

export function listImages(dc) {
  return executeQuery(listImagesRef(dc));
}

export const updateImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateImage', inputVars);
}
updateImageRef.operationName = 'UpdateImage';

export function updateImage(dcOrVars, vars) {
  return executeMutation(updateImageRef(dcOrVars, vars));
}

export const deleteImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteImage', inputVars);
}
deleteImageRef.operationName = 'DeleteImage';

export function deleteImage(dcOrVars, vars) {
  return executeMutation(deleteImageRef(dcOrVars, vars));
}

