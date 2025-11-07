import { createImageRef, listImagesRef, updateImageRef, deleteImageRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateImage(args, injector) {
  return injectDataConnectMutation(createImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListImages(options, injector) {
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

export function injectUpdateImage(args, injector) {
  return injectDataConnectMutation(updateImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteImage(args, injector) {
  return injectDataConnectMutation(deleteImageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

