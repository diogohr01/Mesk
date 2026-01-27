import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import {
    AiFillDelete,
    AiFillEdit,
    AiFillEye,
    AiOutlineCopy,
    AiOutlineDownload,
    AiOutlinePoweroff,
    AiOutlinePrinter
} from 'react-icons/ai';

const ActionButtons = ({
    onView,
    onEdit,
    onCopy,
    onActivate,
    onDeactivate,
    onDelete,
    onExport,
    onPrint,
    isActive = true,
    showView = true,
    showEdit = true,
    showCopy = true,
    showActivate = true,
    showDeactivate = true,
    showDelete = true,
    showExport = false,
    showPrint = false,
    size = 'small',
    ...restProps
}) => {
    return (
        <Space size={4} {...restProps}>
            {showView && onView && (
                <Tooltip title="Visualizar">
                    <Button
                        type="text"
                        icon={<AiFillEye style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onView}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showEdit && onEdit && (
                <Tooltip title="Editar">
                    <Button
                        type="text"
                        icon={<AiFillEdit style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onEdit}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showCopy && onCopy && (
                <Tooltip title="Copiar">
                    <Button
                        type="text"
                        icon={<AiOutlineCopy style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onCopy}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showActivate && isActive && onDeactivate && (
                <Tooltip title="Desativar">
                    <Button
                        type="text"
                        icon={<AiOutlinePoweroff style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onDeactivate}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showDeactivate && !isActive && onActivate && (
                <Tooltip title="Ativar">
                    <Button
                        type="text"
                        icon={<AiOutlinePoweroff style={{ fontSize: '14px', color: '#52c41a' }} />}
                        size={size}
                        onClick={onActivate}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showDelete && onDelete && (
                <Tooltip title="Excluir">
                    <Button
                        type="text"
                        danger
                        icon={<AiFillDelete style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onDelete}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showExport && onExport && (
                <Tooltip title="Exportar">
                    <Button
                        type="text"
                        icon={<AiOutlineDownload style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onExport}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
            {showPrint && onPrint && (
                <Tooltip title="Imprimir">
                    <Button
                        type="text"
                        icon={<AiOutlinePrinter style={{ fontSize: '14px' }} />}
                        size={size}
                        onClick={onPrint}
                        style={{ padding: '4px 8px' }}
                    />
                </Tooltip>
            )}
        </Space>
    );
};

export default ActionButtons;
