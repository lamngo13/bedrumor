const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'bedrumor',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createImageRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateImage');
}
createImageRef.operationName = 'CreateImage';
exports.createImageRef = createImageRef;

exports.createImage = function createImage(dc) {
  return executeMutation(createImageRef(dc));
};

const listImagesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListImages');
}
listImagesRef.operationName = 'ListImages';
exports.listImagesRef = listImagesRef;

exports.listImages = function listImages(dc) {
  return executeQuery(listImagesRef(dc));
};

const updateImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateImage', inputVars);
}
updateImageRef.operationName = 'UpdateImage';
exports.updateImageRef = updateImageRef;

exports.updateImage = function updateImage(dcOrVars, vars) {
  return executeMutation(updateImageRef(dcOrVars, vars));
};

const deleteImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteImage', inputVars);
}
deleteImageRef.operationName = 'DeleteImage';
exports.deleteImageRef = deleteImageRef;

exports.deleteImage = function deleteImage(dcOrVars, vars) {
  return executeMutation(deleteImageRef(dcOrVars, vars));
};
