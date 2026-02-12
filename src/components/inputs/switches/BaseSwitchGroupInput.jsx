import React from 'react';
import { Switch, Typography, Space, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

/**
 * Componente Base BaseSwitchGroupInput - Grupo de switches base
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.value - Objeto com valores dos switches
 * @param {function} props.onChange - Função chamada quando algum valor muda
 * @param {boolean} props.disabled - Se os switches estão desabilitados
 * @param {string} props.size - Tamanho dos switches ('small' | 'default')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.title - Título do grupo
 * @param {string} props.description - Descrição do grupo
 * @param {Array} props.switches - Array de configurações dos switches
 * @param {number} props.columns - Número de colunas
 * @param {string} props.layout - Layout ('horizontal' | 'vertical')
 */
const BaseSwitchGroupInput = ({
    value = {},
    onChange,
    disabled = false,
    size = 'default',
    style,
    className,
    title,
    description,
    switches = [],
    columns = 1,
    layout = 'vertical',
    ...props
}) => {
    const handleSwitchChange = (switchId, checked) => {
        if (onChange) {
            onChange({
                ...value,
                [switchId]: checked
            });
        }
    };

    const renderSwitch = (switchConfig) => {
        const switchValue = value[switchConfig.id] || false;
        
        return (
            <Space key={switchConfig.id} direction="vertical" size="small" style={{ width: '100%' }}>
                {switchConfig.label && (
                    <Text strong style={{ fontSize: '13px' }}>
                        {switchConfig.label}
                    </Text>
                )}
                
                <Switch
                    checked={switchValue}
                    onChange={(checked) => handleSwitchChange(switchConfig.id, checked)}
                    disabled={disabled || switchConfig.disabled}
                    size={size}
                    checkedChildren={switchConfig.checkedChildren}
                    unCheckedChildren={switchConfig.unCheckedChildren}
                />
                
                {switchConfig.description && (
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                        <InfoCircleOutlined style={{ marginRight: 4 }} />
                        {switchConfig.description}
                    </Text>
                )}
            </Space>
        );
    };

    const renderSwitches = () => {
        if (layout === 'horizontal' && columns > 1) {
            return (
                <Row gutter={[16, 16]}>
                    {switches.map((switchConfig, index) => (
                        <Col key={switchConfig.id} span={24 / columns}>
                            {renderSwitch(switchConfig)}
                        </Col>
                    ))}
                </Row>
            );
        }

        return (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {switches.map(renderSwitch)}
            </Space>
        );
    };

    return (
        <div style={style} className={className} {...props}>
            {title && (
                <Title level={5} style={{ marginBottom: 8 }}>
                    {title}
                </Title>
            )}
            
            {description && (
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                    {description}
                </Text>
            )}
            
            {renderSwitches()}
        </div>
    );
};

export default BaseSwitchGroupInput;
