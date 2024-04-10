const User=require('../models/User');
const distance=async(req,res)=>{
      try {
        const { latitude, longitude } = req.body;
        if(!latitude||!longitude){
          return res.json({success:false, msg:'send all fields'});
        }

        if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
          return res.json({success:false, msg:'latitude is invalid'}); 
        }
      
        if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
          return res.json({success:false, msg:'longitude is invalid'}); 
        }



        const radius = 100; // meters
        const users = await User.find();  
        const nearbyUsers = users.filter(user => {
          const distance = calculateDistance(latitude, longitude, user.latitude, user.longitude);
          return distance <= radius;
        });

        if(nearbyUsers.length===0){
          return res.json({success:false, msg:'No user in 100m radius'})
        }
        res.json({success:true, users:nearbyUsers});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const l1 = lat1 * Math.PI / 180; 
  const l2 = lat2 * Math.PI / 180;
  const l = (lat2 - lat1) * Math.PI / 180;
  const lamda = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(l / 2) * Math.sin(l / 2) +
    Math.cos(l1) * Math.cos(l2) *
    Math.sin(lamda / 2) * Math.sin(lamda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}
module.exports=distance