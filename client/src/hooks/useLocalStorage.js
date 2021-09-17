import {useEffect, useState} from 'react'

const PREFIX = "whatapp-clone-"

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        // if the value is not null we return the parsed value
        if (jsonValue != null) return JSON.parse(jsonValue)
        // if initial value is a function, call that function and return it's output
        if(typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    // whenever the value or the key is changed, update the values inside localStorage 
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
