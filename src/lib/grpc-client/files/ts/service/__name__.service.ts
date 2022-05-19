/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { <%= singular(classify(name)) %>ServiceClient, <%= uppercased(name) %>_SERVICE_NAME } from '../proto/<%= lowercased(name) %>';
import { <%= singular(classify(name)) %>Service } from '../constant/service/<%= lowercased(name) %>.constant';

@Injectable()
export class Grpc<%= singular(classify(name)) %>Service implements OnModuleInit {
  public svc: <%= singular(classify(name)) %>ServiceClient;
  constructor(@Inject(<%= singular(classify(name)) %>Service) private client: ClientGrpc) {}

  onModuleInit() {
    this.svc = this.client.getService<<%= singular(classify(name)) %>ServiceClient>(<%= uppercased(name) %>_SERVICE_NAME);
  }
}