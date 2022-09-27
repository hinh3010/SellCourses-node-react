import paginateV2 from 'mongoose-paginate-v2';
import paginate from './paginate.plugin';
import toJSON from './toJson.plugin';

const plugin = {
    paginatePluginV2: paginateV2,
    paginatePlugin: paginate,
    jsonPlugin: toJSON
}

export default plugin