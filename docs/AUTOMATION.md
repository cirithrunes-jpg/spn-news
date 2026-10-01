# Automação editorial — fase 1

Rotina diária neste chat do Codex: consulta o calendário, pesquisa fontes e prepara rascunhos internos. Não é um cron na Vercel e não publica no site. O computador e o app precisam estar disponíveis para execuções que usam os arquivos locais.

## Plano do dia

Na pasta do projeto, execute `node scripts/editorial-plan.mjs --queue`. O plano usa America/Sao_Paulo e registra pauta, tipo, responsável, voz e assinatura prevista. `--at=2026-10-01T15:00:00Z` permite conferir uma data específica.

A fila fica em `../editorial-drafts/AAAA-MM-DD/`, fora do app e das rotas públicas. Um plano existente não é sobrescrito. Ao editar o calendário depois de gerar um plano, confira a divergência e revise explicitamente o plano pendente.

## Cada execução

1. Ler as configurações atuais e gerar o plano. Não publicar em dias sem pauta ou responsável.
2. Pesquisar fontes primárias, abrir os documentos e distinguir data do comunicado, data do evento e território.
3. Produzir matérias individuais do dia, nunca substituir a pauta por um resumo mensal ou um boletim de manchetes. Cada matéria tem seu próprio rascunho Markdown com título, chamada curta para o card, abertura, desenvolvimento, contexto, fontes, ressalvas, responsável previsto e indicação de apoio de IA. A chamada do card não substitui o corpo da matéria. No dia 2, salvar duas matérias separadas. O perfil de voz não significa revisão humana já realizada.
4. Propor imagens somente quando houver licença ou autorização verificável, registrando autor, origem e condições. Na falta delas, deixar a seleção pendente.
5. Para rankings, verificar período, mercado e critérios. Listas de melhores/piores são opinião editorial. No dia 1, preparar guia mensal por área; lacunas devem ser registradas, nunca preenchidas com lançamentos inventados.
6. Salvar localmente o rascunho e o status `needs_review`, ou `needs_research` quando faltarem evidências. Não enviar rascunhos para GitHub nem para o site automaticamente.
7. Evitar duplicações por data e pauta. Avisar neste chat somente sobre material novo pronto para revisão, falha ou decisão necessária.

## Próxima fase

Fila persistente com login e revisão, publicação aprovada e execução hospedada independente do computador. Serviços e credenciais deverão ser configurados antes de ativá-la. Nunca colocar chaves no repositório ou nas conversas.

