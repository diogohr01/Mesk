import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Tabs, Typography } from 'antd';
import { Card } from '../../../components';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
    AiOutlineBars,
    AiOutlineCalendar,
    AiOutlineCheckSquare,
    AiOutlineDollar,
    AiOutlineEdit,
    AiOutlineFieldTime,
    AiOutlineFileText,
    AiOutlineGroup,
    AiOutlineIdcard,
    AiOutlineLock,
    AiOutlineMail,
    AiOutlineNumber,
    AiOutlinePhone,
    AiOutlinePicture,
    AiOutlinePoweroff,
    AiOutlineSelect,
    AiOutlineUpload
} from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { DynamicForm } from '../../../components';
import { colors } from '../../../styles/colors';

const { TabPane } = Tabs;

const availableFields = [
    { type: 'text', label: 'Campo de Texto', icon: <AiOutlineEdit /> },
    { type: 'textarea', label: 'Campo de Texto Longo', icon: <AiOutlineFileText /> },
    { type: 'password', label: 'Campo de Senha', icon: <AiOutlineLock /> },
    { type: 'integer', label: 'Número Inteiro', icon: <AiOutlineNumber /> },
    { type: 'decimal', label: 'Número Decimal', icon: <AiOutlineNumber /> },
    { type: 'currency', label: 'Valor Monetário', icon: <AiOutlineDollar /> },
    { type: 'datetime', label: 'Data e Hora', icon: <AiOutlineCalendar /> },
    { type: 'date', label: 'Data', icon: <AiOutlineCalendar /> },
    { type: 'time', label: 'Horário', icon: <AiOutlineFieldTime /> },
    { type: 'range-date', label: 'Range Picker', icon: <AiOutlineCalendar /> },
    { type: 'select', label: 'Seleção Única', icon: <AiOutlineSelect /> },
    { type: 'multiselect', label: 'Seleção Múltipla', icon: <AiOutlineSelect /> },
    { type: 'cpf', label: 'CPF', icon: <AiOutlineIdcard /> },
    { type: 'cnpj', label: 'CNPJ', icon: <AiOutlineIdcard /> },
    { type: 'phone', label: 'Telefone', icon: <AiOutlinePhone /> },
    { type: 'email', label: 'Email', icon: <AiOutlineMail /> },
    { type: 'checkbox', label: 'Checkbox', icon: <AiOutlineCheckSquare /> },
    { type: 'checkbox-group', label: 'Grupo de Checkbox', icon: <AiOutlineGroup /> },
    { type: 'radio', label: 'Radio Button', icon: <AiOutlineBars /> },
    { type: 'tree-select', label: 'Tree Select', icon: <AiOutlineSelect /> },
    { type: 'images', label: 'Upload de Imagem', icon: <AiOutlinePicture /> },
    { type: 'files', label: 'Upload de Arquivo', icon: <AiOutlineUpload /> },
    { type: 'switch', label: 'Switch Simples', icon: <AiOutlinePoweroff /> },
    { type: 'toggle-switch', label: 'Switch com Ícones', icon: <AiOutlinePoweroff /> },
    { type: 'conditional-switch', label: 'Switch Condicional', icon: <AiOutlinePoweroff /> },
    { type: 'switch-group', label: 'Grupo de Switches', icon: <AiOutlineGroup /> },
];

