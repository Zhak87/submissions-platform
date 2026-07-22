# Платформа сбора проблем и обращений

Лендинг с формой обращений. Next.js (App Router) + TypeScript + Tailwind CSS + Supabase, с переключателем языка RU / KZ.

## Стек

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Supabase** (Postgres) — хранение обращений, запись через серверный API-роут
- **next-intl** — переводы и роутинг `/ru`, `/kz`
- **react-hook-form + zod** — валидация формы на клиенте и на сервере

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполнить своими ключами Supabase
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — редиректит на `/ru`.

## Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com) (бесплатный tier).
2. В SQL Editor выполните [`supabase/schema.sql`](supabase/schema.sql) — создаст таблицу `submissions` и индексы.
3. В **Project Settings → API** возьмите `Project URL` и `service_role` ключ.
4. Заполните `.env.local`:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
   `service_role` ключ используется только на сервере (в `src/app/api/submissions/route.ts`) и никогда не попадает в браузер — форма не пишет в Supabase напрямую с клиента.
5. Просматривать заявки можно сразу через **Table Editor** в Supabase — отдельная админка не нужна на старте (см. ТЗ, п. 6).

## Структура проекта

```
src/
  app/
    [locale]/         # локализованные layout/page (ru, kz)
    api/submissions/   # POST-роут записи обращения в Supabase
  components/          # Hero, About, HowItWorks, Team, SubmissionForm, Footer, ...
  i18n/                 # конфигурация next-intl (routing, navigation, request)
  lib/
    submissionSchema.ts # zod-схема формы (общая для клиента и сервера)
    supabase/server.ts  # серверный Supabase-клиент (service role)
  proxy.ts               # локальный роутинг (Next.js 16 переименовал middleware -> proxy)
messages/
  ru.json, kz.json       # тексты интерфейса
supabase/
  schema.sql             # SQL-схема таблицы submissions
```

## Форма обращения

Поля: имя, компания (необязательно), телефон, email, сфера деятельности (необязательно), описание проблемы, предложенное решение (необязательно). Валидация на клиенте (react-hook-form + zod) дублируется на сервере в API-роуте. Скрытое honeypot-поле `website` отсекает простых ботов — если оно заполнено, роут возвращает успех, но ничего не пишет в базу.

## Деплой на Vercel

1. Запушить репозиторий на GitHub.
2. Импортировать проект в [Vercel](https://vercel.com/new).
3. В Environment Variables добавить `SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY`.
4. Deploy — Vercel сам определит Next.js и настроит сборку.

## Дальнейшие шаги (не входит в MVP)

См. `project-spec.md`, п. 6–7: защищённая `/admin` страница с фильтрами и экспортом в CSV, дашборд аналитики, кластеризация обращений по NLP.
