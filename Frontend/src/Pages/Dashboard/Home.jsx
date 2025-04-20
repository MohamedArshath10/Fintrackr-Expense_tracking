import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { useUserAuth } from '../../Hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import {LuHandCoins, LuWalletMinimal} from 'react-icons/lu'
import {IoMdCard} from 'react-icons/io'
import { addThousandsSeperator } from '../../Utils/helper'
import InfoCard from '../../Components/Cards/InfoCard'
import RecentTransactions from '../../Components/Dashboard/RecentTransactions'
import FinanceOverview from '../../Components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../Components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../Components/Dashboard/last30DaysExpenses'

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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icons={<IoMdCard />}
            labels="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icons={<LuWalletMinimal />}
            labels="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icons={<LuHandCoins />}
            labels="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions = {dashboardData?.recentTransactions}
            onSeeMore = {() => navigate("/expense")}
          />
          <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions 
            transactions={[dashboardData?.last30DaysExpenses?.transactions || {}]}
            onSeeMore = {() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home