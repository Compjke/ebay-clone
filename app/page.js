'use client'
import { useEffect, useState } from 'react';
import CarouselComp from './components/Carousel/CarouselComp';
import Product from './components/Product/Product';
import useIsLOading from './hooks/useIsLoading';
import MainLayout from './layouts/MainLayout';


export default function Home() {

const [products, setproducts] = useState([]);

const getProducts = async () => {
   try {
    useIsLOading(true)
    const res = await fetch("/api/products");
    const products = await res.json();
    console.log(products)
    setproducts([])
    setproducts(products)
   } catch (err) {
    console.log(err)
   } finally {
    useIsLOading(false);
   }
}
 useEffect(() => {
  getProducts()
 },[])
  return (
    <MainLayout>
      <CarouselComp/>

      <div className='lg:max-w-[1200px] mx-auto max-lg:px-4'>
          <div className='text-2xl font-bold mt-4 mb-6 px-4'>
              Products
          </div>
          <div className='
          grid
          max-lg:grid-cols-productGrid
          grid-cols-5
          gap-5
          '>
            {products.map(prod => (
              <Product
              key={prod.id}
              product={prod}
              />
            ))}
          </div>
      </div>
    </MainLayout>
  )
}
