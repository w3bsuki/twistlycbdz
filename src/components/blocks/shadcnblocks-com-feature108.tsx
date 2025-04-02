import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Heart, Sparkles, Dumbbell } from "lucide-react";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "Twistly CBD",
  heading = "Premium CBD Products for Every Lifestyle",
  description = "Discover our range of high-quality CBD products tailored for your health, beauty, and athletic needs.",
  tabs = [
    {
      value: "health",
      icon: <Heart className="h-auto w-4 shrink-0" />,
      label: "Health",
      content: {
        badge: "Wellness Solutions",
        title: "Enhance Your Daily Wellness",
        description:
          "Our premium CBD health products are designed to support your overall wellbeing, from better sleep to stress relief and immune system support.",
        buttonText: "Shop Health",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        imageAlt: "CBD Health Products",
      },
    },
    {
      value: "beauty",
      icon: <Sparkles className="h-auto w-4 shrink-0" />,
      label: "Beauty",
      content: {
        badge: "Beauty & Skincare",
        title: "Radiant Beauty with CBD",
        description:
          "Experience the power of CBD-infused beauty products. Our skincare line helps maintain healthy, glowing skin while providing natural anti-aging benefits.",
        buttonText: "Shop Beauty",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
        imageAlt: "CBD Beauty Products",
      },
    },
    {
      value: "sport",
      icon: <Dumbbell className="h-auto w-4 shrink-0" />,
      label: "Sport",
      content: {
        badge: "Athletic Performance",
        title: "Optimize Your Performance",
        description:
          "Whether you're an athlete or fitness enthusiast, our CBD sports products help with recovery, muscle relief, and maintaining peak performance.",
        buttonText: "Shop Sport",
        imageSrc:
          "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
        imageAlt: "CBD Sport Products",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h1>
          <p className="text-muted-foreground max-w-xl">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-8 rounded-2xl bg-muted/70 p-4 md:p-8">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl font-semibold lg:text-4xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <AspectRatio ratio={4/3} className="bg-muted">
                    <img
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  </AspectRatio>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 }; 