

var prefid;
var newcordslist = []
var lostcordslist = []

var prefsum;
var woncount;
var lostcount;
var allprefs



//////// Hover over clickable area ////////

function newdiv(x, y, z) { 
    var bckimg = "url(pics/prefectureflags/" + z + ".png" + ")"
    var srcimg = "pics/prefectureflags/" + z + ".png"

    var winnerlist = $(".winner");
    var mymonraw = localStorage.getItem("picurl")
    var mymonready = "url(" + mymonraw + ")"

    var newel = document.createElement("div")
    newel.setAttribute("id", "myel");
    $("#semi-inner").append(newel)
    $("#myel").css("top", y)
    $("#myel").css("left", x)



    if(winnerlist.length != 0) { 
        for(var i = 0; i<winnerlist.length; i++) { 
          
          var wonpref = $("#winner"+i).attr("name")
        
          if(x == wonpref) {
            $("#myel").css("backgroundImage", mymonready)
            break;
          } else $("#myel").css("backgroundImage", bckimg)
        }
        
    } else $("#myel").css("backgroundImage", bckimg)



    if(winnerlist.length != 0) { 

        for(var i = 0; i<winnerlist.length; i++) {
            var wonpref = $("#winner"+i).attr("name")
    
            if(x == wonpref) {
                $("#prefmon").attr("src", mymonraw)
                $("#prefmon").css("border", "none")
                $("#prefmon").css("boxShadow", "none")
                $("#prefname").text(z);
                break;
              } else {
                $("#prefmon").attr("src", srcimg)
                $("#prefmon").css("border", "1px solid")
                $("#prefmon").css("boxShadow", "0 0 2px gray")
                $("#prefname").text(z);
              } 
        }
    } else {
        $("#prefmon").attr("src", srcimg)
        $("#prefmon").css("border", "1px solid")
        $("#prefmon").css("boxShadow", "0 0 2px gray")
        $("#prefname").text(z);
      }  
    
}


$(".maparea").on("mouseover", function(ev) { 
    prefid = ev.target.id
    var coords = ev.target.coords;
    var splitcords = coords.split(",")
    var x = splitcords[0] - 15;
    var y = splitcords[1] - 50; 
    newdiv(x, y, prefid)
})


$(".maparea").on("mouseout", function() { 
   $("#myel").remove();
   $("#prefmon").attr("src", "")
   $("#prefmon").css("border", "none")
   $("#prefname").text("")
})



///////// user name & pic transfer from start /////////

if(localStorage.getItem("picurl")) { 
    $("#belowpic").attr("src", localStorage.getItem("picurl"))
}


$("#username2").text(localStorage.getItem("username"))




///////// click on clickable area /////////

$(".maparea").click(function(ev) { 
     var id = ev.target.id
     localStorage.setItem("prefval", id)

     var coords = ev.target.coords;
     var splitcords = coords.split(",")
     var x = splitcords[0] - 15;
     var y = splitcords[1] - 50; 
     localStorage.setItem("xcords", x)
     localStorage.setItem("ycords", y)

     localStorage.setItem("xcordslost", x)
     localStorage.setItem("ycordslost", y)

     if(localStorage.getItem("cancelforward") === "yes") { 
       
     localStorage.removeItem("cancelforward")
    }

 })



//////// Remaining prefectures counter ////////

if(localStorage.getItem("counterofallpref")) { 
    
    var allprefs = localStorage.getItem("counterofallpref")
    allprefs = parseInt(allprefs)
    prefsum = 47 - allprefs; 
    $("#prefleft").text(" " + prefsum)
} else  $("#prefleft").text(" " + 47)



///////// If correct answer is selected /////////

