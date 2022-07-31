var path=document.URL.split("?")[1].split("&")
var restdata={}
for(i=0;i<path.length;i++){
  const subpath=path[0].split("=")
  restdata[subpath[0]]=subpath[1]
}
cripto=path[0].split("=")[1]
start=path[1].split("=")[1]//end date normal format
end=path[2].split("=")[1]//start date normal format
typechart=path[3].split("=")[1]
start=Math.floor(new Date(start).getTime() / 1000)//convert unix timestamp
end=Math.floor(new Date(end).getTime() / 1000)//convert unix timestamp

const minute=60,hour=minute*60,day=hour*24 // time labels
const greensheen="#81b29aff",terracotta="#e07a5fff"; // graph color (reference palette style.css)
interval=day
if(end-start<=day){
  interval=hour/12
}else if(end-start<=7*day){
  interval=hour/2
} // from 10-15 line is dinamic interval to improve the graph when the time range is short 

fetch("https://poloniex.com/public?command=returnChartData&currencyPair=USDT_"+cripto+"&start="+start+"&end="+end+"&period="+interval)
            .then(response => response.json())
            .then(dati => {creategraph(dati);console.log(dati)}); // request ohlc data

  
function creategraph(dati){
  var close_array=[],high_array=[],low_array=[],open_array=[],x_array=[],avg_array=[]
  if(typechart=="ohlc"){
    for (i in dati){
     close_array.push(dati[i].close)
      open_array.push(dati[i].open)
      low_array.push(dati[i].low)
      high_array.push(dati[i].high)
     // avg_array.push(dati[i].weightedAverage) //line 22-26 data array for graph
      dati[i].date =new Date(dati[i].date*1000);//convert from unix timestamp to normal format
      x_array.push(dati[i].date)
    }
  }else if(typechart=="scatter"){
    for (i in dati){
      avg_array.push(dati[i].weightedAverage) //line 22-26 data array for graph
      dati[i].date =new Date(dati[i].date*1000);//convert from unix timestamp to normal format
      x_array.push(dati[i].date)
    }
  }



var trace1 = {

  

  x: x_array,
  
  y:avg_array,

  close: close_array,
  

  decreasing: {line: {color: terracotta}}, 

  

  high: high_array,
  

  increasing: {line: {color: greensheen}}, 

  


  line: {color:(avg_array[0]<avg_array[avg_array.length-1]) ? greensheen : terracotta}, 

  

  low: low_array,
  

  open: open_array,
  

  type: typechart, 

  xaxis: 'x', 

  yaxis: 'y'

};


var data = [trace1];


var layout = {

  
};


Plotly.newPlot('myDiv', data, layout);
}