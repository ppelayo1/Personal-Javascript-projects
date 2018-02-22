/*  List of Created IDs

    stickMan     The image of the stick figure
*/





//builds the stick man and the rest of the board
function bDisp() {
    "use strict";



    //variables
    var ctx = document.getElementById("game"),
        img = new Image();

    ctx.getContext("2d");

    //build the stick man

    ctx = ctx.getContext("2d");

    /*
    img.onload = function () {
        ctx.drawImage(img, 0, 280, 35, 33);
    };
    
    img.src = "./Images/stickMan.jpg";   
    
    */

    //draw the hoop
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.moveTo(490, 160);
    ctx.lineTo(430, 160);
    ctx.stroke();

    //draw the pole
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(490, 315);
    ctx.lineTo(490, 160);
    ctx.stroke();

    //draw the pole
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 0);
    ctx.lineTo(500, 315);
    ctx.stroke();


}

//this function will clear then redraw the display
function cDisp() {
    "use strict";
    var ctx = document.getElementById("game");
    ctx = ctx.getContext("2d");
    ctx.clearRect(0, 0, 5000, 5000);
    bDisp();
}

/*
//animates a moving line for the location of where the ball will leave hands
function movL() {
    "use strict";

    //variables   
    var toss = false; //boolean ball tossed
    var pos = {
        x: 100,
        r: 80,
        ccw: true
    }; //Object with the x position, the radius, and if it is currenlty being                                   //drawn ccw


    
    
var x = 0;

    
    while (toss == false) {
        

        //call the draw function
        draw(pos);
        

        //Alternate between ccw and cw values of x
        ccw2cw(pos);

        if(x === 10000)
            toss = true;
        
        x++;
    }



}

*/


//This function incriments or decriments the x value of the aim line to simulate a moving line from verticle to horizon in cycles
function ccw2cw(pos) {
    "use strict";
    if (pos.ccw === true) {
        pos.x -= 0.1;
        if (pos.x <= 20)
            pos.ccw = false;
    } else {
        pos.x += .1;
        if (pos.x >= 80)
            pos.ccw = true;
    }
}



function draw(pos) {
    "use strict";

    //variables
    var r = pos.r;
    var xr = (pos.x - 20); //x value relative to a triangle    
    pos.yr = 280 - Math.sqrt(r * r - xr * xr); //This will determine the y value of the board relative to a 0,0 board

    //build the context object
    var ctx = document.getElementById("game");
    ctx = ctx.getContext("2d");

    //clear board before drawing
    cDisp();


    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(pos.x, pos.yr);
    ctx.stroke();

}

//wrapper for setinterval and mov line function
function wrapMov() {

    //variables   
    var toss = false; //boolean ball tossed
    var pos = {
        x: 80,
        r: 60,
        ccw: true,
        yr: 0
    };
    var button = document.getElementById("but"); //Button object

    button.innerHTML = "Click to Throw"; //change button wording


    //animates a moving line for the location of where the ball will leave hands
    //This is a wrapper of the setInterval function to ensure it is called at specific periods of time
    var timer = setInterval(function movL() {
        "use strict";

        //Keep animating the movement of the line
        if (toss === false) {



            //call the draw function
            draw(pos);


            //Alternate between ccw and cw values of x
            ccw2cw(pos);

            //This function is called when button is pressed a second time, it will change the toss variable to true on click
            button.onclick = function isTossed() {
                //variables


                //set toss to true
                toss = true;

                //reset the screen
                cDisp();

            };



        } else {

            //clear the throwing animation
            clearInterval(timer);


            //this function will calculate the movement of the ball with gravity
            var ball = function () {
                //varibles
                var physics = {
                    gravity: 1, //speed of gravity
                    v: 23, //Velocity of ball, initially the initial velocity                    
                    height: pos.yr, //initial height
                    dist: pos.x, //inital distance
                    h2: 0, //Final hight
                    d2: 0, //final horizontal dist                    
                    vx: 0, //Initial Horizontal Velocity
                    vy: 0, //Initial Vert Velocity                    
                    vy2: 0, //Final velocity vert
                    t: 0, //Time ellapsed
                    ang: 0 //This is the launch angle
                };
                
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //Need to rewrite, use the pythagorean theorem from before to determine the angles from the 
                //original triangle
                //test values
                
                
                physics.vy = -1 * (physics.v * ((280 - physics.height) / 60)); //Initial Vert Velocity
                physics.vx = physics.v * ((physics.dist - 20) / 60); //Initial Horizontal Velocity

                //test a pratice ball
                while (physics.t < 10000) {



                    //context object for drawing on canvas
                    var ctx = document.getElementById("game");
                    ctx = ctx.getContext("2d");


                    ctx.beginPath();
                    ctx.arc(physics.dist, physics.height, 10, 0, 2 * Math.PI);
                    ctx.fillStyle = "red";
                    ctx.fill();

                    //incriment the time
                    physics.t++;

                    //calculate the new velocities,positions
                    physics.vy2 = physics.vy + physics.gravity * physics.t;
                    physics.d2 = physics.dist + physics.vx * physics.t;
                    physics.h2 = physics.height + physics.vy * physics.t + (physics.gravity * physics.t *                                                                        physics.t) / 2;
                    
                    //set the old points to the new points
                    physics.vy = physics.vy2;
                    physics.dist = physics.d2;
                    physics.height = physics.h2;
                    

                }
            };
            ball();





        }


    }, 1);





}

//starts the game
function startGame() {
    "use strict";
    //variables

    //display game
    bDisp();

    //
    wrapMov();



}
