import Banner from './components/Banner';
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './components/Product';
import Footer from './components/Footer';
import FeaturedProduct from './components/FeaturedProduct';
import TopSelling from './components/TopSelling';
import Details from './components/pages/Details';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import About from './components/pages/About';
import Login from './components/pages/Login';
import SignUp from './components/pages/Signup';
import { EcomProvider } from './context/EcomContext';
import Alert from './components/Alert';
import { useEffect, useState } from 'react';
import Loaders from './components/Loaders';
import useLocalStorage from './hooks/useLocalStorage';
import { AuthProvider } from './context/AuthContext';
import Reviews from './components/Reviews';
import ThankYou from './components/pages/ThankYou';
import AdminHeader from './components/pages/admin/AdminHeader';

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem("auth-token");
  const authInitialToken = { accessToken: token ?? null }
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false)
    }, 2000)

    return () => timer;
  }, [])

  return (
    <>
      {loader ? ( <Loaders /> 
      ) : (
      <AuthProvider defaultState={authInitialToken}>  
        <EcomProvider>
          <Router>
          
            <Alert />
            <Routes>
              <Route path='/' element={<>
                <Header/>
                <Banner/>
                <FeaturedProduct />
                <TopSelling />
                <Reviews/>
                <Footer/>
              </>}
              />
              <Route path='/product' element={<>
                <Header/>
                <Banner/>
                <Product/>
                <Reviews/>
                <Footer/>
              </>}
              />
              <Route path='/admin' element={<>
                <AdminHeader/>
              </>}
              />
              
              
              <Route path='/about' element={<>
                <Header/>
                <About/>
                <Reviews/>
                <Footer/>
              </>}
              />
              <Route path='/login' element={<>
                <Header/>
                <Login/>
                <Reviews/>
                <Footer/>
                </>}
              />
              <Route path='/signup' element={<>
                <Header/>
                <SignUp/>
                <Reviews/>
                <Footer/>
              </>}
              />
              <Route path='/explore/:id' element={<>
                <Header/>
                <Details/>
                <Reviews/>
                <Footer/>
              </>}
               />
              <Route path='/cart' element={<>
                <Header/>
                <Cart/>
                <Reviews/>
                <Footer/>
              </>} 
              />
              <Route path="/checkout" element={<>
                <Header/>
                <Checkout/>
                <Reviews/>
                <Footer/>
              </>} 
              />
              <Route path="/thankyou" element={<>
                <Header/>
                <ThankYou/>
                <Footer/>
              </>}
              />
            </Routes>
          </Router>
        </EcomProvider>  
      </AuthProvider>
      )}
    </>
  )
}

export default App
