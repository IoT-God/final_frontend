import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const RecordDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const { recor } = location.state
  console.log('id is ', id)
  console.log('haha', recor)
  // Check if records is undefined before accessing it
  // if (!records) {
  //   return <div style={styles.container}>Loading...</div> // or any other loading indicator
  // }

  // Find the record with the matching ID
  const record = recor

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Record Detail</h2>
      {record ? (
        <>
          <p style={styles.message}>Message: {record.description}</p>
          <img src={record.image} alt="People img" style={styles.image} />
        </>
      ) : (
        <p style={styles.notFound}>Record not found</p>
      )}
    </div>
  )
}

// Styles
const styles = {
  container: {
    padding: '20px',
  },
  heading: {
    marginBottom: '20px',
    color: 'blue',
  },
  message: {
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
  },
  notFound: {
    color: 'red',
  },
}

export default RecordDetail
