import { languageColors } from "@/lib/languageColors";

export default function ProjectCover({ repo }) {
  if (repo.image) {
    return (
      <img
        src={repo.image}
        alt={repo.title}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  const color = languageColors[repo.language] || "#9ca3af";
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{
        // Solid base under the tinted gradient, which is only 19% opaque at its first stop
        backgroundColor: "#101010",
        backgroundImage: `linear-gradient(135deg, ${color}30 0%, #101010 75%)`,
      }}
    >
      <span className="text-5xl font-black" style={{ color }}>
        {repo.title.charAt(0)}
      </span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
        {repo.language || "Project"}
      </span>
    </div>
  );
}
