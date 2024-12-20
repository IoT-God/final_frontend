import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import friendImage from '../friend.jpg'
import serviceImage from '../outservice.jpg'

const Forum = () => {
  const [records, setRecords] = useState(() => {
    const storedRecords = localStorage.getItem('forumRecords')
    return storedRecords ? JSON.parse(storedRecords) : []
  })
  const [connectionError, setConnectionError] = useState(false)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.10.29:5000/video')
      const data = response.data
      const name = data.name
      const image = data.frame
      const base64Image = `data:image/jpeg;base64,${image}`

      if (name === 'Unknown') {
        setRecords((prevRecords) => [
          ...prevRecords,
          {
            id: prevRecords.length + 1,
            content: 'Unknown Action Detected',
            image: base64Image,
            description: 'An unknown people detected',
          },
        ])
      } else if (name === 'Empty') {
        console.log('No action needed')
      } else {
        setRecords((prevRecords) => [
          ...prevRecords,
          {
            id: prevRecords.length + 1,
            content: 'Known Action Detected',
            image: friendImage,
            description: `Your friend ${name} is coming!`,
          },
        ])
      }
      setConnectionError(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setConnectionError(true)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const clearRecords = () => {
    localStorage.removeItem('forumRecords')
    setRecords([])
  }

  useEffect(() => {
    localStorage.setItem('forumRecords', JSON.stringify(records))
  }, [records])
  // Render friendImage if there's a connection error
  if (connectionError) {
    return (
      <div style={{ padding: '20px' }}>
        <img src={serviceImage} alt="out of service" />
        <p>Unable to connect to the server.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Security Camera Log</h1>
      <div
        style={{
          marginBottom: '20px',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
        }}>
        {records
          .sort((a, b) => b.id - a.id)
          .map((record) => (
            <div
              key={record.id}
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
              }}>
              <Link
                to={`/record/${record.id}`}
                style={{
                  marginRight: '10px',
                  textDecoration: 'none',
                  color:
                    record.content === 'Unknown Action Detected'
                      ? 'red'
                      : 'green',
                  fontWeight: 'bold',
                }}
                state={{ record: record }} // Pass the record prop here
              >
                {record.content}
              </Link>
              <span style={{ fontSize: '14px', color: 'gray' }}>
                {record.description}
              </span>
            </div>
          ))}
      </div>
      <button
        onClick={clearRecords}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}>
        Clear Records
      </button>
    </div>
  )
}

export default Forum
