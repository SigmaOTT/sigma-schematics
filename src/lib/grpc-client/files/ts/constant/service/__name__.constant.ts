import * as path from 'path';
const baseUrl = path.resolve(__dirname, '../../proto');

export const <%= singular(classify(name)) %>ServiceUrl = 'api-<%= lowercased(name) %>:50051';
export const <%= singular(classify(name)) %>Service = '<%= uppercased(name) %>_SERVICE';
export const <%= singular(classify(name)) %>ServiceProto = path.resolve(baseUrl, '<%= lowercased(name) %>.proto');
