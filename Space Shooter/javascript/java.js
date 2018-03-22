//Game nameSpace
var gNameSpace = {
    //objects,classes

    //functions
    //main game function
    main: function () {

    },

    //The canvas drawing function
    dCanv: function () {

        //variables
        var ctx;
        var img = {
            ship: new Image(),
            bg: new Image()
        };

        
        

        //get the canvas object             
        ctx = $(".gameCanv")[0];

        //ctx=document.getElementById("gameCanv");

        ctx.width = "1920";
        ctx.height = "1080";

        ctx = ctx.getContext("2d");



        img.bg.onload = function () {

            ctx.drawImage(img.bg, 0, 0, 1920, 1080);
            
            img.ship.onload = function () {
                //rotate ship
                ctx.translate(120,120);  
                ctx.rotate(Math.PI);                
                ctx.drawImage(img.ship,-800,0);
            }
            
            img.ship.src = "./img/bgbattleship.png";
            
        };

        img.bg.src = "./img/backGround.jpg";








    }


};


(function () {
    setTimeout(function () {

        gNameSpace.dCanv()

    }, 1000)

})()
