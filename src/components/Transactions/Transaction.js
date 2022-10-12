import React from 'react';
import editImage from '../../assets/edit.svg'
import deleteImage from '../../assets/delete.svg'
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';

const Transaction = ({transaction}) => {
    const dispatch = useDispatch();
    const {name, type, amount, id} = transaction;

    const handleDelete = () => {
        dispatch(removeTransaction(id))
    }

    const handleEdit = () => {
        dispatch(editActive(transaction))
    }
    return (
        <li class={`transaction ${type}`}>
        <p>{name}</p>
        <div class="right">
            <p>৳ {amount}</p>
            <button class="link">
                <img
                    class="icon"
                    src={editImage}
                    onClick={handleEdit}
                />
            </button>
            <button class="link">
                <img
                    class="icon"
                    src={deleteImage}
                    onClick={handleDelete}
                />
            </button>
        </div>
    </li>
    );
};

export default Transaction;