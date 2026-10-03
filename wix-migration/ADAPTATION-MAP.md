# Mapa de adaptações do SPN

| Área | Hoje | Primeira fase no Wix | Evolução |
|---|---|---|---|
| Home | Next.js + Supabase | snapshot estático | backend Wix ou integração de dados |
| Matérias | arquivo local + Supabase `spn_publications` | HTML renderizado | publicação automática |
| Config. da home | `spn_home_settings` | valores do snapshot | painel/backend Wix |
| Busca | rota dinâmica | precisa adaptação | busca client-side ou solução Wix |
| Redação/admin | Next.js + Supabase | permanece fora do snapshot | migrar só depois de estabilizar o público |
| Imagens | locais + fontes externas | preservadas no HTML | opcionalmente mover mídia própria ao Wix |
| SEO | metadata do Next | preservado no snapshot quando renderizado | revisar canonical/redirects no corte |
| Domínio | Vercel | não alterar durante testes | apontar somente após validação |

## Regra de transição

A Vercel continua sendo a versão de produção até a cópia Wix passar por validação visual e funcional. Não há necessidade de desligar Supabase ou mover o painel editorial para testar a nova hospedagem.
