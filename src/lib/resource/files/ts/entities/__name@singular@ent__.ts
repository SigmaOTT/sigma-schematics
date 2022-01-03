import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional, CollectionResponse } from '@sigmaott/core';
import { CollectionProperties, ExposeQuery } from '@sigmaott/paginate';
import * as uuid from 'uuid';

export type <%= singular(classify(name)) %>Document = <%= singular(classify(name)) %> & Document;

export class <%= singular(classify(name)) %>Collection extends CollectionResponse {
  @ApiPropertyOptional({ type: () => [<%= singular(classify(name)) %>] })
  data: <%= singular(classify(name)) %>[];
}

@Schema({
  timestamps: { currentTime: Date.now },
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: { virtuals: true, versionKey: false },
})
export class <%= singular(classify(name)) %> extends CollectionProperties {
  @Prop({ default: uuid.v4 })
  @ExposeQuery({ filterable: true })
  @ApiPropertyOptional({ filterable: true })
  id: string;

  @Prop()
  @ExposeQuery({ filterable: true, sortable: true })
  @ApiPropertyOptional({ filterable: true, sortable: true })
  name: string;

  @Prop()
  @ExposeQuery({ filterable: true })
  @ApiPropertyOptional({ filterable: true })
  description: string;

  @Prop()
  @ExposeQuery({ filterable: true, sortable: true })
  @ApiPropertyOptional({ filterable: true, sortable: true })
  createdAt?: Date;

  @Prop()
  @ExposeQuery({ filterable: true, sortable: true })
  @ApiPropertyOptional({ filterable: true, sortable: true })
  updatedAt?: Date;
}


export const <%= singular(classify(name)) %>Schema = SchemaFactory.createForClass(<%= singular(classify(name)) %>);
