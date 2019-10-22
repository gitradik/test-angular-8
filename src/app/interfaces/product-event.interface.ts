interface Event {
  id: number;
  name: string;
  date: any;
}

interface ProductEvent {
  previous: Event;
  current: Event;
}

export default ProductEvent;
