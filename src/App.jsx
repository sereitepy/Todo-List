/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Input, Button, List, Checkbox, Typography, message } from 'antd'
import 'antd/dist/reset.css'
import './App.css'

const { Title } = Typography
const { Search } = Input

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (inputValue.trim() === '') {
      message.error('Task cannot be empty')
      return
    }
    const newTask = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    }
    setTasks([...tasks, newTask])
    setInputValue('')
  }

  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='app-container'>
      <Title level={2} className='app-title'>
        To-Do List
      </Title>
      <div className='input-container'>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Add a new task'
          onPressEnter={addTask}
        />
        <Button type='primary' onClick={addTask}>
          Add Task
        </Button>
      </div>
      <Search
        placeholder='Search tasks'
        onChange={e => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <List
        dataSource={filteredTasks}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                key='delete'
                type='link'
                className='delete-btn'
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <Checkbox
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            >
              <span className={item.completed ? 'completed-task' : ''}>
                {item.text}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  )
}

export default App
