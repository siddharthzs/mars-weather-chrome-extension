var mycolor = [
  "#1b1b29 ","#2e1445 ", "#191919 ","#3fe0d0 ","#b0dfe5 ","#95c8d8 ","#7ef8ff ",
  "#588bae ","#89cff0 ","#4682b4 ","#57a0d3 ", "#7285a5 ",
  "#008ecc ","#0f52ba ","#0080ff ", "#1034a6 ", "#0e4d92",
  "#000080", "#003152", "#1d2951", "#111e6c"
];

var months = ['January','Febuary','March','April','May','June','July','August','September','Octber','November','December'];
var i = 0;
document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('next');
  checkPageButton.addEventListener('click', function () {
    i++;
    if(i > mycolor.length)
      i=0;
    document.body.style.backgroundColor = mycolor[i];
  
    // document.getElementById('next').style.backgroundColor = mycolor[i];
    document.getElementById('next').style.color = mycolor[i];

  }, false);
}, false);

api_key = "9RWcH0sXjq8jNGVhrFOJxpaVdlC05fhAMb0wR2kJ";
const Url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

const Http = new XMLHttpRequest();
Http.open("GET", Url);
Http.responseType = 'json';
Http.send();
Http.onreadystatechange = (e) => {
  var JSO = Http.response;

  var date_time = JSO[JSO.sol_keys[0]].Last_UTC;

  var today = date_time.slice(5,10);
  var mon = parseInt(date_time.slice(5,7));
  var day = date_time.slice(8,10);

  var cur_time = date_time.slice(11,19);



  document.getElementById('cur_season').innerHTML = JSO[JSO.sol_keys[0]].Season;
  document.getElementById('cur_htemp').innerHTML +=Math.round(JSO[JSO.sol_keys[0]].AT.mx) + " <sup> &#x2092;</sup>F";
  document.getElementById('cur_ltemp').innerHTML += Math.round(JSO[JSO.sol_keys[0]].AT.mn) + " <sup> &#x2092;</sup>F";
  document.getElementById('cur_pressure').innerHTML += Math.round(JSO[JSO.sol_keys[0]].PRE.av) + " Pa";

 
  document.getElementById('cur_sol').innerHTML += JSO.sol_keys[0];
  document.getElementById('cur_day').innerHTML = day+" "+months[mon] ;
  document.getElementById('cur_time').innerHTML = cur_time;

    // document.getElementById('mytext').innerHTML = JSON.stringify(data[sol]);
    for(var i = 1; i < 5; i++){
      sol = JSO.sol_keys[i];
      document.getElementsByClassName('next_days')[i-1].innerHTML = "Sol "+sol + "<br><br>" + Math.round(JSO[sol].AT.av)+" <sup> &#x2092;</sup>C";
    }
}

