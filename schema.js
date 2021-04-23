const mongoose = require('mongoose');

const Float = require('mongoose-float').loadType(mongoose,2)
const schemaBMI = mongoose.Schema({
    Gender:{
        type:String
       
    },
    HeightCm:{
        type:Float
        
    },
    WeightKg:{
        type:Float   
    },
    BMIresult:{
        type:Float
    },
    BMIcatagory:{
        type:String
    },
    Healthrisk:{
        type:String
    }
});
const BMIdata = new mongoose.model('Bmicalculation',schemaBMI );
module.exports = BMIdata; 