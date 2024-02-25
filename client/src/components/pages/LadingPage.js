import { Link, Navigate } from "react-router-dom";
import Card from "../UI/Card";
import blogImg from '../../images/blog.jpg'
import { useContext } from "react";
import { UserContext } from "../../store/user-context";

export default function LadingPage() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    if (userInfo?.id) {
        return <Navigate to={'/home'} />
    }
    return (
        <>
            {!userInfo?.id && (
                <div>
                    <div className='h-[80vh] flex justify-center items-center px-4'>
                        <div className="">
                            <h1 className="md:text-6xl text-4xl font-bold">Unleash Your Creativity with Yash Blogs</h1>
                            <h3 className='mt-4 md:text-4xl text-2xl text-gray-300'>Yash Blogs - Where Your Words Come to Life</h3>
                            <Link to='/home' className="text-2xl mt-8 md:mx-auto relative border hover:border-pink-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-pink-800 p-2 flex justify-center items-center font-extrabold">
                                <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-900 delay-150 group-hover:delay-75"></div>
                                <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-800 delay-150 group-hover:delay-100"></div>
                                <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-700 delay-150 group-hover:delay-150"></div>
                                <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-600 delay-150 group-hover:delay-200"></div>
                                <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-500 delay-150 group-hover:delay-300"></div>
                                <p className="z-10">Discover More</p>
                            </Link>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 gap-4 md:p-48 px-4 py-8 bg-[#83184335]">
                        <div className="">
                            <h1 className="md:text-6xl text-2xl leading-5">Welcome to Yash Blogs</h1>
                            <Link to='/register' className="text-2xl mt-8 mb-8 relative border hover:border-pink-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-pink-800 p-2 flex justify-center items-center font-extrabold">
                                <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-900 delay-150 group-hover:delay-75"></div>
                                <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-800 delay-150 group-hover:delay-100"></div>
                                <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-700 delay-150 group-hover:delay-150"></div>
                                <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-600 delay-150 group-hover:delay-200"></div>
                                <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-500 delay-150 group-hover:delay-300"></div>
                                <p className="z-10">Share Your Blogs</p>
                            </Link>
                        </div>
                        <div>
                            <p className="md:text-2xl text-xl">Dive into a world of creativity and inspiration at Yash Blogs. <br /> Express yourself, connect with others, and explore a universe of unique perspectives.</p>
                        </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-12 md:p-48 p-12">
                        <Card
                            title="Post Your Blogs"
                            description="Share your thoughts, stories, and ideas with the world in just a few clicks."
                            btnText="Find Out More"
                            link="/register"
                        />
                        <Card
                            title="Read New Blogs"
                            description="Discover fresh content from talented writers across various genres and topics."
                            btnText="Read"
                            link="/home"
                        />
                        <Card
                            title="Connect with Creatives"
                            description="Engage with like-minded individuals, exchange feedback, and build a community of passionate bloggers."
                            btnText="Connect"
                            link="/register"
                        />
                    </div>
                    <div className="backgroundImg">
                        <div className="md:p-80 p-12 text-center bg-[#000000a1]">
                            <h1 className="md:text-8xl text-2xl mb-8">Let Your Voice Be Heard - Start Blogging Today!</h1>
                            <p className="md:text-4xl text-xl">Join Yash Blogs to unleash your creativity, inspire others, and be part of a vibrant blogging community that values your unique voice.</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="md:p-12 md:text-2xl p-3 text-center">By <a href="https://www.linkedin.com/in/hinguyash/" target="_blank" className="text-pink-900 font-bold underline">Yash Hingu</a>
                        </h2>
                    </div>
                </div>
            )}
        </>
    )
}