import React, { useContext } from 'react'
import { context } from '../App';
import { BookDisplay } from '../components/PageDisplay';

const BookShelfPage = () => {

    const {store, setStore} = useContext(context);

    const handleDeleteFromBookshelf = (idx) => {
        setStore(prev => {
            return prev.filter((item, id) => id !== idx
            );
        })
    }

  return (
    <>
    <h1 className='bg-blue-gray-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 sm:p-4 md:p-5 lg:p-6 font-sans text-white'> Welcome to the bookshelf</h1>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center px-10 py-10 gap-5 flex-wrap'>
        {
            store.map((item, id) => (    
                <BookDisplay 
                    key = {id} 
                    item = {item} 
                    manipulationFunction = {handleDeleteFromBookshelf}
                    flag = {true}
                    id = {id}    
                />
                ))
                }
    </div>
    </>
  )
}

export default BookShelfPage