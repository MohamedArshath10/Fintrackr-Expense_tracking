import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import Modal from '../../Components/Modal'

const Income = () => {

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  //Get All Income details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true)
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      ) 
      
      if(response.data){
        setIncomeData(response.data)
      }

    }catch(error){
      console.log("Something went wrong" , error);
    }finally{
      setLoading(false)
    }
  }


  // Handle Add Income
  const handleAddIncome = async (income) => {}


  // Delete Income
  const deleteIncome = async (id) => {}


  // handle Download income Details
  const handleDownloadIncomeDetails = async  () => {}
  


  // UseEffect 
  useEffect(() => {
    fetchIncomeDetails()

    return () => {}
  }, [])


  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div>Add Income Form</div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income