import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Balance = () => {
    const {transactions} = useSelector(state => state.transaction);
    
    
    const handleBalance = (transactions) => {
        let balance = 0;

       transactions.forEach(transaction => {
        const {type, amount} = transaction;

        if(type === "income"){
            balance += amount
        }else{
            balance -= amount
        }

       });
       return balance;
    }
    return (
        <div class="top_card">
        <p>Your Current Balance</p>
        <h3>
            <span>৳</span>
            <span>{handleBalance(transactions)}</span>
        </h3>
    </div>
    );
};

export default Balance;