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

## Quiz Geek

O antigo banner lateral "Arquivo SPN" foi substituído por um quiz de três perguntas e uma pesquisa de opinião. O arquivo continua disponível nos links "Giro SPN", "Últimas edições" e no rodapé.

`src/lib/geek-quiz.ts` guarda as rodadas verificadas e suas fontes. `getGeekEdition()` troca a rodada a cada três dias a partir de `geekQuizUpdatedAt`; uma nova ID por período impede reaproveitar respostas de uma rodada anterior. A Home e `/api/quiz-geek` são dinâmicas. Uma aba aberta busca a nova edição na virada ou ao voltar a ficar visível, com repetição em caso de falha temporária.

Uma rotina editorial recorrente pode renovar o banco de perguntas: manter três rodadas preparadas, atualizar `geekQuizUpdatedAt` para o instante da renovação e publicar a primeira rodada nova. As demais são uma reserva caso a atualização editorial atrase. Perguntas devem ter uma única resposta correta, sem depender de rumores ou lançamentos não confirmados, e uma fonte primária que sustente a explicação.

Respostas do quiz e a escolha da pesquisa ficam apenas no navegador. Não existe contagem coletiva, coleta de dados pessoais, ranking público nem alegação de representatividade. A pesquisa pode ser alterada. Fontes aparecem junto às explicações. Verifique com `node scripts/verify-geek-quiz.cjs`, além de lint, typecheck e build.

Imagens editoriais usam uma arte neutra SPN quando a fonte externa falha, preservando os créditos originais. A busca inclui texto e seções, ignora acentos e aceita palavras em posições diferentes.

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



## Painel da redação

Acesse `/admin`. O painel tem login por link enviado ao e-mail do administrador, visão geral, matérias, prévia privada, calendário mensal editável e perfis editoriais. O calendário não é publicado nem incluído no sitemap. Nenhuma conta recebe acesso por metadados enviados pelo navegador.

Abrir `/admin`, `/admin/login` ou o antigo `/admin/auth/request` não envia e-mail. O envio acontece somente pelo botão da página de entrada, com intervalo de um minuto. Erros de link usado, expirado ou aberto sem o verificador PKCE levam a uma orientação na página de entrada, sem enviar outro link automaticamente. `node scripts/verify-admin-access.cjs` verifica a validação de confirmação e os avisos de acesso.

O retorno solicitado é `/admin/auth/callback` no domínio de produção. O callback continua aceitando códigos PKCE e também aceita `token_hash` com `type=email`, encaminhando para `/admin/auth/confirm`, onde a confirmação exige um clique antes de verificar o link. Isso permite configurar um modelo de e-mail sem consumo automático por prévia de mensagens. A configuração de Auth no Supabase é independente da publicação do código: autorize o callback exato e, para o modelo específico do SPN, use `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email`. Como o projeto é compartilhado, preserve os demais retornos e modelos dos outros aplicativos; não substitua globalmente o Site URL ou o modelo sem conferir seu uso. Um retorno para `localhost:3000` em produção indica configuração pendente no provedor.

Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` na Vercel e em `.env.local`. A chave publishable é pública; **não use service-role/secret keys**. O ambiente de produção foi conectado ao projeto Supabase escolhido pelo proprietário. As tabelas SPN usam o prefixo `spn_` e RLS. `supabase/schema.sql` documenta a instalação para um banco novo; não reaplique sobre a instalação existente.

O acesso exige usuário confirmado, não anônimo, com uma linha autorizada em `spn_members`. O convite inicial fica em `spn_private.invites`; o gatilho aceita apenas o e-mail confirmado correspondente. O proprietário deve criar sua própria senha. Contas novas sem convite não entram na redação. No projeto compartilhado, membros de outro aplicativo não recebem acesso ao SPN.

Em Authentication → URL Configuration, autorize o retorno exato `https://SEU-DOMINIO/admin/auth/callback` e o retorno de recuperação `https://SEU-DOMINIO/admin/auth/callback?recovery=1`. Para desenvolvimento, use as mesmas URLs com localhost. Não use curingas amplos. Mantenha confirmação de e-mail ativa. O envio de confirmação e recuperação precisa de SMTP configurado; o remetente padrão do Supabase restringe destinatários. Para a ativação inicial sem SMTP, o proprietário pode criar a conta pelo painel autenticado do Supabase, inserindo ele próprio a senha, com confirmação administrativa.

