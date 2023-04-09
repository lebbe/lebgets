import { useEffect, useRef } from 'react'

type Props = {
  options: string[]
  values: string[]
  setValues: (values: string[]) => void
}

export default function MultiAutocomplete({ options, values, setValues, ...props }: Props) {
  const inputElementRef = useRef<HTMLInputElement>(null)
  const selected = useRef(new Set<string>())
  const datalistId = useRef(Math.random().toString(36).substring(2, 12)).current

  useEffect(() => {
    if (!inputElementRef.current) return // How to convince TypeScript that this never happens?

    const input = inputElementRef.current

    input.addEventListener('input', function (e) {
      // @ts-ignore inputType is not in the Event interface, but it is in the InputEvent interface
      if (e.inputType === 'insertReplacementText' || e.constructor.name === 'Event') {
        if (input.value === '') return
        selected.current.add(input.value)
        setValues(Array.from(selected.current))
        input.value = ''

        // Prevent firefox from opening the dropdown list again
        async function blurAndFocus() {
          input.blur()
          await new Promise((resolve) => setTimeout(resolve, 0))
          input.focus()
        }

        blurAndFocus()
      }
    })

    input.addEventListener('keydown', function (e) {
      // When the user presses enter or if the user has written the entire
      // content of the dropdown list AND selects from the list (then the input-event is not fired)
      if (e.key === 'Enter' || e.constructor.name === 'Event') {
        input.value && selected.current.add(input.value)
        setValues(Array.from(selected.current))
        input.value = ''
      }
    })
  }, [])

  return (
    <>
      <input list={datalistId} {...props} ref={inputElementRef} />
      <datalist id={datalistId}>
        {options
          .filter((option) => !selected.current.has(option))
          .map((option) => (
            <option key={option} value={option} />
          ))}
      </datalist>
      <div>
        {values.map((value) => (
          <button
            key={value}
            onClick={() => {
              selected.current.delete(value)
              setValues(Array.from(selected.current))
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  )
}
