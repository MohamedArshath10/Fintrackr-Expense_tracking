import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import Modal from '../../Components/Modal'
import AddIncomeForm from '../../Components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../Components/Income/IncomeList'
import DeleteAlert from '../../Components/Layouts/DeleteAlert'
import { useUserAuth } from '../../Hooks/useUserAuth'

const Income = () => {
  useUserAuth()
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
  const handleAddIncome = async (income) => {
    const {source, amount, date} = income

    // Validation check
    if(!source.trim()) {
      toast.error("Source is required.")
      return
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be valid")
      return
    }

    if(!date){
      toast.error("Date is required")
      return
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: Number(amount),
        date,
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully.")
      fetchIncomeDetails()
    }catch(error){
      console.error("Error adding income:", error.response?.data?.message || error.message)
    }
  }


  // Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show: false, data: null})
      toast.success("Income deleted successfully")
      fetchIncomeDetails()
    }catch(error){
      console.error("Error deleting the Income", error.response?.data?.message || error.message);
      
    }
  }


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
        <IncomeList 
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id})
          }}
          onDownload={handleDownloadIncomeDetails}
        />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income" 
        >
          <DeleteAlert 
            content=" Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income