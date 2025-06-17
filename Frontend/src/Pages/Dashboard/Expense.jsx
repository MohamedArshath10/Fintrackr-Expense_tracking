import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { API_PATHS } from '../../Utils/apiPaths'
import toast from 'react-hot-toast'
import axiosInstance from '../../Utils/axiosInstance'
import ExpenseOverview from '../../Components/Expense/ExpenseOverview'
import Modal from '../../Components/Modal'
import AddExpenseForm from '../../Components/Expense/AddExpenseForm'
import ExpenseList from '../../Components/Expense/ExpenseList'

const Expense = () => {
  useUserAuth()
  const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  //Get All Expense details
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true)
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      ) 
      
      if(response.data){
        setExpenseData(response.data)
      }

    }catch(error){
      console.log("Something went wrong" , error);
    }finally{
      setLoading(false)
    }
  }

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date} = expense

    // Validation check
    if(!category.trim()) {
      toast.error("Category is required.")
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
      })

      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully.")
      fetchExpenseDetails()
    }catch(error){
      console.error("Error adding Expense:", error.response?.data?.message || error.message)
    }
  }

  // Delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({show: false, data: null})
      toast.success("Expense deleted successfully")
      fetchExpenseDetails()
    }catch(error){
      console.error("Error deleting the Expense", error.response?.data?.message || error.message);
      
    }
  }

  // handle Download expense Details
  const handleDownloadExpenseDetails = async  () => {}
  



  useEffect(() => {
    fetchExpenseDetails()
    return () => {}
  }, [])


  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList 
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id})
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
            <AddExpenseForm onAddExpense={handleAddExpense} />
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

export default Expense