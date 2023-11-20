
export function NewButton({ children, text }) {
  return (
    <section className="newButtonContainer">
      <button className="newButton">
        {children}
      </button>
      <p className="newButtonText">{text}</p>
    </section>

  )
}