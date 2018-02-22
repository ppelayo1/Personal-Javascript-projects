
var pro = function () {
    this.a = "a";
    this.b = "b";    
    this.c = "l";
    this.cowboy();
    
    this.cowGirl = function () {
        this.c = "yeeha";
    };
};

pro.prototype.cow = "moo";

pro.prototype.cowboy = function () {
    this.milk = "got milk";
};





(function () {
    
    var test = new pro();
    var test2 = new pro();
    test2.cow = "bark";
    test2.cow = test2.milk;

    document.getElementById("test").innerHTML = test.cow;
    document.getElementById("test2").innerHTML = test2.cow;
    
    
    
    
})()
