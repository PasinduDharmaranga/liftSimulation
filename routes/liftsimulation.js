

const express = require('express');
const router = express.Router();

var liftState = "IDLE"
var direction = "NAN"
var liftTwoState = "IDLE"
var liftTwoDirection = "NAN"
var currentLiftPosition = 1
var currentLiftTwoPosition = 1

router.get('/smartKent/liftsimulation/', function(req, res) {
    if(liftState=="IDLE" && liftTwoState=="IDLE"){
        liftState = "TO_PICKUP"
        if(req.query.fromFloor>currentLiftPosition){
            direction = "UP" 
        }
        else{
            direction = "DOWN"
        }
      var timeToPassenger = (Math.abs(req.query.fromFloor-currentLiftPosition))*3
      var timetojourney = Math.abs((req.query.fromFloor-req.query.toFloor)*4)
      console.log('Lift is coming ' + direction);
      console.log('Lift will arrive within ' + timeToPassenger+ ' seconds');
      console.log('Your journey will take ' + timetojourney + ' seconds');

         console.log('Lift state is ' + liftState);
         console.log('################################################################ ');
     
         setTimeout(function() {  
             
             liftState = "PICKUP" 
             direction = "NAN"
             currentLiftPosition = req.query.fromFloor
             console.log("lift states is "+ liftState); 
             console.log("Lift is at "+ currentLiftPosition + " floor"); 
             console.log('################################################################ ');

            }, timeToPassenger*1000);
            
            setTimeout(function() {  
             
                liftState = "TO_DROPOFF"   
                if(req.query.toFloor>currentLiftPosition){
                    direction = "UP" 
                }
                else{
                    direction = "DOWN"
                }      
                console.log("lift states is "+ liftState); 
                console.log('################################################################ ');

               }, (timeToPassenger*1000)+4000);

            setTimeout(function() {  
            
            liftState = "DROPOFF" 
            direction = "NAN"
            currentLiftPosition = req.query.toFloor
            console.log("lift states is "+ liftState); 
            console.log('################################################################ ');
        }, (timeToPassenger*1000)+4000 + (timetojourney*1000));

            setTimeout(function() {  
            
                liftState = "IDLE" 
               
                console.log("lift states is "+ liftState); 
                console.log("Lift is at "+ currentLiftPosition + " floor"); 
                }, (timeToPassenger*1000)+4000 + (timetojourney*1000) + 4000);
               
    }
    
    
    else{
        if(liftTwoState=="IDLE"){
            liftTwoState = "TO_PICKUP"
            if(req.query.fromFloor>currentLiftTwoPosition){
                liftTwoDirection = "UP" 
            }
            else{
                liftTwoDirection = "DOWN"
            }
          var timeToPassenger = (Math.abs(req.query.fromFloor-currentLiftTwoPosition))*3
          var timetojourney = Math.abs((req.query.fromFloor-req.query.toFloor)*4)
          console.log('Lift two is coming ' + liftTwoDirection);
          console.log('Lift two will arrive within ' + timeToPassenger+ ' seconds');
          console.log('Your journey will take ' + timetojourney + ' seconds');
    
             console.log('Lift state is ' + liftTwoState);
             console.log('################################################################ ');
         
             setTimeout(function() {  
                 
                 liftTwoState = "PICKUP" 
                 liftTwoDirection = "NAN"
                 currentLiftTwoPosition = req.query.fromFloor
                 console.log("lift two states is "+ liftTwoState); 
                 console.log("Lift two is at "+ currentLiftPosition + " floor"); 
                 console.log('################################################################ ');
    
                }, timeToPassenger*1000);
                
                setTimeout(function() {  
                 
                    liftState = "TO_DROPOFF"   
                    if(req.query.toFloor>currentLiftTwoPosition){
                        liftTwoDirection = "UP" 
                    }
                    else{
                        liftTwoDirection = "DOWN"
                    }      
                    console.log("lift two states is "+ liftTwoState); 
                    console.log('################################################################ ');
    
                   }, (timeToPassenger*1000)+4000);
    
                setTimeout(function() {  
                
                liftState = "DROPOFF" 
                direction = "NAN"
                currentLiftTwoPosition = req.query.toFloor
                console.log("lift two states is "+ liftTwoState); 
                console.log('################################################################ ');
            }, (timeToPassenger*1000)+4000 + (timetojourney*1000));
    
                setTimeout(function() {  
                
                    liftTwoState = "IDLE" 
                   
                    console.log("lift two states is "+ liftTwoState); 
                    console.log("Lift two is at "+ currentLiftTwoPosition + " floor"); 
                    }, (timeToPassenger*1000)+4000 + (timetojourney*1000) + 4000);
                   
        }
        else{
            console.log('Sorry all the lift are busy');
        }
    }
    
    
  });
  

  module.exports = router;