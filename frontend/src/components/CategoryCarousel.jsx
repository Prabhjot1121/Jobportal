import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Devops",
    "DataScience"
]
const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full mx-auto my-20 max-w-xl">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <Button variant="outline" className="rounded-full" >{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
