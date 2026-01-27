import { Button, Col, Divider, Form, Layout, Modal as AntModal, Row, Typography } from 'antd';
import { Card } from '../../../components';
import React, { useState } from 'react';
import { DynamicForm } from '../../../components';
import { Modal } from '../../../components';

const { Content } = Layout;

const MultipleModalsExample = () => {
    // Estado para cada modal
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Funções para abrir cada modal
    const showConfirmationModal = () => setIsConfirmationVisible(true);
    const showInfoModal = () => setIsInfoVisible(true);
    const showFormModal = () => setIsFormVisible(true);

    // Funções para fechar cada modal
    const closeConfirmationModal = () => setIsConfirmationVisible(false);
    const closeInfoModal = () => setIsInfoVisible(false);
    const closeFormModal = () => setIsFormVisible(false);

    const [form] = Form.useForm();

    const submitForm = async (values) => {
        console.log('Formulário submetido:', values);
    };

    return (
        <Layout>
            <Content>
                <Row gutter={[16, 16]}>
                    {/* Card para Modal de Confirmação */}
                    <Col span={8}>
                        <Card title="Modais Confirmação" variant="borderless">
                            <Typography.Text>
                                Esta modal é usada para confirmar uma ação importante do usuário, como exclusão de registros.
                            </Typography.Text>
                            <Divider />
                            {/* Botão para modal de confirmação */}
                            <Button type="primary" onClick={showConfirmationModal}>
                                Abrir Modal de Confirmação
                            </Button>
                        </Card>
                    </Col>

                    {/* Card para Modal de Informação */}
                    <Col span={8}>
                        <Card title="Modais Info" variant="borderless">
                            <Typography.Text>
                                Este exemplo de modal exibe informações relevantes para o usuário, como avisos e detalhes que não exigem interação adicional.
                            </Typography.Text>
                            <Divider />
                            {/* Botão para modal de informação */}
                            <Button type="primary" onClick={showInfoModal}>
                                Abrir Modal de Informação
                            </Button>
                        </Card>
                    </Col>

                    {/* Card para Modal com Formulário */}
                    <Col span={8}>
                        <Card title="Modais Form" variant="borderless">
                            <Typography.Text>
                                Modal com um formulário dinâmico que permite ao usuário inserir e submeter dados de forma interativa.
                            </Typography.Text>
                            <Divider />
                            {/* Botão para modal com formulário dinâmico */}
                            <Button type="primary" onClick={showFormModal}>
                                Abrir Modal de Formulário
                            </Button>
                        </Card>
                    </Col>
                </Row>

                {/* Modal de Confirmação */}
                <AntModal
                    open={isConfirmationVisible}
                    onCancel={closeConfirmationModal}
                    title="Confirmação Necessária"
                    closable={false} // Remove o botão de fechar no canto superior
                    content={
                        <>
                            <Typography.Text>
                                Use esta modal para confirmar ações importantes. O usuário deve clicar em "Confirmar" para proceder.
                            </Typography.Text>
                        </>
                    }
                    confirmFunction={() => {
                        console.log('Ação Confirmada');
                        closeConfirmationModal();
                    }}
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                />

                {/* Modal de Informação com Apenas 1 Botão e sem botão "X" */}
                <AntModal
                    title="Informações Importantes"
                    open={isInfoVisible}
                    onOk={closeInfoModal}
                    okText="Entendido"
                    closable={false} // Remove o botão de fechar no canto superior
                    footer={[
                        <Button key="ok" type="primary" onClick={closeInfoModal}>
                            Entendido
                        </Button>,
                    ]}
                >
                    <Typography.Text>
                        Use esta modal para mostrar informações ou avisos importantes para o usuário. Este exemplo exibe apenas um botão para fechar a modal.
                    </Typography.Text>
                </AntModal>

                {/* Modal com Formulário Dinâmico e sem botão "X" */}
                <AntModal
                    title="Formulário Dinâmico"
                    open={isFormVisible}
                    footer={null} // Remove os botões padrões para controle customizado
                    closable={false} // Remove o botão de fechar no canto superior
                >
                    <Typography.Text>
                        Esta modal inclui um formulário dinâmico onde o usuário pode preencher e submeter dados. Todos os tipos de campos são suportados, como campos de texto, textarea, e mais.
                    </Typography.Text>
                    <Divider />
                    <DynamicForm
                        formConfig={[
                            {
                                columns: 1,
                                questions: [
                                    { type: 'text', id: 'text', required: true, placeholder: 'Digite aqui um texto', label: 'Campo de texto' },
                                    { type: 'textarea', id: 'textarea', required: false, placeholder: 'Digite aqui um texto longo', label: 'Campo de texto longo' },
                                ],
                            },
                        ]}
                        formInstance={form}
                        onSubmit={submitForm}
                        onClose={closeFormModal}
                    />
                </AntModal>
            </Content>
        </Layout>
    );
};

export default MultipleModalsExample;
