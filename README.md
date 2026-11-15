# Convite de Casamento Digital — Cadmiel & Demilly (26.12.2026)

Site de convite de casamento interativo, responsivo e fiel à identidade visual em aquarela do convite original de **Cadmiel & Demilly**.

---

## 1. Estrutura do Convite

O projeto contempla as 10 seções planejadas (sem Livro de Mensagens):

1. **Capa Principal (`src/components/CoverSection.tsx`)**: Exibe a imagem original do convite (`/public/assets/aistudio/WhatsApp_Image_2026-11-13_at_21.14.39_d2d6ba40.jpeg`) como destaque principal, com transição suave ao clicar em **"Abrir Convite"** e opção de visualização em tela cheia.
2. **Apresentação dos Noivos (`src/components/CouplePresentationSection.tsx`)**: Composição tipográfica caligráfica e serifada com os nomes de **Cadmiel e Demilly** e mensagem de boas-vindas.
3. **Informações do Casamento (`src/components/CouplePresentationSection.tsx`)**: Data em destaque (**Sábado, 26 de Dezembro de 2026**), horário de recepção e cerimônia, nome do espaço (**Espaço de Eventos Monte Sião**), endereço (**Rua Pará, Nº 8A, Piratininga**) e botões funcionais para salvar no Google Agenda ou calendário do celular (`.ics`).
4. **Contagem Regressiva (`src/components/CountdownAndCalendarSection.tsx`)**: Contador regressivo em tempo real (`Dias`, `Horas`, `Minutos`, `Segundos`) atualizado a cada segundo até a data do casamento.
5. **Calendário Mensal (`src/components/CountdownAndCalendarSection.tsx`)**: Calendário de **Dezembro de 2026** gerado dinamicamente, destacando o sábado dia **26**.
6. **Galeria de Fotos (`src/components/PhotoGallerySection.tsx`)**: Layout Bento com tamanhos variados, Lightbox em tela cheia e botão **"Testar com minhas fotos"** para pré-visualizar fotografias do casal.
7. **Localização do Evento (`src/components/LocationSection.tsx`)**: Mapa interativo do **Espaço de Eventos Monte Sião** incorporado diretamente na página, acompanhado dos botões funcionais **"Abrir no Google Maps"** (`https://maps.app.goo.gl/jTtucva2q66SJX4f6`), **"Como chegar"** e **"Copiar endereço"**.
8. **Dress Code (`src/components/DressCodeSection.tsx`)**: Traje recomendado (*Esporte Fino / Passeio Completo*), paleta de cores interativa e dicas para os convidados.
9. **Programação do Evento (`src/components/ScheduleSection.tsx`)**: Linha do tempo vertical elegante com os momentos e horários configuráveis.
10. **Confirmação de Presença — RSVP (`src/components/RsvpSection.tsx`)**: Formulário intuitivo integrado com API (`/api/rsvp`) e painel **"Consultar Confirmações"** com exportação em planilha **CSV**.

---

## 2. Como Personalizar Informações (`src/config/weddingConfig.ts`)

Todas as informações do casamento estão centralizadas em um único arquivo:
👉 **`src/config/weddingConfig.ts`**

Lá você pode alterar rapidamente:
- **Nomes dos noivos e frases**: `WEDDING_CONFIG.couple` e `WEDDING_CONFIG.presentation`
- **Data e horários**: `WEDDING_CONFIG.dateAndTime`
- **Cronograma do evento**: `WEDDING_CONFIG.schedule.items`
- **Fotografias da galeria**: Basta colocar as fotos oficiais na pasta `public/fotos/` e atualizar o caminho `src` em `WEDDING_CONFIG.gallery.photos`
- **Dress Code**: `WEDDING_CONFIG.dressCode`
- **Integração externa opcional de RSVP (Webhook / Google Sheets)**: `WEDDING_CONFIG.rsvp.externalWebhookUrl`

---

## 3. Como Instalar e Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado

### Passo a passo
```bash
# 1. Instalar as dependências
npm install

# 2. Executar o servidor de desenvolvimento (porta 3000)
npm run dev

# 3. Rodar os testes unitários da lógica do convite
npx tsx --test src/utils/weddingLogic.test.ts

# 4. Gerar build de produção
npm run build
```

---

## 4. Como Publicar na Vercel

O projeto já inclui o arquivo `vercel.json` configurado e pronto para deploy na **Vercel**:

1. Suba este projeto para um repositório no **GitHub** (ou GitLab / Bitbucket).
2. Acesse [https://vercel.com/new](https://vercel.com/new) e importe o repositório.
3. A Vercel detectará automaticamente as configurações do `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Clique em **Deploy**. Em menos de 1 minuto você terá o link oficial para compartilhar no WhatsApp!
