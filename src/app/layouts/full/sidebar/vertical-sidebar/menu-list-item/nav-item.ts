export interface NavItem {
    displayName?: string;
    disabled?: boolean;
    iconName?: string;
    navCap?: string;
    route?: string;
    children?: NavItem[];
    ddType?: string;
}