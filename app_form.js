// This is my first app using JavaScript

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

function App() {
  const [form, setform] = useState({
    id: '',
    product: '',
    price: '',
    description: ''
  })

  const inputHandler = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const submitButton = (e) => {
    e.preventDefault()
    console.log(form)

    if (form.id === '' || form.product === '' || form.price === '' || form.description === '') {
      alert('Please fill all the fields')
    }
    else {
      const request = {
        ...form
      }

      const db_request = await api.get('/createdb')
      console.log(db_request)
      const table_request = await api.get('/createtable')
      console.log(table_request)
      const response = await api.post('/create', request)
      console.log(response)
      response = await api.post('/read', request)
      console.log(response)
      response = await api.post('/update', request)
      console.log(response)
      response = await api.post('/delete', request)
      console.log(response)
      resetButton()
    }
  }

  const resetButton = (e) => {
    setform({
      id: '',
      product: '',
      price: '',
      description: ''
    })
  }

  return (
    <>
      <div className="container mt-3 mb-3">
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Id</label>
          <input type="id" name="id" className="form-control" value={form.id}
            onChange={inputHandler} id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Product</label>
          <input type="product" name="product" className="form-control" value={form.product}
            onChange={inputHandler} id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
          <input type="price" value={form.price} onChange={inputHandler}
            name="price" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
          <input type="description" value={form.description} onChange={inputHandler}
            name="description" className="form-control" id="exampleFormControlInput1"
            placeholder="product_description_placeholder" />
        </div>
        <div className="mb-3">
          <button type='submit' onClick={submitButton} className="btn btn-success">Submit</button>
          <button type='reset' onClick={resetButton} className="btn btn-danger">Cancel</button>
        </div>
      </div>
    </>
  )
}
export default App;
