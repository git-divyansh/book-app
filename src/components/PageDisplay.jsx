import React, { useContext, useRef } from 'react'

import { context } from '../App';


// Main template of the Display page
export default function PageDisplay() {

  return (
    <Books/>
  )
}

// Search component
const SearchBar = ({ query, setQuery }) => {
    const bookSearchContainerRef = useRef(null);

    const handleClickSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
        setQuery(value)
    }
        
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setQuery(query)
    }

    return(
        <form className="max-w-md mx-auto my-5" onSubmit={handleFormSubmit}>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input ref={bookSearchContainerRef} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required onChange={handleClickSearch} />

            </div>
        </form>
    )
}

// Loading template
const LoadingComponent = () => {
    return(
        <div className='grid grid-cols-3 ps-40 py-10 gap-4 justify-center'>
            {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div classname="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                </div>
            ))}
        </div>
    )
}

// Rating component
export const RatingComponent = ({rating, count}) => {
    return(
        <div className="flex items-center cursor-default">
            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{!rating ? "N/A" : rating}</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <p className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white cursor-default">{!count ? 0 : count} reads</p>
        </div>
    )
}

export function BookDisplay({item, manipulationFunction, flag, id}) {
    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-full flex flex-col justify-between">
 
        <div className="p-5 w-full">
            <a href="#">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
            </a>
            <div className='flex justify-between text-sm'>
                {/* Edition count */}
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"><b> Edition count:</b>&nbsp;{item.edition_count}</p>

                {/* rating average */}
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <RatingComponent 
                    rating={item.ratings_average?.toFixed(1)}
                    count={item.readinglog_count}
                    />
                </p>

            </div>
            {/* Language Listing */}
            <p className='flex flex-wrap text-gray-500'><b>LANG:</b> {item.language?.map((lanItem, idx) => (
                <span key={idx}>&nbsp;{lanItem}{idx == item.language.length-1 ? '' : ','}</span>
            ))}</p>

            {/* Author Name */}
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"><b>Author Name:&nbsp;</b>{item.author_name}</p>
            
            {/* Page count */}
            <p className='text-sm text-gray-500'><b>Page Count:</b> {item.number_of_pages_median}</p>
        </div>

        {/* Add to bookshelf button */}
        <button className="inline-flex items-center px-3 py-2 mx-4 mb-4 w-fit text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
            onClick={() => manipulationFunction(flag ? id : item)}
        >
            {!flag ? "Add to bookshelf" : "Remove from bookshelf"}
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
    )
}


const Books = () =>{
    const { query, setQuery, data, isLoading, store, setStore } = useContext(context);

    const initial = {
        title : "",
        edition_count : 0,
        ratings_average : 0,
        readinglog_count : 0,
        language : [],
        author_name : "",
        number_of_pages_median : 0 
        }
        
        console.log(store);
        
    function isObjectInArray(obj) {
        return store.some(item => 
            item.title === obj.title &&
            item.edition_count === (obj.edition_count || 0) &&
            item.ratings_average === (obj.ratings_average || 0) &&
            item.readinglog_count === (obj.readinglog_count || 0) &&
            item.language === obj.language &&
            item.author_name === obj.author_name &&
            item.number_of_pages_median === (obj.number_of_pages_median || 0)
        );
    }
    
    const handleAddToBookshelf = (item) => {
        let obj = initial;
        obj = {...obj, 
            title : item.title,
            edition_count : item.edition_count || 0,
            ratings_average : item.ratings_average || 0,
            readinglog_count : item.readinglog_count || 0,
            language : item.language,
            author_name : item.author_name,
            number_of_pages_median : item.number_of_pages_median || 0
        }

        const flag = isObjectInArray(obj);
        console.log(flag);
        if(!flag){
            setStore(prev => {
                const newArray = [...prev, obj];
                localStorage.setItem("bookshelf", newArray);
                return newArray;
            })
        }
        else{
            alert("already present")
        }
    }

    return (
        <div>

            {/* Search bar component */}
            <SearchBar
                query = {query}
                setQuery = {setQuery}
            />
                
                {/* Displaying fetched books */}
                {
                !isLoading ? 
                <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row px-10 py-5 gap-2'>
                    {
                        data?.docs.map((item, id) => (    
                            <BookDisplay 
                                key = {id} 
                                item = {item} 
                                manipulationFunction = {handleAddToBookshelf}
                                flag = {false} 
                                id = {id}   
                            />
                        ))
                    }
                        </ul>
                        : 
                        <LoadingComponent />
                        }
        </div>
    )
}
