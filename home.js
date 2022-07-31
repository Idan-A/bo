  fetch("https://api.coinpaprika.com/v1/global")
    .then(response => response.json())
    .then(data => {/*vue.json=data;*/console.log(data)});
  Vue.createApp({
    data() {
      return {
        query:"",
        risultati:"",
        icon:'cf cf-'
      }
    } ,methods:{
      answer(){
          fetch("https://api.coinpaprika.com/v1/search/?c=currencies&q="+this.query)
            .then(response => response.json())
            .then(data => {this.risultati=data;console.log(data)});
      }
    }
  }).mount('#app')