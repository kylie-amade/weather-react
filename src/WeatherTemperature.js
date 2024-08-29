import React, {useState} from "react";

export default function WeatherTemperature(props){
   const [unit, setUnit] = useState("celsius");
   let  C =props.ture;

   function showFahrenheit(event) {
     event.preventDefault();
     setUnit("fahrenheit");
   }

   function showCelsius(event) {
     event.preventDefault();
     setUnit("celsius");
   }
   
   function celsius() {
     return  (C-32) *5/9 ;
   }

   function fahrenheit() {
     return (celsius * 9) / 5 + 32;
   }

   if (unit === "celsius") {
     return (
       <div className="WeatherTemperature">
         <span className="temperature">{Math.round(celsius())}</span>
         <span className="unit">
           °C |{" "}
           <a href="/" onClick={showFahrenheit}>
             °F
           </a>
         </span>
       </div>
     );
   } else {
     return (
       <div className="WeatherTemperature">
         <span className="temperature">{Math.round(fahrenheit())}</span>
         <span className="unit">
           <a href="/" onClick={showCelsius}>
             °C
           </a>{" "}
           | °F
         </span>
       </div>
     );
   }

}