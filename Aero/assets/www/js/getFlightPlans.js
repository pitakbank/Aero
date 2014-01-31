   var SinceDate;
    var UntilDate;
    var aircraft;
    var callsign;
    var dep;
    var depDestLink;
    var dest;
    var fplType;
    var flightRule;
    var flightType;
    var flightLevel;
    var reg;
    var route;
    var speed;
    var squawk;
    var startIndex;
    var stopIndex;
    var sort;
    var AmountOfPlans = 0;
    var AmountOfPages = 0;
    var flightNumber = 0;

    var IDArr = new Array();

    var NewATD ;

    $(function () {

      $("#formsubmit").submit(function () {

        document.location.href = "#search-result-page";
        $('#myPagesLinkHead').html('');
        $('#myPagesLinkHead').html('<img src="images/Filling_broken_ring.gif"> loading...');
        $("ul#flightplanlists li").remove();
        $('#myPagesLinkButtom').html('');

        SinceDate = document.getElementById('SinceDate');
        UntilDate = document.getElementById('UntilDate');
        aircraft = document.getElementById('aircraft');
        callsign = document.getElementById('callsign');
        dep = document.getElementById('dep');
        depDestLink = $("#depDestLink").val();
        dest = document.getElementById('dest');
        fplType = document.getElementById('fplType');
        flightRule = document.getElementById('flightRule');
        flightType = document.getElementById('flightType');
        flightLevel = document.getElementById('flightLevel');
        reg = document.getElementById('reg');
        route = document.getElementById('route');
        speed = document.getElementById('speed');
        squawk = document.getElementById('squawk');

        var dateSinceDateSplit = SinceDate.value.split('/');
        var yearS = dateSinceDateSplit[2];
        var monthS = dateSinceDateSplit[0];
        var dayS = dateSinceDateSplit[1];
        if(parseFloat(dayS)<10){
          dayS = "0"+dayS;
        }

        if(UntilDate.value==""){
          yearU = yearS;
          monthU = monthS;
          dayU = dayS;
        }else{
          var dateUntilDateSplit = UntilDate.value.split('/');
          var yearU = dateUntilDateSplit[2];
          var monthU = dateUntilDateSplit[0];
          var dayU = dateUntilDateSplit[1];
        }

        var postData2 = new Object();
        postData2.since = yearS + monthS + dayS;
        postData2.until = yearU + monthU + dayU;
        postData2.aircraft = aircraft.value;
        postData2.callsign = callsign.value;
        postData2.dep = dep.value;
        postData2.depDestLink = depDestLink;
        postData2.dest = dest.value;
        postData2.fplType = fplType.value;
        postData2.flightRule = flightRule.value;
        postData2.flightType = flightType.value;
        postData2.flightLevel = flightLevel.value;
        postData2.reg = reg.value;
        postData2.route = route.value;
        postData2.speed = speed.value;
        postData2.squawk = squawk.value;

        // count number of page
        $.ajax({
          type: 'POST',
          url: 'http://172.16.21.187/fdmcwebservices/flightplanservices.asmx/CountFlightPlans',
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(postData2),
          success: function (result) {

            AmountOfPlans = result.d;

            AmountOfPages = AmountOfPlans/50;

            getFlightPlans(1,50);

          },
          error: function (result) {
            alert("error!"+result.responseText);
          }
        }); // ajax
        return false; // ไม่ให้ form มัน load ใหม่

    }); //post form

}); //function

