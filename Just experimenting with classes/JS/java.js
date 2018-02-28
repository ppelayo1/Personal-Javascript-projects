function par(b,e) {
    this.a = b;
    this.d = e;
    this.fun = function(){
        $("h1").text("Weeeee");
    }
}

function chil(a,b) {
    par.call(this,a,b);
    this.b = b;
    this.c = "d";
}



$().ready(setTimeout(function () {
    chil.prototype = new par();
    var a = new chil("I lwetewtike turtles","I like turtles");
    //a.fun();
    $("h1").text(a.d);
    
},0));
