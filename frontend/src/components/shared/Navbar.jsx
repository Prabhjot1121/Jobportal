import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import React from 'react'
import { LogIn, LogOut, User2 } from "lucide-react"
import { Link } from "react-router-dom"
const Navbar = () => {
    const user = false;
    return (

        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>job <span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className="flex gap-2 items-center">
                    <ul className='flex gap-5 items-center font-medium'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline" className=" bg-[#ffffff] hover:bg-[#6A38C2] text-[#6A38C2] hover:text-[#ffffff]">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className=" bg-[#6A38C2] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#6A38C2]">SignUp</Button>
                                </Link>                    </div>
                        ) : (<Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-2 space-y-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">
                                            Prabhjot Singh
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-gray-600" my-2>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <User2 />
                                        <Button variant="link" > View Profile</Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant="link" > LogOut</Button>
                                    </div>


                                </div>
                            </PopoverContent>
                        </Popover>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
