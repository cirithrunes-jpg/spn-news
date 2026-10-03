# SPN News → Wix: pacote de preparação

Este diretório prepara a migração sem alterar o site público atual na Vercel.

## O que já fica preparado

- Exportador estático do frontend público: `npm run wix:export`.
- Validação dos limites do upload estático: `npm run wix:preflight`.
- Rastreamento automático das matérias e páginas públicas por links internos.
- Download dos assets locais usados pelo frontend, incluindo bundles `/_next/static`.
- Exclusão proposital de `/admin`, `/api` e rotas internas.
- Manifesto de exportação com páginas, assets, falhas e adaptações pendentes.

O exportador usa por padrão `https://spn-news.vercel.app`. Para outra origem:

```bash
SPN_SOURCE_URL=https://exemplo.com npm run wix:export
```

O resultado fica em `.wix-export/`. Esse diretório é descartável e deve ser recriado quando houver novas matérias ou alterações visuais.

## Estratégia de migração

### Fase 1 — cópia pública estática

Publicar no Wix apenas o frontend público renderizado. Isso preserva a aparência e as matérias sem mexer imediatamente no fluxo editorial.

### Fase 2 — manter a redação onde está

O painel editorial e as rotas administrativas continuam na infraestrutura atual durante a adaptação. Nada do painel é incluído no pacote estático.

### Fase 3 — adaptar partes dinâmicas

Prioridade de adaptação:

1. busca;
2. atualização automática de matérias;
3. configurações da home;
4. fluxo editorial/admin;
5. domínio, redirects e SEO de corte.

Até existir um backend Wix para essas funções, uma nova publicação no SPN exige gerar um novo snapshot com `npm run wix:export` e republicar o pacote.

## Pontos que não devem ser quebrados

- URLs públicas das matérias e categorias.
- Créditos e fontes das imagens.
- Metadados de SEO/canonical.
- Assinaturas e avatares dos editores.
- Banner e identidade visual SPN.
- Supabase e painel editorial existentes durante a transição.

## Antes de publicar no Wix

1. Rodar `npm run wix:export`.
2. Rodar `npm run wix:preflight`.
3. Abrir `.wix-export/wix-export-manifest.json` e revisar erros.
4. Testar home, matérias, categorias, Sobre e Arquivo.
5. Adaptar a busca antes do corte definitivo.
6. Só depois tratar domínio e redirects.

## Observação

O repositório Next.js não deve ser enviado diretamente como upload estático. O Wix recebe o resultado já renderizado (HTML/CSS/JS/assets), não o código-fonte que ainda precisa de build/servidor.
