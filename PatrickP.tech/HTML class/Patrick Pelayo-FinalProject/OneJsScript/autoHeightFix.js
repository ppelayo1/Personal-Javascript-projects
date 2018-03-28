//auto start functions

        //purpose of this function is to resize the nav bar as automaticlly, height:auto does not work in css when attempting to repeat a pattern
        (function() {

            //Using this script allows me to dynamically add content to the maincontent area without having to set a static CSS height value            

            //variables
            var navH = document.getElementsByTagName("nav")[0]; //Nav object

            //Runs on an interval to account for changes in browser zoom
            setInterval(function() {
                //variables
                var height = document.getElementById("main").offsetHeight; //Mains height                       

                //convert height to px string
                height += "px";                

                //Set nav's height
                navH.style.height = height;


            }, 200);

        })()