function getFlightPlans(startIndexParam,stopIndexParam) {
  $('#myPagesLinkHead').html('');
  $('#myPagesLinkHead').html('<img src="images/Filling_broken_ring.gif"> loading...');
  $("ul#flightplanlists li").remove();
  $('#myPagesLinkButtom').html('');

  sort = document.getElementById('sort');

  var dateSinceDateSplit = SinceDate.value.split('/');
  var yearS = dateSinceDateSplit[2];
  var monthS = dateSinceDateSplit[0];
  var dayS = dateSinceDateSplit[1];
  if(parseFloat(dayS)<10){
    dayS = "0"+dayS;
  }

  if(UntilDate.value==""){
    yearU = yearS;
    monthU = monthS;
    dayU = dayS;
  }else{
    var dateUntilDateSplit = UntilDate.value.split('/');
    var yearU = dateUntilDateSplit[2];
    var monthU = dateUntilDateSplit[0];
    var dayU = dateUntilDateSplit[1]; 
  }

  var postData = new Object();
  postData.since = yearS + monthS + dayS;
  postData.until = yearU + monthU + dayU;
  postData.aircraft = aircraft.value;
  postData.callsign = callsign.value;
  postData.dep = dep.value;
  postData.depDestLink = depDestLink;
  postData.dest = dest.value;
  postData.fplType = fplType.value;
  postData.flightRule = flightRule.value;
  postData.flightType = flightType.value;
  postData.flightLevel = flightLevel.value;
  postData.reg = reg.value;
  postData.route = route.value;
  postData.speed = speed.value;
  postData.squawk = squawk.value;
  postData.startIndex = startIndexParam;
  postData.stopIndex = stopIndexParam;
  postData.sort = sort.value;

  $.ajax({
    type: 'POST',
    url: 'http://172.16.21.187/fdmcwebservices/flightplanservices.asmx/GetFlightPlansWithoutRoute',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(postData),
        // async: false,
        success: function (result) {

          if(startIndexParam==0){
            flightNumber = 1;
          }else{
            flightNumber = startIndexParam;
          }

          for (var i = 0; i < result.d.FlightPlans.length; i++) {

            eval("var EtdArr = new " + result.d.FlightPlans[i].Etd.split('/')[1] + ";");
            eval("var AtdArr = new " + result.d.FlightPlans[i].Atd.split('/')[1] + ";");
            eval("var EtaArr = new " + result.d.FlightPlans[i].Eta.split('/')[1] + ";");
            eval("var AtaArr = new " + result.d.FlightPlans[i].Ata.split('/')[1] + ";");

            window.localStorage.setItem("AircraftStorage"+flightNumber, result.d.FlightPlans[i].Aircraft);
            window.localStorage.setItem("CallsignStorage"+flightNumber, result.d.FlightPlans[i].Callsign);
            window.localStorage.setItem("DepStorage"+flightNumber, result.d.FlightPlans[i].DepartureAerodrome);
            window.localStorage.setItem("EtdStorage"+flightNumber, EtdArr.toString().split(' ')[2] + "-" + EtdArr.toString().substring(16, 18) + ":" + EtdArr.toString().substring(19, 21));
            window.localStorage.setItem("AtdStorage"+flightNumber, AtdArr.toString().split(' ')[2] + "-" + AtdArr.toString().substring(16, 18) + ":" + AtdArr.toString().substring(19, 21));
            window.localStorage.setItem("DESTStorage"+flightNumber, result.d.FlightPlans[i].DestinationAerodrome);
            window.localStorage.setItem("EtaStorage"+flightNumber, EtaArr.toString().split(' ')[2] + "-" + EtaArr.toString().substring(16, 18) + ":" + EtaArr.toString().substring(19, 21));
            window.localStorage.setItem("AtaStorage"+flightNumber, AtaArr.toString().split(' ')[2] + "-" + AtaArr.toString().substring(16, 18) + ":" + AtaArr.toString().substring(19, 21));

            //store year of ata and atd 
            window.localStorage.setItem("ATDStorage"+flightNumber, AtdArr.toString().split(' ')[3]);
            window.localStorage.setItem("ATAStorage"+flightNumber, AtaArr.toString().split(' ')[3]);

            if( (parseFloat(window.localStorage.getItem("ATDStorage"+flightNumber))<=2000) && (parseFloat(window.localStorage.getItem("ATAStorage"+flightNumber))<=2000) ){ // not show atd ata
              $("ul#flightplanlists").append('<li><a onclick=\"viewFlightPlan(' + flightNumber + ')\"><h2>'+flightNumber+'  Aircraft: ' + window.localStorage.getItem("AircraftStorage"+flightNumber) +'        Callsign: ' + window.localStorage.getItem("CallsignStorage"+flightNumber) +'</h2><p>'+window.localStorage.getItem("DepStorage"+flightNumber)+'  '+window.localStorage.getItem("EtdStorage"+flightNumber)+' -> '+window.localStorage.getItem("DESTStorage"+flightNumber)+'  '+window.localStorage.getItem("EtaStorage"+flightNumber)+'</p></a></li> ');
            }
            else if( (parseFloat(window.localStorage.getItem("ATDStorage"+flightNumber))<=2000) ){
              $("ul#flightplanlists").append('<li><a onclick=\"viewFlightPlan(' + flightNumber + ')\"><h2>'+flightNumber+'  Aircraft: ' + window.localStorage.getItem("AircraftStorage"+flightNumber) +'        Callsign: ' + window.localStorage.getItem("CallsignStorage"+flightNumber) +'</h2><p>'+window.localStorage.getItem("DepStorage"+flightNumber)+'  '+window.localStorage.getItem("EtdStorage"+flightNumber)+' -> '+window.localStorage.getItem("DESTStorage"+flightNumber)+'  '+window.localStorage.getItem("EtaStorage"+flightNumber)+'  <font color="green">('+window.localStorage.getItem("AtaStorage"+flightNumber)+')</p></a></li> ');
            }else if( (parseFloat(window.localStorage.getItem("ATAStorage"+flightNumber))<=2000) ){
              $("ul#flightplanlists").append('<li><a onclick=\"viewFlightPlan(' + flightNumber + ')\"><h2>'+flightNumber+'  Aircraft: ' + window.localStorage.getItem("AircraftStorage"+flightNumber) +'        Callsign: ' + window.localStorage.getItem("CallsignStorage"+flightNumber) +'</h2><p>'+window.localStorage.getItem("DepStorage"+flightNumber)+'  '+window.localStorage.getItem("EtdStorage"+flightNumber)+'   <font color="green">('+window.localStorage.getItem("AtdStorage"+flightNumber)+')</font> -> '+window.localStorage.getItem("DESTStorage"+flightNumber)+'  '+window.localStorage.getItem("EtaStorage"+flightNumber)+'</p></a></li> ');
            }else{
              $("ul#flightplanlists").append('<li><a onclick=\"viewFlightPlan(' + flightNumber + ')\"><h2>'+flightNumber+'  Aircraft: ' + window.localStorage.getItem("AircraftStorage"+flightNumber) +'        Callsign: ' + window.localStorage.getItem("CallsignStorage"+flightNumber) +'</h2><p>'+window.localStorage.getItem("DepStorage"+flightNumber)+'  '+window.localStorage.getItem("EtdStorage"+flightNumber)+'   <font color="green">('+window.localStorage.getItem("AtdStorage"+flightNumber)+')</font> -> '+window.localStorage.getItem("DESTStorage"+flightNumber)+'  '+window.localStorage.getItem("EtaStorage"+flightNumber)+'  <font color="green">('+window.localStorage.getItem("AtaStorage"+flightNumber)+')</p></a></li> ');
            }


// check ata , atd

flightNumber++;
}

$('ul#flightplanlists').listview('refresh');

var Firstpage = 1;

var pageTable = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"color: black; background: #fff; border: 1px solid #b4b4b4; font: bold 17px helvetica; padding: 0; margin-top:10px;  width: 100%; -webkit-border-radius: 8px;\"><tr style=\"color: #0000;\"><tbody><tr>";
                for (var pageCount = 0; pageCount < AmountOfPages; pageCount++) { //class="active"

                  pageTable += "<td><a onclick=\"getFlightPlans(" + ((pageCount*50)+1) + "," + ((pageCount*50)+50) +")\" >" + Firstpage + "</a></td>";
                Firstpage++;
              }

              pageTable += "</tr></tbody></table>";

              document.getElementById('myPagesLinkHead').innerHTML = pageTable;
              document.getElementById('myPagesLinkButtom').innerHTML = pageTable;
              document.getElementById('flightResult').innerHTML = '';

        }, // function
        error: function (result) {
          alert("---error !!!!"+JSON.stringify(result));
          console.log(result.responseText);
        }

    }); // ajax

} // function

