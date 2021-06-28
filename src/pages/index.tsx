import Head from 'next/head'
import Image from 'next/image'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

export default function Home() {
  return (
    <div className="flex items-stretch h-auto">
            <aside className="flex flex-col flex-7 justify-center bg-purple text-white py-28 px-20">
                <Image src={illustrationImg} alt="ilustração simbolizando pergunta e resposta" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main className="flex">
              <div>
                <Image src={logoImg} alt="Letmeask" />
                <button className="bg-purple-600 bg-opacity-100">
                  Crie sua sala com o Google
                  <Image src={googleIconImg} alt="Logo do google" />
                </button>
                <div>
                  ou entre em uma sala
                </div>
                <form>
                  <input
                    type="text"
                    placeholder="Digite o código da sala"
                  />
                  <button type="submit">
                    Entrar na sala
                  </button>
                </form>
              </div>
            </main>
        </div>
  )
}
