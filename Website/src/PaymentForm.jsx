import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      // Send paymentMethod.id to your server for processing
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
      <CardElement />
      <button type="submit" disabled={!stripe} style={{ marginTop: '20px' }}>
        Pay
      </button>
    </form>
  )
}

export default PaymentForm