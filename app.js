const express = require('express');
const BMIdata = require('./schema/schema');
const convert = require('convert-units')
const app = express();
require('./db/conn');
require('./schema/schema')
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/BMIcalc',async(req,res)=>{
    try {
        const get_BMIcatagory = "Over Weight";
        const OverWeighted_persons = await BMIdata.find({BMIcatagory:get_BMIcatagory});
        console.log(OverWeighted_persons); 
        res.send(OverWeighted_persons)  
    } catch (e) {
        console.log(e);
    }
  
})
app.post('/BMIcalc',async(req,res)=>{
    try {
        
       
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
              let Bmipostdata =new BMIdata(req.body[key]);
              let h_cm = parseFloat(Bmipostdata.HeightCm);
                const h_m =await convert(h_cm).from('cm').to('m');
                let w = parseFloat(Bmipostdata.WeightKg);
                let BMIresult = w / (h_m * h_m); 
                if (BMIresult <= 18.4) {
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = "Under Weight";
                    Bmipostdata.Healthrisk = "Malnutrition risk";
                } else if (  BMIresult >= 18.5 && BMIresult < 25) {
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = "normal Weight";
                    Bmipostdata.Healthrisk = "Low risk";
                } else if ( BMIresult >= 25 && BMIresult < 30) {
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = "Over Weight";
                    Bmipostdata.Healthrisk = "Enhanced risk";
                } else if(BMIresult >=30 && BMIresult <= 34.9) {
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = "Normally Obese";
                    Bmipostdata.Healthrisk="Medium risk";
                } else if(BMIresult >=35 && BMIresult <= 39.9){
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = " Severly Obese";
                    Bmipostdata.Healthrisk = "High risk";
                } else{
                    Bmipostdata.BMIresult = await BMIresult;
                    Bmipostdata.BMIcatagory = "Very Severly Obese";
                    Bmipostdata.Healthrisk = "Very high risk";
                }
                const BmiParams = await Bmipostdata.save();
            console.log(BmiParams); 
            }
            
        }
                 
} catch (error) {
      console.log(error);  
}
})

app.listen(port,()=>{
    console.log(`connected to port number ${port}`);
});