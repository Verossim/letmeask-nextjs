import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/router";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { signInWithGoogle, user } = useContext(AuthContext);

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    router.push("/new");
  };

  return (
    <div className="flex-col sm:flex-row flex items-stretch h-screen">
      <aside className="flex flex-col flex-7 justify-center bg-purple text-white py-28 px-20">
        <Image
          className="max-w-xs"
          src={illustrationImg}
          alt="ilustração simbolizando pergunta e resposta"
        />
        <p className="text-2x1 sm:text-4x1 font-bold font-Poppins mt-4">
          Crie Salas de Q&amp;A ao-vivo
        </p>
        <p className="text-lg sm:text-2x1 leading-8 mt-4 text-white">
          Tire as dúvidas de sua audiência em tempo-real
        </p>
      </aside>
      <main className="flex flex-8 px-8 justify-center items-center">
        <div className="flex flex-col w-screen max-w-xs items-stretch text-center">
          <Image className="self-center" src={logoImg} alt="Letmeask" />
          <button
            className=" 
                  flex items-center 
                  justify-center 
                  w-full mt-16 h-12
                  rounded-md font-medium 
                  bg-red-500 hover:bg-red-600
                  transition
                  text-white
                  cursor-pointer
                  border-0"
            onClick={handleCreateRoom}
          >
            <Image width={40} src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div
            className="
                  flex items-center justify-center
                  text-sm text-gray-400 my-8
                  before:content 
                  before:flex-auto
                  before:h-px
                  before:bg-gray-400 
                  before:mr-4
                  after:content 
                  after:flex-auto
                  after:h-px 
                  after:bg-gray-400 
                  after:ml-4"
            data-content=""
          >
            ou entre em uma sala
          </div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
              className="
                    h-12 rounded-md px-4 bg-white border border-solid w-full
                    focus:border-opacity-0"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
