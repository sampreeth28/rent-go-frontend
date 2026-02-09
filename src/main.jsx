import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SkJDGIltPTJT4nU23UMJ7C4O1mBJ7aOQeyodcNy14iQjtyAqQBJDvQBz9moxkmkmWbvSLuvAMDLtokIO3sKLQ5d001omJDYSj");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Elements stripe={stripePromise}><App /></Elements>
    </BrowserRouter>
  </StrictMode>,
)
