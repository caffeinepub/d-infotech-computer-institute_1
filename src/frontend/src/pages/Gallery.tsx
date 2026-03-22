import { useState } from "react";

type GalleryItem = {
  label: string;
  category: "Classrooms" | "Events" | "Certificates";
  color: string;
  subtext: string;
};

const galleryItems: GalleryItem[] = [
  {
    label: "Computer Lab – Lab A",
    category: "Classrooms",
    color: "bg-orange-600",
    subtext: "30-seat lab with latest hardware",
  },
  {
    label: "MS-CIT Batch 2024",
    category: "Events",
    color: "bg-orange-800",
    subtext: "Morning batch students",
  },
  {
    label: "Certificate Distribution",
    category: "Certificates",
    color: "bg-orange-500",
    subtext: "MKCL Certification Ceremony",
  },
  {
    label: "Classroom Training",
    category: "Classrooms",
    color: "bg-orange-700",
    subtext: "Interactive classroom session",
  },
  {
    label: "Tally Workshop",
    category: "Events",
    color: "bg-orange-900",
    subtext: "Hands-on accounting training",
  },
  {
    label: "KLiC Award Ceremony",
    category: "Certificates",
    color: "bg-orange-600",
    subtext: "Annual achievement awards",
  },
  {
    label: "Hardware Lab",
    category: "Classrooms",
    color: "bg-orange-500",
    subtext: "Assembly and repair station",
  },
  {
    label: "DTP Design Expo",
    category: "Events",
    color: "bg-orange-700",
    subtext: "Student design showcase",
  },
  {
    label: "MS-CIT Excellence Award",
    category: "Certificates",
    color: "bg-orange-800",
    subtext: "Top scorer recognition",
  },
  {
    label: "IoT Project Display",
    category: "Events",
    color: "bg-orange-600",
    subtext: "Student IoT mini projects",
  },
  {
    label: "AI Workshop 2025",
    category: "Events",
    color: "bg-orange-900",
    subtext: "Introduction to AI tools",
  },
  {
    label: "Networking Lab",
    category: "Classrooms",
    color: "bg-orange-500",
    subtext: "LAN/WAN setup practice",
  },
];

const categories = ["All", "Classrooms", "Events", "Certificates"] as const;
type Category = (typeof categories)[number];

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === active);

  return (
    <div>
      {/* Banner */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Gallery</h1>
          <p className="text-orange-100 text-lg">
            A glimpse into life at D-Infotech
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                data-ocid="gallery.tab"
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  active === cat
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.label}
                className="relative group rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                style={{ minHeight: "200px" }}
              >
                <div className={`absolute inset-0 ${item.color}`} />
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative flex flex-col items-center justify-center h-full min-h-[200px] p-8 text-center">
                  <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-black text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-white/70 text-sm">{item.subtext}</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-orange-600 px-4 py-2 rounded-full">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
