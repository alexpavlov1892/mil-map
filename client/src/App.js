import React, { useEffect, useState } from 'react'

function App() {

  const [backenddata, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => { setBackendData(data)
      }
    )
  }, [])

  return (
    <div>

    {(typeof backenddata.users === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backenddata.users.map((user, index) => (
        <p key={index}>{user}</p>
      ))
    )}
      
    </div>
  )
}

export default App