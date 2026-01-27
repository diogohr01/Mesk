import { Button, Col, Divider, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';

const { Content } = Layout;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          {/* Card para o CRUD */}
          <Col span={24}>
            <Card 
              title="Crud - Exemplo" 
              variant="borderless"
              description="Sistema completo de gerenciamento de dados"
              extra={<Button type="primary" onClick={() => navigate("/table")}>Ver</Button>}
            >
              <Typography.Text>
                Este exemplo de CRUD possui todas as funcionalidades de um sistema completo, incluindo:
                <ul>
                  <li>
                    <strong>Tabela Paginada</strong>: Lista registros com paginação, suporte a ordenação e filtros dinâmicos.
                  </li>
                  <li>
                    <strong>Formulário Dinâmico</strong>: Permite adicionar e editar registros com um formulário completo.
                  </li>
                  <li>
                    <strong>Integração com API C#</strong>: Totalmente integrado com uma API backend para salvar e buscar dados.
                  </li>
                  <li>
                    <strong>Ações de Edição e Exclusão</strong>: Botões para editar e excluir cada registro, com confirmação antes de excluir.
                  </li>
                </ul>
              </Typography.Text>
            </Card>
          </Col>

          {/* Card para o Formulário */}
          <Col span={6}>
            <Card 
              title="Formulário - Exemplo" 
              variant="borderless"
              description="Formulário dinâmico com todos os tipos de campos"
              extra={<Button type="primary" onClick={() => navigate("/form")}>Ver</Button>}
            >
              <Typography.Text>
                Exemplo de um formulário dinâmico que inclui todos os tipos de campos disponíveis:
                <ul>
                  <li>Campos de texto e textarea para entrada de informações.</li>
                  <li>Inputs numéricos para valores inteiros e decimais.</li>
                  <li>Selects, multiselects e radio buttons para opções de escolha.</li>
                  <li>Upload de arquivos e imagens.</li>
                  <li>Validação dinâmica e customizada para cada campo.</li>
                  <li>Suporte a campos de data e hora com formatação específica.</li>
                </ul>
              </Typography.Text>
            </Card>
          </Col>

          {/* Card para o Gerador de Form */}
          <Col span={6}>
            <Card 
              title="Gerador de Form" 
              variant="borderless"
              description="Ferramenta para criar formulários dinamicamente"
              extra={<Button type="primary" onClick={() => navigate("/formbuilder")}>Ver</Button>}
            >
              <Typography.Text>
                Ferramenta avançada para criação de formulários dinâmicos:
                <ul>
                  <li>Interface drag-and-drop para construção visual</li>
                  <li>Biblioteca completa de componentes de input</li>
                  <li>Validação automática e customizada</li>
                  <li>Preview em tempo real</li>
                  <li>Exportação de configurações</li>
                </ul>
              </Typography.Text>
            </Card>
          </Col>

          {/* Card para o Modal */}
          <Col span={6}>
            <Card 
              title="Modal - Exemplo" 
              variant="borderless"
              description="Exemplos de modais e diálogos interativos"
              extra={<Button type="primary" onClick={() => navigate("/modal")}>Ver</Button>}
            >
              <Typography.Text>
                Exemplo básico de uso de modais, com funcionalidade de exibir e ocultar janelas modais usando componentes do Ant Design e React.
              </Typography.Text>
            </Card>
          </Col>

          {/* Card para Charts */}
          <Col span={6}>
            <Card 
              title="Dashboard Analytics" 
              variant="borderless"
              description="Dashboard completo com gráficos interativos"
              extra={<Button type="primary" onClick={() => navigate("/charts")}>Ver Dashboard</Button>}
            >
              <Typography.Text>
                Dashboard completo com múltiplos tipos de gráficos interativos:
                <ul>
                  <li>Gráficos de linha, barra, pizza e área</li>
                  <li>Gráficos combinados e de dispersão</li>
                  <li>Gráficos radiais para performance</li>
                  <li>Métricas com indicadores de crescimento</li>
                  <li>Visualização responsiva e interativa</li>
                </ul>
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
