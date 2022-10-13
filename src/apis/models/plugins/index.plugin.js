import paginateV2 from 'mongoose-paginate-v2';
import paginate from './paginate.plugin';
import toJSON from './toJson.plugin';
import privates from 'mongoose-private'
import mongoose from 'mongoose';
const deepPopulate = require('mongoose-deep-populate')(mongoose);
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const plugin = {
    paginatePluginV2: paginateV2,
    privatesPlugin: privates,
    paginatePlugin: paginate,
    jsonPlugin: toJSON,
    deepPopulatePlugin: deepPopulate,
    aggregatePaginatePlugin: aggregatePaginate
}

export default plugin