import React from 'react'
import useSWR, { SWRConfig } from 'swr'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const fetcher = (...url) => fetch(...url).then(r => r.json())

function Dashboard() {
  return <SWRConfig 
  value={{
    // refreshInterval: 0,
    // revalidateOnFocus: false,
    dedupingInterval: 24*60*60*1000,
    fetcher
  }}
> 
  <Content/>
</SWRConfig>
}

function Content() {
  const {data, error} = useSWR(`${BASE_URL}/users`)
  const {data: todos, error: todoError} = useSWR(() => `${BASE_URL}/todos`)

  if (error || todoError) return <div>failed to load</div>
  if (!data || !todos) return <div>loading...</div>
  return (
    <div>
      <div>Uers: {data.length}</div>
      <div>Todo: {todos?.map((todo, i) => {
        return <div key={i} style={{ textAlign: 'left', marginBottom: 5}}>id: {todo.id} - Title: {todo.title}</div>
      })}</div>
    </div>
  ) 
}

export default Dashboard