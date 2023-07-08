const Person = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => onDelete(person)}>delete</button>
    </p>
  )
}

const Persons = ({ data, predictFn, onDelete }) => {
  return (
    <div>
      {data.filter(predictFn).map((p) => (
        <Person key={p.name} person={p} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Persons
