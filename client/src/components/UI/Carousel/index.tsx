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
}

export interface CarouselRef {
  next(): void;
  previous(): void;
}

function CarouselInner<T>(
  props: CarouselProps<T>,
  ref: ForwardedRef<CarouselRef>
) {
  const { items, component, keyExtractor } = props;
  const Component = component;
  const sliderOptions: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const sliderRef = useRef<Slider>(null);

  const renderedItems = items.map((item) => (
    <Component key={keyExtractor(item)} {...item} />
  ));

  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current?.slickNext(),
    previous: () => sliderRef.current?.slickPrev(),
  }));

  return (
    <Slider ref={sliderRef} {...sliderOptions}>
      {renderedItems}
    </Slider>
  );
}

const Carousel = forwardRef(CarouselInner) as <T>(
  props: CarouselProps<T> & { ref?: ForwardedRef<CarouselRef> }
) => ReturnType<typeof CarouselInner>;

export default Carousel;
