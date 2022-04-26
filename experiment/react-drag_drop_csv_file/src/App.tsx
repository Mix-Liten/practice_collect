import { useState } from 'react'
import { parse } from 'papaparse'

type Contacter = {
  email: string
  name: string
}

type ContacterList = Contacter[]

export default function App() {
  const [highlighted, setHighlighted] = useState(false)
  const [contacts, setContacts] = useState<ContacterList>([{ email: 'fake@gmail.com', name: 'Fake' }])

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Drag & Drop CSV file</h1>
      <div
        className={`p-6 my-8 mx-auto max-w-md border-2 ${
          highlighted ? 'border-green-600 bg-green-100' : 'border-gray-600'
        }`}
        onDragEnter={() => {
          setHighlighted(true)
        }}
        onDragLeave={() => {
          setHighlighted(false)
        }}
        onDragOver={e => {
          e.preventDefault()
        }}
        onDrop={e => {
          e.preventDefault()
          setHighlighted(false)

          Array.from(e.dataTransfer.files)
            .filter(file => file.type === 'text/csv')
            .forEach(async file => {
              const text = await file.text()
              const result = parse(text, { header: true })
              const data = result.data as ContacterList
              setContacts(existing => [...existing, ...data])
            })
        }}
      >
        DROP HERE
      </div>

      <table className="table-fixed border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-2">Name</th>
            <th className="border border-slate-600 p-2 w-60">Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.email}>
              <td className="border border-slate-700 p-2">
                <strong>{contact.name}</strong>
              </td>
              <td className="border border-slate-700 p-2">{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
