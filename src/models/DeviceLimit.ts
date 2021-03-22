import mongoose from "mongoose";
const Schema = mongoose.Schema;
// filter returned values on requests
const returnFilter = (obj: any) => {
    let tmp = { ...obj }
    tmp.__v = undefined
    return tmp
}

let DeviceLimitSchema = new Schema({
    deviceLimit: { type: Number },
    createdBy: { type: mongoose.Types.ObjectId, required: true },
    activated: { type: Boolean, default: true },
}, { timestamps: true })

DeviceLimitSchema.methods.toJSON = function(){
    const limit = this;
    const limitObject =limit.toObject();
    return returnFilter(limitObject);
}
DeviceLimitSchema.statics.returnFilter = returnFilter;

export const DeviceLimit = mongoose.model("Device_Limit", DeviceLimitSchema)