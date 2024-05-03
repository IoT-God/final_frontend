import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const RecordDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const { record } = location.state

  console.log('id is ', id)
  console.log('record', record)

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
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '20px',
    color: '#007bff',
    fontSize: '24px',
  },
  message: {
    marginBottom: '10px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  notFound: {
    color: 'red',
    fontSize: '16px',
  },
}

export default RecordDetail
