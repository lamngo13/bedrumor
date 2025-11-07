const { createImageRef, listImagesRef, updateImageRef, deleteImageRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateImage = function injectCreateImage(args, injector) {
  return injectDataConnectMutation(createImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListImages = function injectListImages(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listImagesRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateImage = function injectUpdateImage(args, injector) {
  return injectDataConnectMutation(updateImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteImage = function injectDeleteImage(args, injector) {
  return injectDataConnectMutation(deleteImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

