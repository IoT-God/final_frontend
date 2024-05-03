import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Forum = () => {
  // Initialize records state with localStorage data or empty array
  const [records, setRecords] = useState(() => {
    const storedRecords = localStorage.getItem('forumRecords')
    return storedRecords ? JSON.parse(storedRecords) : []
  })

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.10.29:5000/video')
      const data = response.data
      const name = data.name
      const image = data.frame

      // Update records array based on the received data
      if (name === 'unkown') {
        // Add an unknown action detect record
        setRecords((prevRecords) => [
          ...prevRecords,
          {
            id: prevRecords.length + 1,
            content: 'unknown action detect',
            image: image,
            description: 'An unknown people detected',
          },
        ])
      } else if (name === 'empty') {
        // No action needed
        console.log('No action needed')
      } else {
        // Add a known action detect record
        setRecords((prevRecords) => [
          ...prevRecords,
          {
            id: prevRecords.length + 1,
            content: 'known action detect',
            image: image,
            description: `Your friend ${name} is coming!`,
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Fetch data every five seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  // Clear all records
  const clearRecords = () => {
    localStorage.removeItem('forumRecords')
    setRecords([])
  }

  // Update localStorage when records state changes
  useEffect(() => {
    localStorage.setItem('forumRecords', JSON.stringify(records))
  }, [records])

  return (
    <div>
      <h1>Forum</h1>
      {/* Display the list of records */}
      {records.map((record) => (
        <div key={record.id}>
          <Link to={`/detail/${record.id}`}>{record.content}</Link>
        </div>
      ))}
      {/* Button to clear all records */}
      <button onClick={clearRecords}>Clear Records</button>
    </div>
  )
}

export default Forum
