import mongoose from "mongoose";
const Schema = mongoose.Schema;
// filter returned values on requests
const returnFilter = (obj: any) => {
    let tmp = { ...obj }
    tmp.__v = undefined
    return tmp
}

let CalibrationSchema = new Schema({
    certId: {type: String, required: true},
    expiry: {type: String, required: true},
    isDeleted: { type: Boolean, default: false },
    activated: { type: Boolean, default: true },
}, { timestamps: true });

CalibrationSchema.methods.toJSON = function () {
    const calibration = this
    const calibrationObject = calibration.toObject()
    return returnFilter(calibrationObject)
}

CalibrationSchema.statics.returnFilter = returnFilter

export const Calibration = mongoose.model("Calibration", CalibrationSchema);