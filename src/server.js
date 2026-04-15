'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3029;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/ratelimiter'));
app.get('/',(_,r)=>r.json({service:'hive-rate-limiter',version:'1.0.0',description:'Intelligent rate limiting — adaptive throttling, quota management, abuse prevention',endpoints:{"check":"POST /v1/ratelimiter/check","quota":"POST /v1/ratelimiter/quota","stats":"GET /v1/ratelimiter/stats","records":"GET /v1/ratelimiter/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-rate-limiter] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
