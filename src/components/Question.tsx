import { ReactNode } from 'react'

import Image from 'next/image'

type QuestionProps = {
    content: string
    author: {
        name: string
        avatar: string
    }
    children?: ReactNode
}

export function Question({
    content,
    author,
    children
}: QuestionProps) {
    return(
        <div className="bg-gray-50 rounded-lg shadow p-6 mt-3 first:mt-0">
            <p className="text-gray-900">{content}</p>
            <footer className="flex justify-between items-center mt-6">
                <div className="flex pl-4 pb-4 sm:pb-0 sm:pl-0 items-center w-screen">
                    <Image 
                        src={author.avatar}
                        alt={author.name}
                        width='50px'
                        height='50px'
                        className="rounded-full"
                    />
                    <span className="ml-2 text-sm sm:text-md text-gray-400">{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}