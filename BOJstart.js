

var imgurl = "";

 $(window).on("mousedown", function() { 
     $(".mon").attr("style", "border") 
     imgurl = "";
 })


$(".mon").on("mousedown", function(ev) { 
    imgurl = this.src;
    $(".mon").attr("style", "border")
    $(this).css("border", "1px solid red")
    $(this).css("boxShadow", "0 0 5px red")
    ev.stopPropagation();
})


function check() { 

     if($("#username").val() != "" && imgurl != "") {
         $("#enter").prop("disabled", false)
         $("#enter").css("cursor", "pointer")
     } else { 
         $("#enter").prop("disabled", true)
         $("#enter").css("cursor", "initial")
     }

     setTimeout(check, 500)
 }

 
 window.onload = function() { 
    $("#username").on("mousedown", function(ev) { 
        ev.stopPropagation();
    })

     $("#enter").on("mousedown", function(ev) { 
        ev.stopPropagation();
    })
     check();
 }


 $("#enter").on("click", function() { 

    var username = $("#username").val();
    var picurl = imgurl;

    localStorage.setItem("username", username)
    localStorage.setItem("picurl", picurl)

    localStorage.removeItem("leavemap")
    localStorage.removeItem("leavestart")

    if(localStorage.getItem("onmappage")) { 
        localStorage.removeItem("prefval")
        localStorage.removeItem("prefectureswonn")
        localStorage.removeItem("answers")
        localStorage.removeItem("counterofallpref")
        localStorage.removeItem("counteroflostpref")
        localStorage.removeItem("counterofwonpref")
        localStorage.removeItem("prefectureslostt")
        localStorage.removeItem("onmappage")
    }


    sessionStorage.setItem("currentlyin", "yes")
    location.href = "BOJmap.html"
})



if(performance.navigation.type == 2 || performance.navigation.type == 0)  {
   
    location.reload(true);
   
    if(localStorage.getItem("leavemap")) { 
        localStorage.setItem("leavestart", "yes")
        localStorage.removeItem("username")
        localStorage.removeItem("picurl")
    }
 } 



 ////// for firefox //////

  $(window).bind("pageshow", function() { 
    
     if(localStorage.getItem("leavemap")) { 
         localStorage.setItem("leavestart", "yes")
         localStorage.removeItem("username")
         localStorage.removeItem("picurl")
     }
 })
 