if(localStorage.getItem("answers", "corrects")) { 
    
    if(localStorage.getItem("counterofwonpref")) { 
        woncount = localStorage.getItem("counterofwonpref")
        woncount = parseInt(woncount)
       
        $("#prefconq").text(" " + woncount)
    } else $("#prefconq").text(" " + 0)
    


    if(localStorage.getItem("xcords") && localStorage.getItem("ycords") && localStorage.getItem("check")) { 
        var x = localStorage.getItem("xcords")
        var y = localStorage.getItem("ycords")
    }
   
    var counter = 0;
    
    var checkcords = localStorage.getItem("prefectureswonn")

    var oldcords = checkcords === null ? false : checkcords


    if(localStorage.getItem("xcords") && localStorage.getItem("ycords") && localStorage.getItem("check")) { 
        if(oldcords == false) { 
            newcordslist = [x, y]
        } else if(localStorage.getItem("xcords") && localStorage.getItem("ycords")) { 
            newcordslist = [x, y, oldcords]
        } else newcordslist = [oldcords]
    } else newcordslist = [oldcords] 


    if(localStorage.getItem("xcords") && localStorage.getItem("ycords")) { 
    localStorage.setItem("prefectureswonn", newcordslist)
    }
    
  
    var tostring = newcordslist.toString();
    var splitcords = tostring.split(",")
  

    for(var i=0; i<splitcords.length; i++) { 
  
        var newx = splitcords[i]
        var newy = splitcords[i+1]
        i++
        var z = localStorage.getItem("picurl")
        var bckimg = "url(" + z + ")"
        var winner = document.createElement("div");
        winner.setAttribute("id", "winner"+counter);
        winner.setAttribute("class", "winner");
 
        winner.setAttribute("name", newx);
        
        $("#semi-inner").append(winner)
        $("#winner"+counter).css("top", newy+"px")
        $("#winner"+counter).css("left", newx+"px")
        $("#winner"+counter).css("backgroundImage", bckimg)

        counter++
     }


     var areaclass = $(".maparea")
    
    
     for(var i = 0; i<areaclass.length; i++) { 
    
        var mapcords = areaclass[i].coords;
        var split = mapcords.split(",")
        var areax = split[0] - 15;
        var areay = split[1] - 50; 

        for(var m = 0; m < splitcords.length; m++) { 
            var newx = splitcords[m]
            var newy = splitcords[m+1]
            m++

            if(areax == newx && areay == newy) { 
              areaclass[i].removeAttribute("href")
            }
        }
     }


     localStorage.removeItem("xcords")
     localStorage.removeItem("ycords")
     localStorage.removeItem("check")

}



///////// If wrong answer is selected /////////

if(localStorage.getItem("answers", "wrong")) { 
    
    if(localStorage.getItem("counteroflostpref")) { 
         lostcount = localStorage.getItem ("counteroflostpref")
        lostcount = parseInt(lostcount)

        $("#preflost").text(" " + lostcount)
    } else $("#preflost").text(" " + 0)

    

    if(localStorage.getItem("xcordslost") && localStorage.getItem("ycordslost") && localStorage.getItem("secondcheck")) { 
        var x = localStorage.getItem("xcordslost")
        var y = localStorage.getItem("ycordslost")
    }
   

    var counter = 0;
    
    var checkcords = localStorage.getItem("prefectureslostt")

    var oldcords = checkcords === null ? false : checkcords


    if(localStorage.getItem("xcordslost") && localStorage.getItem("ycordslost") && localStorage.getItem("secondcheck")) { 
        if(oldcords == false) { 
            lostcordslist = [x, y]
        } else if(localStorage.getItem("xcordslost") && localStorage.getItem("ycordslost")) { 
            lostcordslist = [x, y, oldcords]
        } else lostcordslist = [oldcords]
    } else lostcordslist = [oldcords] 


    if(localStorage.getItem("xcordslost") && localStorage.getItem("ycordslost")) { 
    localStorage.setItem("prefectureslostt", lostcordslist)
    }
    
  
    var tostring = lostcordslist.toString();
    var splitcords = tostring.split(",")
    var arealist = $(".maparea");

    for(var i=0; i<splitcords.length; i++) { 
  
        var newx = splitcords[i]
        var newy = splitcords[i+1]
        i++
        
        var z = localStorage.getItem("prefval");

        var winner = document.createElement("div");
        winner.setAttribute("id", "loser"+counter);
        winner.setAttribute("class", "loser");
 
        winner.setAttribute("name", newx);
        
        $("#semi-inner").append(winner)
        $("#loser"+counter).css("top", newy+"px")
        $("#loser"+counter).css("left", newx+"px")

        for(var n = 0; n<arealist.length; n++) { 

            var areacords = arealist[n].coords;
            var splitcrds = areacords.split(",")
            var arx = splitcrds[0] - 15;
            var ary = splitcrds[1] - 50; 
    
            if(newx == arx && newy == ary) { 
                var areaid = arealist[n].id
                z = areaid;
                var bckimg = "url(pics/prefectureflags/" + z + ".png" + ")"
                $("#loser"+counter).css("backgroundImage", bckimg)
                arealist[n].removeAttribute("href")
            }

        }
        

        counter++

    }


    localStorage.removeItem("xcordslost")
    localStorage.removeItem("ycordslost")
    localStorage.removeItem("secondcheck")
}



