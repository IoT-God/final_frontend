// RecordDetail.js
import React from 'react'
import { useParams } from 'react-router-dom'

const RecordDetail = ({ records }) => {
  // 根据ID获取相应的记录详细信息
  const { id } = useParams()
  const record = records.find((record) => record.id === parseInt(id))

  return (
    <div>
      <h2>Record Detail</h2>
      <p>Message: {record.description}</p>
      <img src={record.image} alt="Record Image" />
    </div>
  )
}

export default RecordDetail
