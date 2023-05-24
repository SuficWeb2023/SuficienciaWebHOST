import React from 'react';
import VolverAlFuturoSponsor from "../assets/VolverAlFuturoSponsor.jpeg";


type Props = {}

function Sponsor({ }: Props) {
    return (
        <div className='overflow-auto bg-white dark:bg-gray-800 rounded-lg mt-5'>

            <div className='pt-4 pb-3 pl-8'>
                <h2>Noticias</h2>
            </div>

            <div className='overflow-auto h-[35vh]  px-8 mb-6'>
                <div>
                    <img src={VolverAlFuturoSponsor} className='object-cover rounded-lg mt-2' />

                    <p className='mt-2 font-bold'>Volver al futuro. ¡NUEVA TEMPORADA!</p>
                    <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem numquam tempore, incidunt ea perspiciatis necessitatibus ad neque dicta voluptates dolore ex sunt non, accusamus, doloribus explicabo velit nihil minus itaque.</p>
                </div>

                <hr className='my-8'/>

                <div>
                     <img src={VolverAlFuturoSponsor} className='h-40 object-cover rounded-lg mt-2' />

                    <p className='mt-2 font-bold'>Volver al futuro. ¡NUEVA TEMPORADA!</p>
                    <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem numquam tempore, incidunt ea perspiciatis necessitatibus ad neque dicta voluptates dolore ex sunt non, accusamus, doloribus explicabo velit nihil minus itaque.</p>
                </div>
            </div>


        </div>
    )
}

export default Sponsor