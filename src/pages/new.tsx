import Image from 'next/image'
import Link from 'next/link'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

export default function newRoom() {
    return (
      <div className="flex-col sm:flex-row flex items-stretch h-screen">
              <aside className="flex flex-col flex-7 justify-center bg-purple text-white py-28 px-20">
                  <Image className="max-w-xs" src={illustrationImg} alt="ilustração simbolizando pergunta e resposta" />
                  <p className="text-2x1 sm:text-4x1 font-bold font-Poppins mt-4" >Crie Salas de Q&amp;A ao-vivo</p>
                  <p className="text-lg sm:text-2x1 leading-8 mt-4 text-white">Tire as dúvidas de sua audiência em tempo-real</p>
              </aside>
              <main className="flex flex-8 px-8 justify-center items-center">
                <div className="flex flex-col w-screen max-w-xs items-stretch text-center" >
                  <Image className="self-center" src={logoImg} alt="Letmeask" />
                  <h2
                    className="text-lg font-bold mx-10 my-10 font-Poppins"
                  >
                      Crie uma nova sala
                  </h2>
                  <form>
                    <input
                      type="text"
                      placeholder="Nome da sala"
                      className="
                      h-12 rounded-md px-4 bg-white border border-solid w-full
                      focus:border-opacity-0"
                    />
                    <Button 
                      type="submit"
                    >
                      Criar sala
                    </Button>
                  </form>
                  <p className="text-sm text-gray-500 mt-6">
                      Quer entrar em uma sala existente? <Link href="/">Clique aqui</Link>
                  </p>
                </div>
              </main>
          </div>
    )
  }
