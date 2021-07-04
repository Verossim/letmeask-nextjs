import Image from 'next/image'
import {  useRouter } from 'next/router'
import Router from "next/router"
import { FormEvent, useEffect, useState } from 'react'

import logoImg from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

type FirebaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHightlighted: boolean
}>

type Question = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHightlighted: boolean
}

type RoomParams = {
    id: string
}

const Room: React.FC = () => {
    const { user } = useAuth()
    const params = useRouter().query as RoomParams
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value',room => {
            const databaseRoom = room.val();

            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHightlighted: value.isHightlighted
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }

    return (
        <div>
            <header className="p-6 border-b border-solid">
                <div className="flex justify-between items-center max-w-6x1 mx-auto">
                    <Image 
                        src={logoImg}
                        height="45px"
                        alt="letmeask"
                        onClick={() => Router.push('/')}
                        className="cursor-pointer"
                    />
                    <RoomCode code={params.id} />
                </div>
            </header>

            <main className="max-w-3xl mx-3 sm:mx-auto">
                <div className="flex items-center mt-8 mb-8">
                    <h1 className="font-Poppins font-semibold text-2xl text-gray-900">Sala {title}</h1>
                    {questions.length > 0 && <span
                        className="ml-4 
                            bg-pink-500 rounded-full py-2 px-4
                            text-white font-medium text-sm"
                    >
                        {questions.length} pergunta(s)
                    </span>
                    }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        className="w-full border-0 p-4 
                            rounded-lg bg-gray-50 shadow-md resize-y min-h-130"
                        placeholder="O que você quer perguntar?"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />
                    <div className="flex-col sm:flex-row flex justify-between items-center mt-4 ml-0 sm:ml-3">
                        {user ? (
                            <div className="flex pl-4 pb-4 sm:pb-0 sm:pl-0 items-center w-screen">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width='50px'
                                        height='50px'
                                        className="rounded-full"
                                    />
                                <span className="ml-2 text-sm sm:text-md text-gray-600 font-medium">{user.name}</span>
                            </div>
                        ) : (
                            <span
                                className="flex w-screen text-sm text-gray-400 font-medium"
                            >
                                Para enviar uma pergunta,&nbsp;
                                <button className="text-sm font-medium bg-transparent border-0 text-purple-500 hover:text-purple-400 underline cursor-pointer">
                                    faça seu login
                                </button>.
                            </span>) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Room