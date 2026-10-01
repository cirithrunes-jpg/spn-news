# SPN News
Portal editorial em Next.js + TypeScript. **O mundo pop levado a sério. Mais ou menos.**

## Rodar
Node.js 22 ou 24 e pnpm 10+. Instale com `pnpm install --frozen-lockfile`, copie `.env.example` para `.env.local` e execute `pnpm dev`. Abra http://localhost:3000.
Verificação: `pnpm lint`, `pnpm typecheck`, `pnpm build`. Produção: `pnpm start`.

## Publicação
Site: https://spn-news.vercel.app/
A integração GitHub/Vercel publica novos commits em `main`. Na Vercel: Next.js, raiz do repositório, Node.js 24 e build padrão pnpm. Sem banco ou chaves para o conteúdo público.
Defina `NEXT_PUBLIC_SITE_URL` para um domínio HTTPS quando quiser substituir a detecção automática do domínio da Vercel. `SITE_INDEXABLE` controla robots e sitemap; está false até a liberação de indexação. Nenhum segredo deve ser versionado.
`EDITORIAL_CONTACT_EMAIL` pode receber o endereço público da redação quando existir. Vazio, o site informa que o canal está em configuração; não finge receber solicitações.

## Edições de setembro de 2026
31 matérias individuais cobrem os dias 1–30, com duas matérias no dia 2. Fontes, período dos dados e imagens são identificados. As listas dos dias 5, 10, 23 e 26 têm dez itens e ordem editorial.
Arquivo em `/atualizacoes`, filtro `?dia=2`, sete categorias, busca por assunto ou editor, listas e páginas em `/noticia/[slug]`.
A edição de referência é histórica. Metadata/schema registram a data efetiva de publicação em outubro; não é retrodatada. Notícias usam NewsArticle, colunas e listas usam Article. Rankings de audiência e vendas indicam seus recortes semanais e mercados, sem alegar fechamento mensal completo.
As assinaturas seguem as vozes configuradas para Fernando Valerious, Ruby Dias e Adailton Jr. Os textos usam apoio de IA, explicitado discretamente no rodapé. Não há relato de entrevistas ou testes próprios inexistentes.
As imagens externas foram conferidas quanto a assunto e carregamento. Créditos e fonte acompanham cada foto; direitos reservados não são anunciados como licença aberta. Fotos de arquivo são identificadas. URLs de terceiros podem mudar: revise-as antes de reutilizar o conteúdo.
Os antigos artigos fictícios não são exibidos na Home, busca, categorias ou listagem; suas rotas retornam 404. Vídeos e podcast têm páginas de programação futura.

## Configuração interna
`editorial-config/` guarda vozes, calendário recorrente e plano do bot. Não é importado pelas páginas públicas. `/admin`, `/admin/calendario` e `/calendario` não expõem a configuração. Não existe admin autenticado ou editor público; a publicação depende de alterações aprovadas no projeto.
Dias 13 e 15 foram atribuídos a Ruby nos espaços antes sem editor. O calendário trata meses de tamanhos diferentes sem deslocar o dia da pauta.
A rotina editorial prepara rascunhos às 9h de Brasília. Isso não equivale a um serviço de publicação automática em produção. Estruturas para fontes, rascunhos e pacotes sociais permanecem disponíveis para a próxima etapa.

## Publicidade, privacidade e revisão
Espaços comerciais são identificados; não há campanha nem link afiliado ativo. Não há analytics, cadastro ou coleta por formulário. A hospedagem pode registrar acessos conforme a política do provedor.
Fontes e transparência ficam abaixo de Correções e direitos de imagem. A apresentação pequena preserva a leitura.
Para uma nova matéria: confira acontecimentos e datas, escreva texto próprio, identifique opinião e limites dos dados, escolha imagem correspondente e crédito correto, valide lint/build e confirme o resultado publicado.

