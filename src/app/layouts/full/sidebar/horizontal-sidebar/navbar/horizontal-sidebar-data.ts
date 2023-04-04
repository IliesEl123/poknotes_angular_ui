import { NavItem } from '../../vertical-sidebar/menu-list-item/nav-item';

export const navItems: NavItem[] = [
    {
        navCap: 'Home'
    },
    {
        displayName: 'Starter',
        iconName: 'home',
        route: '/starter'
    },
    {
        displayName: 'Dashboard',
        iconName: 'home',
        route: 'mnlvl1/mnlvl1-1/page2'
    },
    {
        navCap: 'Multi DD'
    },
    {
        displayName: 'Menu Level',
        iconName: 'align-left',
        route: 'mnlvl1',
        children: [
            {
                displayName: 'Level-1',
                iconName: 'coffee',
                route: 'mnlvl1/mnlvl1-1',
                children: [
                    {
                        displayName: 'Page1',
                        iconName: 'disc',
                        route: 'mnlvl1/mnlvl1-1/page1'
                    },
                    {
                        displayName: 'Page2',
                        iconName: 'disc',
                        route: 'mnlvl1/mnlvl1-1/page2'
                    },
                    {
                        displayName: 'Page3',
                        iconName: 'disc',
                        route: 'mnlvl1/mnlvl1-1/page3'
                    },

                ]
            },
            {
                displayName: 'Page Level-1',
                iconName: 'coffee',
                route: 'mnlvl1/pglvl1-1',
                children: [
                    {
                        displayName: 'Page Level 2',
                        iconName: 'coffee',
                        route: 'mnlvl1/pglvl1-1/mnlvl2',

                    },


                ]
            },


        ]
    },


];