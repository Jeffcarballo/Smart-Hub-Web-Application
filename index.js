class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 'startpage'};
    this.devices = [];
    this.GardenDevices = []
  }

componentDidMount() {
  // Retrieve devices from local storage
  const storedDevices = localStorage.getItem('devices');
    if (storedDevices) {
      this.devices = JSON.parse(storedDevices);
    }
}

removeGardenDevice = () => {
  localStorage.removeItem('GardenDevice');
};
AddGardenDevice = (Type) => {
  const GardenDevice = {
    GardenType: Type,
  };
  this.GardenDevices.push(GardenDevice);
  localStorage.setItem('GardenDevice', JSON.stringify(this.GardenDevices));
};


AddSchedule = (name, start_time, end_time, day, month, year, temperature) => {
  const device = {
    name: name,
    start_time: start_time,
    end_time: end_time,
    day: day,
    month: month,
    year: year,
    temperature: temperature
  };

  this.devices.push(device);
  localStorage.setItem('devices', JSON.stringify(this.devices));
  const close_pop_window = document.querySelector('.pop_up');
  close_pop_window.classList.remove("open");

};


  openPopUp = () => {
    const pop_window = document.querySelector('.pop_up');
    pop_window.classList.add("open");
  
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    const sidebar = document.querySelector(".sidebar");
    const submenus = document.querySelectorAll(".sub_menu");
    const submenusArray = Array.from(submenus); // Convert NodeList to an array
    const submenuToUntoggle1 = submenusArray[0];
    const submenuToUntoggle2 = submenusArray[1];
    const arrow = document.querySelector(".drop_arrow_img_active");

    if (window.innerWidth < 768) {
      // close the sidebar
      sidebar.classList.add('close');

    } else {
      // open the sidebar
      sidebar.classList.remove('close');

    }

    if(!submenuToUntoggle1.classList.contains("visible") && sidebar.classList.contains("close")){
      submenuToUntoggle1.classList.toggle("visible");
    }
    if(!submenuToUntoggle2.classList.contains("visible") && sidebar.classList.contains("close")){
      submenuToUntoggle2.classList.toggle("visible");
    }
    else{

      if(arrow){
        arrow.classList.add("rotate");
      }

      if(submenuToUntoggle1.classList.contains("visible") && !sidebar.classList.contains("close")){
        submenuToUntoggle1.classList.toggle("visible");
    
      }
      if(submenuToUntoggle2.classList.contains("visible") && !sidebar.classList.contains("close")){
        submenuToUntoggle2.classList.toggle("visible");

      }
    }
  };

  slideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const submenus = document.querySelectorAll(".sub_menu");
    const submenusArray = Array.from(submenus); // Convert NodeList to an array
    const submenuToUntoggle1 = submenusArray[0];
    const submenuToUntoggle2 = submenusArray[1];
    const arrow = document.querySelector(".drop_arrow_img_active");

    sidebar.classList.toggle("close");

    if(!submenuToUntoggle1.classList.contains("visible") && sidebar.classList.contains("close")){
      submenuToUntoggle1.classList.toggle("visible");
    }
    if(!submenuToUntoggle2.classList.contains("visible") && sidebar.classList.contains("close")){
      submenuToUntoggle2.classList.toggle("visible");
    }
    if(!sidebar.classList.contains("close")){
      submenuToUntoggle1.classList.toggle("visible");
      submenuToUntoggle2.classList.toggle("visible");
    }

    if(arrow){
      if(!arrow.classList.contains("rotate")){
        arrow.classList.toggle("rotate");
      }
    }
  }

  handlePageChange = (page) => {
    if (page === "devices" || page === "weather" || page === "garden" || page === "about") {
      const sidebar = document.querySelector(".sidebar");
      const submenus = document.querySelectorAll(".sub_menu");
      const submenusArray = Array.from(submenus); // Convert NodeList to an array
      const submenuToUntoggle1 = submenusArray[0];
      const submenuToUntoggle2 = submenusArray[1];

      if(submenuToUntoggle1.classList.contains("visible") && !sidebar.classList.contains("close")){
        submenuToUntoggle1.classList.toggle("visible");
      }
      if(submenuToUntoggle2.classList.contains("visible") && !sidebar.classList.contains("close")){
        submenuToUntoggle2.classList.toggle("visible");
      }
    }
    
    this.setState({ currentPage: page });
  };

  handleDropArrow = (page) => {
    const buttons = document.querySelectorAll(".btn");
    const buttonsArray = Array.from(buttons);
    const sidebar = document.querySelector(".sidebar");
    const submenus = document.querySelectorAll(".sub_menu");
    const submenusArray = Array.from(submenus); // Convert NodeList to an array
    const arrow = document.querySelector(".drop_arrow_img_active");
    const dropArrowImages = document.querySelectorAll('.menu_bar > li .drop_arrow_img');

    if(!sidebar.classList.contains("close")){
    
      if (page === "overview") {
        const submenuToToggle = submenusArray[0];
        const submenuToUntoggle = submenusArray[1];

        if(buttonsArray[0].classList.value === "btn btn_active"){
          //dont do anything, toggles button
        }else{
          this.setState({ currentPage: page });
        }

        if(submenuToUntoggle.classList.contains("visible")){
          submenuToUntoggle.classList.toggle("visible");
        }

        submenuToToggle.classList.toggle("visible");

        if (arrow) {
          arrow.classList.toggle("rotate");
        }else{
          dropArrowImages[0].classList.toggle("rotate");
        }

      } else if (page === "house") {
        const submenuToToggle = submenusArray[1];
        const submenuToUntoggle = submenusArray[0];

        if(buttonsArray[1].classList.value === "btn btn_active"){
          //dont do anything, toggles button
        }else{
          this.setState({ currentPage: page });
        }

        if(submenuToUntoggle.classList.contains("visible")){
          submenuToUntoggle.classList.toggle("visible");
        }

        submenuToToggle.classList.toggle("visible");

        if (arrow) {
          arrow.classList.toggle("rotate");
        }else{
          dropArrowImages[1].classList.toggle("rotate");
        }

      }
    }else{
      this.setState({ currentPage: page });
    }
  };
  

  render() {
    const { currentPage } = this.state;

    const pagesDashboard = {
      overview: 'btn_active',
      myschedules: 'btn_active',
      profile: 'btn_active',
    };

    const pagesDasboardImg = {
      overview: 'btn_img_active',
      myschedules: 'btn_img_active',
      profile: 'btn_img_active',
    };

    const pagesDasboardArrow = {
      overview: 'drop_arrow_img_active',
      myschedules: 'drop_arrow_img_active',
      profile: 'drop_arrow_img_active',
    };

    const pagesRooms = {
      house: 'btn_active',
      livingroom: 'btn_active',
      kitchen: 'btn_active',
      diningroom: 'btn_active',
      bedroom: 'btn_active',
      bathroom: 'btn_active',
    };

    const pagesRoomsImg = {
      house: 'btn_img_active',
      livingroom: 'btn_img_active',
      kitchen: 'btn_img_active',
      diningroom: 'btn_img_active',
      bedroom: 'btn_img_active',
      bathroom: 'btn_img_active',
    };

    const pagesRoomsArrow = {
      house: 'drop_arrow_img_active',
      livingroom: 'drop_arrow_img_active',
      kitchen: 'drop_arrow_img_active',
      diningroom: 'drop_arrow_img_active',
      bedroom: 'drop_arrow_img_active',
      bathroom: 'drop_arrow_img_active',
    };

    const currentPageDashboard = pagesDashboard[currentPage] || '';
    const currentPageDashboardImg = pagesDasboardImg[currentPage] || '';
    const currentPageDashboardArrow = pagesDasboardArrow[currentPage] || '';

    const currentPageRooms = pagesRooms[currentPage] || '';
    const currentPageRoomsImg = pagesRoomsImg[currentPage] || '';
    const currentPageRoomsArrow = pagesRoomsArrow[currentPage] || '';

    return (
      <div className="main">
          <nav className="sidebar">

            <div className="top_section">
              <img className="logo_img" src="https://img.icons8.com/ios-filled/50/hub.png" alt="hub"/>
              <h1 className ="company_name">Smart Hub</h1>
            </div>

            <div>
              <ul className="menu_bar">
                <li>
                
                  <button className={`btn ${currentPageDashboard}`} onClick={() => this.handleDropArrow("overview")}><img className={`btn_img ${currentPageDashboardImg}`} src="https://img.icons8.com/ios-filled/50/squared-menu.png" alt="squared-menu"/><span class="btn_title">Dashboard</span>
                  <img className={`drop_arrow_img ${currentPageDashboardArrow}`} src="https://img.icons8.com/ios-filled/50/chevron-up.png" alt="chevron-up"/></button>
                  {/* {`drop_arrow_img ${currentPage === 'dashboard' ? 'drop_arrow_img_active' : ''}`} */}
                  <ul className="sub_menu">
                    <span className="sub_menu_title">Dashboard</span>
                      <li>
                        <button className={`sub_btn ${currentPage === 'overview' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('overview')}>Overview</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'myschedules' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('myschedules')}>My Schedule</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'profile' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('profile')}>Profile</button>
                      </li>
                  </ul>
                </li>
                <li>
                  <button className={`btn ${currentPageRooms}`} onClick={() => this.handleDropArrow('house')}><img className={`btn_img ${currentPageRoomsImg}`} src="https://img.icons8.com/ios-filled/50/room.png" alt="room"/><span class="btn_title">Rooms</span>
                  <img className={`drop_arrow_img ${currentPageRoomsArrow}`} src="https://img.icons8.com/ios-filled/50/chevron-up.png" alt="chevron-up"/></button>
                  <ul className="sub_menu">
                    <span className="sub_menu_title">Rooms</span>
                      <li>
                        <button className={`sub_btn ${currentPage === 'house' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('house')}>House</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'livingroom' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('livingroom')}>Living Room</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'kitchen' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('kitchen')}>Kitchen</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'diningroom' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('diningroom')}>Dining Room</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'bedroom' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('bedroom')}>Bedroom</button>
                      </li>
                      <li>
                        <button className={`sub_btn ${currentPage === 'bathroom' ? 'sub_btn_active' : ''}`} onClick={() => this.handlePageChange('bathroom')}>Bathroom</button>
                      </li>
                  </ul>
                </li>
                <li>
                  <button className={`btn ${currentPage === 'devices' ? 'btn_active' : ''}`} onClick={() => this.handlePageChange('devices')}><img className={`btn_img ${currentPage === 'devices' ? 'btn_img_active' : ''}`} src="https://img.icons8.com/ios-filled/50/coffee-maker.png" alt="coffee-maker"/><span class="btn_title">Devices</span></button>
                  {/* https://img.icons8.com/ios-filled/50/fridge.png alt="fridge"*/}
                  <ul className="sub_menu blank">
                    <span className="sub_menu_title">Devices</span>
                  </ul>
                </li>
                <li>
                  <button className={`btn ${currentPage === 'weather' ? 'btn_active' : ''}`} onClick={() => this.handlePageChange('weather')}><img className={`btn_img ${currentPage === 'weather' ? 'btn_img_active' : ''}`} src="https://img.icons8.com/ios-filled/50/partly-cloudy-rain--v1.png" alt ="partly-cloudy-rain--v1"/><span class="btn_title">Weather</span></button>
                  <ul className="sub_menu blank">
                    <span className="sub_menu_title">Weather</span>
                  </ul>
                </li>
                <li>
                <button className={`btn ${currentPage === 'garden' ? 'btn_active' : ''}`} onClick={() => this.handlePageChange('garden')}><img className={`btn_img ${currentPage === 'garden' ? 'btn_img_active' : ''}`} src="https://img.icons8.com/ios-filled/50/garden.png" alt ="garden"/><span class="btn_title">Garden</span></button>
                  <ul className="sub_menu blank">
                    <span className="sub_menu_title">Garden</span>
                  </ul>
                </li>
                <li>
                  <button className={`btn ${currentPage === 'about' ? 'btn_active' : ''}`} onClick={() => this.handlePageChange('about')}><img className={`btn_img ${currentPage === 'about' ? 'btn_img_active' : ''}`} src="https://img.icons8.com/ios-filled/50/about-us-male.png" alt="about-us-male"/><span class="btn_title">About</span></button>
                  <ul className="sub_menu blank">
                    <span className="sub_menu_title">About</span>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <div className="home_section">
            <img className="hamburger_img" onClick={() => this.slideSidebar()} src="https://img.icons8.com/ios-filled/50/menu-rounded.png" alt="menu-rounded"/>
          
            {/* {currentPage === 'dashboard' && <Dashboard />} */}
            {currentPage === 'startpage' && <StartPage handlePage={this.handleDropArrow}/>}
            {currentPage === 'overview' && <Overview />}
            {currentPage === 'myschedules' && <MySchedules />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'house' && <House AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'livingroom' && <LivingRoom AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'kitchen' && <Kitchen AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'diningroom' && <DiningRoom AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'bedroom' && <Bedroom AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'bathroom' && <Bathroom AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'devices' && <Devices AddSchedule={this.AddSchedule} pop_window={this.openPopUp}/>}
            {currentPage === 'weather' && <Weather />}
            {currentPage === 'garden' && <Garden AddGardenDevice={this.AddGardenDevice} removeGardenDevice={this.removeGardenDevice} set = {this}/>}
            {currentPage === 'about' && <About />}
          </div>
      </div>
    );
  }
}

