import Image from 'next/image'
import { useRouter } from 'next/router'
import Router from "next/router"
//import { FormEvent, useEffect, useState } from 'react'

import logoImg from '../../../assets/images/logo.svg'
import deleteImg from '../../../assets/images/delete.svg'
import checkImg from '../../../assets/images/check.svg'
import answerImg from '../../../assets/images/answer.svg'

//import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { Question } from '../../../components/Question'
//import { useAuth } from '../../../hooks/useAuth'
import { useRoom } from '../../../hooks/useRoom'
import { database } from '../../../services/firebase'



type RoomParams = {
    id: string
}

const AdminRoom: React.FC = () => {
    //const { user } = useAuth()
    const params = useRouter().query as RoomParams
    const roomId = params.id

    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que você deseja excluir essa sala?')) {
            await database.ref(`rooms/${roomId}`).update({
                endedAt: new Date()
            })
            Router.push('/')
        }
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
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
                    <div className="flex gap-4">
                        <RoomCode code={params.id} />
                        <button className="
                        h-10 w-32
                        bg-white
                        border
                        border-purple-500 hover:bg-purple-200 transition
                        text-purple-500
                        rounded-md font-medium
                        "
                            onClick={handleEndRoom}
                        >Encerrar Sala</button>
                    </div>
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

                <div className="mt-8">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered &&
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <Image
                                                src={checkImg}
                                                width='60px'
                                                height='60px'
                                                alt="Marcar pergunta como respondida"
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <Image
                                                src={answerImg}
                                                width='60px'
                                                height='60px'
                                                alt="Dar destaque a pergunta"
                                            />
                                        </button>
                                    </>
                                }

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <Image
                                        src={deleteImg}
                                        width={!question.isAnswered ? '60px' : '45px'}
                                        height={!question.isAnswered ? '60px' : '45px'}
                                        alt="remover pergunta"
                                    />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    )
}

export default AdminRoom