var ATD;
var ATA;

function viewFlightPlan(ID){ 
//   alert("flight ID"+ID);

$('#flightResult').html('');


  if( (parseFloat(window.localStorage.getItem("ATDStorage"+ID))<=2000) && (parseFloat(window.localStorage.getItem("ATAStorage"+ID))<=2000) ){ // not show atd ata
    ATA = "-";
    ATD = "-";
  }
  else if( (parseFloat(window.localStorage.getItem("ATDStorage"+ID))<=2000) ){
    ATA = "<font color=\"green\">"+window.localStorage.getItem("AtaStorage"+ID)+"</font>";
    ATD = "-";
  }else if( (parseFloat(window.localStorage.getItem("ATAStorage"+ID))<=2000) ){
    ATA = "";
    ATD = "<font color=\"green\">"+window.localStorage.getItem("AtdStorage"+ID)+"</font>";
  }else{
    ATA = "<font color=\"green\">"+window.localStorage.getItem("AtaStorage"+ID)+"</font>";
    ATD = "<font color=\"green\">"+window.localStorage.getItem("AtdStorage"+ID)+"</font>";
  }

  document.getElementById('flightResult').innerHTML = "Aircraft: "+ window.localStorage.getItem("AircraftStorage"+ID) + "<br>Callsign: "+ window.localStorage.getItem("CallsignStorage"+ID) + "<br>Departure: " +window.localStorage.getItem("DepStorage"+ID) + "<br>Etd: "+ window.localStorage.getItem("EtdStorage"+ID) + "<br>Atd: "+ ATD + "<br>Destination: "+ window.localStorage.getItem("DESTStorage"+ID) +"<br>Eta: "+ window.localStorage.getItem("EtaStorage"+ID) +"<br>Ata: "+ ATA +"<br><input type=\"button\" id=\"btFollow"+ID+"\" value=\"Follow this flight\" onclick=\"followFlight("+ID+")\" />";
  document.location.href = "#flight-page";
// check eta

}

