import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductCard } from "@/components/product-card";
import { siteContent } from "@/content/site";

const meta = {
  title: "gotovalues/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => (
      <div className="product-grid">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicProduct: Story = {
  args: {
    product: siteContent.products.public[0],
  },
};

export const PrivateImplementation: Story = {
  args: {
    product: siteContent.products.private[0],
  },
};

export const Compact: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 980 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    product: siteContent.products.public[1],
    compact: true,
  },
};
