export const Filter = ({ text, onChangeFilter }) => (<div>{text} <input type='text' onChange={onChangeFilter} /></div>)
export const Inputfield = ({text, value, onChange }) => (<div>{text} <input type='text' value={value} onChange={onChange} /></div>)
export const Button = ({ typeButton, text }) => (<div><button type={typeButton}>{text}</button></div>)
export const Button2 = ({ text, onClick }) => (<button onClick={onClick}>{text}</button>)

export const PersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
      <form onSubmit={onSubmit}>
        <label>
          <Inputfield text="name:" value={newName} onChange={handleNameChange} />
          <Inputfield text="number:" value={newNumber} onChange={handleNumberChange} />
        </label>
        <Button typeButton="submit" text="add" />
      </form>
    )
  }

  export const  Person = ({ person, text, onClick }) => (<div>{person.name} {person.number} <Button2 text={text} onClick={onClick} /></div>)
