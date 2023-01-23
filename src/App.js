import React, { useState } from 'react';
import './App.css';
import checkwhite from '../src/assets/checkwhite.png'
import edit from '../src/assets/edit.png'
import deletetask from '../src/assets/delete.png'

function App() {

  const [ toDo, setToDo ] = useState([])

  //temp state
  const [ newTask, setNewTask ] = useState('')
  const [ updateData, setUpdateData ] = useState('')

  //add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1
      let newEntry = { id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask('')
    }
  }

  //delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks)
  }

  //mark task done
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if(task.id === id ) {
        return({ ...task, status: !task.status })
      }
      return task
    })
    setToDo(newTask)
  }

  //cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  //change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry)
  }

  //update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }
  
  return (
    <div className="App">
      <div className='app-container'>
      <h1>Bucket List</h1>

    {/*update task */}
    {updateData && updateData ? (
      <>
       <div className='update-container'>
          <div className='update-task'>
            <input type={'text'} 
              value={ updateData && updateData.title }
              onChange={ (e) => changeTask(e) }
            />
          </div>
          <div className='button-update'>
            <button
              onClick={updateTask}
            >Update</button>
            <button
              onClick={cancelUpdate}
            >Cancel</button>
          </div>
        </div>
      </>
    ) : (
      <>
          {/*add task */}
        <div className='add-container'>
          <div className='add-task'>
            <input 
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value) }
              type={'text'} placeholder='Add new list...'/>
          </div>
          <div className='button-task'>
            <button
              onClick={addTask}
              >Add List</button>
          </div>
        </div>
      </>
    )}
         
{/* display to do */}

{toDo && toDo.length ? '' : 'No task created.'}

{toDo && toDo
  .sort((a, b) => a.id > b.id ? 1 : -1)
  .map(( task, index) => {
    return(
      <React.Fragment key={task.id}>
        <div className='task-bg'>
          <div className={task.status ? 'done' : ''}>
            <span className='task-text'><img src={checkwhite} alt='' onClick={(e) => markDone(task.id)} />{task.title}</span>
          </div>
          <div className='icons'>
            {task.status ? null : (
              <img src={edit} alt='' title='edit' 
                onClick={() => setUpdateData({
                  id: task.id,
                  title: task.title,
                  status: task.status ? true : false   
                })}
              />
            )}
            <img src={deletetask} alt='' title='delete' 
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </div>
      </React.Fragment>
    )
  })
}

      </div>
    </div>
  );
}

export default App;

// Created by: Russel M. Aniel
