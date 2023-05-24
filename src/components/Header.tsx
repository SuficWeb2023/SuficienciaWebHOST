import { ReactElement, useEffect } from 'react';
import {BsSearch} from "react-icons/bs";
import {BsFillMoonFill} from "react-icons/bs";
import {
    BsFillSunFill,
    BsFillQuestionCircleFill,
  } from "react-icons/bs";
  import {AiFillMessage} from "react-icons/ai";

  import {MdNotificationsActive} from "react-icons/md";
import { useState } from 'react';
import { logOut } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

interface Props {
    
}

function Header({}: Props): ReactElement {

    const [currentTheme, setCurrentTheme] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setCurrentTheme("dark");
        } else {
            document.documentElement.classList.remove('dark');
            setCurrentTheme("light");
        }

    }, []);

    const changeTheme = ( theme: string ) => {
        if(theme == "light"){
            localStorage.theme = "light";
            document.documentElement.classList.remove('dark');
            setCurrentTheme("light");
        }else{
            localStorage.theme = "dark";
            document.documentElement.classList.add('dark');
            setCurrentTheme("dark");
        }
    }

    const signOut = () => {
        dispatch(logOut());
    }

    return (
        <div className='bg-white dark:bg-gray-800 fixed left-0 top-0 w-full'>
            <div className="container mx-auto h-[10vh] flex justify-between">
                <div className='flex items-center'>
                    <h1 className='text-md font-bold lg:text-2xl text-cyan-400'>DeLorean's</h1>
                    <div className='flex items-center'>
                        <input 
                            type="text" 
                            placeholder='Search ...' 
                            className='bg-gray-200 ml-5 rounded-lg px-4 py-1 hidden md:block' 
                        />
                        <BsSearch className='ml-5 md:-ml-7 text-sm ' />
                    </div>
                </div>

                <ul className='flex items-center'>
                    <li className='ml-2 md:ml-5'>
                        {
                            currentTheme === "dark" ? (
                                <BsFillSunFill  
                            className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200'
                            onClick={() => changeTheme("light")}
                            />
                            ) : (
                                <BsFillMoonFill  
                        className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200'
                        onClick={() => changeTheme("dark")}
                        />
                            )
                        }
                    </li>
                    <li className='ml-2 md:ml-5'>
                        <AiFillMessage  className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200'/>
                    </li>

                    <li className='ml-2 md:ml-5'>
                        <MdNotificationsActive  className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200'/>
                    </li>

                    <li className='ml-2 md:ml-5'>
                        <BsFillQuestionCircleFill  className='cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200'/>
                    </li>

                    <li className='ml-2 md:ml-5 hidden lg:block'>
                        <button onClick={signOut}>Log Out</button>
                    </li>
                </ul>


            </div>
        </div>
    )
}

export default Header
