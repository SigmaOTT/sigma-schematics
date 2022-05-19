import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { <%= singular(classify(name)) %>Service } from './<%= lowercased(name) %>.service';
import { <%= singular(classify(name)) %>Controller } from './<%= lowercased(name) %>.controller';
import { <%= singular(classify(name)) %> } from './entities/<%= lowercased(name) %>.entity';

@Module({
  imports: [ 
    MikroOrmModule.forFeature({
      entities: [<%= singular(classify(name)) %>],
    }),
  ],
  controllers: [<%= singular(classify(name)) %>Controller],
  providers: [<%= singular(classify(name)) %>Service],
})
export class <%= singular(classify(name)) %>Module {}
