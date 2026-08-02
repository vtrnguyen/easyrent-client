import { FiHome } from 'react-icons/fi';

import { SidebarMenu } from '@/types/sidebar';
import { appRoutes } from '@/common/constants/appConstants';
import { MdOutlineHomeWork } from 'react-icons/md';

export const landlordMenus: SidebarMenu[] = [
    {
        icon: FiHome,
        text: 'Dashboard',
        destination: `/${appRoutes.landlord}`,
    },
    {
        icon: MdOutlineHomeWork,
        text: 'Quản lý chỗ ở',
        submenu: [
            {
                icon: MdOutlineHomeWork,
                text: 'Danh sách chỗ ở',
                destination: `/${appRoutes.landlord}/${appRoutes.properties}`,
            },
        ],
    },
];
