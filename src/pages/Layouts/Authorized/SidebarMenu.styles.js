import styled from 'styled-components';
import { Menu } from 'antd';
import { colors } from '../../../styles/colors';

/**
 * Menu lateral do layout autorizado.
 * Estilos do Sider centralizados aqui (cor dos ícones, item selecionado, hover, padding).
 */
export const StyledSidebarMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
  overflow-y: auto;

  &.ant-menu-inline .ant-menu-item,
  &.ant-menu-inline .ant-menu-submenu-title {
    padding-left: 12px !important;
    color: ${colors.text.primary} !important;
  }

  &.ant-menu-inline .ant-menu-item .ant-menu-item-icon,
  &.ant-menu-inline .ant-menu-submenu-title .ant-menu-item-icon {
    margin-right: 8px;
  }

  /* Fallback quando o ícone é custom (ex.: GradientizeIcon) e não usa .ant-menu-item-icon */
  &.ant-menu-inline .ant-menu-item > span:first-of-type,
  &.ant-menu-inline .ant-menu-submenu-title > span:first-of-type {
    margin-right: 8px;
  }

  &.ant-menu-inline .ant-menu-item .anticon,
  &.ant-menu-inline .ant-menu-submenu-title .anticon {
    color: ${colors.primary} !important;
  }

  &.ant-menu-inline .ant-menu-item:hover,
  &.ant-menu-inline .ant-menu-submenu-title:hover {
    color: ${colors.primary} !important;
    background: ${colors.primary}08 !important;
  }

  &.ant-menu-inline .ant-menu-item:hover .anticon,
  &.ant-menu-inline .ant-menu-submenu-title:hover .anticon {
    color: ${colors.primary} !important;
  }

  &.ant-menu-inline .ant-menu-sub .ant-menu-item {
    padding-left: 24px !important;
  }

  &.ant-menu .ant-menu-item-selected {
    background: ${colors.primary}12 !important;
    color: ${colors.primary} !important;
    border-left: 3px solid ${colors.primary};
    border-radius: 6px;
  }

  &.ant-menu .ant-menu-item-selected .anticon {
    color: ${colors.primary} !important;
  }
`;
