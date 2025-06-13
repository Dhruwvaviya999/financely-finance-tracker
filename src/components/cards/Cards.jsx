import React from 'react'
import "./styles.css"
import { Card, Row } from 'antd'
import Button from '../button/Button'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const Cards = ({ showExpenseModal, showIncomeModal, income, expense, totalBalance, setTransactions }) => {

  async function handleReset(){
    await deleteDoc(doc(db, "transactions", "DC"));
  }

  return (
    <div>
        <Row className='my-card-row'>
            <Card className='my-card'>
              <h2>Current Balance</h2>
              <p>₹ {totalBalance}</p>
              <Button text="Reset Button" blue={true} onClick={handleReset} />
            </Card>
            <Card className='my-card'>
              <h2>Total Income</h2>
              <p>₹ {income}</p>
               <Button text="Add Income" blue={true} onClick={showIncomeModal} />
            </Card>
            <Card className='my-card'>
              <h2>Total Expenses</h2>
              <p>₹ {expense}</p>
              <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
            </Card>
        </Row>
    </div>
  )
}

export default Cards