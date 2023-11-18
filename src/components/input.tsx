import React from "react";

import { MdSend } from "react-icons/md";


export default function MessageInput(props: {
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onSubmit: () => void,
    className?: string
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return(
        <div className={`lg:w-5/6 w-full flex items-center relative rounded-md bg-[#404040] ${props.className}`}>
            <input 
                ref={inputRef}
                onChange={props.onChange}
                type="text" 
                className="w-[95%] p-4 bg-transparent border-none outline-none text-white"
            />
            <MdSend 
                className="absolute right-4 text-white cursor-pointer hover:text-opacity-70 duration-300"
                size={24}
                onClick={() => {
                    props.onSubmit();

                    if(inputRef.current) {
                        inputRef.current.value = "";
                    }
                }}
            />
        </div>
    )
}