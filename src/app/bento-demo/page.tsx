import BentoGridThirdDemo from "@/components/bento-grid-demo-3";
import { Container } from "@/components/ui/container";

export default function BentoGridDemoPage() {
  return (
    <main className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Bento Grid Demo</h1>
          <p className="text-lg text-gray-600">
            A showcase of the bento grid component with various interactive elements.
          </p>
        </div>
        
        <BentoGridThirdDemo />
      </Container>
    </main>
  );
} 