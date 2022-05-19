/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { IGrpcModuleOption } from '../interface/grpc-module-option.interface';
import { GRPC_MODULE_OPTION } from '../constant/grpc.constant';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Grpc<%= singular(classify(name)) %>Service } from '../service/<%= lowercased(name) %>.service';
import { SIGMA_GVIET_SRV_<%= uppercased(name) %>_PACKAGE_NAME } from '../proto/<%= lowercased(name) %>';
import {
  <%= singular(classify(name)) %>Service,
  <%= singular(classify(name)) %>ServiceUrl,
} from '../constant/service/<%= lowercased(name) %>.constant';

@Module({
  exports: [Grpc<%= singular(classify(name)) %>Service],
})
export class Grpc<%= singular(classify(name)) %>ServiceModule extends createConfigurableDynamicRootModule<
  Grpc<%= singular(classify(name)) %>ServiceModule,
  IGrpcModuleOption
>(GRPC_MODULE_OPTION, {
  providers: [
    {
      provide: <%= singular(classify(name)) %>Service,
      useFactory: (config: IGrpcModuleOption) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: config.serviceUri || <%= singular(classify(name)) %>ServiceUrl,
            package: SIGMA_GVIET_SRV_<%= uppercased(name) %>_PACKAGE_NAME,
            protoPath: join(__dirname, 'proto/<%= lowercased(name) %>.proto'),
          },
        });
      },
      inject: [GRPC_MODULE_OPTION],
    },
    Grpc<%= singular(classify(name)) %>Service,
  ],
}) {}
