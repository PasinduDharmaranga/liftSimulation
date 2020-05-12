const express = require('express');
const router = express.Router();

var liftOneState = "IDLE"
var liftOneDirection = "NAN"         //Initializing directions and states for both lifts
var liftTwoState = "IDLE"
var liftTwoDirection = "NAN"
var currentLiftOnePosition = 1
var currentLiftTwoPosition = 1

router.get('/smartkent/liftsimulation/', function(req, res) {
    if(liftOneState=="IDLE" && liftTwoState=="IDLE"){       //checking the states of lifts to assign he ride
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
      var timeToPassenger = (Math.abs(req.query.fromFloor-currentLiftOnePosition))*3  //calculating the time to get to the passenger
      var timetojourney = Math.abs((req.query.fromFloor-req.query.toFloor)*4)  //Calculating the time to journey
      console.log('Lift one is coming ' + liftOneDirection);
      console.log('Lift one will arrive within ' + timeToPassenger+ ' seconds');
      res.json({ ETA: timeToPassenger }) // JSON log for 'ETA'
      console.log('Your journey will take ' + timetojourney + ' seconds');

         console.log('Lift one state is ' + liftOneState);
         console.log('################################################################ ');
     
         setTimeout(function() {  
             
            liftOneState = "PICKUP" 
            liftOneDirection = "NAN"                            //Now the Lift will be at the passenger
             currentLiftOnePosition = req.query.fromFloor
             console.log("lift one states is "+ liftOneState); 
             console.log("Lift one is at "+ currentLiftOnePosition + " floor"); 
             console.log('################################################################ ');

            }, timeToPassenger*1000);
            
            setTimeout(function() {  
             
                liftOneState = "TO_DROPOFF"   
                if(req.query.fromFloor>currentLiftOnePosition){
                    liftOneDirection = "UP"                     //Doors will close after 4 seconds and now lift has started the ride
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
            
            liftOneState = "DROPOFF"                        //Now lift will be at the distination and door will be opened
            liftOneDirection = "NAN"
            currentLiftOnePosition = req.query.toFloor
            console.log("lift one states is "+ liftOneState); 
            console.log('################################################################ ');
        }, (timeToPassenger*1000)+4000 + (timetojourney*1000));

            setTimeout(function() {  
            
                liftOneState = "IDLE" 
                                                            //Doors will be closed and lift is waiting for the next request
                console.log("lift one states is "+ liftOneState); 
                console.log("Lift one is at "+ currentLiftOnePosition + " floor"); 
                }, (timeToPassenger*1000)+4000 + (timetojourney*1000) + 4000);
               
    }
    
    //Same prcedure will effct to the second lift also
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

  //Assumptions
  //Both lift will be at the IDLE state and First floor.
  //Ground floor will be the first floor. No basement.
  //All the manual switches will be disable. So one lift can be operated by on single mobile app.