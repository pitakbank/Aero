 function getAirportInformation(){
  // count number of page
  $.ajax({
    type: 'POST',
    data:{},
    url: 'http://172.16.21.212/AirportService/getAirportInformation.asmx/AirportInformation',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (result) {
      // for(var i=0; i<result.length;i++){
      //   var AirportInformarion = ""+result.Table[i].AirportID;
      // }
      // alert(JSON.stringify(result.d));
      alert("success get AirportInformarion");
    },
    error: function (result) {
      alert(JSON.stringify(result));
    }
  }); // ajax

 } //function
