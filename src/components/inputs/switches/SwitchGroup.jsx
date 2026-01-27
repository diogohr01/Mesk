import React from 'react';
import { Switch, Typography, Space, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

/**
 * Componente SwitchGroup - Grupo de switches com layout organizado
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título do grupo
 * @param {string} props.description - Descrição do grupo
 * @param {Array} props.switches - Array de configurações dos switches
 * @param {Object} props.values - Valores atuais dos switches
 * @param {function} props.onChange - Função chamada quando qualquer switch muda
 * @param {boolean} props.disabled - Se todos os switches estão desabilitados
 * @param {number} props.columns - Número de colunas no layout (1-4)
 * @param {string} props.layout - Layout do grupo ('vertical' | 'horizontal')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const SwitchGroup = ({
    title,
    description,
    switches = [],
    values = {},
    onChange,
    disabled = false,
    columns = 1,
    layout = 'vertical',
    style,
    className,
    ...props
}) => {
    const handleSwitchChange = (switchId, checked) => {
        if (onChange) {
            const newValues = { ...values, [switchId]: checked };
            onChange(newValues);
        }
    };

    const renderSwitch = (switchConfig) => {
        const {
            id,
            label,
            description: switchDescription,
            defaultValue = false,
            disabled: switchDisabled = false,
            size = 'default',
            checkedChildren,
            unCheckedChildren,
            ...switchProps
        } = switchConfig;

        const isDisabled = disabled || switchDisabled;
        const currentValue = values[id] !== undefined ? values[id] : defaultValue;

        return (
            <div key={id} style={{ marginBottom: layout === 'vertical' ? 16 : 8 }}>
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    {label && (
                        <Text strong style={{ fontSize: '14px' }}>
                            {label}
                        </Text>
                    )}
                    
                    <Switch
                        checked={currentValue}
                        onChange={(checked) => handleSwitchChange(id, checked)}
                        disabled={isDisabled}
                        size={size}
                        checkedChildren={checkedChildren}
                        unCheckedChildren={unCheckedChildren}
                        {...switchProps}
                    />
                    
                    {switchDescription && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            <InfoCircleOutlined style={{ marginRight: 4 }} />
                            {switchDescription}
                        </Text>
                    )}
                </Space>
            </div>
        );
    };

    const colSpan = 24 / columns;

    return (
        <div className={className} style={style}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                {title && (
                    <Title level={5} style={{ margin: 0 }}>
                        {title}
                    </Title>
                )}
                
                {description && (
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                        <InfoCircleOutlined style={{ marginRight: 4 }} />
                        {description}
                    </Text>
                )}
                
                {layout === 'vertical' ? (
                    <div>
                        {switches.map(renderSwitch)}
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {switches.map((switchConfig) => (
                            <Col span={colSpan} key={switchConfig.id}>
                                {renderSwitch(switchConfig)}
                            </Col>
                        ))}
                    </Row>
                )}
            </Space>
        </div>
    );
};

export default SwitchGroup;
