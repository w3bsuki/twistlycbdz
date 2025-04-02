"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time?: string;
}

// CBD educational content and benefits
const notifications: Item[] = [
  {
    name: "CBD for Anxiety",
    description: "Research shows CBD may reduce anxiety symptoms",
    icon: "🧠",
    color: "#00C9A7",
  },
  {
    name: "Pain Management",
    description: "CBD could help with chronic pain conditions",
    icon: "💆",
    color: "#FFB800",
  },
  {
    name: "Better Sleep",
    description: "CBD may improve sleep quality and duration",
    icon: "😴",
    color: "#1E86FF",
  },
  {
    name: "Reduce Inflammation",
    description: "Studies show anti-inflammatory properties",
    icon: "🔬",
    color: "#FF3D71",
  },
  {
    name: "Stress Relief",
    description: "CBD can help manage everyday stress",
    icon: "🌿",
    color: "#7928CA",
  },
  {
    name: "Focus & Clarity",
    description: "Some users report improved concentration",
    icon: "🧘",
    color: "#FF6A3A",
  },
];

const Notification = ({ name, description, icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-md cursor-pointer overflow-hidden rounded-xl p-3",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        // light styles
        "bg-white/90 shadow-sm",
        // dark styles
        "transform-gpu dark:bg-black/20 dark:backdrop-blur-sm dark:border-[1px] dark:border-white/10",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-base">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex items-center text-base font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs text-neutral-600 dark:text-white/60 line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden p-2 justify-center",
        className,
      )}
    >
      <AnimatedList delay={2500} className="overflow-hidden">
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
} 