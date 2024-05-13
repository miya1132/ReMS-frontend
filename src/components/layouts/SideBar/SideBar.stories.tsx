import { Meta, StoryObj } from "@storybook/react";
import SideBar from ".";

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  title: "components/layouts/SideBar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    menus: [
      [
        { id: "menu01", title: "ホーム", path: "/", icon: "FaHome" },
        { id: "menu03", title: "設定", path: "/2", icon: "FaGear" },
      ],
      [{ id: "menu04", title: "ログオフ", path: "/3", icon: "FaSignOutAlt" }],
    ],
  },
};
