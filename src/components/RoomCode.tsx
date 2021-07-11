import Image from 'next/image'

import copyImg from '../assets/images/copy.svg'

type RoomCodeProps = {
    code: string;
}

export function RoomCode (props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button 
            className="h-10 rounded-lg
            overflow-hidden 
            bg-white
            border-solid border border-purple-600
            cursor-pointer
            flex
            active:animate-ping"
            onClick={copyRoomCodeToClipboard}
        >
            <div 
                className="flex justify-center items-center bg-purple-600 px-3"
            >
                <Image height="40px" src={copyImg} alt="Copy room code"/>
            </div>
            <span
                className="block self-center flex-1 pr-4 pl-3 w-60 text-sm font-medium"
            >Sala #{props.code}</span>
        </button>
    )
}
