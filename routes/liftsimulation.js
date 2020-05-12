const express = require('express');
const router = express.Router();

var liftOneState = "IDLE"
var liftOneDirection = "NAN"
var liftTwoState = "IDLE"
var liftTwoDirection = "NAN"
var currentLiftOnePosition = 1
var currentLiftTwoPosition = 1

router.get('/smartkent/liftsimulation/', function(req, res) {
    if(liftOneState=="IDLE" && liftTwoState=="IDLE"){
        liftOneState = "TO_PICKUP"
        if(req.query.fromFloor>currentLiftOnePosition){
            liftOneDirection = "UP" 
        }
        else if(req.query.fromFloor<currentLiftOnePosition){
            liftOneDirection = "DOWN"
        }
        else{
            liftOneDirection = "NAN"
        }
      var timeToPassenger = (Math.abs(req.query.fromFloor-currentLiftOnePosition))*3
      var timetojourney = Math.abs((req.query.fromFloor-req.query.toFloor)*4)
      console.log('Lift one is coming ' + liftOneDirection);
      console.log('Lift one will arrive within ' + timeToPassenger+ ' seconds');
      res.json({ ETA: timeToPassenger })
      console.log('Your journey will take ' + timetojourney + ' seconds');

         console.log('Lift one state is ' + liftOneState);
         console.log('################################################################ ');
     
         setTimeout(function() {  
             
            liftOneState = "PICKUP" 
            liftOneDirection = "NAN"
             currentLiftOnePosition = req.query.fromFloor
             console.log("lift one states is "+ liftOneState); 
             console.log("Lift one is at "+ currentLiftOnePosition + " floor"); 
             console.log('################################################################ ');

            }, timeToPassenger*1000);
            
            setTimeout(function() {  
             
                liftOneState = "TO_DROPOFF"   
                if(req.query.fromFloor>currentLiftOnePosition){
                    liftOneDirection = "UP" 
                }
                else if(req.query.fromFloor<currentLiftOnePosition){
                    liftOneDirection = "DOWN"
                }
                else{
                    liftOneDirection = "NAN"
                }   
                console.log("lift one states is "+ liftOneState); 
                console.log('################################################################ ');

               }, (timeToPassenger*1000)+4000);

            setTimeout(function() {  
            
            liftOneState = "DROPOFF" 
            liftOneDirection = "NAN"
            currentLiftOnePosition = req.query.toFloor
            console.log("lift one states is "+ liftOneState); 
            console.log('################################################################ ');
        }, (timeToPassenger*1000)+4000 + (timetojourney*1000));

            setTimeout(function() {  
            
                liftOneState = "IDLE" 
               
                console.log("lift one states is "+ liftOneState); 
                console.log("Lift one is at "+ currentLiftOnePosition + " floor"); 
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
    
             console.log('Lift two state is ' + liftTwoState);
             console.log('################################################################ ');
         
             setTimeout(function() {  
                 
                 liftTwoState = "PICKUP" 
                 liftTwoDirection = "NAN"
                 currentLiftTwoPosition = req.query.fromFloor
                 console.log("lift two states is "+ liftTwoState); 
                 console.log("Lift two is at "+ currentLiftTwoPosition + " floor"); 
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