///////// score board /////////

if(localStorage.getItem("counterofallpref")) { 
    
    var allprefs = localStorage.getItem("counterofallpref")
    allprefs = parseInt(allprefs)
    
    if(allprefs == 47) { 

        $("#modal").css("display", "block")

        var lostcount = localStorage.getItem("counteroflostpref")
        lostcount = parseInt(lostcount)
        $("#modal-preflost").text(" " + lostcount)
 
        var woncount = localStorage.getItem("counterofwonpref")
        woncount = parseInt(woncount)  
        $("#modal-prefconq").text(" " + woncount)
    
    } 
}


$("#close").click(function() { 
    $("#modal").css("display", "none")
})


$("#restart").click(function() { 
    localStorage.setItem("leavemap", "yes")
    location.replace("BOJstart.html")
    localStorage.removeItem("prefval")
    localStorage.removeItem("prefectureswonn")
    localStorage.removeItem("answers")
    localStorage.removeItem("picurl")
    localStorage.removeItem("counterofallpref")
    localStorage.removeItem("counteroflostpref")
    localStorage.removeItem("counterofwonpref")
    localStorage.removeItem("prefectureslostt")
})



////// On refresh or back/forward browser button //////

if(performance.navigation.type == 2 || performance.navigation.type == 0) {
   
    var left = localStorage.getItem("left")
    
    if(left === "yes") { 
        
        location.reload(true);

        localStorage.setItem("cancelforward", "yes")
        if(performance.navigation.type == 0) { 
           
            localStorage.removeItem("cancelforward")
        }
        localStorage.removeItem("left")
    }

    
    if(localStorage.getItem("leavestart")) { 
        location.replace("BOJstart.html")
    }
   
 } 



 window.onbeforeunload = function() { 
     localStorage.removeItem("washerebefore")
     return undefined;
 }



if(localStorage.getItem("washerebefore") === "yes") { 
         
          var iflost = localStorage.getItem("onedown")
          var ifwon = localStorage.getItem("oneup")

        
          if(iflost === "yes") { 
        
          lostcount == undefined ? lostcount = 0 : lostcount--;
          
          $("#preflost").text(" " + lostcount)
          localStorage.setItem("counteroflostpref", lostcount)


          allprefs--
          $("#prefleft").text(" " + allprefs)
          localStorage.setItem("counterofallpref", allprefs)

          
       }

       if(ifwon === "yes") { 
          
        woncount == undefined ? woncount = 0 : woncount--;
          
          $("#prefconq").text(" " + woncount)
          localStorage.setItem("counterofwonpref", woncount)

          allprefs--
          $("#prefleft").text(" " + allprefs)
          localStorage.setItem("counterofallpref", allprefs)
       }

       localStorage.removeItem("onedown")
       localStorage.removeItem("oneup")
 
  }
  



///// Prevent middle & right button click on map /////

window.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });


  $(".maparea").bind("contextmenu", function(e) { 
      e.preventDefault()
  })



////////// Back button //////////  

$("#back").click(function() { 
  var ask = confirm("Going back will restart the game. Are you sure you want to continue?")
  if(ask === true) { 
    localStorage.setItem("leavemap", "yes")
    location.replace("BOJstart.html")
    localStorage.removeItem("prefval")
    localStorage.removeItem("prefectureswonn")
    localStorage.removeItem("answers")
    localStorage.removeItem("picurl")
    localStorage.removeItem("counterofallpref")
    localStorage.removeItem("counteroflostpref")
    localStorage.removeItem("counterofwonpref")
    localStorage.removeItem("prefectureslostt")
  }

})



//////// On browser back/forward buttons ////////

localStorage.setItem("onmappage", "yes")


if(sessionStorage.getItem("currentlyin") === null) { 
    location.replace("BOJstart.html")
}



/////// static design ///////

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)


function viewportwatcher(x) { 
   
    if(x.matches) { 
        $("body").css("width", vw+"px")
    }
}

var x = window.matchMedia("(max-width: 1536px)")

viewportwatcher(x)
x.addListener(viewportwatcher)


