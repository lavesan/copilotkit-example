# Restrições do Projeto

## Arquivos que NÃO devem ser modificados

1. Configurações de Pacotes:

   - `package.json` em todos os apps e packages (exceto para adicionar novas dependências)
   - Versões das dependências existentes não devem ser alteradas
   - Scripts existentes não devem ser modificados sem discussão

2. Configurações Next.js:

   - Manter `next.config.mjs` com configurações mínimas
   - Não remover flags como `--turbopack` dos scripts de desenvolvimento

3. Configurações TypeScript:

   - Manter as configurações base em `packages/typescript-config`
   - Não modificar `tsconfig.json` dos apps individuais

4. Estrutura do Monorepo:
   - Manter a estrutura de pastas apps/ e packages/
   - Não mover ou renomear apps existentes
   - Não alterar `turbo.json` sem consenso

## Versões das Dependências

- Node.js: v20.18.0
- Next.js: 14.0.3
- React: 18.2.0

## Portas Padrão

- Web App: 3000
- Docs: 3001
- Copilot Example: 3002

## Diretrizes de Desenvolvimento

1. Sempre manter compatibilidade com Windows
2. Não modificar configurações de build existentes
3. Adicionar novos recursos em novos arquivos em vez de modificar os existentes
4. Manter as configurações de ESLint e TypeScript existentes

## Processo para Alterações

1. Discutir alterações significativas antes de implementar
2. Documentar quaisquer desvios dessas restrições
3. Testar em ambiente Windows antes de confirmar alterações