var FlightFollowId = new Array();
var FlightFollow_cond_atd = new Array();


function UnfollowFlight(ID){
  window.clearInterval(FlightFollowId[ID]);
  $("#btFollow"+ID).attr("defaultValue","Follow this flight!");
  $("#btFollow"+ID).attr('onclick', 'followFlight('+ID+')');
  navigator.notification.alert('Flight is unfollow!!',alertDismissed,'Unfollow','OK');
  return false;
}

var etdRealMinutes = 0;
var diff_OnehourMinute_2 = 0;

var etaRealMinutes = 0;
var diff_eta_OnehourMinute_2 = 0;

function followFlight(ID){    
  // alert("2words callsign "+window.localStorage.getItem("DepStorage"+ID).toString().substring(0,2) +" ATD: "+ATD);
  
  // getATD(window.localStorage.getItem("AircraftStorage"+ID),window.localStorage.getItem("CallsignStorage"+ID),window.localStorage.getItem("DepStorage"+ID),window.localStorage.getItem("DESTStorage"+ID));

  var currentdate = new Date();

  var etaStrTime = window.localStorage.getItem("EtaStorage"+ID);
  var etaDate = etaStrTime.toString().substring(0,2);
  var etahours = etaStrTime.toString().substring(3, 5);
  var etaMinute = etaStrTime.toString().substring(6, 8);

  // alert("currentdate :"+currentdate.getDate()+" "+currentdate.getHours()+" "+currentdate.getMinutes()+"<br>etddate :"+etaDate+" "+etahours+" "+etaMinute);

  if ( (currentdate.getDate() > etaDate ) ){
    alert("Flight is departed !");
  }
  else if ((currentdate.getDate() == etaDate ) && (currentdate.getHours() > etahours) ){
    alert("Flight is departed !");
  }
  else if ((currentdate.getDate() == etaDate ) && (currentdate.getHours() == etahours) && (currentdate.getMinutes > etaMinute) ){
    alert("Flight is departed !");
  }
  else{
    $("#btFollow"+ID).val("Unfollow!");
    $("#btFollow"+ID).attr('onclick', 'UnfollowFlight('+ID+')');
    navigator.notification.alert('You are following this flight!',alertDismissed,'Followed','Done');

    FlightFollowId[ID] = setInterval(function(){

      var currentdate = new Date();
      var etdStrTime = window.localStorage.getItem("EtdStorage"+ID);
      var etdDate = etdStrTime.toString().substring(0,2);
      var etdhours = etdStrTime.toString().substring(3, 5);
      var etdMinute = etdStrTime.toString().substring(6, 8);

      //make etd minute to 60 if it is 0 minute
      if((etdMinute>=0)&&(etdMinute<=9)){
        etdRealMinutes = 60 + parseFloat(etdMinute);
        diff_OnehourMinute_2 = etdRealMinutes - currentdate.getMinutes();
      }

      var diff_etd_OneHour = etdhours  - currentdate.getHours();
      var diff_etd_tenMinutes = etdMinute - currentdate.getMinutes();


    //checking flight is departed
    // if ( (etdDate >= currentdate.getDate()) && (currentdate.getHours() == etdhours) && (currentdate.getMinutes() == etdMinute )){
    //   // UnfollowFlight(ID); //unfollow
    //   window.plugins.statusBarNotification.notify("Flight is departed!" ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETD:  "+ window.localStorage.getItem("EtdStorage"+ID));return false;
      
    // }

    // checking flight will depart in 1 hour
    if( (etdDate == currentdate.getDate()) && (diff_etd_OneHour == 1 ) && (diff_etd_tenMinutes == 0) ){
     window.plugins.statusBarNotification.notify("Flight will depart in 1 hour." ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETD:  "+ window.localStorage.getItem("EtdStorage"+ID));return false;
   }

   //checking flight will depart in 10 minutes
   else if( (etdDate >= currentdate.getDate()) && (diff_etd_OneHour <= 1 ) && ((diff_etd_tenMinutes == 11)||(diff_OnehourMinute_2 == 11)) ){

    //if atd is avaliable
    getATD(window.localStorage.getItem("AircraftStorage"+ID),window.localStorage.getItem("CallsignStorage"+ID),window.localStorage.getItem("DepStorage"+ID),window.localStorage.getItem("DESTStorage"+ID));

     if( ( (window.localStorage.getItem("DepStorage"+ID).toString().substring(0,2)=="VT") || (window.localStorage.getItem("DESTStorage"+ID).toString().substring(0,2)=="VT") ) && ( parseFloat(window.localStorage.getItem("NewATD"+window.localStorage.getItem("AircraftStorage"+ID)+window.localStorage.getItem("CallsignStorage"+ID)+window.localStorage.getItem("DepStorage"+ID)+window.localStorage.getItem("DESTStorage"+ID))) >2000 )     ){
      checkAtdInterval(ID,window.localStorage.getItem("AircraftStorage"+ID),window.localStorage.getItem("CallsignStorage"+ID),window.localStorage.getItem("DepStorage"+ID),window.localStorage.getItem("DESTStorage"+ID));

     }
     // window.plugins.statusBarNotification.notify("Flight will depart in 10 minutes." ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETD:  "+ window.localStorage.getItem("EtdStorage"+ID));return false;


  //      getATD(window.localStorage.getItem("AircraftStorage"+ID),window.localStorage.getItem("CallsignStorage"+ID),window.localStorage.getItem("DepStorage"+ID),window.localStorage.getItem("DESTStorage"+ID));
  // alert("REAL ATD : "+window.localStorage.getItem("NewATD"+window.localStorage.getItem("AircraftStorage"+ID)+window.localStorage.getItem("CallsignStorage"+ID)+window.localStorage.getItem("DepStorage"+ID)+window.localStorage.getItem("DESTStorage"+ID)) );


   }

    // start checking eta arrive
    var etaStrTime = window.localStorage.getItem("EtaStorage"+ID);
    var etaDate = etaStrTime.toString().substring(0,2);
    var etahours = etaStrTime.toString().substring(3, 5);
    var etaMinute = etaStrTime.toString().substring(6, 8);
    var diff_eta_OnehourHour = etahours  - currentdate.getHours();
    var diff_eta_OnehourMinute = etaMinute - currentdate.getMinutes();
    //convert eta mminute
    if((etaMinute>=0)&&(etaMinute<=9)){
      etaRealMinutes = 60 + parseFloat(etaMinute);
      diff_eta_OnehourMinute_2 = etaRealMinutes - currentdate.getMinutes();
    }


   //flight arrive in 1 hour
   if( (etaDate == currentdate.getDate()) && (diff_eta_OnehourHour == 1 ) && (diff_eta_OnehourMinute == 0) ){
     window.plugins.statusBarNotification.notify("Flight will arrive in 1 hour." ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETA:  "+ window.localStorage.getItem("EtaStorage"+ID));return false;
   }

   //flight arrive in 10 minutes
   else if( (etaDate >= currentdate.getDate()) && (diff_eta_OnehourHour <= 1 ) && ((diff_eta_OnehourMinute == 10)||(diff_eta_OnehourMinute_2 == 10)) ){
     window.plugins.statusBarNotification.notify("Flight will arrive in 10 minutes." ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETA:  "+ window.localStorage.getItem("EtaStorage"+ID));return false;
   } 

    //flight arrived
    else if( (etaDate >= currentdate.getDate()) && (currentdate.getHours() == etahours) && (currentdate.getMinutes() == etaMinute ) ){
      UnfollowFlight(ID); //unfollow
      window.plugins.statusBarNotification.notify("Flight is arrived!" ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ETA:  "+ window.localStorage.getItem("EtaStorage"+ID));return false;
    }

 },60000); //setInterval

} //else

}//end function

  var diff_atd_OnehourMinute_2;
  var atdRealMinutes;

  function checkAtdInterval(ID,aircraft,callsign,dep,dest){
    alert("checkingATD function");

    FlightFollow_cond_atd[ID] = setInterval(function(){

    getATD(aircraft,callsign,dep,dest);

    NewATD = window.localStorage.getItem("NewATD"+window.localStorage.getItem("AircraftStorage"+ID)+window.localStorage.getItem("CallsignStorage"+ID)+window.localStorage.getItem("DepStorage"+ID)+window.localStorage.getItem("DESTStorage"+ID));

    var newATDstr = window.localStorage.getItem("New_AtdStorage"+window.localStorage.getItem("AircraftStorage"+ID)+window.localStorage.getItem("CallsignStorage"+ID)+window.localStorage.getItem("DepStorage"+ID)+window.localStorage.getItem("DESTStorage"+ID));

    alert("ATD year :"+ NewATD+ "ATD time :"+newATDstr);

    var currentdate = new Date();
    var atdDate = newATDstr.toString().substring(0,2);
    var atdhours = newATDstr.toString().substring(3, 5);
    var atdMinute = newATDstr.toString().substring(6, 8);
    var diff_atd_OnehourHour = atdhours  - currentdate.getHours();
    var diff_atd_OnehourMinute = atdMinute - currentdate.getMinutes();
    //convert eta mminute
    if((atdMinute>=0)&&(atdMinute<=9)){
      atdRealMinutes = 60 + parseFloat(atdMinute);
      diff_atd_OnehourMinute_2 = atdRealMinutes - currentdate.getMinutes();
    }

    if( (atdDate >= currentdate.getDate()) && (diff_atd_OnehourHour <= 1 ) && ((diff_atd_OnehourMinute == 10)||(diff_atd_OnehourMinute_2 == 10)) ){
      window.plugins.statusBarNotification.notify("Flight will depart in 10 minutes." ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ATD:  "+ window.localStorage.getItem("AtdStorage"+ID));return false;
    }

        //checking flight is departed
    else if ( (atdDate >= currentdate.getDate()) && (currentdate.getHours() == atdhours) && (currentdate.getMinutes() == atdMinute )){
           window.clearInterval(FlightFollow_cond_atd[ID]); //unfollow 
           window.plugins.statusBarNotification.notify("Flight is departed!" ,  "Callsign: "+window.localStorage.getItem("CallsignStorage"+ID)+"   ATD:  "+ window.localStorage.getItem("AtdStorage"+ID));return false;

    }

    },60000);
  }

  function getATD(aircraft,callsign,dep,dest){
    
    sort = document.getElementById('sort');

    var dateSinceDateSplit = SinceDate.value.split('/');
    var yearS = dateSinceDateSplit[2];
    var monthS = dateSinceDateSplit[0];
    var dayS = dateSinceDateSplit[1];
    if(parseFloat(dayS)<10){
      dayS = "0"+dayS;
    }

    if(UntilDate.value==""){
      yearU = yearS;
      monthU = monthS;
      dayU = dayS;
    }else{
      var dateUntilDateSplit = UntilDate.value.split('/');
      var yearU = dateUntilDateSplit[2];
      var monthU = dateUntilDateSplit[0];
      var dayU = dateUntilDateSplit[1]; 
    }

    var postData = new Object();
    postData.since = yearS + monthS + dayS;
    postData.until = yearU + monthU + dayU;
    postData.aircraft = aircraft;
    postData.callsign = callsign;
    postData.dep = dep;
    postData.depDestLink = depDestLink;
    postData.dest = dest;
    postData.fplType = fplType.value;
    postData.flightRule = flightRule.value;
    postData.flightType = flightType.value;
    postData.flightLevel = flightLevel.value;
    postData.reg = reg.value;
    postData.route = route.value;
    postData.speed = speed.value;
    postData.squawk = squawk.value;
    postData.startIndex = "";
    postData.stopIndex = "";
    postData.sort = sort.value;

    // alert("call getATD"+aircraft+callsign+dep+dest+depDestLink);

    $.ajax({
      type: 'POST',
      url: 'http://172.16.21.187/fdmcwebservices/flightplanservices.asmx/GetFlightPlansWithoutRoute',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(postData),
          success: function (result) {
            eval("var AtdArr = new " + result.d.FlightPlans[0].Atd.split('/')[1] + ";");
            // alert("ATD  "+AtdArr.toString());
            window.localStorage.setItem("New_yearATD"+aircraft+callsign+dep+dest,AtdArr.toString().split(' ')[3]);
            window.localStorage.setItem("New_AtdStorage"+aircraft+callsign+dep+dest, AtdArr.toString().split(' ')[2] + "-" + AtdArr.toString().substring(16, 18) + ":" + AtdArr.toString().substring(19, 21));
          }
    });


  }