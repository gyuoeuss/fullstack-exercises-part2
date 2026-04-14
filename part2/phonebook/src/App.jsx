import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [find, setFind] = useState('')

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
    // if (newName === '' || newNumber === '') {
    //   alert("輸入格不可為空")
    // //   setNewName('')
    // //   setNewNumber('')

    //   return // 直接結束，不再往下執行
    // }

    if (isDuplicate) {
      alert(`${newName} 已在電話簿存在`)
      setNewName('')
      setNewNumber('')
      return // 直接結束，不再往下執行

    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const search = (event) => {
    setFind(event.target.value)
    setShowAll(event.target.value === '')
    // if (event.target.value === '') {
    //   setShowAll(true)
    // }

    // else {
    //   setShowAll(false)
    // }
  }
  const notesToShow = showAll
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(find.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
<input value={find}onChange={search} />
      </div>

      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>name:  <input value={newName} onChange={handleNamechange} /></div>
        <div>number:   <input value={newNumber} onChange={handleNumberchange} /></div>
        <div>{newName}</div>
        <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
      <div>
        <ul>
          {notesToShow.map(person =>
            <li key={person.id}>{person.name}   {person.number}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App