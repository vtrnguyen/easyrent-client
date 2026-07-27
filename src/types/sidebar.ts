import { IconType } from 'react-icons';

export interface SidebarItem {
    icon: IconType;
    text: string;
    destination: string;
}

export interface SidebarGroup {
    icon: IconType;
    text: string;
    submenu: SidebarItem[];
}

export type SidebarMenu = SidebarItem | SidebarGroup;
