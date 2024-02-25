import { Link } from "react-router-dom";

export default function Card({title,description,btnText,link}) {
    return (
        <div className="flex flex-col justify-between gap-12 md:max-w-[20vw]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-pink-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="text-4xl font-bold">{title}</h3>
            <p className="text-xl mb-4">{description}</p>
            <Link to={link} className="inline-block w-fit font-bold text-xl relative px-8 py-2 rounded-md bg-pink-500 isolation-auto z-10 border-2 border-pink-500 text-black
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
                {btnText}
            </Link>
        </div>
    )
}