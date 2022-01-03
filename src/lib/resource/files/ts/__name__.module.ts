import { Module } from '@nestjs/common';
import { <%= singular(classify(name)) %>Service } from './<%= lowercased(name) %>.service';
import { <%= singular(classify(name)) %>Controller } from './<%= lowercased(name) %>.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= singular(classify(name)) %>, <%= singular(classify(name)) %>Schema } from './entities/<%= lowercased(name) %>.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: <%= singular(classify(name)) %>.name, schema: <%= singular(classify(name)) %>Schema }])],
  controllers: [<%= singular(classify(name)) %>Controller],
  providers: [<%= singular(classify(name)) %>Service],
})
export class <%= singular(classify(name)) %>Module {}
