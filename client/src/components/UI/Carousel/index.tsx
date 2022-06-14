import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import Slider, { Settings } from "react-slick";

interface CarouselProps<T> {
  items: T[];
  component: FC<T>;
  keyExtractor(item: T): string | number;
  carouselOptions?: Settings;
}

export interface CarouselRef {
  next(): void;
  previous(): void;
}

const sliderOptions: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1040,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 740,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function CarouselInner<T>(
  props: CarouselProps<T>,
  ref: ForwardedRef<CarouselRef>
) {
  const {
    items,
    component,
    keyExtractor,
    carouselOptions = sliderOptions,
  } = props;
  const Component = component;
  const sliderRef = useRef<Slider>(null);

  const renderedItems = items.map((item) => (
    <Component key={keyExtractor(item)} {...item} />
  ));

  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current?.slickNext(),
    previous: () => sliderRef.current?.slickPrev(),
  }));

  return (
    <Slider ref={sliderRef} {...carouselOptions}>
      {renderedItems}
    </Slider>
  );
}

const Carousel = forwardRef(CarouselInner) as <T>(
  props: CarouselProps<T> & { ref?: ForwardedRef<CarouselRef> }
) => ReturnType<typeof CarouselInner>;

export default Carousel;
