import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import SummaryApi from './common'
import AppContext from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Header from './component/Header'





function App(){
    const dispatch = useDispatch()
    const [cartProductCount,setCartProductCount] = useState(0)
    
    const fetchUserDetails = async()=>{
        const dataReponse = await fetch(SummaryApi.current_user.url,{
            method : SummaryApi.current_user.method,
            credentials : "include"
        })

        const dataApi = await dataReponse.json()

        if(dataApi.success){
            dispatch(setUserDetails(dataApi.data))
        }
    }

    const fetchUserAddToCart = async()=>{
        const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
          method : SummaryApi.addToCartProductCount.method,
          credentials : 'include'
        })
    
        const dataApi = await dataResponse.json()
    
        setCartProductCount(dataApi?.data?.count)
      }

    useEffect(()=>{
        fetchUserDetails()
        fetchUserAddToCart()
    },[])

    return(
        <div className=' '>
            <AppContext.Provider value={{
                fetchUserDetails,
                cartProductCount,
                fetchUserAddToCart
            }}>
                <Header/>
                <main className='min-h-[calc(100vh-96px)]'>
                <ToastContainer
                position='top-center' />
                    <Outlet/> 
                </main>
            </AppContext.Provider>
        </div>
    )
}

export default App