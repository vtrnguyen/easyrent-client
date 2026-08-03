import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { LuDatabaseBackup } from 'react-icons/lu';

import { SidebarMenu } from '@/types/sidebar';
import { appRoutes } from '@/common/constants/appConstants';
import { MdOutlineHomeWork } from 'react-icons/md';
import { FaRankingStar } from 'react-icons/fa6';

export const adminMenus: SidebarMenu[] = [
    {
        icon: FiHome,
        text: 'Dashboard',
        destination: `/${appRoutes.admin}`,
    },
    {
        icon: FiUsers,
        text: 'Quản lý người dùng',
        submenu: [
            {
                icon: FiUsers,
                text: 'Danh sách người dùng',
                destination: `/${appRoutes.admin}/${appRoutes.users}`,
            },
        ],
    },
    {
        icon: MdOutlineHomeWork,
        text: 'Quản lý chỗ ở',
        submenu: [
            {
                icon: FaRankingStar,
                text: 'Quản lý tiện ích',
                destination: `/${appRoutes.admin}/${appRoutes.utilities}`,
            },
            {
                icon: MdOutlineHomeWork,
                text: 'Danh sách chỗ ở',
                destination: `/${appRoutes.admin}/${appRoutes.properties}`,
            },
        ],
    },
    {
        icon: FiSettings,
        text: 'Cài đặt',
        submenu: [
            {
                icon: LuDatabaseBackup,
                text: 'Sao lưu & phục hồi',
                destination: `/${appRoutes.admin}/${appRoutes.backupAndRestore}`,
            },
        ],
    },
];
