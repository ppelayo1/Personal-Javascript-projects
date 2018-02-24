

function Chil() {
    var a = "HI";


}

function proto() {
    var a = function () {
        $("#first").text("Changed Text torrfafa this");
    };

    Chil.prototype.change = a;
}


$().ready(function () {
    proto();
    var a = new Chil();
    
    a.change();
});
