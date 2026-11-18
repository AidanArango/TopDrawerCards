export type SampleCard = {
  id: string;
  title: string;
  label: string;
  image: string;
  alt: string;
};

export const sampleCards: SampleCard[] = [
  {
    id: "sample-card-01",
    title: "First Touch",
    label: "Men's soccer · demo artwork",
    image: "/images/demo-card-01.svg",
    alt: "Illustrated men's soccer card placeholder, clearly marked as demo artwork",
  },
  {
    id: "sample-card-02",
    title: "The Away End",
    label: "Women's soccer · demo artwork",
    image: "/images/demo-card-02.svg",
    alt: "Illustrated women's soccer card placeholder, clearly marked as demo artwork",
  },
  {
    id: "sample-card-03",
    title: "Matchday Study",
    label: "Soccer · demo artwork",
    image: "/images/demo-card-03.svg",
    alt: "Illustrated soccer card placeholder, clearly marked as demo artwork",
  },
  {
    id: "sample-card-04",
    title: "The Long View",
    label: "Soccer · demo artwork",
    image: "/images/demo-card-04.svg",
    alt: "Illustrated soccer card placeholder, clearly marked as demo artwork",
  },
];
