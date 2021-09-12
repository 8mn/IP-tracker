import classes from './App.module.css'
import arrow from '../src/assests/images/icon-arrow.svg'
import axios from 'axios';
import {useEffect, useState} from 'react'
import isValidDomain from 'is-valid-domain'
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './index.css'
import L from 'leaflet'


function App() {

  const API_KEY = process.env.REACT_APP_IP_API_KEY
  const BASE_URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`
  const [ipAddress, setipAddress] = useState()
  const [location, setlocation] = useState()
  const [timezone, settimezone] = useState()
  const [isp, setisp] = useState()
  const [query, setquery] = useState('')
  const [queryDomain, setqueryDomain] = useState('')
  // const [latitude, setlatitude] = useState(53.7)
  // const [longitude, setlongitude] = useState(-19)


  const[pos, setpos] =useState([53,-19])
  const[map, setmap] = useState(null)


//   const changePos  = (pos) => {
//     setpos(pos);
//     if (map) map.flyTo(pos);
//  }


  const GetIp = (url) => {

    if(isValidDomain(query)){
      setquery('')
      setqueryDomain(query)
    }
     
    // url += `&ipAddress=${query}`
    axios.get(`${url}&ipAddress=${query}&domain=${queryDomain}`)
    .then(res => {
      // console.log(res)
      setipAddress(res.data.ip)
      setlocation(res.data.location.city)
      settimezone(res.data.location.timezone)
      setisp(res.data.isp)


      // setlatitude(res.data.location.lat)
      // setlongitude(res.data.location.lng)
        // console.log(latitude,longitude)
        changePos([res.data.location.lat,res.data.location.lng])


    })
    .catch(err => alert(`${err}- Try disabling your adBlocker`))
  }



  useEffect(() => {
    GetIp(BASE_URL)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[map])

  const getQuery = (e) => {
    e.preventDefault()
    setquery(e.target.value)
  }

  let myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,-41]
  })



  const changePos  = (pos) => {
    setpos(pos);
    if (map) {
      map.flyTo(pos)}
  }

  

  return (
    <div className="App">
      <div className={classes.container}>
        <div className={classes.backgroundImg}>
          <h1 className={classes.Heading}>IP Address Tracker</h1>
            <div className={classes.searchBox}>
              <input type="text" placeholder="Search for any IP address or domain" onChange={getQuery}/>
                <div className={classes.arrowContainer} onClick={() => GetIp(BASE_URL)}>
                <img src={arrow} alt="enter address"  className={classes.getIP}/>
                </div>
            </div>
          </div>
          <div className={classes.map} >
          <MapContainer  center={pos} zoom={13} scrollWheelZoom={true} className={classes.mapid} whenCreated={map => {setmap(map)}}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos} icon={myIcon}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
          </MapContainer>
          </div>
          <div className={classes.infoBox}>
            <div className={classes.infoContainer}>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>IP ADDRESS</span>
                <span className={classes.infoData}>{ipAddress}</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>LOCATION</span>
                <span className={classes.infoData}>{location}</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>TIMEZONE</span>
                <span className={classes.infoData}>{timezone}</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>ISP</span>
                <span className={classes.infoData}>{isp}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
