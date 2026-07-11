import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, PenLine, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About the platform",
};

const features = [
  {
    icon: PenLine,
    title: "Write & publish",
    description:
      "Create articles, share your ideas, and publish them for everyone to read.",
  },
  {
    icon: BookOpen,
    title: "Discover content",
    description:
      "Browse articles from other authors and explore topics that interest you.",
  },
  {
    icon: Users,
    title: "Join the community",
    description:
      "Connect with readers and writers who share your passion for great stories.",
  },
];

export default function About() {
  return (
    <div className="w-full space-y-10">
      <div className="space-y-3">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          About us
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          A simple platform for writing, reading, and sharing articles. Whether
          you are a seasoned author or just getting started, this is your space
          to express yourself.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          Our mission
        </h2>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm leading-relaxed sm:text-base">
          We believe everyone has something worth saying. Our goal is to make
          publishing easy and accessible — no complicated setup, no
          distractions. Just you and your words.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          What you can do here
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="text-muted-foreground size-5" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          How it started
        </h2>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm leading-relaxed sm:text-base">
          This project began as a learning exercise — a place to practice modern
          web development while building something useful. Over time it grew
          into a full-featured article platform with authentication, profiles,
          and an admin panel.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Ready to get started?</CardTitle>
          <CardDescription>
            Create an account, write your first article, and share it with the
            world. It only takes a few minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Have questions? Head over to the{" "}
            <a
              href="/contact"
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              Contact
            </a>{" "}
            page — we would love to hear from you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
