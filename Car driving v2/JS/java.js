var gNameSpace = {
    //structures/classes
    Cavnas: function Canvas(width, height) {
        this.width = width; //Dimensions of the canvas
        this.height = height;
    },

    Line: function Line(begin, end) { //This represents the road line begin point nad end point
        this.begin = begin;
        this.end = end;
        this.lineLength = begin - end; //Lengh of the line
    },

    Car: function Car(xpos, ypos, width, heigth, color) { //This represents the cars on the canvas
        this.xpos = xpos;
        this.ypos = ypos;
        this.hWidth = width;
        this.vHeight = heigth;
        this.color = color;
    },


    //Regular game functions

    //This function builds the car onto the canvas
    bCar: function bCar(pcar) {
        "use strict";
        //variables
        var ctx = document.getElementById("canv");


        //create the car
        ctx = ctx.getContext("2d");
        ctx.beginPath();
        ctx.rect(pcar.xpos, pcar.ypos, pcar.hWidth, pcar.vHeight);
        ctx.fillStyle = pcar.color;
        ctx.fill();


    },
    
    eCars: function eCars() {
        
    },
    
    //This function will move the other cars on the screen
    moveEcars: function moveEcars (eCar) {
    
},

    //This function determines if there is a collision or not
    //Returns true or false , true collision, false no collision
    //Accepts playercar, and enemy car array
    chkCollision: function chkCollision(pCar, eCar) {
        "use strict";
        //variables
        var pCarX = pCar.xpos + pCar.hWidth, //From pCar.xpos to the hwidth of the car is a hit
            pCarY = pCar.ypos + pCar.vHeight, //Same but in the verticle
            eCarS = eCar.length, //Size of eCar array
            eCarX,
            eCarY,
            moe = 5; //Margin of error in collision allowed


        //debug
        var x = document.getElementsByTagName("p");



        //need to check for each eCar
        for (var i = 0; i < eCarS; i++) {
            eCarX = eCar[i].xpos + eCar[i].hWidth
            eCarY = eCar[i].ypos + eCar[i].vHeight

            //check collision from left or rigth on the x axis
            if ((pCar.xpos <= eCar[i].xpos && pCarX - moe >= eCar[i].xpos) || (eCar[i].xpos <= pCar.xpos && eCarX - moe >= pCar.xpos)) {
                //check for collision in the Y axis
                if ((pCar.ypos <= eCar[i].ypos && pCarY - moe >= eCar[i].ypos) || (eCar[i].ypos  <= pCar.ypos && eCarY - moe >= pCar.ypos)) {
                    x[0].innerHTML = "hit";
                } else
                    x[0].innerHTML = " ";
            } else
                x[0].innerHTML = " ";

        }

    },

    /*
            //process moving the player car
            
            // Up arrow 38
            // Down Arrow 40
            // right Arrow 39
            // left Arrow  37
            */

    //This function controls the control of the car
    chkKey: function chkKey(e, pCar, canv) {
        "use strict";

        //variables
        var forLR = 10, //This represents the change in speed of hte car forward,left,right
            bck = 5, //This represents the change in speed of the car decelerating
            up = 38,
            down = 40,
            right = 39,
            left = 37;

        //disable arrow keys from moving page
        e.preventDefault();

        //up
        if (e.keyCode === up) {
            if (pCar.ypos > 0) {
                pCar.ypos -= forLR;
                if (!pCar.ypos > 0) {
                    pCar.ypos = 0;
                }
            }

        }
        //down
        if (e.keyCode === down) {
            if (pCar.ypos < canv.height - pCar.vHeight) {
                pCar.ypos += forLR;
                if (!(pCar.ypos < canv.height - pCar.vHeight)) {
                    pCar.ypos = canv.height - pCar.vHeight;
                }
            }
        }
        //right
        if (e.keyCode === right) {
            if (pCar.xpos < canv.width - pCar.hWidth) {
                pCar.xpos += forLR;
                if (!(pCar.xpos < canv.width - pCar.hWidth)) {
                    pCar.xpos = canv.width - pCar.hWidth;
                }
            }
        }
        //left
        if (e.keyCode === left) {
            if (pCar.xpos > 0) {
                pCar.xpos -= bck;
                if (!(pCar.xpos > 0)) {
                    pCar.xpos = 0;
                }
            }
        }

    },

    //This function will build the background of a line
    bBack: function bBack(line, canv) {
        "use strict";
        //variables
        var ctx = document.getElementById("canv"),
            wht = 150, //This is the shift left to creat white space in the road
            widthV = 30; //Width of the line verticlly
        ctx = ctx.getContext("2d");


        //create 4 roads
        for (var i = 0; i < 3; i++) {


            //create the road line            
            ctx.beginPath();
            ctx.moveTo(line[i].begin, canv.height / 2 + widthV);
            ctx.lineTo(line[i].end, canv.height / 2 + widthV);
            ctx.lineWidth = widthV;
            ctx.stroke();

            //check if the line has moved pas the left side of the screen and draw on right if neccessary

            if (line[i].end < 0) {

                ctx.beginPath();
                ctx.moveTo(canv.width, canv.height / 2 + widthV);
                ctx.lineTo(canv.width + line[i].end, canv.height / 2 + widthV);
                ctx.lineWidth = widthV;
                ctx.stroke();
            }

            //simulates the moving of the line in each itteration
            line[i].end--;
            line[i].begin--;
            if (line[i].begin === 0) {
                line[i].begin = canv.width;
                line[i].end = canv.width - line[i].lineLength;
            }

        }



    },

    //This function will process the game and call all functions needed for the game to work
    procG: function processGame(canv, line, pCar, eCar) {

        //variables
        var ctx = document.getElementById("canv"),
            flag = false;


        //Create context object
        ctx = ctx.getContext("2d");

        //Begin Processing hte game
        setInterval(function () {

            //setup key press event
            if (flag === false) {
                document.onkeydown = keyDown;
                flag = true;
            }

            //clear page
            ctx.beginPath();
            ctx.rect(0, 0, canv.width, canv.height);
            ctx.fillStyle = "white";
            ctx.fill();

            //build the background
            gNameSpace.bBack(line, canv);


            //draw the player car
            gNameSpace.bCar(pCar);

            //draw the enemy car
            gNameSpace.bCar(eCar[0]);

            //Check if there was a collision
            gNameSpace.chkCollision(pCar, eCar);



            //This function offers control to the car and changes its x/y position to represent movement
            //Only called when user pressed the appropriate key down                 
            function keyDown(e) {

                //call the control car function
                gNameSpace.chkKey(e, pCar, canv);
            }



        }, 0);

    },

    //This function purpose is to start the game and acts as a main for the game
    startGame: function startGame() {
        "use strict";
        //variables
        var pCar = new gNameSpace.Car(0, 240, 100, 80, "red"),    //Player car xpos,ypos,hwidth,vheight,color
            line = [new gNameSpace.Line(500, 430), new gNameSpace.Line(350, 280), new gNameSpace.Line(200, 130)],
            canv = new gNameSpace.Cavnas(500, 500),
            eCar = [new gNameSpace.Car(250, 250, 100, 80, "blue")];

        //begin running the game    
        gNameSpace.procG(canv, line, pCar, eCar);

    }



};
