import { useState, useEffect } from 'react'
import phoneService from './services/notes'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [find, setFind] = useState('')
  const [message, setMessage] = useState(null)
  const [messagetype, setMessagetype] = useState('')

  useEffect(() => {
    console.log('effect')
    phoneService
      .getAll()
      .then(get => {
        setPersons(get)
      })
  }, [])
  const handleNamechange = (event) => setNewName(event.target.value)

  const handleNumberchange = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    // 用 some 檢查是否有重複
    const isDuplicate = persons.some(p => p.name === newName) || persons.some(p => p.number === newNumber)
    if (!newName.trim() || !newNumber.trim()) {
      alert("輸入格不可為空")
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (isDuplicate) {
      const existingName = persons.find(p => p.name === newName)
      // alert(`${newName} 已在電話簿存在`)
      console.log()
      if (window.confirm(`${newName} is already added,replace the old number with new one?`)) {

        phoneService
          .update(existingName.id, nameObject)
          .then(res => {
            console.log("res=", res)
            setPersons(persons.map(p => p.id === existingName.id ? res : p))
            setMessage(newName + 'is changed')
            setMessagetype('success')
            setTimeout(() => { setMessage(null) }, 2000)
          })
          .catch(error => {
            setMessage('imformation' + newName + 'has already removed from server')
            setMessagetype('error')
            setTimeout(() => { setMessage(null) }, 2000)
          })
        setNewName('')
        setNewNumber('')
      }
      return // 直接結束，不再往下執行
    }
    else {
      phoneService
        .create(nameObject)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage('Added ' + newName)
          setMessagetype('success')
          setTimeout(() => { setMessage(null) }, 2000)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const search = (event) => {
    setFind(event.target.value)
    setShowAll(event.target.value === '')
  }
  const notesToShow = showAll
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(find.toLowerCase()))


  const deleteName = (id, name) => {
    if (window.confirm("Delete '" + name + "' ?")) {
      phoneService
        .getOff(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id)) // 更新前端 state
          setMessage('deleted ' + name)
          setMessagetype('success')
          setTimeout(() => { setMessage(null) }, 2000)
        })
        .catch(error => {
          setMessage('imformation' + name + 'has already removed from server')
          setMessagetype('error')
          setTimeout(() => { setMessage(null) }, 2000)
        })
    }
    else alert("未刪除")
  }

  return (
    <div>
      <Notification message={message} messagetype={messagetype} />
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input value={find} onChange={search} />
      </div>

      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>name:  <input value={newName} onChange={handleNamechange} /></div>
        <div>number:   <input value={newNumber} onChange={handleNumberchange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
      <div>
        <ul>
          {notesToShow.map(person =>
            <li key={person.id}>{person.name}   {person.number}
              <button onClick={() => deleteName(person.id, person.name)}>delete</button>
            </li>

          )}
        </ul>
      </div>
    </div>
  )
}

export default App