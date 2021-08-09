import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([])
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: { 
                'Content-Type' : 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data =>{
            setBookings(data);
        })
    },[])
    return (
        <div>
            <h2>{loggedInUser.name} you have {bookings.length} bookings</h2>
            {
                bookings.map(booking=>{
                    return <h5>{booking.name} from: {(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</h5>
                })
            }
        </div>
    );
};

export default Bookings;