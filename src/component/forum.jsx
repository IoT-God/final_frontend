// Forum.js
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Forum = () => {
  // const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')

  // 模拟记录数组
  const [records, setRecords] = useState([])

  // 发送GET请求
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.10.29:5000/video') // 替换为你的后端接口地址
      const data = response.data
      setName(data.name)
      console.log(data.name)
      // Other data handling here
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // 每五秒钟发送一次GET请求
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  // 处理后端返回的数据
  useEffect(() => {
    if (name === 'successful-1') {
      // 添加一条unkown action detect记录
      console.log('Add unknown action detect record to forum')
      setRecords((prevRecords) => [
        ...prevRecords,
        {
          id: prevRecords.length + 1,
          content: 'unknown action detect',
          image: image,
          description: 'An unknown people detected',
        },
      ])
    } else if (name === 'successful-3') {
      // 不做任何操作
      console.log('No action needed')
    } else {
      // 添加一条kown action detect记录
      console.log('Add known action detect record to forum')
      setRecords((prevRecords) => [
        ...prevRecords,
        {
          id: prevRecords.length + 1,
          content: 'known action detect',
          image: image,
          description: `You friend ${name} is coming!`,
        },
      ])
    }
  }, [name])
  // 清空所有记录
  const clearRecords = () => {
    setRecords([])
  }
  return (
    <div>
      <h1>Forum</h1>
      {/* 显示记录列表 */}
      {records.map((record) => (
        <div key={record.id}>
          <Link to={`/detail/${record.id}`}>{record.content}</Link>
        </div>
      ))}
      <button onClick={clearRecords}>Clear Records</button>
    </div>
  )
}

export default Forum
