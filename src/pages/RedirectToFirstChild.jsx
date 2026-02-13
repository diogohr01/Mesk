import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Redireciona para a primeira rota filha quando o usuário acessa o path do menu pai.
 * Usado para /pcp, /cadastros e /configuracoes.
 */
export const PcpRedirect = () => <Navigate to="/ordem-producao/cadastro" replace />;
export const CadastrosRedirect = () => <Navigate to="/itens/cadastro" replace />;
export const ConfiguracoesRedirect = () => <Navigate to="/configuracoes/totvs" replace />;
