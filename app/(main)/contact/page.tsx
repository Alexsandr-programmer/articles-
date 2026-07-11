import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us for any questions or feedback",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries, feedback, or support requests.",
    value: "hello@articles-platform.dev",
  },
  {
    icon: MessageSquare,
    title: "Community",
    description:
      "Join discussions, share ideas, and connect with other writers.",
    value: "community.articles-platform.dev",
  },
  {
    icon: Clock,
    title: "Response time",
    description: "We usually reply within 1–2 business days.",
    value: "Mon – Fri, 9:00 – 18:00",
  },
];

const topics = [
  "Account and login issues",
  "Publishing or editing articles",
  "Bug reports and technical problems",
  "Partnerships and collaboration",
  "General feedback about the platform",
];

export default function Contact() {
  return (
    <div className="w-full space-y-10">
      <div className="space-y-3">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Contact us
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          Have a question, found a bug, or just want to say hello? We are here
          to help. Reach out through any of the channels below.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          Get in touch
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method) => (
            <Card key={method.title}>
              <CardHeader>
                <method.icon className="text-muted-foreground size-5" />
                <CardTitle>{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{method.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          What can we help with?
        </h2>
        <Card>
          <CardHeader>
            <HelpCircle className="text-muted-foreground size-5" />
            <CardTitle>Common topics</CardTitle>
            <CardDescription>
              Not sure what to write about? Here are a few things people usually
              contact us about.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm sm:text-base">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium tracking-tight sm:text-xl">
          Before you write
        </h2>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm leading-relaxed sm:text-base">
          For faster help, include your account email and a short description of
          the issue. Screenshots are always welcome if something looks broken on
          your screen.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Learn more about the platform</CardTitle>
          <CardDescription>
            New here? Check out what this project is all about.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Visit the{" "}
            <a
              href="/about"
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              About
            </a>{" "}
            page to learn about our mission, features, and how everything works.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
