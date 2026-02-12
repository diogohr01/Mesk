# Plano: Prop no DynamicForm para dropdown dos filtros

## Objetivo

Em vez de envolver o bloco de filtros em `<Collapse>` em cada uma das 11 listas, **adicionar uma prop ao DynamicForm** que, quando usada, renderiza o form já dentro de um collapse/dropdown. As listas passam a usar apenas essa prop.

---

## 1. Alteração no DynamicForm

**Ficheiro:** `Frontend/src/components/Data/Form.jsx`

- **Nova prop** (ex.: `collapseAsFilter` ou `filterCollapse`):
  - Nome sugerido: **`collapseAsFilter`** (boolean, default `false`).
  - Quando `collapseAsFilter === true`:
    - Envolver o conteúdo atual do return (o `<Form>` com `formSections` e `actionButtons`) num **`<Collapse>`** do Ant Design.
    - Um único **`<Collapse.Panel>`** com `header="Filtros"` e `key="filtros"`.
    - Opcional: permitir **`defaultFilterCollapseOpen`** (boolean, ex. default `true`) para controlar se o painel começa aberto ou fechado.
- Quando `collapseAsFilter === false`, o comportamento permanece igual (só o `<Form>` sem Collapse).
- Importar `Collapse` de `antd` no topo do ficheiro.

Exemplo de uso do return quando `collapseAsFilter` é true:

```jsx
const formContent = (
  <Form ...>
    {formSections}
    {actionButtons}
  </Form>
);

if (collapseAsFilter) {
  return (
    <Collapse defaultActiveKey={defaultFilterCollapseOpen ? ['filtros'] : []}>
      <Collapse.Panel header="Filtros" key="filtros">
        {formContent}
      </Collapse.Panel>
    </Collapse>
  );
}
return formContent;
```

---

## 2. Alteração nas listas que usam DynamicForm com filtro

**Ficheiros (11):**  
OrdemProducao/cadastro/List.jsx, OrdemProducao/consulta/index.jsx, Clientes/cadastro/List.jsx, Usuarios/List.jsx, Perfis/cadastro/List.jsx, Ferramentas/cadastro/List.jsx, Ligas/cadastro/List.jsx, Itens/cadastro/List.jsx, Sequenciamento/cadastro/List.jsx, Pedidos/cadastro/List.jsx, Home/crud/List.jsx.

Em cada um:

- No `<DynamicForm>` que usa `formConfig={filterFormConfig}` e `submitText="Filtrar"`, adicionar a prop **`collapseAsFilter={true}`** (e opcionalmente `defaultFilterCollapseOpen={true}` ou `{false}` conforme desejado).
- O `div` com estilos de fundo cinza/borda pode continuar a envolver o `<DynamicForm>` para manter o mesmo bloco visual; o dropdown/collapse fica dentro do DynamicForm.

Resumo: em todas as 11 listas, adicionar `collapseAsFilter` (e opcionalmente `defaultFilterCollapseOpen`) ao DynamicForm de filtros; não é necessário usar `<Collapse>` manualmente em nenhuma lista.

---

## 3. Filtro "tipo" (Casa/Cliente) onde fizer sentido

- **OrdemProducao/cadastro/List.jsx**: adicionar ao `filterFormConfig` um `select` com id `filtroTipo` (opções Todos, Casa, Cliente) e em `fetchData` / `fetchDataFilhas` incluir no `requestData` o valor (ex.: `filtroTipo: filters.filtroTipo !== 'todos' ? filters.filtroTipo : undefined`).
- **OrdemProducao/consulta/index.jsx**: idem se a consulta tiver filtro por tipo Casa/Cliente.
- Nas restantes 9 listas: só a prop de collapse no DynamicForm; não adicionar campo tipo.

---

## 4. Resumo

| O que | Onde |
|-------|------|
| Nova prop `collapseAsFilter` (e opcional `defaultFilterCollapseOpen`) no DynamicForm; quando true, renderizar form dentro de `<Collapse><Panel header="Filtros">` | Form.jsx |
| Passar `collapseAsFilter={true}` no DynamicForm de filtros | 11 listas |
| Campo filtro "tipo" no form e no request | OrdemProducao/cadastro/List (e consulta se aplicável) |

Assim o dropdown dos filtros fica centralizado no DynamicForm e as listas só configuram a prop.
