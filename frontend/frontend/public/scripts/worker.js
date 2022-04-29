  class API{
    url= 'http://localhost:5000/'

    makeTrade(type,options){

      return  fetch( this.url+'predict'+ type, options).then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using .json()
                return response.json();
            })
    }
}


const startDate ="Dec 1, 2021";
let currentDate = "Dec 1, 2021";

let api_class = new API()
self.addEventListener('message', ({ data }) => {

  let { type, ttype,payload } = data;

   if (type === 'RESET') {
            currentDate = startDate
         fetch('http://localhost:5000/resetbalance').then(r =>
         self.postMessage({ type: 'RESET_SUCCESS', payload: {} })
         )

   }
 if (type === 'START') {

         self.postMessage({ type: 'START_SUCCESS',payload: {} })
 }

  if (type === 'UPDATE' ) {

       let options = addOneDayAndGetRequestParams()
        api_class.makeTrade(ttype,options).then(function (data) {

                // data is the parsed version of the JSON returned from the above endpoint.
                if (data.info === "") {
                    var obj = JSON.parse(options.body);
                    var myDate = new Date(obj["date"])

                     self.postMessage({ type: 'UPDATE_END', payload:{
                        "result": "End of simulation",
                        "price": 0,
                        "usd_balance": 0,
                        "btc_balance": 0,
                        "today_date": convert_date(myDate)
                    }  });

                } else {
                       setTimeout(() => self.postMessage({ type: 'UPDATE_SUCCESS', payload: data }),

                           5000);
                    //localStorage.setItem("trade",JSON.stringify(data))

                    // setTrade(data)

                }


            });



  }
});

self.addEventListener(
  'exit',
  () => {
    process.exit(0);
  },
  false
);

  function convert_date(myDate){
      return myDate.toLocaleString('default', {month: 'short'}) + " " + myDate.getDate() + ", " + myDate.getFullYear();
  }
  function addOneDayAndGetRequestParams(){
            let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"date": currentDate})
        }



        let obj = JSON.parse(options.body);
        let myDate = new Date(obj["date"])
        myDate.setDate(myDate.getDate() + 1);
        obj["date"] = convert_date(myDate)
        options.body = JSON.stringify(obj)
        currentDate = obj["date"]
      return options
  }

