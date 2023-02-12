import { useEffect } from 'react'
import axios from '../api/axios'

export default function Success() {

  /* useEffect(async () => {
    const response = await axios.post('http://localhost:4000/orders', { success: true })
    console.log(response.data);
  }, []) */

  return (
    <>
      <h1>Success</h1>
    </>
  )
}