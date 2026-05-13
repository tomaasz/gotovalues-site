import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'Shared UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here. Use this for secondary context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area. Put your primary content here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[380px] p-6">
      <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
      <p className="text-sm text-muted-foreground">
        A minimal card with just padding and content — no subcomponents.
      </p>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <CardTitle className="mb-2">Card {i}</CardTitle>
          <CardDescription>This is card number {i} in a responsive grid.</CardDescription>
        </Card>
      ))}
    </div>
  ),
};
