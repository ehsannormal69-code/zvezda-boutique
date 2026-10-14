export type Dress = {
  id: string;
  /** Working name — replace when the real product names are supplied. */
  name: string;
  subtitle: string;
  description: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  /** The flat field this specimen sits on in the catalogue. */
  field: "wine" | "plum" | "accent";
  /** The square tile colour on the pinned plate (differs from the field for contrast). */
  plateField: "wine" | "plum" | "accent";
  /** Prefilled WhatsApp enquiry for this piece. */
  enquiryMessage: string;
};

export const WHATSAPP_NUMBER = "97430997055";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const collection: Dress[] = [
  {
    id: "dress-01",
    name: "Dress One",
    subtitle: "Embroidered black salwar suit",
    description:
      "A black salwar suit embroidered all over in gold thread, shown with its dupatta and wide-legged trousers.",
    image: "/images/dress-01.jpg",
    width: 1080,
    height: 767,
    alt: "Black salwar suit with all-over gold embroidery, styled with a matching dupatta, shown full length and in detail",
    field: "wine",
    plateField: "accent",
    enquiryMessage: "Hi ZVEZDA, I am interested in Dress One (the embroidered black suit). Is it available?",
  },
  {
    id: "dress-02",
    name: "Dress Two",
    subtitle: "Purple floral salwar suit",
    description:
      "A purple floral print salwar suit with a lace-trimmed neckline, pearl-drop sleeves and a cream dupatta.",
    image: "/images/dress-02.jpg",
    width: 1080,
    height: 1440,
    alt: "Purple floral print salwar suit with a lace neckline and cream dupatta, photographed on a wooden hanger",
    field: "plum",
    plateField: "wine",
    enquiryMessage: "Hi ZVEZDA, I am interested in Dress Two (the purple floral suit). Is it available?",
  },
  {
    id: "dress-03",
    name: "Dress Three",
    subtitle: "Pink floral salwar suit",
    description:
      "A pink floral salwar suit with butterfly lace at the neck, scalloped cuffs and a cream dupatta.",
    image: "/images/dress-03.jpg",
    width: 1080,
    height: 1440,
    alt: "Pink floral salwar suit with butterfly lace neckline and scalloped cuffs, photographed on a wooden hanger",
    field: "accent",
    plateField: "plum",
    enquiryMessage: "Hi ZVEZDA, I am interested in Dress Three (the pink floral suit). Is it available?",
  },
];
