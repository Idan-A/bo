var path=document.URL.split("?")[1].split("&")
value=path[0].split("=")[1]
fetch("https://api.coinpaprika.com/v1/coins/"+value+"/twitter")
            .then(response => response.json())
            .then(dati => {vue.tweets=dati;console.log(dati[0]);});
var vue=Vue.createApp({
    data() {
      return {
            //json:"",
            tweets:null,
            //more:false,
        }   


    }
  }).mount('#app')