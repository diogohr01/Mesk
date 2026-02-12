import { Col, Form, Layout, Row, Typography } from 'antd';
import { Card } from '../../../components';
import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { DynamicForm } from '../../../components';

const { Content } = Layout;
const { Text } = Typography;

const FormPage = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const debounceRef = useRef(null);

  // Valores iniciais para o formulário
  const initialValues = {
    'switch-group': {
      notifications: true,
      'dark-mode': false,
      'auto-save': true,
      analytics: false
    },
    gender: 'male' // Valor inicial para o radio button
  };

  const submitForm = async (values) => {
    console.log('Formulário submetido:', values);
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

  // Configurar valores iniciais
  React.useEffect(() => {
    form.setFieldsValue(initialValues);
    setFormValues(initialValues);
  }, [form]);

  // Memoizar o JSON stringify para evitar re-computação desnecessária
  const formValuesJson = useMemo(() => {
    return JSON.stringify(formValues, null, 2);
  }, [formValues]);

  // Cleanup do debounce
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Layout>
      <Content>
        <Row gutter={[16, 16]}>
          {/* Seção: Textos */}
          <Col span={12}>
            <Card title="Textos" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 1,
                    questions: [
                      { 
                        type: 'text', 
                        id: 'text', 
                        required: true, 
                        placeholder: 'Digite aqui um texto', 
                        label: 'Campo de texto',
                        maxLength: 100,
                        tooltip: 'Máximo 100 caracteres'
                      },
                      { 
                        type: 'textarea', 
                        id: 'textarea', 
                        required: false, 
                        placeholder: 'Digite aqui um texto longo', 
                        label: 'Campo de texto longo',
                        maxLength: 500,
                        help: 'Máximo 500 caracteres'
                      },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Senha */}
          <Col span={12}>
            <Card title="Senha" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 1,
                    questions: [
                      { type: 'password', id: 'password', required: true, placeholder: 'Digite aqui uma senha', label: 'Campo de senha' },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Números */}
          <Col span={24}>
            <Card title="Números" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 3,
                    questions: [
                      { type: 'integer', id: 'integer', required: true, placeholder: 'Digite aqui um número inteiro', label: 'Campo numérico inteiro' },
                      { type: 'decimal', id: 'decimal', required: true, placeholder: 'Digite aqui um número decimal', label: 'Campo numérico decimal', precision: 2 },
                      { type: 'currency', id: 'currency', required: true, placeholder: 'Digite aqui um valor monetário', label: 'Campo de moeda', left: 'R$', precision: 2, step: 0.01 },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Datas */}
          <Col span={24}>
            <Card title="Datas" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 4,
                    questions: [
                      { type: 'datetime', id: 'datetime', required: true, placeholder: 'Selecione aqui uma data e hora', label: 'Campo de data e hora', format: 'DD/MM/YYYY HH:mm' },
                      { type: 'date', id: 'date', required: true, placeholder: 'Selecione aqui uma data', label: 'Campo de data', format: 'DD/MM/YYYY' },
                      { type: 'time', id: 'time', required: true, placeholder: 'Selecione aqui um horário', label: 'Campo de horário', format: 'HH:mm' },
                      { type: 'range-date', id: 'periodo', required: true, placeholder: 'Selecione o intervalo', label: 'Escolha o período', format: 'DD/MM/YYYY' },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Seletores */}
          <Col span={24}>
            <Card title="Seletores" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 2,
                    questions: [
                      {
                        type: 'select',
                        id: 'select',
                        required: true,
                        placeholder: 'Selecione uma opção',
                        label: 'Campo de seleção única',
                        showSearch: true,
                        allowClear: true,
                        options: [
                          { label: 'Vermelho', value: 'vermelho' },
                          { label: 'Azul', value: 'azul' },
                          { label: 'Verde', value: 'verde' },
                        ],
                      },
                      {
                        type: 'multiselect',
                        id: 'multiselect',
                        required: false,
                        placeholder: 'Selecione múltiplas opções',
                        label: 'Campo de seleção múltipla',
                        options: [
                          { label: 'Ler', value: 'ler' },
                          { label: 'Correr', value: 'correr' },
                          { label: 'Viajar', value: 'viajar' },
                        ],
                      },
                      { type: 'images', id: 'images', label: 'Upload de Fotos' },
                      { type: 'files', id: 'files', label: 'Upload de Imagens' },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Contato e Preferências */}
          <Col span={24}>
            <Card title="Contato e Preferências" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 4,
                    questions: [
                      { type: 'cpf', id: 'cpf', required: true, placeholder: 'Digite seu CPF', label: 'CPF' },
                      { type: 'cnpj', id: 'cnpj', required: true, placeholder: 'Digite seu CNPJ', label: 'CNPJ' },
                      { type: 'phone', id: 'phone', required: true, placeholder: 'Digite seu telefone', label: 'Telefone' },
                      { 
                        type: 'email', 
                        id: 'email', 
                        required: true, 
                        placeholder: 'Digite seu email', 
                        label: 'Email',
                        tooltip: 'Digite um email válido',
                        help: 'Este campo é obrigatório para contato'
                      },
                      { type: 'checkbox', id: 'terms', placeholder: 'Checkbox', label: 'Checkbox' },
                      {
                        type: 'checkbox-group',
                        id: 'checkbox-group',
                        required: true,
                        label: 'Combo Checkbox',
                        options: [
                          { label: 'Opção 1', value: 'opcao1' },
                          { label: 'Opção 2', value: 'opcao2' },
                          { label: 'Opção 3', value: 'opcao3' },
                        ],
                      },
                      {
                        type: 'radio',
                        id: 'gender',
                        required: true,
                        label: 'Radio Button',
                        direction: 'horizontal',
                        options: [
                          { label: 'Masculino', value: 'male' },
                          { label: 'Feminino', value: 'female' },
                        ],
                      },
                      {
                        type: 'tree-select',
                        id: 'categorias',
                        placeholder: 'Selecione categorias',
                        label: 'Categorias',
                        treeData: [
                          {
                            title: 'Eletrônicos',
                            value: 'eletronicos',
                            children: [
                              {
                                title: 'Celulares',
                                value: 'celulares',
                              },
                              {
                                title: 'Computadores',
                                value: 'computadores',
                              },
                            ],
                          },
                          {
                            title: 'Roupas',
                            value: 'roupas',
                            children: [
                              {
                                title: 'Masculinas',
                                value: 'masculinas',
                              },
                              {
                                title: 'Femininas',
                                value: 'femininas',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Seção: Switches */}
          <Col span={24}>
            <Card title="Switches" variant="borderless">
              <DynamicForm
                formConfig={[
                  {
                    columns: 2,
                    questions: [
                      {
                        type: 'switch',
                        id: 'switch-simples',
                        label: 'Switch Simples',
                        description: 'Um switch básico para ativar/desativar',
                        required: false,
                      },
                      {
                        type: 'toggle-switch',
                        id: 'toggle-switch',
                        label: 'Switch com Ícones',
                        description: 'Switch com ícones de check e X',
                        checkedChildren: 'Ativo',
                        unCheckedChildren: 'Inativo',
                        tooltip: 'Clique para alternar',
                        required: false,
                      },
                      {
                        type: 'conditional-switch',
                        id: 'conditional-switch',
                        label: 'Switch Condicional',
                        description: 'Switch que mostra alertas quando ativado',
                        conditions: {
                          warning: 'Atenção! Esta ação pode ter consequências.',
                          info: 'Informação adicional sobre esta opção.'
                        },
                        required: false,
                      },
                      {
                        type: 'switch-group',
                        id: 'switch-group',
                        title: 'Configurações do Sistema',
                        description: 'Configure as opções do sistema',
                        columns: 2,
                        layout: 'horizontal',
                        switches: [
                          {
                            id: 'notifications',
                            label: 'Notificações',
                            description: 'Receber notificações por email',
                            defaultValue: true
                          },
                          {
                            id: 'dark-mode',
                            label: 'Modo Escuro',
                            description: 'Ativar tema escuro',
                            defaultValue: false
                          },
                          {
                            id: 'auto-save',
                            label: 'Salvamento Automático',
                            description: 'Salvar automaticamente as alterações',
                            defaultValue: true
                          },
                          {
                            id: 'analytics',
                            label: 'Analytics',
                            description: 'Coletar dados de uso',
                            defaultValue: false
                          }
                        ],
                        required: false,
                      },
                    ],
                  },
                ]}
                formInstance={form}
                onSubmit={submitForm}
                validateOnChange={true}
                onValidate={handleValidation}
                showValidationFeedback={true}
              />
            </Card>
          </Col>

          {/* Visualização do Objeto de Formulário */}
          <Col span={24}>
            <Card title="Resumo do Formulário" variant="borderless">
              <Text>Objeto (atualizado em tempo real):</Text>
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
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FormPage;