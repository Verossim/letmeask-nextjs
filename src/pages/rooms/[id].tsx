import Image from 'next/image'
import { useRouter } from 'next/router'
import Router from "next/router"
import { FormEvent, useEffect, useState } from 'react'

import logoImg from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'



type RoomParams = {
    id: string
}

const Room: React.FC = () => {
    const { user } = useAuth()
    const params = useRouter().query as RoomParams
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id

    const { title, questions } = useRoom(roomId)


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
    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if (likeId) {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id 
             })
        }
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
                            </span>)}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="mt-8">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    aria-label="Marcar como gostei"
                                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                                    className={
                                    `
                                     border-0
                                     bg-transparent
                                     cursor-pointer
                                     flex items-end
                                     gap-2
                                     transition
                                     hover:brightness-90
                                     ${question.likeId ? 'text-purple-500' : 'text-gray-500'}
                                    `}
                                >
                                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke={question.likeId ? "#835afd" : "#737380"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    )
}

export default Room