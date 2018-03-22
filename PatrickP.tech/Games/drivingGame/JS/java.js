/* ---------------------------------------------------- DOCUMENTATION ---------------------------------------------------


        This program will create a player car which can be controled by arrows, a background is drawn and moves.
            The player tries to manuvere around the cars.
            
        
        Note this program is not finished and needs some rewriting, some functions can be made into a prototype for the car class
            The move enemy car function contains literals that need to be removed, but were inserted to complete the loop of one car







*/


//Namespace
var gNameSpace = {
    //structures/classes
    Canvas: function Canvas(width, height) {
        this.width = width; //Dimensions of the canvas
        this.height = height;
    },

    Line: function Line(begin, end) { //This represents the road line begin point nad end point
        this.begin = begin;
        this.end = end;
        this.lineLength = begin - end; //Lengh of the line
    },

    Pcar: function Car(xpos, ypos, width, heigth, color) { //This represents the player car on the canvas
        this.xpos = xpos;
        this.ypos = ypos;
        this.hWidth = width;
        this.vHeight = heigth;
        this.color = color;
    },
    Ecar: function Car(xpos, ypos, width, heigth, color) { //This represents the enemy cars on the canvas
        this.xpos = xpos;
        this.ypos = ypos;
        this.hWidth = width;
        this.vHeight = heigth;
        this.color = color;
        this.active = false; //all cars initially deactive
        this.fYpo = 0; //Final y position the car will end on, this determines the lane
        this.xMov = 0; //This is the xpos that the car will begin moving to a new lane
        this.ready = false; //Set false to signify the need to assign a finishing lane, //xMov
    },

    //This contains all prototypes for the class based objects
    Proto: function () {


        //prototype methods
        gNameSpace.Ecar.prototype.lnChs = function (canvas) { //This method determines what fYpo will be
            //variables
            var ypos = [(canv.height / 2) / 2, (canv.height / 2) / 2 + (canv.height / 2)]; //elem 0 is above line, elem 1 is below line
            this.fYpo = ypos[Math.floor(Math.random() * 2)]; //Final y position

        };

        //This method will determine the x position of which the car will begin shifting 
        gNameSpace.Ecar.prototype.setFinX = function (canvas) {
            //variables
            var upperBound = canvas.width - canvas.width * 0.25,
                lowerBound = canvas.width - canvas.width * 0.50;

            //Pick a random x position between 50-25% from the right
            this.xMov = Math.floor(Math.random() * upperBound) + +lowerBound;
        };

    },

    //functions below

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


    //This function will build the number of specified enemy cars that will be displayed
    //The array will contain the inital position of the car from the right, and the vHeight, hWidth, and the color randomly choosen
    eCars: function eCars(nEcars, vHeight, hWidth, canv) {
        "use strict";

        var eCar = [],
            xpos = canv.width - hWidth, //This will place car at far right of the page
            ypos = [(canv.height / 2) / 2, (canv.height / 2) / 2 + (canv.height / 2)], //elem 0 is above line, elem 1 is below line	    
            bColors = ["red", "blue", "yellow", "green", "black", "orange", "pink", "tan"]; //array of 8 differant colors to be choosen randomly



        for (var i = 0; i < nEcars; i++) {

            eCar.push(new gNameSpace.Ecar(xpos, ypos[Math.floor(Math.random() * 2)], hWidth, vHeight, bColors[Math.floor(Math.random() * 9)]));

        }

        //Set the first car element to true for existence
        eCar[0].active = true;

        return eCar;

    },

    //This function will move the other cars on the screen
    moveEcars: function moveEcars(eCar, canv, eNcars) {
        //variables
        var size = eCar.length, //# of elements in the array 
            sLeft = 0.7, //speed car moves to left
            sUpD = 1; //speed car changes lanes

        //move all active cars,change states
        for (var i = 0; i < size; i++) {

            //set cars ready
            if (eCar[i].ready === false) {
                eCar[i].lnChs(canv);
                eCar[i].setFinX(canv);
                eCar[i].ready = true;
            }

            //move the active cars
            if (eCar[i].active === true) {

                //move only when car has passed desired x point from right
                if (eCar[i].xpos <= eCar[i].xMov) {

                    //check if car needs to move up, move it if it does
                    if (eCar[i].ypos >= eCar[i].fYpo) {
                        eCar[i].ypos -= sUpD;
                        //if car goes to far up set it to the fYpo
                        if (eCar[i].ypos < eCar[i].fYpo)
                            eCar[i].ypos = eCar[i].fYpo;
                    }

                    //check if car needs to move down, move it if it does
                    if (eCar[i].ypos <= eCar[i].fYpo) {
                        eCar[i].ypos += sUpD;
                        //if car goes to far up set it to the fYpo
                        if (eCar[i].ypos > eCar[i].fYpo)
                            eCar[i].ypos = eCar[i].fYpo;
                    }
                }

                //move car left
                eCar[i].xpos -= sLeft;
            }

            //Now check if car drove off the left side of the screen
            if (eCar[i].xpos < 0) {
                eCar[i].ready = false;

                //reset the car x/y positions  
                //CONTAINS LITERALS AN NEEDS TO BE REMOVED AND REWRITTEN LATER!!!!!!!!!!!!!!!!!!!
              var  xpos = canv.width - 100; //This will place car at far right of the page
              var  ypos = [(canv.height / 2) / 2, (canv.height / 2) / 2 + (canv.height / 2)]; //elem 0 is above line, elem 1 is below line	    
                    




                eCar[i].ypos = ypos[Math.floor(Math.random() * 2)];
                eCar[i].xpos = xpos;



            }

        }


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
        var x = [document.getElementsByTagName("p")[0]];



        //need to check for each eCar
        for (var i = 0; i < eCarS; i++) {
            eCarX = eCar[i].xpos + eCar[i].hWidth
            eCarY = eCar[i].ypos + eCar[i].vHeight

            //check collision from left or rigth on the x axis
            if ((pCar.xpos <= eCar[i].xpos && pCarX - moe >= eCar[i].xpos) || (eCar[i].xpos <= pCar.xpos && eCarX - moe >= pCar.xpos)) {
                //check for collision in the Y axis
                if ((pCar.ypos <= eCar[i].ypos && pCarY - moe >= eCar[i].ypos) || (eCar[i].ypos <= pCar.ypos && eCarY - moe >= pCar.ypos)) {
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
    procG: function processGame() {
        "use strict";

        //start the prototype method
        gNameSpace.Proto();

        //variables
        var ctx = document.getElementById("canv"),
            flag = false,
            hWidth = 100,
            vHeight = 80,
            pColor = "red",
            nEcars = 1, //Number of enemy cars to be built for an array(note this is also used as max # cars on board)
            pCar = new gNameSpace.Pcar(0, 240, hWidth, vHeight, pColor), //Player car xpos,ypos,hwidth,vheight,color
            line = [new gNameSpace.Line(500, 430), new gNameSpace.Line(350, 280), new gNameSpace.Line(200, 130)],
            canv = new gNameSpace.Canvas(500, 500),
            //eCar = [new gNameSpace.Car(250, 250, 100, 80, "blue")];
            eCar = gNameSpace.eCars(nEcars, vHeight, hWidth, canv);


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

            //Move enemy cars
            gNameSpace.moveEcars(eCar, canv, nEcars);

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


        //begin running the game    
        gNameSpace.procG();

    }



};
