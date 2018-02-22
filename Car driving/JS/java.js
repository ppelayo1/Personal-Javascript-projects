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

    Car: function Car(xpos, ypos, width, heigth) { //This represents the cars on the canvas
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = heigth;
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
        ctx.rect(pcar.xpos, pcar.ypos, pcar.width, pcar.height);
        ctx.fillStyle = "red";
        ctx.fill();


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
            ctx.moveTo(line.begin - wht * i, canv.height / 2 + widthV);
            ctx.lineTo(line.end - wht * i, canv.height / 2 + widthV);
            ctx.lineWidth = widthV;
            ctx.stroke();

            //check if the line has moved pas the left side of the screen and draw on right if neccessary

            if (line.end - (wht * i) < 0) {

                ctx.beginPath();
                ctx.moveTo(canv.width, canv.height / 2 + widthV);
                ctx.lineTo(canv.width + (line.end - wht * i), canv.height / 2 + widthV);
                ctx.lineWidth = widthV;
                ctx.stroke();
            }

        }
    }


};

//This function purpose is to start the game and acts as a main for the game
function startGame() {
    "use strict";
    //variables

    var pCar = new gNameSpace.Car(0, 240, 100, 80),
        line = new gNameSpace.Line(500, 430),
        canv = new gNameSpace.Cavnas(500, 500);

    //clear screen
    //variables
    var ctx = document.getElementById("canv");


    //create the car
    ctx = ctx.getContext("2d");

    //test function
    setInterval(function () {
        
        ctx.beginPath();
        ctx.rect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "white";
        ctx.fill();
        
        line.end--;
        line.begin--;
        
        if(line.begin === 200){
            line.begin = 500;
            line.end = line.begin - line.lineLength;
        }
        
        

        //build the background
        gNameSpace.bBack(line, canv);

        //draw the car
        //gNameSpace.bCar(pCar);


        

    }, 1);

}
