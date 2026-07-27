import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { LuDatabaseBackup } from 'react-icons/lu';

import { SidebarMenu } from '@/types/sidebar';
import { appRoutes } from '@/common/constants/appConstants';

export const adminMenus: SidebarMenu[] = [
    {
        icon: FiHome,
        text: 'Dashboard',
        destination: '/admin',
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
