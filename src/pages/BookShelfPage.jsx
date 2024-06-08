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
    <h1 className='bg-gray-800 rounded-lg shadow m-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl p-5 sm:p-4 md:p-5 lg:p-6 font-sans text-white'> Welcome to the bookshelf</h1>
    <div className='flex justify-center'>
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
    </div>
    </>
  )
}

export default BookShelfPage