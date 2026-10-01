# SPN News — MVP navegável

Portal editorial pop em Next.js App Router + TypeScript. Identidade laranja/amarelo/preto/branco, TV/play retrô e o slogan **O mundo pop levado a sério. Mais ou menos.**

## Rodar e avaliar

Requisitos: Node.js 22 ou 24 LTS e pnpm 10+.

```sh
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Abra http://localhost:3000. Rotas: `/`, `/categoria/filmes` e outras seis categorias, `/busca?q=cinema`, `/materia/alem-do-ultimo-frame`, `/sobre` e `/admin`.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Deploy na Vercel

1. Importe `cirithrunes-jpg/spn-news` em https://vercel.com/new.
2. Framework: **Next.js**. Root Directory: **raiz do repositório**. Use o lockfile pnpm e o build padrão (`pnpm build`). Node.js: **24.x** (22.x também compatível).
3. Defina `NEXT_PUBLIC_SITE_URL` com a URL HTTPS atribuída pela Vercel ou seu domínio final. Mantenha `SITE_INDEXABLE=false` durante a demonstração.
4. Faça o deploy e abra a URL gerada. Atualize a URL canônica e redeploy se o domínio mudar.

O MVP não requer banco, chaves de API, storage, cron ou serviços pagos para funcionar. Não existe deploy público até que o projeto seja importado e publicado na conta Vercel.

## O que está implementado

- Home responsiva, tendências, hero, Giro SPN, cards e sete categorias.
- Busca textual sem distinção de acentos, filtro de categoria e estado vazio.
- Modelo de matéria, navegação relacionada, 404 e acessibilidade básica (rótulos, foco, menu mobile e link para pular navegação).
- Áreas de publicidade e afiliados explicitamente marcadas, sem anúncios ou ofertas ativos.
- Metadata, canônicas, Open Graph, robots, sitemap e schema `NewsArticle` demonstrativo.
- Contratos TypeScript para futuros rascunhos, revisão, automação e pacotes sociais; página pública de apresentação do futuro admin.
- Ilustrações vetoriais feitas em CSS e ícones Lucide, sem imagens de terceiros ou APIs externas.

## Conteúdo e SEO

**Todas as nove matérias são fictícias**, com data fixa de exemplo e avisos visíveis. Não são notícias atuais. Dados em `src/lib/content.ts`. Nunca substitua exemplos por fatos sem apuração.

Por padrão, o site inteiro recebe `noindex,nofollow`, o robots bloqueia rastreamento e o sitemap é vazio. Quando houver conteúdo real e revisão editorial, `SITE_INDEXABLE=true` libera Home, Sobre e categorias. Matérias demonstrativas continuam sempre com `noindex`, bloqueadas no robots e fora do sitemap. Para matérias reais, implemente a distinção de status e inclua somente publicações aprovadas no sitemap e nas regras de metadata. O schema atual identifica explicitamente a demonstração; sua existência não habilita Google News. SVGs de Open Graph são placeholders: use PNG/JPEG de 1200×630 antes do lançamento para compatibilidade com plataformas sociais.

## Estrutura futura e limites

`src/lib/editorial-workflow.ts` define contratos, não um backend. `/admin` não tem autenticação, edição ou publicação. Antes de ativar esses recursos, implemente autenticação, autorização por função, armazenamento, auditoria e revisão humana obrigatória. Não crie endpoints de escrita sem proteção. As legendas e formatos de exemplo estão nos dados das matérias; não há envio para redes sociais.

Não há coleta de e-mails, analytics, cookies publicitários ou links afiliados. Fontes Google Fonts são carregadas pelo navegador, com fontes locais de fallback; a navegação e o build não dependem desse serviço. Antes do lançamento, configure política de privacidade conforme os serviços ativados, fontes, correções, contatos e avisos comerciais. Nenhum segredo deve entrar no Git: use as variáveis protegidas da Vercel para integrações futuras.

## Avaliação manual

Teste Home em desktop e celular; menu mobile pelo teclado; as sete categorias; busca com e sem acentos e sem resultados; cada matéria e seus links; categoria/slug inexistentes (404); `/robots.txt` e `/sitemap.xml`. Confirme ausência de overflow horizontal e os avisos de demonstração e publicidade.
