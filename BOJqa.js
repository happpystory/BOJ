var oneup = false;
var onedown = false;

var newdata = data; //json qalist object
var counting = 60;
var countinterval;
var chosenid;
var correctid; 
var chosenans;
var woncount;
var lostcount;
var allprefcount;
woncount = localStorage.getItem("counterofwonpref");
woncount = parseInt(woncount)
lostcount = localStorage.getItem("counteroflostpref");
lostcount = parseInt(lostcount)
allprefcount = localStorage.getItem("counterofallpref");
allprefcount = parseInt(allprefcount)



///////// Take Q&A from json object /////////

if(localStorage.getItem("prefval")) { 
    var z = localStorage.getItem("prefval");
    var prefname = newdata[z];
    var prefq = prefname.question
    var prefa1 = prefname.answers[0]
    var prefa2 = prefname.answers[1]
    var prefa3 = prefname.answers[2]
    var prefa4 = prefname.answers[3]
    correctid = prefname.correct

    $("#question").text(prefq)
    $("#a1").text(prefa1)
    $("#a2").text(prefa2)
    $("#a3").text(prefa3)
    $("#a4").text(prefa4)
}



/////// On refresh & browser back button ///////

 if (localStorage.getItem("washerebefore") === "yes") {

     location.replace("BOJmap.html")
    
 } else { 
    localStorage.setItem("washerebefore", "yes");
 }



if(localStorage.getItem("cancelforward") === "yes") { 
    location.replace("BOJmap.html")
    localStorage.removeItem("cancelforward")
}



/////////// Selecting an answer ///////////

function addremove() { 
    $("#"+chosenid).css("backgroundColor", "rgba(216, 199, 45, 0.493)")
     $(".a").removeClass("h")
     if(chosenans == correctid) { 
        setTimeout(correct, 3000)
     } else setTimeout(wrong, 3000)
     allprefcount++
     localStorage.setItem("counterofallpref", allprefcount)

     $(".a").off("mousedown")
}

function correct() { 
    $("#"+chosenid).css("backgroundColor", "lightgreen")
   
    woncount++;
    localStorage.setItem("counterofwonpref", woncount)

    localStorage.setItem("oneup", "yes")

    setTimeout(ifcorrect, 3000)
}

function wrong() { 
    $("#"+chosenid).css("backgroundColor", "red")
  
    for(var i = 0; i < 4; i++) { 
        var myanswers = $(".a")[i].innerHTML;
        if(correctid == myanswers) { 
            $("#a"+[i+1]).css("backgroundColor", "lightgreen")
        }
    }

    lostcount++;

    localStorage.setItem("counteroflostpref", lostcount)

    localStorage.setItem("onedown", "yes")
    
    setTimeout(ifwrong, 3000)
}

 $(".a").on("mousedown", function(ev) { 
     if(isNaN(allprefcount) || isNaN(woncount) || isNaN(lostcount)) { 
       if (isNaN(allprefcount)) allprefcount = 0;
       if (isNaN(woncount)) woncount = 0;
       if (isNaN(lostcount)) lostcount = 0;

     } 
     chosenid = ev.target.id
     chosenans = ev.target.innerHTML
     addremove()

     clearInterval(countinterval)
 })




//////// User name & pic transfer ////////

if(localStorage.getItem("picurl")) { 
    $("#belowpic").attr("src", localStorage.getItem("picurl"))
}


$("#username2").text(localStorage.getItem("username"))



//////// Prefecture name & pic transfer ////////

if(localStorage.getItem("prefval")) { 
    var z = localStorage.getItem("prefval");
    var srcimg = "pics/prefectureflags/" + z + ".png";
    $("#prefmon").attr("src", srcimg)
    $("#prefmon").css("border", "1px solid")
    $("#prefmon").css("boxShadow", "0 0 2px gray")
    $("#prefname").text(z);
    
}



////////// If correct answer //////////

function ifcorrect() { 
    localStorage.removeItem("washerebefore")
    localStorage.removeItem("oneup")
    localStorage.setItem("check", "yes")
    localStorage.setItem("answers", "corrects")
   
    location.replace("BOJmap.html")
}


////////// If wrong answer //////////

function ifwrong() { 
    localStorage.removeItem("washerebefore")
    localStorage.removeItem("onedown")
    localStorage.setItem("secondcheck", "yes")
    localStorage.setItem("answers", "wrong")
   
    location.replace("BOJmap.html")
}



/////// Countdown ///////

 function countdown() { 
        counting--;
        if(counting == 5) { 
            $("#countdown").css("color", "red")
        }
        $("#countdown").text(counting);
        if(counting == 0) { 
            clearInterval(countinterval)
            $(".a").removeClass("h")
            allprefcount++
            localStorage.setItem("counterofallpref", allprefcount)
            $(".a").off("mousedown")
            lostcount++;

            localStorage.setItem("counteroflostpref", lostcount)
        
            setTimeout(ifwrong, 3000)
        }
        
    }


  window.onload = function() { 
     countdown();
     countinterval = setInterval(countdown, 1000)
  };



//////// On refresh & browser back button ////////

window.onbeforeunload = function() { 
    localStorage.setItem("left", "yes") 
}



///// Prevent mouse middle & right button click /////

window.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });

window.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });



//////// On refresh & browser back button ////////

  if(sessionStorage.getItem("currentlyin") === null) { 
    location.replace("BOJstart.html")
}