const DragAndDropFormBuilder = () => {
    const [sections, setSections] = useState([
        {
            id: uuidv4(),
            title: 'Seção 1',
            columns: 1,
            questions: [],
        },
    ]);

    const [selectedField, setSelectedField] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldForm] = Form.useForm();

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;

        if (source.droppableId === 'toolbox') {
            const field = availableFields[source.index];
            const newField = {
                id: uuidv4(),
                type: field.type,
                label: field.label,
                required: false,
                placeholder: '',
            };
            const updatedSections = sections.map((section) => {
                if (section.id === destination.droppableId) {
                    const newQuestions = Array.from(section.questions);
                    newQuestions.splice(destination.index, 0, newField);
                    return { ...section, questions: newQuestions };
                }
                return section;
            });
            setSections(updatedSections);
        } else {
            const sourceSectionIndex = sections.findIndex((section) => section.id === source.droppableId);
            const destinationSectionIndex = sections.findIndex((section) => section.id === destination.droppableId);
            const sourceQuestions = Array.from(sections[sourceSectionIndex].questions);
            const [movedField] = sourceQuestions.splice(source.index, 1);
            const destinationQuestions = source.droppableId === destination.droppableId ? sourceQuestions : Array.from(sections[destinationSectionIndex].questions);
            destinationQuestions.splice(destination.index, 0, movedField);
            const updatedSections = sections.map((section, index) => {
                if (index === sourceSectionIndex) {
                    return { ...section, questions: sourceQuestions };
                }
                if (index === destinationSectionIndex) {
                    return { ...section, questions: destinationQuestions };
                }
                return section;
            });

            setSections(updatedSections);
        }
    };

    const addSection = () => {
        const newSection = {
            id: uuidv4(),
            title: `Seção ${sections.length + 1}`,
            columns: 1,
            questions: [],
        };
        setSections([...sections, newSection]);
    };

    const removeSection = (sectionId) => {
        setSections(sections.filter((section) => section.id !== sectionId));
    };

    const editField = (field, sectionId) => {
        setSelectedField({ ...field, sectionId });
        fieldForm.setFieldsValue(field);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        fieldForm.validateFields().then((values) => {
            const updatedSections = sections.map((section) => {
                if (section.id === selectedField.sectionId) {
                    const updatedQuestions = section.questions.map((field) => {
                        if (field.id === selectedField.id) {
                            return { ...field, ...values };
                        }
                        return field;
                    });
                    return { ...section, questions: updatedQuestions };
                }
                return section;
            });
            setSections(updatedSections);
            setIsModalVisible(false);
            setSelectedField(null);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedField(null);
    };

    const removeField = (fieldId, sectionId) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                const updatedQuestions = section.questions.filter(
                    (field) => field.id !== fieldId
                );
                return { ...section, questions: updatedQuestions };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const editSectionTitle = (sectionId, newTitle) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, title: newTitle };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const changeSectionColumns = (sectionId, columns) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, columns };
            }
            return section;
        });
        setSections(updatedSections);
    };

    // Função para renderizar o formulário de edição de acordo com o tipo do campo
    const renderFieldEditForm = () => {
        if (!selectedField) return null;
        const fieldType = selectedField.type;

        switch (fieldType) {
            case 'select':
            case 'multiselect':
            case 'radio':
            case 'checkbox-group':
                return (
                    <>
                        <Form.Item
                            name="options"
                            label="Opções"
                            rules={[{ required: true, message: 'Insira pelo menos uma opção' }]}
                        >
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Insira as opções e pressione Enter"
                            />
                        </Form.Item>
                    </>
                );
            case 'currency':
            case 'decimal':
                return (
                    <>
                        <Form.Item name="precision" label="Precisão (casas decimais)">
                            <InputNumber min={0} max={10} />
                        </Form.Item>
                        <Form.Item name="step" label="Incremento">
                            <InputNumber min={0} />
                        </Form.Item>
                        {fieldType === 'currency' && (
                            <Form.Item name="left" label="Símbolo Monetário">
                                <Input placeholder="Ex: R$" />
                            </Form.Item>
                        )}
                    </>
                );
            case 'datetime':
            case 'date':
            case 'time':
            case 'range-date':
                return (
                    <Form.Item name="format" label="Formato da Data/Hora">
                        <Input placeholder="Ex: DD/MM/YYYY" />
                    </Form.Item>
                );
            case 'tree-select':
                return (
                    <Form.Item
                        name="treeData"
                        label="Dados da Árvore (JSON)"
                        rules={[
                            {
                                validator: (_, value) => {
                                    try {
                                        JSON.parse(value);
                                        return Promise.resolve();
                                    } catch {
                                        return Promise.reject(new Error('Insira um JSON válido'));
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder='Ex: [{"title": "Node1", "value": "node1"}]' />
                    </Form.Item>
                );
            case 'switch':
            case 'toggle-switch':
            case 'conditional-switch':
                return (
                    <>
                        <Form.Item name="description" label="Descrição">
                            <Input placeholder="Descrição opcional do switch" />
                        </Form.Item>
                        <Form.Item name="size" label="Tamanho">
                            <Select placeholder="Selecione o tamanho">
                                <Select.Option value="small">Pequeno</Select.Option>
                                <Select.Option value="default">Padrão</Select.Option>
                            </Select>
                        </Form.Item>
                        {fieldType === 'toggle-switch' && (
                            <>
                                <Form.Item name="checkedChildren" label="Texto quando ativado">
                                    <Input placeholder="Ex: Ativo" />
                                </Form.Item>
                                <Form.Item name="unCheckedChildren" label="Texto quando desativado">
                                    <Input placeholder="Ex: Inativo" />
                                </Form.Item>
                                <Form.Item name="tooltip" label="Tooltip">
                                    <Input placeholder="Tooltip opcional" />
                                </Form.Item>
                            </>
                        )}
                        {fieldType === 'conditional-switch' && (
                            <Form.Item
                                name="conditions"
                                label="Condições (JSON)"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) return Promise.resolve();
                                            try {
                                                JSON.parse(value);
                                                return Promise.resolve();
                                            } catch {
                                                return Promise.reject(new Error('Insira um JSON válido'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input.TextArea rows={3} placeholder='Ex: {"warning": "Atenção!", "info": "Informação"}' />
                            </Form.Item>
                        )}
                    </>
                );
            case 'switch-group':
                return (
                    <>
                        <Form.Item name="title" label="Título do Grupo">
                            <Input placeholder="Título do grupo de switches" />
                        </Form.Item>
                        <Form.Item name="description" label="Descrição do Grupo">
                            <Input placeholder="Descrição opcional do grupo" />
                        </Form.Item>
                        <Form.Item name="columns" label="Número de Colunas">
                            <InputNumber min={1} max={4} placeholder="1-4" />
                        </Form.Item>
                        <Form.Item name="layout" label="Layout">
                            <Select placeholder="Selecione o layout">
                                <Select.Option value="vertical">Vertical</Select.Option>
                                <Select.Option value="horizontal">Horizontal</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="switches"
                            label="Configuração dos Switches (JSON)"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        try {
                                            const parsed = JSON.parse(value);
                                            if (!Array.isArray(parsed)) {
                                                return Promise.reject(new Error('Deve ser um array'));
                                            }
                                            return Promise.resolve();
                                        } catch {
                                            return Promise.reject(new Error('Insira um JSON válido'));
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input.TextArea 
                                rows={6} 
                                placeholder='Ex: [{"id": "switch1", "label": "Switch 1", "description": "Descrição"}]' 
                            />
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    };

    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({});
    const debounceRef = useRef(null);

    const submitForm = async (values) => {
    };

    // Função debounced para atualizar o resumo
    const debouncedUpdateFormValues = useCallback((allValues) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        
        debounceRef.current = setTimeout(() => {
            setFormValues(allValues);
        }, 500); // 500ms de delay
    }, []);

    // Exemplo de validação customizada em tempo real - otimizada
    const handleValidation = useCallback((changedValues, allValues) => {
        
        // Usar debounce para atualizar o resumo
        debouncedUpdateFormValues(allValues);
        
        // Exemplo: validação customizada
        if (changedValues.email && !changedValues.email.includes('@')) {
            console.warn('Email inválido detectado');
        }
    }, [debouncedUpdateFormValues]);

    // Memoizar o JSON stringify para evitar re-computação desnecessária
    const formValuesJson = useMemo(() => {
        return JSON.stringify(formValues, null, 2);
    }, [formValues]);

    // Cleanup do debounce
    React.useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {/* Caixa de ferramentas */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Droppable droppableId="toolbox" isDropDisabled={true}>
                        {(provided) => (
                            <Card title="Campos Disponíveis" variant="borderless" ref={provided.innerRef} {...provided.droppableProps}>
                                <div style={{ paddingRight: 5, maxHeight: 400, overflowY: "auto" }}>
                                    {availableFields.map((field, index) => (
                                        <Draggable key={field.type} draggableId={`toolbox-${field.type}`} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: '8px',
                                                        margin: '0 0 8px 0',
                                                        minHeight: '50px',
                                                        backgroundColor: snapshot.isDragging ? '#999999' : colors.background,
                                                        color: '#000',
                                                        borderRadius: '4px',
                                                        cursor: 'move',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <span style={{ marginRight: '8px' }}>{field.icon}</span>
                                                    {field.label}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </Card>
                        )}
                    </Droppable>

                    {/* Área de montagem do formulário */}
                    <Card title="Formulário" style={{ flex: 1 }} variant="borderless" extra={<Button type="primary" onClick={addSection} style={{ margin: '16px' }}>Adicionar Seção</Button>}>
                        {sections.map((section) => (
                            <Droppable key={section.id} droppableId={section.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            minHeight: '100px',
                                            padding: '16px',
                                            borderRadius: '8px',
                                            backgroundColor: snapshot.isDraggingOver ? '#99999940' : '#fafafa',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ flex: 1, marginRight: '16px' }}>
                                                <Typography.Text>Título da Seção</Typography.Text>
                                                <Input value={section.title} onChange={(e) => editSectionTitle(section.id, e.target.value)} style={{ marginBottom: '8px' }} placeholder="Título da Seção" />
                                                <Typography.Text>Número de Colunas (1-4)</Typography.Text>
                                                <InputNumber min={1} max={4} value={section.columns} onChange={(value) => changeSectionColumns(section.id, value)} style={{ marginBottom: '16px', width: '100%' }} placeholder="Número de Colunas (1-4)" />
                                            </div>
                                            <Button danger onClick={() => removeSection(section.id)}>
                                                Remover Seção
                                            </Button>
                                        </div>
                                        <Divider style={{ margin: 10 }} />
                                        <Row gutter={[16, 16]}>
                                            {section.questions.map((field, index) => (
                                                <Col span={24 / section.columns} key={field.id}>
                                                    <Draggable
                                                        key={field.id}
                                                        draggableId={field.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: 'none',
                                                                    padding: '8px',
                                                                    margin: '0 0 8px 0',
                                                                    backgroundColor: snapshot.isDragging
                                                                        ? '#999999'
                                                                        : colors.white,
                                                                    color: '#000',
                                                                    borderRadius: '4px',
                                                                    cursor: 'move',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                            >
                                                                <span>{field.label}</span>
                                                                <div>
                                                                    <Button
                                                                        size="small"
                                                                        onClick={() => editField(field, section.id)}
                                                                        style={{ marginRight: '8px' }}
                                                                    >
                                                                        Editar
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        danger
                                                                        onClick={() =>
                                                                            removeField(field.id, section.id)
                                                                        }
                                                                    >
                                                                        Remover
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </Col>
                                            ))}
                                            {provided.placeholder}
                                        </Row>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </Card>
                </div>
            </DragDropContext>

            {/* Modal para editar campos */}
            <Modal
                title="Editar Campo"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
            >
                <Form layout="vertical" form={fieldForm}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Geral" key="1">
                            <Form.Item
                                name="label"
                                label="Label"
                                rules={[{ required: true, message: 'Campo obrigatório' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="placeholder" label="Placeholder">
                                <Input />
                            </Form.Item>
                            <Form.Item name="required" valuePropName="checked">
                                <Checkbox>Obrigatório</Checkbox>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Propriedades Específicas" key="2">
                            {renderFieldEditForm()}
                        </TabPane>
                    </Tabs>
                </Form>
            </Modal>

            {/* Exibição do JSON de saída */}
            <Card style={{ marginTop: 10 }} title="JSON de Configuração do Formulário (lembre de trocar os id's (GUID) para as colunas do banco):" variant="borderless">
                <pre>{JSON.stringify(sections, null, 2)}</pre>
            </Card>

            <Card style={{ marginTop: 10 }} title="Form Final" variant="borderless">
                <DynamicForm
                    formConfig={sections}
                    formInstance={form}
                    onSubmit={submitForm}
                    validateOnChange={true}
                    onValidate={handleValidation}
                    showValidationFeedback={true}
                />

                <Typography.Text>Objeto (atualizado em tempo real):</Typography.Text>
                <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '12px', 
                    borderRadius: '4px',
                    fontSize: '11px',
                    maxHeight: '300px',
                    overflow: 'auto'
                }}>
                    {formValuesJson}
                </pre>
            </Card>
        </div>
    );
};

export default DragAndDropFormBuilder;
