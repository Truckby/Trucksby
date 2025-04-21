const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },

        // Basic Truck Info
        vehicleName: { type: String, trim: true },
        vehiclePrice: { type: String, trim: true },
        truckCategory: { type: String, trim: true },
        location: { type: String, trim: true },
        uploadImages: {
            type: [String],
            default: [],
        },

        // Seller Contact Info
        name: { type: String, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true },

        // Specifications
        modelYear: { type: String, trim: true },
        mileage: { type: String, trim: true },
        vehicleManufacturer: { type: String, trim: true },
        hours: { type: String, trim: true },
        vin: { type: String, trim: true },
        condition: { type: String, trim: true },

        // Body & Chassis
        payload: { type: String, trim: true },
        gwr: { type: String, trim: true },
        wheelbase: { type: String, trim: true },
        steering: { type: String, trim: true },
        color: { type: String, trim: true },
        suspension: { type: String, trim: true },
        grossVehicleWeight: { type: String, trim: true },

        // Transmission
        transmissionType: { type: String, trim: true },
        noofSpeeds: { type: String, trim: true },

        // Axles
        numberofRearAxles: { type: String, trim: true },
        frontAxleWeight: { type: String, trim: true },
        rearAxleWeight: { type: String, trim: true },
    },
    { timestamps: true }
);

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
