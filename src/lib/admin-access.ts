export const adminAccessMessages: Record<string, string> = {
  'link-invalido': 'Este link expirou ou já foi usado. Solicite um novo acesso e abra a mensagem mais recente.',
  'outro-navegador': 'Abra o link no mesmo navegador em que você solicitou o acesso, ou solicite um novo link aqui.',
  'sem-acesso': 'Esta conta não está autorizada na redação. Entre com a conta do administrador.',
  'senha-alterada': 'Senha atualizada. Solicite um link para entrar na redação.',
  config: 'O acesso à redação ainda não está conectado. Tente novamente mais tarde.',
};
export function accessNotice(errorCode?: string) {
  return errorCode === 'bad_code_verifier' || errorCode === 'flow_state_not_found'
    ? 'outro-navegador' : 'link-invalido';
}
export function confirmationInput(tokenHash?: string, type = 'email') {
  if (!tokenHash || !/^[a-zA-Z0-9_-]{20,1024}$/.test(tokenHash)) return null;
  if (type !== 'email' && type !== 'magiclink') return null;
  return { token_hash: tokenHash, type } as { token_hash: string; type: 'email' | 'magiclink' };
}
