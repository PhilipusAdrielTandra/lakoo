import { Component } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import { CarouselData } from "../assets/CarouselData";

interface CarouselProps {}

interface CarouselState {
  currentSlide: number;
  paused: boolean;
}

class Carousel extends Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  //setting interval for autoplaying slides
  componentDidMount(){
    setInterval(() => {
      if(this.state.paused === false){
        let newSlide = this.state.currentSlide === CarouselData.length - 1 ? 0 : this.state.currentSlide + 1
        this.setState({currentSlide: newSlide})
      }
    }, 5000)
  }

  //changing to the next slide
  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };
  
  //changing to the previous slide
  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  //changing the currentslide
  setCurrentSlide = (index : number) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="">
        <div className="w-screen h-auto flex overflow-hidden relative">

        {/* left arrow */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex items-center">
          <AiOutlineLeft onClick={this.prevSlide} className='text-3xl text-white cursor-pointer' />
        </div>

        {/* right arrow */}
        <div className="absolute w-100 left-80 ml-20 top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="ml-8">
          <AiOutlineRight onClick={this.nextSlide} className='text-3xl text-white cursor-pointer ml-20' />
          </div>
        </div>
        
        <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>  
          {CarouselData.map((slide : any, index : number) => {
            return (
              <img
              //setting a pause on hover functionality
              //pauses when it sees the mouse on the img
              onMouseEnter={() => {
                this.setState({paused: true})
              }}
              
              //unpauses when the mouse leaves the img
              onMouseLeave={() => {
                this.setState({paused: false})
              }}
                src={slide.image}
                alt="This is a carousel slide"
                key={index}
                className={
                  index === this.state.currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
              />
            );
          })}
          </Swipe>

          {/* adding the dots to navigate the carousel */}
          <div className="ml-8 absolute flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-2 bg-red-700 rounded-full mx-2 mb-8 cursor-pointer"
                      : "h-2 w-2 bg-white rounded-full mx-2 mb-8 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;