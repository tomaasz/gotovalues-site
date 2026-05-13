import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactForm } from "@/components/contact-form";

const meta = {
  title: "gotovalues/ContactForm",
  component: ContactForm,
  parameters: {
    docs: {
      description: {
        component: "Formularz kontaktowy. W Storybooku renderowany bez wysyłki do prawdziwego endpointu, dopóki użytkownik go nie submituje.",
      },
    },
  },
  decorators: [
    (Story) => (
      <section className="contact-card surface">
        <div className="contact-copy">
          <p className="eyebrow">Kontakt</p>
          <h2>Opisz proces do uporządkowania</h2>
          <p>Podgląd układu formularza w izolacji.</p>
        </div>
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
