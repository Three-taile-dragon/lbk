export type HomeMenu = {
  id: number;
  title: string;
  icon: string;
  url: string;
  filePath: string;
  params: string;
  node: string;
  status: number;
  showSlider: number;
  children: [];
};

export type MenuTest = {
  menu: HomeMenu;
};

export const Menus: HomeMenu = {
  id: 0,
  title: "",
  icon: "",
  url: "",
  filePath: "",
  params: "",
  node: "",
  status: 0,
  showSlider: 0,
  children: [],
};
