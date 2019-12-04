

$(document).ready(function() {

  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 5000);

});
var x,y;
function refreshSensors() {

  $.get('/sensor_module/temperature', function(json_data) {
    x=json_data.temperature;
	//$("#temperature").text('Temperature: ' + json_data.temperature + ' C');

	
	$.get('/sensor_module/humidity', function(json_data) {
    y=json_data.humidity;
	//$("#humidity").text('Humidity: ' + json_data.humidity + ' %');
    });
  });

}



//Graphs visit: https://www.chartjs.org
var ADCvalues = [];
var Tvalues = [];
var Hvalues = [];
var timeStamp = [];
function showGraph()
{
    var ctx = document.getElementById("Chart").getContext('2d');
    var Chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamp,  //Bottom Labeling
            datasets: [
			{
                label: "Temperature",
                fill: false,  //Try with true
                backgroundColor: 'rgba( 243, 156, 18 , 1)', //Dot marker color
                borderColor: 'rgba( 243, 156, 18 , 1)', //Graph Line Color
                data: Tvalues,
            },
            {
                label: "Humidity",
                fill: false,  //Try with true
                backgroundColor: 'rgba(156, 18, 243 , 1)', //Dot marker color
                borderColor: 'rgba(156, 18, 243 , 1)', //Graph Line Color
                data: Hvalues,
            }],
        },
        options: {
            title: {
                    display: true,
                    text: "ADC Voltage"
                },
            maintainAspectRatio: false,
            elements: {
            line: {
                    tension: 0.5 //Smoothening (Curved) of data lines
                }
            },
            scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
            }
        }
    });

}

//On Page load show graphs
window.onload = function() {
  console.log(new Date().toLocaleTimeString());
};

//Ajax script to get ADC voltage at every 5 Seconds 
//Read This tutorial https://circuits4you.com/2018/02/04/esp8266-ajax-update-part-of-web-page-without-refreshing/

setInterval(function() {
  // Call a function repetatively with 5 Second interval
  getData();
}, 5000); //5000mSeconds update rate
 
function getData() {
     //Push the data in array
  var time = new Date().toLocaleTimeString();
  
  if(timeStamp.length>=50){
   ADCvalues.unshift();
   Tvalues.unshift();
   Hvalues.unshift();
  }
      //ADCvalues.push(obj.ADC);
      Tvalues.push(x);
      Hvalues.push(y);
      timeStamp.push(time);
      showGraph();  //Update Graphs
  //Update Data Table
    var table = document.getElementById("dataTable");
    var row = table.insertRow(1); //Add after headings
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    cell1.innerHTML = time;
    //cell2.innerHTML = obj.ADC;
    cell2.innerHTML =x;
    cell3.innerHTML = y;
    }