function StartPage({handlePage}) {
  return (
    <div className="start_page">
      <h1>Welcome to Smart Hub</h1>
      <button className="start_btn" onClick={() => handlePage('overview')}>Start</button>
    </div>
  );
}

function Overview() {
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Welcome to the Overview Page</h1>
        <p>This is the content of the Dashboard page.</p>
      </div>
    </div>
  );
}

function MySchedules() {
const devicesArr = JSON.parse(localStorage.getItem('devices')) || [];

  return (
    <div className="display_page">
      <div className="widget">
      <h1>Schedules</h1>
        {/* <button className="widget_btn" onClick={() => pop_window()}>Schedule</button> */}
        <div className={`grid ${devicesArr.length === 0 ? 'placeholder-grid' : ''}`}>
          {devicesArr.length === 0 ? (
            <p className="schedule_placeholder">No incoming schedule</p>
          ) : (
            devicesArr.map((device, index) => (
              <div className="schedule" key={index}>
                <span className="schedule_info">Name: {device.name}</span>
                <span className="schedule_info">Start Time: {device.start_time}</span>
                <span className="schedule_info">End Time: {device.end_time}</span>
                <span className="schedule_info">Day: {device.day}</span>
                <span className="schedule_info">Month: {device.month}</span>
                <span className="schedule_info">Year: {device.year}</span>
                <span className="schedule_info">Temperature: {device.temperature}<span>°</span></span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Welcome to the Profile Page</h1>
        <p>This is the content of the Dashboard page.</p>
      </div>
    </div>
  );
}

function House({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "House";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>House</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg" alt="Home Image" className="imgBorder"/>
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}


function LivingRoom({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "Living Room";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Living Room</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://assets.architecturaldigest.in/photos/60084dd6cce5700439e12bf7/16:9/w_2560%2Cc_limit/modern-living-room-decor-1366x768.jpg" alt="Living Room Image" className="imgBorder" />
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}

function Kitchen({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "Kitchen";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Kitchen</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://media.designcafe.com/wp-content/uploads/2022/01/31014556/modern-kitchen-island-has-several-benefits.jpg" alt="Living Room Image" className="imgBorder" />
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}

function DiningRoom({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "Dining Room";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Dining Room</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://media.designcafe.com/wp-content/uploads/2020/06/17120906/modern-dining-room-wall-decor.jpg" alt="Living Room Image" className="imgBorder" />
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}

function Bedroom({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "Bedroom";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Bedroom</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://www.porcelanosa.com/trendbook/app/uploads/2023/03/Modern-bedroom-ideas.jpg" alt="Living Room Image" className="imgBorder" />
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}

function Bathroom({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);

  
  let name = "Bathroom";
  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleSetTemperature = () => {
    //Logic to handle temp here
  };

  const handleClickChangeTemp = () => {
    // Logic for handling the click on "Change Temperature"
  };

  const handleClickScheduleTemp = () => {
    // Logic for handling the click on "Schedule Temperature"

  };

  
  return (
    <div className="display_page">
      <div className="widget">
        <h1>Bathroom</h1>
        <div className="temperature-control">
          <h2>Temperature Control</h2>
          <p>Current Temperature: {temperature}°</p>
          <input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />
          <button onClick={handleSetTemperature}> Set Temperature </button>
        </div>
        <div className="roomImage">
          <img src="https://canadianhomestyle.com/wp-content/uploads/2022/09/Modern_bathroom_design_ideas_02.jpg" alt="Living Room Image" className="imgBorder" />
        </div>
        <div className="sections-container">
          <div className="changeTemp" onClick={handleClickChangeTemp}>
            <h1>Change Temperature</h1>
          </div>
          <div className="scheduleTemp" onClick={() => pop_window()}>
            <h1>Schedule Temperature</h1>
          </div>
        </div>
      </div>
      <div className="pop_up">
        <span>Name:
          <input className="schedule_input" value={name}/>
        </span>
        <span>Start Time:
          <select className="input_row" onChange={handleStartTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>End Time:
          <select className="input_row" onChange={handleEndTimeChange}>
            <option value="">Select Time</option>
            <option value="00:00">12:00 a.m</option>
            <option value="01:00">1:00 a.m</option>
            <option value="02:00">2:00 a.m</option>
            <option value="03:00">3:00 a.m</option>
            <option value="04:00">4:00 a.m</option>
            <option value="05:00">5:00 a.m</option>
            <option value="06:00">6:00 a.m</option>
            <option value="07:00">7:00 a.m</option>
            <option value="08:00">8:00 a.m</option>
            <option value="09:00">9:00 a.m</option>
            <option value="10:00">10:00 a.m</option>
            <option value="11:00">11:00 a.m</option>
            <option value="12:00">12:00 p.m</option>
            <option value="13:00">1:00 p.m</option>
            <option value="14:00">2:00 p.m</option>
            <option value="15:00">3:00 p.m</option>
            <option value="16:00">4:00 p.m</option>
            <option value="17:00">5:00 p.m</option>
            <option value="18:00">6:00 p.m</option>
            <option value="19:00">7:00 p.m</option>
            <option value="20:00">8:00 p.m</option>
            <option value="21:00">9:00 p.m</option>
            <option value="22:00">10:00 p.m</option>
            <option value="23:00">11:00 p.m</option>
          </select>
        </span>
        <span>Day:
          <select className="input_row" onChange={handleDayChange}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </span>
        <span>Month: 
          <select className="input_row" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </span>
          <span>Year: <input className="schedule_input" type="text" value={year}/></span>
          <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
          <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>
  );
}

function Devices({AddSchedule, pop_window }) {
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day_, setDay] = React.useState();
  const [month_, setMonth] = React.useState();
  const [temperature, setTemperature] = React.useState(75);
  const [name, setName] = React.useState('Device');

  let start_time = startTime;
  let end_time = endTime;
  let day = day_;
  let month = month_;
  let temp = temperature;
  const year = new Date().getFullYear();

  const handleButtonClick = (newName) => {
    setName(newName);
    pop_window(newName);
  };

  const handleAddSchedule = () => {
    AddSchedule(name, start_time, end_time, day, month, year, temp);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };
  const handleAddDevice = () => {
    console.log('Add Device button clicked!');
  };

  return (
    <div className="display_page">
      <div className="widget">
        <h1>Devices</h1>
        <div className="menu">
          <div className="menu_item">
            <img src="https://static.vecteezy.com/system/resources/previews/007/158/961/original/refrigerator-icon-for-website-symbol-presentation-free-vector.jpg" alt="Icon 1" />
            <span>Refrigerator</span>
          </div>
          <div className="menu_item">
            <img src="https://as1.ftcdn.net/v2/jpg/01/62/60/70/1000_F_162607098_LkfkVoIXmJPpKpkxqKSKJqsrEt7mVp4g.jpg" alt="Icon 2" />
            <span>Coffee Maker</span>
          </div>
          <div className="menu_item">
            <img src="https://img.freepik.com/premium-vector/vintage-retro-vacuum-cleaner-can-be-used-like-emblem-logo-badge-label-mark-poster-print_95211-1330.jpg?w=2000" alt="Icon 3" />
            <span>Vacuum</span>
          </div>
          <div className="menu_item">
            <img src="https://static.vecteezy.com/system/resources/previews/000/485/808/original/setting-line-black-icon-vector.jpg" alt="Icon 4" />
            <span>Fridge Settings</span>
          </div>
          <div className="menu_item">
            <img src="https://static.vecteezy.com/system/resources/previews/000/485/808/original/setting-line-black-icon-vector.jpg" alt="Icon 5" />
            <span>Coffee Settings</span>
          </div>
          <div className="menu_item">
            <img src="https://static.vecteezy.com/system/resources/previews/000/485/808/original/setting-line-black-icon-vector.jpg" alt="Icon 6" />
            <span>Vacuum Settings</span>
          </div>
          <div className="menu_item">
            <img src="https://st2.depositphotos.com/53996480/49189/v/600/depositphotos_491898080-stock-illustration-stopwatch-stop-watch-timer-logo.jpg" alt="Icon 7" />
            <button className="deviceButton" onClick={() => handleButtonClick("Fridge")}>Schedule Fridge Settings</button>
          </div>
          <div className="menu_item">
            <img src="https://st2.depositphotos.com/53996480/49189/v/600/depositphotos_491898080-stock-illustration-stopwatch-stop-watch-timer-logo.jpg" alt="Icon 8" />
            <button className="deviceButton" onClick={() => handleButtonClick("Coffee")}>Schedule Coffee</button>
          </div>
          <div className="menu_item">
            <img src="https://st2.depositphotos.com/53996480/49189/v/600/depositphotos_491898080-stock-illustration-stopwatch-stop-watch-timer-logo.jpg" alt="Icon 9" />
            <button className="deviceButton" onClick={() => handleButtonClick("Vacuum")}>Schedule Vacuum</button>
          </div>
          <div className="addDevice"><button onClick={handleAddDevice}>Add Device</button></div>
        </div>
      </div>
      
      <div className="pop_up">
          <span>Name:
            <input className="schedule_input" value={name}/>
          </span>
          <span>Start Time:
            <select className="input_row" onChange={handleStartTimeChange}>
              <option value="">Select Time</option>
              <option value="00:00">12:00 a.m</option>
              <option value="01:00">1:00 a.m</option>
              <option value="02:00">2:00 a.m</option>
              <option value="03:00">3:00 a.m</option>
              <option value="04:00">4:00 a.m</option>
              <option value="05:00">5:00 a.m</option>
              <option value="06:00">6:00 a.m</option>
              <option value="07:00">7:00 a.m</option>
              <option value="08:00">8:00 a.m</option>
              <option value="09:00">9:00 a.m</option>
              <option value="10:00">10:00 a.m</option>
              <option value="11:00">11:00 a.m</option>
              <option value="12:00">12:00 p.m</option>
              <option value="13:00">1:00 p.m</option>
              <option value="14:00">2:00 p.m</option>
              <option value="15:00">3:00 p.m</option>
              <option value="16:00">4:00 p.m</option>
              <option value="17:00">5:00 p.m</option>
              <option value="18:00">6:00 p.m</option>
              <option value="19:00">7:00 p.m</option>
              <option value="20:00">8:00 p.m</option>
              <option value="21:00">9:00 p.m</option>
              <option value="22:00">10:00 p.m</option>
              <option value="23:00">11:00 p.m</option>
            </select>
          </span>
          <span>End Time:
            <select className="input_row" onChange={handleEndTimeChange}>
              <option value="">Select Time</option>
              <option value="00:00">12:00 a.m</option>
              <option value="01:00">1:00 a.m</option>
              <option value="02:00">2:00 a.m</option>
              <option value="03:00">3:00 a.m</option>
              <option value="04:00">4:00 a.m</option>
              <option value="05:00">5:00 a.m</option>
              <option value="06:00">6:00 a.m</option>
              <option value="07:00">7:00 a.m</option>
              <option value="08:00">8:00 a.m</option>
              <option value="09:00">9:00 a.m</option>
              <option value="10:00">10:00 a.m</option>
              <option value="11:00">11:00 a.m</option>
              <option value="12:00">12:00 p.m</option>
              <option value="13:00">1:00 p.m</option>
              <option value="14:00">2:00 p.m</option>
              <option value="15:00">3:00 p.m</option>
              <option value="16:00">4:00 p.m</option>
              <option value="17:00">5:00 p.m</option>
              <option value="18:00">6:00 p.m</option>
              <option value="19:00">7:00 p.m</option>
              <option value="20:00">8:00 p.m</option>
              <option value="21:00">9:00 p.m</option>
              <option value="22:00">10:00 p.m</option>
              <option value="23:00">11:00 p.m</option>
            </select>
          </span>
          <span>Day:
            <select className="input_row" onChange={handleDayChange}>
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </span>
          <span>Month:
            <select className="input_row" onChange={handleMonthChange}>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </span>
            <span>Year: <input className="schedule_input" type="text" value={year}/></span>
            <span>Temperature:<input type="range" min="0" max="100" step="1" value={temperature} onChange={handleTemperatureChange} />{temperature}°</span>
            <button className="widget_btn" onClick={handleAddSchedule}>Submit</button>
        </div>
    </div>

  );
}

function Weather() {
  const API_KEY = "3045dd712ffe6e702e3245525ac7fa38"     

  const UpdateWeathers = () => 
  {
    const search = document.querySelector(".weather_Searchform");
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+search.value+'&appid='+API_KEY+'&units=imperial')
    .then(res => res.json())
  
    .then(data => {
      var temp = document.getElementById("weather_Temperature");
      var icon = document.getElementById("weather_Icon");
      var real = document.getElementById("weather_Realfeel");
      var Humidity = document.getElementById("weather_Humidity");
      var Windies = document.getElementById("weather_Windy");
      var Press = document.getElementById("weather_Pressure");
      var min = document.getElementById("Temp_Min");
      var MAX = document.getElementById("Temp_Max");
      
      console.log(data)

      temp.innerHTML = `${data.main.temp.toFixed()}\xB0`;
      icon.innerHTML =  `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
      real.innerHTML = `${data.main.feels_like.toFixed()}\xB0`
      Humidity.innerHTML = `${data.main.humidity}%`;
      Windies.innerHTML  = `${data.wind.speed} mph`;
      Press.innerHTML  = `${data.main.pressure} hPa`;
      min.innerHTML = `${data.main.temp_min}\xB0`;
      MAX.innerHTML = `${data.main.temp_max}\xB0`;
    })
   
    .catch(err => alert('Invalid City.. Do better!'))
  }
  return (
    <div className="display_page">
      
      <div className="widget">
        <h1>Weather</h1>
        <div className ="weather_Header">
          <input type="text" placeholder="Enter any city..." class="weather_Searchform"/>
          <button  class="weather_Button" onClick={UpdateWeathers}>Search</button>
        </div>

      
        <div className ="weather_Body">
          <h1 class="weather_City"></h1>
          <div class="weather_Datetime"></div>
          <div id="weather_Icon">  </div>
          <h1>Temperature</h1>
          <h1 id="weather_Temperature"> - - - </h1>
        </div>

        <div className="menu">
          <div className="menu_item">
                <div>
                    <h1>Real Feel</h1>
                  
                    <h3 id="weather_Realfeel">- - -</h3>
                </div>
            </div>
            <div className="menu_item">
                <div>
                    <h1>Humidity</h1>
                    <h3 id="weather_Humidity">- - -</h3>
                </div>
            </div>
            <div className="menu_item">
                <div>
                    <h1>Wind</h1>
                    <h3 id="weather_Windy">- - -</h3>
                </div>
            </div>
            <div className="menu_item">
                <div>
                    <h1>Pressure</h1>
                    <h3 id="weather_Pressure">- - -</h3>
                </div>
            </div>
            <div className="menu_item">
                <div>
                    <h1>Temp Min</h1>
                    <h3 id="Temp_Min">- - -</h3>
                </div>
            </div>
            <div className="menu_item">
                <div>
                    <h1>Temp Max</h1>
                    <h3 id="Temp_Max">- - -</h3>
                </div>
            </div>
        </div>

      </div>
      
    </div>

  );
}

function Garden({AddGardenDevice, removeGardenDevice, set}) {
  const GardenArr = JSON.parse(localStorage.getItem('GardenDevice')) || [];
  const addGardenLight = () => {
    AddGardenDevice("Light");
    set.setState({currentPage: 'garden'})
  };
  const addGardenSprinkler  = () => {

    AddGardenDevice("Sprinkler");
    set.setState({currentPage: 'garden'})
  };

  const RemoveGardenDev  = () => {
    removeGardenDevice();
    set.setState({currentPage: 'rooms'})
  };
  const toggleON = (Name) => {
    alert(Name + " has powered on!");
  };
  const toggleOFF = (Name) => {
    alert(Name + " has powered off!");
  };
  return (
    <div className="display_page">
    <div className="widget">
      <h1>Garden</h1>
      <div className={`grid ${GardenArr.length === 100 ? 'placeholder-grid' : ''}`}>
          {GardenArr.length === 0? (
            <p className="schedule_placeholder">No Garden Device has been setup</p>
          ) : (
            GardenArr.map((GardenDevice, index) => (
              <div className="schedule" key={index}>
                <span className="schedule_info">DeviceID: {index} </span>
                <span className="schedule_info">Garden device: {GardenDevice.GardenType}</span>
                <span className="schedule_info">Device status: 
                    <button onClick={()=> toggleON(GardenDevice.GardenType)} class="Garden_Button">ON</button>
                    <button onClick={() =>toggleOFF(GardenDevice.GardenType)} class="Garden_Button" >OFF</button>
                </span>

              </div>
            ))
          )}
        </div>
        <br></br>
      <button onClick={() => addGardenLight() }  class="weather_Button" >Add New Light</button>
      <button onClick={() =>addGardenSprinkler()}  class="weather_Button" >Add New Sprinkler</button>
      <button onClick={RemoveGardenDev}  class="weather_Button" >Remove All Garden Device</button>
    </div>
  </div>
  );
}

function About() {
  return (
    <div className="display_page">
      <div className="widget">
        <h1>About Us</h1>
        <p className="about-content">Welcome to my Smart Hub website! We are passionate about creating a connected home experience that simplifies your life. With our smart hub platform, you can control temperature settings for different rooms, schedule irrigation and lighting for your garden, check local weather, and automate device start times.</p>

<p className="about-content1">Our smart hub gives you the power to adjust and maintain the perfect climate in your home with ease. Say goodbye to manual thermostat adjustments! Our intuitive interface allows you to effortlessly control the temperature in each room.</p>

<p className="about-content1">Take the hassle out of maintaining your garden with our automated irrigation and lighting features. With just a few taps, you can schedule watering and create the ideal lighting ambiance for your garden.</p>

<p className="about-content1">Stay informed about the weather in your local area with real-time updates. Plan your day accordingly and be prepared for any weather conditions that may come your way.</p>

<p className="about-content1">Experience the convenience of automating device start times. Set your coffee maker, vacuum, and other home devices to turn on at specific times, so your home is ready for you when you need it.</p>

<p className="about-content1">With our smart hub, you can simplify your daily routines, save energy, and enjoy a more comfortable and convenient lifestyle.</p>
      </div>
    </div>
  );
}
// Render the App component into the root element
ReactDOM.render(<App />, document.getElementById('root'));
