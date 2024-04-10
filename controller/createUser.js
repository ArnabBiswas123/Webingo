const User=require('../models/User');

const createUser=async(req,res)=>{
    try {
        const { firstName, lastName, latitude, longitude } = req.body;
    
       
        if (!firstName || !lastName || !latitude || !longitude) {
          return res.status(400).json({success:false ,msg: 'All fields are required.' });
        }

        if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
            return res.json({success:false, msg:'latitude is invalid'}); 
          }
        
          if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
            return res.json({success:false, msg:'longitude is invalid'}); 
          }
    
      
        const newUser = new User({ firstName, lastName, latitude, longitude });
        await newUser.save();
    
        res.status(201).json({success:true, user:newUser});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
module.exports=createUser