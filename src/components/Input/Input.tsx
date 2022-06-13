import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    register: any
}

const Input = ({error,register,...props}:InputProps) => {

    return (
        <input {...register(props.name)} {...props}/>
    )
}

export default Input;