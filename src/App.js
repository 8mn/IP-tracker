import classes from './App.module.css'
import arrow from '../src/assests/images/icon-arrow.svg'

function App() {
  return (
    <div className="App">
      <div className={classes.container}>
        <div className={classes.backgroundImg}>
          <h1 className={classes.Heading}>IP Address Tracker</h1>
            <div className={classes.searchBox}>
              <input type="text" placeholder="Search for any IP address or domain"/>
                <div className={classes.arrowContainer}>
                <img src={arrow} alt="enter address"/>
                </div>
            </div>
          </div>
          <div className={classes.infoBox}>
            <div className={classes.infoContainer}>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>IP ADDRESS</span>
                <span className={classes.infoData}>192.212.174.101</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>LOCATION</span>
                <span className={classes.infoData}>Brooklyn, Ny 10001</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>TIMEZONE</span>
                <span className={classes.infoData}>UTC -05:00</span>
              </div>
              <div className={classes.infoChild}>
                <span className={classes.infoHead}>ISP</span>
                <span className={classes.infoData}>SpaceX Starlink</span>
              </div>
            </div>
          </div>
          <div className={classes.map}>
            Map
          </div>
      </div>
    </div>
  );
}

export default App;
