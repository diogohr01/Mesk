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

  /* Transição suave ao expandir/recolher (sincronizada com o Sider) */
  --sidebar-ease: cubic-bezier(0.32, 0.72, 0, 1);
  --sidebar-duration: 0.28s;

  &.ant-menu-inline .ant-menu-item,
  &.ant-menu-inline .ant-menu-submenu-title {
    padding-left: 10px !important;
    color: ${colors.text.primary} !important;
    transition: padding-left var(--sidebar-duration) var(--sidebar-ease),
                padding-right var(--sidebar-duration) var(--sidebar-ease),
                background var(--sidebar-duration) var(--sidebar-ease);
  }
  &.ant-menu-inline .ant-menu-item .ant-menu-item-icon,
  &.ant-menu-inline .ant-menu-submenu-title .ant-menu-item-icon,
  &.ant-menu-inline .ant-menu-item > span:first-of-type,
  &.ant-menu-inline .ant-menu-submenu-title > span:first-of-type {
    transition: margin-right var(--sidebar-duration) var(--sidebar-ease);
  }
  .ant-menu-title-content {
    transition: width var(--sidebar-duration) var(--sidebar-ease),
                opacity var(--sidebar-duration) var(--sidebar-ease),
                padding var(--sidebar-duration) var(--sidebar-ease),
                margin var(--sidebar-duration) var(--sidebar-ease);
  }

  &.ant-menu-inline .ant-menu-item .ant-menu-item-icon,
  &.ant-menu-inline .ant-menu-submenu-title .ant-menu-item-icon {
    margin-right: 6px;
  }

  /* Fallback quando o ícone é custom (ex.: GradientizeIcon) e não usa .ant-menu-item-icon */
  &.ant-menu-inline .ant-menu-item > span:first-of-type,
  &.ant-menu-inline .ant-menu-submenu-title > span:first-of-type {
    margin-right: 6px;
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
    padding-left: 22px !important;
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

  /* Estado recolhido: só ícones centralizados, sem texto truncado */
  &.ant-menu-inline-collapsed {
    &.ant-menu-inline .ant-menu-item,
    &.ant-menu-inline .ant-menu-submenu-title {
      padding-left: 12px !important;
      padding-right: 12px !important;
      display: flex !important;
      justify-content: center !important;
      min-height: 44px;
      height: auto;
      line-height: 44px;
    }
    .ant-menu-item .ant-menu-item-icon,
    .ant-menu-submenu-title .ant-menu-item-icon,
    .ant-menu-item > span:first-of-type,
    .ant-menu-submenu-title > span:first-of-type {
      margin-right: 0 !important;
    }
    .ant-menu-title-content {
      width: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    &.ant-menu-inline .ant-menu-sub .ant-menu-item {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }
  }
`;
