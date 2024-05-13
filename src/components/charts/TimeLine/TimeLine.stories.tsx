import { Meta, StoryObj } from "@storybook/react";
import TimeLine from ".";

const meta: Meta<typeof TimeLine> = {
  component: TimeLine,
  title: "components/charts/TimeLine",
  tags: ["autodocs"],
  argTypes: {
    datasets: { control: { type: "object" } },
    className: { control: { type: "text" } },
    ticks: { control: { type: "number" } },
    startTime: { control: { type: "date" } },
    endTime: { control: { type: "date" } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    datasets: [
      {
        color: "rgba(255,255,0,0.5)",
        from: new Date("2024/05/10 12:30:00"),
        to: new Date("2024/05/10 19:30:00"),
      },
    ],
    className: "w-[800px] h-[80px]",
  },
};

export const Padding: Story = {
  args: {
    datasets: [
      {
        color: "rgba(255,255,0,0.5)",
        from: new Date("2024/05/10 12:30:00"),
        to: new Date("2024/05/10 19:30:00"),
      },
    ],
    className: "w-[800px] h-[80px]",
  },
  render: () => (
    <div className="w-[800px] h-[80px] border">
      <TimeLine
        datasets={[
          {
            color: "rgba(255,255,0,0.5)",
            from: new Date("2024/05/10 12:30:00"),
            to: new Date("2024/05/10 17:30:00"),
          },
          {
            color: "rgba(0,255,0,0.5)",
            from: new Date("2024/05/10 18:30:00"),
            to: new Date("2024/05/10 19:30:00"),
          },
        ]}
        padding={{ top: 10, left: 50, bottom: 20, right: 50 }}
        linePaddingTop={10}
        linePaddingBottom={5}
      />
    </div>
  ),
};

export const BetweenTime: Story = {
  args: {
    datasets: [
      {
        color: "rgba(255,255,0,0.5)",
        from: new Date("2024/05/10 17:30:00"),
        to: new Date("2024/05/10 19:30:00"),
      },
    ],
    className: "w-[800px] h-[80px]",
    startTime: new Date("2024/05/10 16:30:00"),
    endTime: new Date("2024/05/10 23:00:00"),
    ticks: 7,
  },
};

export const Ticks: Story = {
  args: {
    datasets: [
      {
        color: "rgba(255,255,0,0.5)",
        from: new Date("2024/05/10 17:30:00"),
        to: new Date("2024/05/10 19:30:00"),
      },
    ],
    className: "w-[800px] h-[80px]",
    startTime: new Date("2024/05/10 16:15:00"),
    endTime: new Date("2024/05/10 23:00:00"),
    ticks: 14,
  },
};
