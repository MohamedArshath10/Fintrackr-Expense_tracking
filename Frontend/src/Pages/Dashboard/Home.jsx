import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { useUserAuth } from '../../Hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'

const Home = () => {
  useUserAuth()

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if(loading) return

    setLoading(true)

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )

      if(response.data){
        setDashboardData(response.data)
      }
    }catch(error){
      console.log("An error occured please try again later");
    }finally{
      setLoading(false)
    }
    useEffect(() => {
      fetchDashboardData()
      return () => {}
    }, [])
  }

  


  return (
    <DashboardLayout activeMenu="Dashboard" >
      <div className='my-5 mx-auto'>
        Home
      </div>
    </DashboardLayout>
  )
}

export default Home