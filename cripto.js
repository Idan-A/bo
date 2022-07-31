var path=document.URL.split("?")[1].split("&")
coin=path[0].split("=")[1]
var restdata={}
for(i=0;i<path.length;i++){
  restdata[path[0].split("=")[0]]=path[0].split("=")[1]
}


fetch("https://api.coinpaprika.com/v1/coins/"+restdata.value)
  .then(response => response.json())
  .then(dati => {
    vue.from=dati.first_data_at;
    vue.to=dati.last_data_at;
    vue.symbol=dati.symbol;
    vue.name=dati.name;
    vue.description=dati.description;
    asset(dati.name.replace(" ","-").toLowerCase())
    console.log("dati crypto",dati)});

function asset(crypto) {
  fetch("https://api.coincap.io/v2/assets/"+crypto)
            .then(response => response.json())
            .then(dati => {
              vue.supply=(dati.data.supply/(10**6)).toFixed(2)+"M";
              vue.change24h=parseFloat(dati.data.changePercent24Hr).toFixed(2);
              vue.price=parseFloat(dati.data.priceUsd).toFixed(2)
              vue.volume=(dati.data.volumeUsd24Hr/(10**6)).toFixed(2)+"M";
              vue.marketCup=(dati.data.marketCapUsd/(10**6)).toFixed(2)+"M";
              vue.maxSupply=(dati.data.maxSupply/(10**6)).toFixed(2)+"M";
              console.log("ancora dati crypto",dati)});

}



var vue=Vue.createApp({
  data() {
    return {
      change24h:0,
      description:"",
      graphDimension:"col-10",
      from:'',
      exchanges:"",
      exchangeid:"",
      name:"",
      symbol:"",
      to:"",
      typechart:"scatter",
      supply:"",
      price:0,
      volume:0,
      list:"info",
      marketCup:"",
      maxSupply:"",
    }
  },
  computed: {
  
    path: function () {
      return "chart/chart.html?crypto="+this.symbol+"&start="+this.from+"&interval="+this.to+"&type="+this.typechart
    },
    
    color24h :function(){
      return (this.change24h>0) ? "#81b29aff" : "#e07a5fff"
    },
    
  },
  methods:{
    getexchange(){
      if(this.exchanges==""){
      fetch("https://api.coincap.io/v2/exchanges")
        .then(response => response.json())
        .then(dati => {this.exchanges=dati.data;console.log("exchange",dati)})
            }
    },
    seeexchange:function(id){
      if(this.exchangeid!="" || this.exchangeid!=null){
         return id.includes(this.exchangeid)
      }else{return true}

    }
  }
}).mount('#app')
