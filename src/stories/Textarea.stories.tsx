import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Textarea> = {
  title: 'Shared UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Write your message...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." {...args} />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="limited">Limited input (500 chars)</Label>
      <Textarea id="limited" maxLength={500} placeholder="Type something..." {...args} />
      <p className="text-xs text-muted-foreground text-right">0 / 500</p>
    </div>
  ),
};
