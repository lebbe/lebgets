import { useEffect, useRef } from 'react'

type Props = {
  options: string[]
  values: string[]
  setValues: (values: string[]) => void
}

export default function MultiAutocomplete({ options, values, setValues, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const selected = useRef(new Set<string>())

  // A unique uuid generated with Math.random()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

  useEffect(() => {
    if (!ref.current) return

    const input = ref.current

    input.addEventListener('input', function (e) {
      // @ts-ignore
      if (e.inputType === 'insertReplacementText' || e.constructor.name === 'Event') {
        if (input.value === '') return
        selected.current.add(input.value)
        setValues(Array.from(selected.current))
        input.value = ''
      }
    })

    input.addEventListener('keydown', function (e) {
      // Når bruker trykker enter eller hvis bruker har skrevet hele
      // innholdet i nedtrekkslisten OG velger fra listen (da fyres ikke input-event)
      if (e.key === 'Enter' || e.constructor.name === 'Event') {
        input.value && selected.current.add(input.value)
        setValues(Array.from(selected.current))
        input.value = ''
      }
    })
  }, [])

  return (
    <>
      <input list={uuid} {...props} ref={ref} />
      <datalist id={uuid}>
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
