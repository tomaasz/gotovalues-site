import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteHeader } from "@/components/site-header";

const meta = {
  title: "gotovalues/SiteHeader",
  component: SiteHeader,
  parameters: {
    docs: {
      description: {
        component: "Główna nawigacja gotovalues.com.",
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
