import { useEffect, useState } from 'react'
import axios from 'axios'
import {Line}  from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js'
import './App.css'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [patient, setPatient] = useState([])
  const [user, setUser] = useState(null)
  
  const username = "coalition"
  const password = "skills-test"
  const token = btoa(`${username}:${password}`)

  useEffect(()=>{
    axios.get("https://fedskillstest.coalitiontechnologies.workers.dev", {headers: {
      Authorization: `Basic ${token}`
    }}). then(response => setPatient(response.data)).catch(
      error =>{
        console.error('Error fetching data', error)
      }
    )
  }, [])
  console.log(user)

  const bloodPressure = ()=>{
    const monthLabels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
    const patientData = {
      labels: monthLabels,
      datasets:[
        {
          label: 'Systolic',
          data: [125, 173, 99, 128, 119, 160],
          borderColor: '#E66FD2',
          backgroundColor: '#E66FD2',
          pointBackgroundColor: '#E66FD2',
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#E66FD2',
          fill: true,
          tension: 0,
          pointStyle: 'circle',
          pointRadius: 3
        },
        {
          label: 'Diastolic',
          data:[103, 103, 111, 86, 73, 78],
          borderColor: '#8C6FE6',
          backgroundColor: '#8C6FE6',
          fill: true,
          tension: 0,
          pointStyle: 'circle',
          pointRadius: 3,
          pointBackgroundColor: '#8C6FE6',
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#8C6FE6',
        }
      ]
    }
    const configOptions = {
      responsive: true,
      plugins: {
        legend:{
          position: 'right',
          labels:{
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
      title: {
        display: true,
        text: 'Blood Pressure'
      },
    },
    scales: {
      x: {
          title: {
              display: true,
              text: 'Month',
          },
          ticks: {
              maxRotation: 0,
              minRotation: 0,
          }
      },
      y: {
          title: {
              display: true,
              text: 'Blood Pressure (mmHg)',
          },
          min: 60,
          max: 180,
          beginAtZero: false,
          ticks:{
            stepSize: 5,
          },
      }
    }
  }
  return <Line data={patientData} options={configOptions} />; 
}
  return (
    <>
      <div className='navbar'>
          <div className='logo'>
              <img src='TestLogo.svg' alt='Logo'></img>
          </div>
          <div className='navigation-buttons'>
              <button>Overview</button>
              <button>Patients</button>
              <button>Schedule</button>
              <button>Message</button>
              <button>Transactions</button>
          </div>
          <div className='doc-profile'>
              <img src='doctor.png' alt='profile picture' className='profile-pic'></img>
              <div className='doc-details'>
                <h3 className='profile-text'>Dr. Jose Simmons</h3>
                <p className='profile-text'>General Practitioner</p>
              </div>
              <div>
                <img src='settings.svg' alt='settings' className='nav-icon'></img>
                <img src='options.svg' alt='options' className='nav-icon'></img>
              </div>
          </div>
      </div>
    {/*the body */}
      <div className='body-content'>
          <div className='patients'>
              <div className='patients-heading'>
                  <h2>Patients</h2>
                  <img  src='search.svg' alt='search button'></img>
              </div>
              { patient.map(pat =>( 
                      <div className='patients-list' onClick={()=>setUser(pat)} key={pat.phone_number}>
                          <div>
                            <img src={pat.profile_picture} alt='profile picture' className='patient-prof'></img>
                          </div>
                          <div>
                            <h4>{pat.name}</h4>
                            <p>{pat.gender}, {pat.age}</p>
                          </div>
                          <div>
                            <img src='options-horizontal.svg' alt='options' className='patient-option'></img>
                          </div>
                  </div>
              ))
              }
          </div>
          {/* creating the graph */}

          <div className='diagnosis'>
            <div className='diagnosis-head'>
                <h1>Diagnosis History</h1>
            </div>
            <div className='diagnosis-chart'>
                {bloodPressure()}
            </div>
            <div className='diagnosis-data'>
              <div className='res'>
                  <img src='respiratoryrate.svg' className='chart-icon'></img>
                  <p>Respiratory Rate</p>
                  <h3>20 bpm</h3>
                  <p>Normal</p>
              </div>
              <div className='temp'>
                  <img src='temperature.svg' className='chart-icon'></img>
                  <p>Temperature</p>
                  <h3>98.6 F</h3>
                  <p>Normal</p>
              </div>
              <div className='heart'>
                  <img src='HeartBPM.svg' className='chart-icon'></img>
                  <p>Heart Rate</p>
                  <h3>78 bpm</h3>
                  <p><img src='ArrowDown.svg'></img> Lower than Average</p>
              </div>
            </div>
            <div className='diagnostic-list'>
              <h3>Diagnostic List</h3>
              <table>
                <thead>
                  <tr>
                    <th>Problem/Diagnosis</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {user ? user.diagnostic_list.map( list =>(<tbody>
                  <tr>
                    <td>{list.name}</td>
                    <td>{list.description}</td>
                    <td>{list.status}</td>
                  </tr>
                </tbody>)) :
                <tbody>
                <tr>
                  <td>Null</td>
                  <td>Null</td>
                  <td>Null</td>
                </tr>
              </tbody>
                }
              </table>
            </div>
          </div>

          {user ? 
          <div className='patient-profile' key={user.phone_number}>
              <div className='patient-head'>
                <div>
                  <img src={user.profile_picture} alt='profile picture'></img>
                  <h2>{user.name}</h2>
                </div>
              </div>

              <div className='patient-info'>
                <img src='calendar.svg'></img>
                <div>
                  <p>Date of Birth</p>
                  <strong>{user.date_of_birth}</strong>
                </div>
              </div>

              <div className='patient-info'>
                { user.gender == "male" ? <img src='MaleIcon.svg'></img> : <img src='FemaleIcon.svg'></img>
                 }
                <div>
                  <p>Gender</p>
                  <strong>{user.gender}</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='PhoneIcon.svg'></img>
                <div>
                  <p>Contact Info.</p>
                  <strong>{user.phone_number}</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='PhoneIcon.svg'></img>
                <div>
                  <p>Emergency Contacts</p>
                  <strong>{user.emergency_contact}</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='InsuranceIcon.svg'></img>
                <div>
                  <p>insurance Provider</p>
                  <strong>{user.insurance_type}</strong>
                </div>
              </div>
              <div className='more-btn'>
                <button>Show All Information</button>
              </div>

              {/* Lab Results*/}
              <h3>Lab Results</h3>
              {user.lab_results.map(lab=> (<div className='lab-results'>
                 <p>{lab}</p>
                 <img src='download.svg'></img>
              </div>))}
          </div>
          :
          <div className='patient-profile'>
              <div>
              <img src='doctor.png' alt='profile picture'></img>
              <h2>N/A</h2>
              </div>

              <div className='patient-info'>
                <img src='calendar.svg'></img>
                <div>
                  <p>Date of Birth</p>
                  <strong>N/A</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='MaleIcon.svg'></img>
                <div>
                  <p>Gender</p>
                  <strong>N/A</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='PhoneIcon.svg'></img>
                <div>
                  <p>Contact Info.</p>
                  <strong>N/A</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='PhoneIcon.svg'></img>
                <div>
                  <p>Emergency Contacts</p>
                  <strong>N/A</strong>
                </div>
              </div>

              <div className='patient-info'>
                <img src='InsuranceIcon.svg'></img>
                <div>
                  <p>insurance Provider</p>
                  <strong>N/A</strong>
                </div>
              </div>
              <div className='more-btn'>
                <button>Show All Information</button>
              </div>

              <div className='lab-results'>
                <h3>Lab Results</h3>
                <p>Null</p>
                <img src='download.svg'></img>
              </div>
          </div>
          }
      </div>
    </>
  )
}

export default App
