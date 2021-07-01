import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


export function Button(props: ButtonProps) {
    return (
        <button
            className=" 
                flex items-center 
                justify-center 
                w-full mt-8 h-12
                rounded-md font-medium 
                bg-purple-500 hover:bg-purple-600
                transition
                text-white
                cursor-pointer
                border-0
                px-8
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
            {...props}
        />
    )
}