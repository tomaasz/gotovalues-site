import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeading } from "@/components/section-heading";

const meta = {
  title: "gotovalues/SectionHeading",
  component: SectionHeading,
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "Podejście techniczne",
    heading: "Nowoczesne, bezpieczne i tanie w utrzymaniu",
    children: <p className="section-note">Nagłówek sekcji używany na stronie głównej i landing page&apos;ach.</p>,
  },
};

export const Inline: Story = {
  args: {
    eyebrow: "Produkty",
    heading: "Działające przykłady",
    inline: true,
    children: <a className="text-link" href="/produkty">Zobacz więcej</a>,
  },
};
