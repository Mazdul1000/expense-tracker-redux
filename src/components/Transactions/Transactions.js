import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transaction/transactionSlice';
import Transaction from './Transaction';

const Transactions = () => {
    const dispatch = useDispatch();
    const {isError, isLoading, transactions, error } = useSelector((state) => state.transaction);

    useEffect(()=> {
        dispatch(fetchTransactions())
    },[dispatch])

    // decide what to render
    let content  = null;
    
    if(isLoading) content = <p>Loading...</p>;

    if(!isLoading && isError){
       content = <p className='error'>There was an error occured</p>   
    }

    if(!isLoading && !isError && transactions?.length > 0){
        content = transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}

        if(!isLoading && !isError && transactions?.length === 0){
            content = <p> Sorry, no transaction found</p>
        }
    
    return (
        <>
              <p class="second_heading">Your Transactions:</p>

<div class="conatiner_of_list_of_transactions">
    <ul>
        {content}
    </ul>
</div>
        </>
    );
};

export default Transactions;