const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey='&appid=89aef590c4ab9bdac83c3713dcd43eea&units=metric';

let d=new Date();
let newDate =d.getDate()+'/'+(d.getMonth()+1)+'/'+ d.getFullYear();

document.getElementById("generate").addEventListener('click',callback);
//this function run when click in button generate
function callback(){
let feelings=document.getElementById("feelings").value;
let zipCode=document.getElementById("zip").value;
getData(baseUrl,zipCode,apiKey).then(function(data){
    post('/',{temp:data.main.temp,weather:data.weather[0].main,Icon:data.weather[0].icon,CityName:data.name,
      Date:newDate,feeling:feelings});   
}).then(()=>{
 updatedata();
});
};
//This post return data to POST route to push data in array project data
const post= async ( url = '', data = {})=>{
 
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {

        'Content-Type': 'application/json',
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try { 
      const newData = await response.json();
       console.log(newData);
       //return data
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
//This variable receive data from website OpenWeatherMap.com with baseUrl and zipCode apiKey
const getData=async(baseUrl,zipCode,apiKey) => {

    const res=await fetch(baseUrl+zipCode+apiKey);
 try{
const data=res.json();
console.log(data);
//return data from api
return data;
  }catch(error){
          // appropriately handle the error
      console.log("error",error);
  }
}
//This variable put data in page for user can see this data in page and update data 
//for each zipCode country to get weather 
const updatedata = async ()=>{

  const res = await fetch('/sendData');
    try {
      const data = await res.json();
    document.getElementById("date").innerHTML=`Date:${data.Date}`
    document.getElementById("temp").innerHTML=`Temperature:${Math.round(data.temp)}`+`<sup>o</sup>C<img src=http://openweathermap.org/img/wn/${data.Icon}.png alt=notfound/>`;
    document.getElementById("city").innerHTML=`City:${data.CityName}`;
    document.getElementById("weather").innerHTML=`Weather:${data.weather}`;
    document.getElementById("content").innerHTML=`Content:${data.feeling}`;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


