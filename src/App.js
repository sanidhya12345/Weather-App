/** @format */
import React, { useState } from "react";
import { SearchOutline } from "react-ionicons";
import axios from "axios";
import "./App.css"
import CloudSunny from "./Images/cloudsunny.png";
import Clear from "./Images/clear.png";
import Clouds from "./Images/clouds.png";
import Rain from "./Images/rain.png";
import Snow from "./Images/snow.png";
import Humidity from "./Images/humidity.png";
import WindSpeed from "./Images/windspeed.png";
import {SunnyOutline} from "react-ionicons";
const Card = ({ style, celsius, name, humidity, speed,type }) => {
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const typeConvert=type.toLowerCase();
  let img=CloudSunny;
  if(typeConvert==="clouds"){
    img=Clouds;
  }
  else if(typeConvert==="clear"){
    img=Clear;
  }
  else if(typeConvert==="rain"){
    img=Rain;
  }
  else if(typeConvert==="snow"){
    img=Snow;
  }
  return (
    <div style={style.winfo}>
      <img src={img} alt="" style={style.img} />
      <h1 style={style.head1}>{celsius}°c</h1>
      <h2 style={style.head2}>{name}</h2>
      <h3>{currDate}</h3>
      <h3>{currTime}</h3>
      <div className="details" style={style.details}>
        <div className="col" style={style.col}>
          <img src={Humidity} alt="" style={style.image} />
          <div style={style.hw}>
            <p>{humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col" style={style.col}>
          <img src={WindSpeed} alt="" style={style.image} />
          <div style={style.hw}>
            <p>{speed} km/h</p>
            <p>WindSpeed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
function App(props) {
  const { minWidth } = props;
  const [name, setName] = useState("");
  const [data, setData] = useState({
    celsius: 40,
    name: "Delhi",
    humidity: "10",
    speed: 2,
    type:"clear"
  });
  const [style, setStyle] = useState({
    desktop: {
      container:{
        marginTop:'0px',
        backgroundColor:'#A7E6FF',
        height:'100vh'
      },
      heading: {
        paddingTop:'30px',
        color: "#000",
        textAlign:'center',
        fontSize:'70px'
      },
      inputContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:'30px'
      },
      search: {
        width: "800px",
        height: "30px",
        fontSize: "20px",
      },
      searchContainer: {
        width: "28px",
        height: "29px",
        border: "1px solid #000",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      },
      weatherContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      gridContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'100px'
      },
      ic:{
        width:'30px',
        height:'30px',
        color:'#000'
      }
    },
    mobile: {
      container:{
        marginTop:'0px',
        backgroundColor:'#A7E6FF',
        height:'100vh'
      },
      heading: {
        paddingTop: "60px",
        textAlign:'center',
        color: "#000",
      },
      inputContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      },
      search: {
        width: "300px",
        height: "30px",
        fontSize: "20px",
      },
      searchContainer: {
        height: "29px",
        border: "1px solid #000",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      },
      weatherContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "70px",
      },
      gridContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px'
      },
      ic:{
        width:'40px',
        height:'40px',
        color:'#000'
      },
      card: {
        winfo: {
          width: "380px",
          height: "380px",
          backgroundColor: "#005C78",
          border: "1px solid #ccc",
          textAlign: "center",
          color: "white",
          borderRadius: "10px",
        },
        img: {
          marginTop: "2px",
          width: "100px",
          height: "100px",
        },
        head1: {
          fontSize: "50px",
        },
        head2: {
          marginTop: "10px",
          fontSize: "30px",
        },
        image: {
          width: "50px",
          height: "50px",
          marginRight: "10px",
        },
        details: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          marginTop: "50px",
        },
        col: {
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        },
        hw: {
          fontSize: "20px",
        },
      },
    },
    card: {
      winfo: {
        width: "580px",
        height: "580px",
        backgroundColor: "#005C78",
        border: "1px solid #ccc",
        textAlign: "center",
        color: "white",
        borderRadius: "10px",
      },
      img: {
        marginTop: "2px",
        width: "200px",
        height: "200px",
      },
      head1: {
        fontSize: "70px",
      },
      head2: {
        marginTop: "10px",
        fontSize: "50px",
      },
      image: {
        width: "80px",
        height: "80px",
        marginRight: "10px",
      },
      details: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px",
        marginTop: "50px",
      },
      col: {
        display: "flex",
        alignItems: "center",
        textAlign: "left",
      },
      hw: {
        fontSize: "20px",
      },
    },
  });
  const handleClick = () => {
    if (name !== "") {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=43fa9a41b1dce3a9d612fde7f32b47ee&units=metric`;
      axios
        .get(apiURL)
        .then((res) => {
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            type:res.data.weather[0].main
          })
        })
        .catch((err) => alert(err));
    }
  };
  const themeChange=()=>{
     let changeDeskBC=style.desktop.container.backgroundColor==='#A7E6FF'?'#151515': '#A7E6FF';
     let changeHeadingColor=style.desktop.heading.color==='#000'?'#fff':'#000';
     let changeCardColor=style.card.winfo.backgroundColor==='#005C78'?'#CAF4FF':'#005C78';
     let changeCardText=style.card.winfo.color==="white"?"black":"white";
     let changeTheme={
      desktop: {
        container:{
          marginTop:'0px',
          backgroundColor:changeDeskBC,
          height:'100vh'
        },
        heading: {
          paddingTop:'30px',
          color: changeHeadingColor,
          textAlign:'center',
          fontSize:'70px'
        },
        inputContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:'30px'
        },
        search: {
          width: "800px",
          height: "30px",
          fontSize: "20px",
        },
        searchContainer: {
          width: "28px",
          height: "29px",
          border: "1px solid #000",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        },
        weatherContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        gridContainer: {
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          marginTop:'100px'
        },
        ic:{
          width:'30px',
          height:'30px',
          changeHeadingColor
        }
      },
      mobile: {
        container:{
          marginTop:'0px',
          backgroundColor:changeDeskBC,
          height:'100vh'
        },
        heading: {
          paddingTop: "60px",
          textAlign:'center',
          color: changeHeadingColor,
        },
        inputContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        },
        search: {
          width: "300px",
          height: "30px",
          fontSize: "20px",
        },
        searchContainer: {
          height: "29px",
          border: "1px solid #000",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        },
        weatherContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        },
        gridContainer: {
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          marginTop:'20px'
        },
        ic:{
          width:'40px',
          height:'40px',
          color:changeHeadingColor
        },
        card: {
          winfo: {
            width: "380px",
            height: "380px",
            backgroundColor: changeCardColor,
            border: "1px solid #ccc",
            textAlign: "center",
            color: changeCardText,
            borderRadius: "10px",
          },
          img: {
            marginTop: "2px",
            width: "100px",
            height: "100px",
          },
          head1: {
            fontSize: "50px",
          },
          head2: {
            marginTop: "10px",
            fontSize: "30px",
          },
          image: {
            width: "50px",
            height: "50px",
            marginRight: "10px",
          },
          details: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 20px",
            marginTop: "50px",
          },
          col: {
            display: "flex",
            alignItems: "center",
            textAlign: "left",
          },
          hw: {
            fontSize: "20px",
          },
        },
      },
      card: {
        winfo: {
          width: "580px",
          height: "580px",
          backgroundColor: changeCardColor,
          border: "1px solid #ccc",
          textAlign: "center",
          color: changeCardText,
          borderRadius: "10px",
        },
        img: {
          marginTop: "2px",
          width: "200px",
          height: "200px",
        },
        head1: {
          fontSize: "70px",
        },
        head2: {
          marginTop: "10px",
          fontSize: "50px",
        },
        image: {
          width: "80px",
          height: "80px",
          marginRight: "10px",
        },
        details: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          marginTop: "50px",
        },
        col: {
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        },
        hw: {
          fontSize: "20px",
        },
      },
    }
    setStyle(changeTheme)
  }
  let comp;
  if (minWidth === "1224") {
    comp = (
      <div style={style.desktop.container}>
        <h1 style={style.desktop.heading}> Weather App <SunnyOutline style={style.mobile.ic} onClick={themeChange}></SunnyOutline></h1>
        <div style={style.desktop.inputContainer}>
          <input
            type="text"
            style={style.desktop.search}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter City Name"></input>
          <div style={style.desktop.searchContainer}>
            <button type="submit" onClick={handleClick}>
              <SearchOutline/>
            </button>
          </div>
        </div>
        <div style={style.desktop.weatherContainer}>
          <div style={style.desktop.gridContainer}>
             <Card style={style.card} celsius={data.celsius} name={data.name} humidity={data.humidity} speed={data.speed} type={data.type}></Card>
          </div>
        </div>
      </div>
    );
  } else if (minWidth === "425") {
    comp = (
      <div style={style.mobile.container}>
        <h1 style={style.mobile.heading} className="heading">
          Weather App <SunnyOutline style={style.mobile.ic} onClick={themeChange}></SunnyOutline>
        </h1>
        <div style={style.mobile.inputContainer} className="input-container">
          <input
            type="text"
            style={style.mobile.search}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter City Name"></input>
          <div style={style.mobile.searchContainer}>
            <button type="submit" onClick={handleClick}>
            <SearchOutline/>
            </button>
          </div>
        </div>
        <div
          style={style.mobile.weatherContainer}
          className="weather-container">
          <div style={style.mobile.gridContainer}>
             <Card style={style.mobile.card} celsius={data.celsius} name={data.name} humidity={data.humidity} speed={data.speed} type={data.type}></Card>
          </div>
        </div>
      </div>
    );
  }
  return <div>{comp}</div>;
}

export default App;
