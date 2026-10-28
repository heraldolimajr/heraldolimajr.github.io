# Cartão virtual de Heraldo

Site estático pronto para GitHub Pages. Inclui o layout aprovado, links das redes e animação de partículas com JavaScript puro.

## Publicar

1. Extraia o ZIP no computador.
2. No repositório do GitHub, envie index.html, styles.css, script.js e favicon.svg para a raiz. Envie também .nojekyll, se disponível. Não envie apenas o ZIP: o index.html deve estar diretamente na raiz do repositório.
3. Confirme o envio dos arquivos com um commit na branch main (ou na branch utilizada pelo seu repositório).
4. Abra Settings > Pages.
5. Em Build and deployment > Source, escolha Deploy from a branch.
6. Selecione a branch que recebeu os arquivos e a pasta /(root). Clique em Save.
7. Aguarde a publicação. O endereço estará disponível na página Settings > Pages.

Se o GitHub Pages já estiver configurado, substitua os arquivos correspondentes na pasta publicada e faça o commit. Preserve qualquer arquivo CNAME existente se você usa domínio próprio.

## Arquivos

- index.html: nome, bio e links.
- styles.css: layout, fontes, cores e adaptação para celular.
- script.js: partículas, conexões e pulsos intermitentes, com controle de pausa.
- favicon.svg: ícone da aba.
- .nojekyll: indica publicação estática sem processamento Jekyll.

## Uso e personalização

Abra index.html no navegador para visualizar. Mantenha os quatro arquivos na mesma pasta. Não há instalação de pacotes, build, servidor ou chave de API.

A animação é desenhada em Canvas e pausa quando a aba fica oculta. Respeita a opção de movimento reduzido do dispositivo. As fontes Manrope e Space Grotesk são carregadas do Google Fonts; se indisponíveis, o navegador usa Arial.

Para personalizar, edite o texto e os endereços no index.html, as cores em :root no styles.css e as configurações de partículas no script.js.

Documentação oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
