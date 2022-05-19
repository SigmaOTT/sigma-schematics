import { Entity } from '@mikro-orm/core';
import { ApiPropertyOptional, BaseEntity, CollectionResponse } from '@sigmaott/core';

export class <%= singular(classify(name)) %>Collection extends CollectionResponse {
  @ApiPropertyOptional({ type: () => [<%= singular(classify(name)) %>] })
  data: <%= singular(classify(name)) %>[];
}

@Entity({ tableName: '<%= lowercased(name) %>' })
export class <%= singular(classify(name)) %> extends BaseEntity {}
