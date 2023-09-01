'use client'

import {AiOutlineCheckCircle} from 'react-icons/ai'
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';

const SuccessPage = () => {
   return ( 
      <MainLayout>
         <div id='SuccessPage'
         className='mt-12 xl:max-w-[1200px] mx-auto px-2 min-h-[50vh]'
         >
            <div className='
            bg-white
            w-full
            p-6
            min-h-[150px]
            flex
            items-center
            justify-center
            '>
               <div className=''>
                  <div className='flex items-center justify-center text-xl'>
                     <AiOutlineCheckCircle
                     className='text-teal-400 '
                     size={35}
                     />
                     <span className='pl-2'>Payment Successful</span>
                  </div>
                  <p className='text-sm'>Thank you! We've received your payment</p>
               
                  <Link
                  href={'/'}
                  className='w-full'
                  >
                     <div className='w-full text-center bg-sky-400 text-sm font-semibold text-white p-[11px] mt-4'>
                        Back to shop
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </MainLayout>
    );
}
 
export default SuccessPage;