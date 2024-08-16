import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-4 rounded-full bg-gray-200 text-[#f83002] font-medium'>
                    Best Job Hunt website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get your <span className='text-[#6a38c2]'>Dream Job</span>
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae autem tempora officia culpa et aliquid!</p>
                <div className='w-[40%] shadow-lg border border-gray-200 pl-3 pr-1 rounded-full items-center flex gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='find your dream job'
                        className='w-full py-2 pl-3 outline-none rounded-l-full'
                    />
                    <Button className="rounded-r-full bg-[#6a38c2] ">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
