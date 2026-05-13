import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactSignals } from "@/components/contact-signals";

const meta = {
  title: "gotovalues/ContactSignals",
  component: ContactSignals,
  decorators: [
    (Story) => (
      <div className="about-card" style={{ maxWidth: 760 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactSignals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
