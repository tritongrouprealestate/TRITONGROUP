import { ScrollChoreography } from "@/components/ui/scroll-choreography";

/* Villa imagery for Triton Humming Valley. Swap these for project
   photography — the component only needs four URLs of similar aspect. */
const images = {
  topLeft: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  topRight: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  bottomLeft: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  bottomRight: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
};

/* Alt text describes each photograph. The original component shipped
   "Top Left" / "Top Right (Hero)" as alt text, which describes the layout
   rather than the image and is useless to a screen reader. */
const alt = {
  topLeft: "Living volume wrapped around the villa's central water court",
  topRight: "Villa exterior at dusk, seen from the internal road",
  bottomLeft: "Double-height core in teak and stone, waterfall behind",
  bottomRight: "Villa approach through planted ground",
};

export default function Demo() {
  return (
    <div className="w-full min-h-screen">
      <ScrollChoreography images={images} alt={alt} />
    </div>
  );
}
