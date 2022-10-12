import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction, editInactive } from '../features/transaction/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const {isLoading, isError} = useSelector((state) => state.transaction)
    const {editing} = useSelector((state) => state.transaction) || {};
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const {id, name, amount, type} = editing || {};
        if(id){
            setEditMode(true)
            setName(name);
            setAmount(amount);
            setType(type);
        }else{
            setEditMode(false)
        }
    },[editing])

    const reset = () => {
        setName('');
        setAmount('');
        setType('');
    }



    const handleCreate = (e) => {
     e.preventDefault();

        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount),
        }))

        reset();
    }

    const handleUpdate = (e) => {

        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }
        }))

        reset();
        editMode(false)

    }

    const cancelEditMode = () => {
        dispatch(editInactive())
        setEditMode(false);
        reset();
    }

    
    return (
        <div class="form">
        <h3>Add new transaction</h3>
<form onSubmit={editMode ? handleUpdate : handleCreate}>
  <div class="form-group">
            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter title"
                value={name}
                required
                onChange={ e => setName(e.target.value)}
            />
        </div>

        <div class="form-group radio">
            <label>Type</label>
            <div class="radio_group">
                <input
                    type="radio"
                    value="income"
                    name="type"
                    required
                    checked = {type === "income"}
                    onChange = {e => setType('income')}
                />
                <label>Income</label>
            </div>
            <div class="radio_group">
                <input
                    type="radio"
                    value="expense"
                    name="type"
                    placeholder="Expense"
                    required
                    checked = {type === "expense"}
                    onChange= {e => setType("expense")}
                />
                <label>Expense</label>
            </div>
        </div>

        <div class="form-group">
            <label>Amount</label>
            <input
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={amount}
                required
                onChange={e => setAmount(e.target.value)}
            />
        </div>

      <button class="btn" type='submit' disabled={isLoading? true : false}>{editMode ? 'Update Transaction' : 'Add Transaction'}</button>

        {!isLoading && isError && <p className='error'>Something went wrong. Please try again</p>}

</form>
       
     {editMode &&   <button class="btn cancel_edit" onClick={cancelEditMode}>Cancel Edit</button>}
    </div>
    );
};

export default Form;