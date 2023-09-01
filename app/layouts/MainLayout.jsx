'use client'

import { useEffect, useState } from 'react';
import Footer from './includes/Footer';
import MainHeader from './includes/MainHeader';
import SubMenu from './includes/SubMenu';
import TopMenu from './includes/TopMenu';
import Loading from '../components/Loading/Loading';

const MainLayout = ({children , href}) => {
   const [IsLoading, setIsLoading] = useState(false);

   useEffect(() => {
      window.addEventListener('storage' , () => {
         let res = localStorage.getItem('isLoading')
         res === 'false' ? setIsLoading(false) : setIsLoading(true)
      })
   }, []);


   return ( 
      <>
      <div 
      id='Main-layout'
      className='
      lg:min-w-[1050px] 
      lg:max-w-[1300px] 
      mx-auto
      lg:px-0
      '
      >
         <div>
            {IsLoading ? <Loading/> : null}
            <TopMenu/>
            <MainHeader/>
            <SubMenu/>
            {children}
            <Footer/>
         </div>
      </div>
      </>
    );
}
 
export default MainLayout;