Fluxo: salvar rascunho → enviar para revisão → aprovar texto/fontes/imagem → publicar. Ações validam novamente a autorização no servidor. RLS bloqueia acesso direto não autorizado. Aprovação exige imagem e contexto. A publicação usa uma transação e controla a versão; salvar novamente uma matéria mantém o último texto aprovado no ar. Retirar cria um marcador público sem conteúdo para impedir que o arquivo estático reapresente a matéria. O histórico de ações é privado. Depois de conectar o banco, falhas não reativam matérias retiradas.

As 31 matérias de setembro foram importadas, com as datas originais de publicação preservadas. O calendário repete os dias 1–30 e permite configurar o dia 31. Fevereiro usa somente os dias existentes. A preparação às 9h de Brasília consta na configuração; o bot de pesquisa/rascunhos e o envio social **ainda não estão conectados ao painel**. Não há publicação automática.

Validação: `pnpm lint`, `pnpm typecheck`, `pnpm build`; `node scripts/verify-editorial.cjs` valida entrada editorial e preservação de referências. `supabase/editorial-security-check.sql` documenta o teste de isolamento e publicação, em transação com rollback. Nunca use credenciais reais em testes.


### Redes sociais
Em /admin/redes-sociais, editores autenticados podem selecionar uma reportagem publicada, editar e copiar sua legenda e seu link, e abrir a imagem com os créditos. A edição é temporária e não publica nas redes. Perfis oficiais e autorização das plataformas ainda precisam ser configurados; não há postagem automática ativa.


### Automação do Instagram

`/admin/redes-sociais` possui fila persistente, cancelamento de itens pendentes e histórico. Nenhuma conta foi autorizada ainda. O botão de ativar permanece indisponível até configurar os segredos privados; adicionar o link do perfil não autoriza publicar.

Pré-requisitos: conta profissional `@fernando.cspn`, app Meta com Instagram Login, token autorizado para `instagram_business_basic` e `instagram_business_content_publish`, identificador `user_id` desse Instagram e versão suportada da API. Configure `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, `INSTAGRAM_API_VERSION`, `SUPABASE_SECRET_KEY` e `CRON_SECRET` somente nas variáveis privadas da Vercel. Nunca envie essas credenciais por chat, no GitHub ou em variáveis NEXT_PUBLIC. Para o backend, use uma secret key server-only do projeto Supabase escolhido; a chave publishable não substitui essa credencial.

Após a configuração, ative pelo painel. O servidor confere o username e o user_id autorizados. O cron da Vercel executa diariamente às 12:00 UTC (9h de Brasília, com janela de execução do plano). Enfileira matérias publicadas depois da ativação e envia no máximo uma por execução. Matérias históricas entram somente pelo botão de salvar na fila. Novos envios devem ter foto HTTPS pública em JPEG e respeitar os limites de formato da Meta; recusas aparecem no histórico. A hospedagem não publica instantaneamente após cada matéria.

O token tem validade e pode precisar de renovação na Meta; nesta versão não há renovação OAuth automática. Ao expirar, o worker recusa enviar e mantém os itens pendentes. Não configure tokens em formulários públicos. Pausar impede novas execuções, mas uma operação já em andamento pode terminar. Resposta perdida após `media_publish` fica como resultado incerto e nunca repete automaticamente. Itens em processamento interrompido também exigem conferência manual no Instagram; não existe botão de tentar novamente que possa criar duplicatas. Reativar inicia um novo recorte de matérias a partir daquele momento.

Banco: `supabase/social-automation.sql`, tabelas SPN isoladas com RLS. Não contém tokens. Teste: `node scripts/verify-social.cjs`. Verificar também o login no painel, permissões negadas a visitantes/não membros e, depois da autorização, uma postagem real controlada. Sem a autorização, os testes da API usam respostas simuladas e não comprovam publicação real.
