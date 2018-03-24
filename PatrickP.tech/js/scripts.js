myNameSpace = {
    defHeader: "Header",
    defParag: "Content Paragraph"




};



//Auto start functions

//This function sets up the event handlers
(function () {

    //Creates an event handler for editing existing elements
    $("#editPH").click(function () {


        //variables
        var $h1 = $("h1");
        var $p = $("p");
        var flag = $h1.is(".editable");

        //toggle the h1 and p
        $h1.prop("contenteditable", !flag).toggleClass("editable");            
        $p.prop("contenteditable", !flag).toggleClass("editable");

    });

    //Creates an event handler for the deleting of the most recent element
    $("#deleteEntry").click(function () {

        //variables
        var $h1 = $("h1").last();
        var $p = $("p").last();

        //remove the header+paragraph
        $h1.remove();
        $p.remove();

    });

    //Creates an event handler for adding a new element
    $("#addEntry").click(function () {

        //variables
        $mBox = $(".mainContentBox");
        var $h1 = $("h1");
        var $p = $("p");
        var flag = $h1.is(".editable");

        //deactivate the editability of the headers paragraph if active   
        $h1.prop("contenteditable", flag).toggleClass("editable");
        $p.prop("contenteditable", flag).toggleClass("editable")
        
        
        //Attach a header+paragraph
        $mBox.append("<h1>" + myNameSpace.defHeader + "</h1>");
        $mBox.append("<p>" + myNameSpace.defParag + "</p>");

        //Assign the jquerry objects with the new h1 and p tags, and set to the old editability status
        $h1 = $("h1");
        $p = $("p");
        
        $h1.prop("contenteditable", flag).toggleClass("editable");
        $p.prop("contenteditable", flag).toggleClass("editable");
    });
    
    //Creates an handler to show the nav lists for the assignments
    $(".assignInfo").click(function() {
        $(this).next("ul").slideToggle("slow");       
        
    });
    
    //This highlights the assignments to demonstrate they are clickable
    $(".assignInfo").mouseover(function() {
        $(this).addClass("hover");        
    });
    
    //Once the mouse has moved away the highlighting stops
    $(".assignInfo").mouseleave(function() {
        $(this).removeClass("hover");           
    });
})()
