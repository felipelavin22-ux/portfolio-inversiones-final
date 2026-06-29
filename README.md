# Vault - Gestor de Activos Financieros

Vault es una aplicacion web full stack para administrar un portfolio personal de inversiones. Permite visualizar posiciones, registrar activos, cargar movimientos de compra/venta y analizar la distribucion real contra una asignacion objetivo.

Proyecto construido para el challenge tecnico de Software Engineer Web en AranguriApps.

## Funcionalidades

- Tablero con capital invertido, cantidad de posiciones y desvio promedio contra objetivo.
- Vista de activos con busqueda, alta y edicion.
- Vista de movimientos con historial y formulario de compra/venta.
- Integracion con Supabase mediante `@supabase/supabase-js`.
- Modo demo automatico cuando no hay variables de entorno configuradas.
- Validaciones de formularios y manejo de errores sin crashear la UI.
- Tests unitarios para los calculos centrales del portfolio.
- CI con GitHub Actions.

## Stack tecnologico

- Next.js App Router: estructura moderna, server/client components y despliegue simple en Vercel.
- TypeScript: tipado estricto para entidades, formularios y servicios.
- Tailwind CSS: velocidad de maquetado con consistencia visual.
- Supabase: Postgres administrado, API instantanea, RLS y excelente encaje con challenges full stack.
- Vitest: tests rapidos para logica de dominio.

## Arquitectura

```text
src/app                 Pantallas principales y layout
src/components          Componentes reutilizables de UI
src/lib                 Cliente Supabase, datos demo y calculos de portfolio
src/services            Operaciones de lectura/escritura contra Supabase
src/types               Tipos de dominio
supabase/schema.sql     Schema, policies RLS y seed data
tests                  Tests unitarios
```

## Base de datos

El modelo usa dos tablas principales:

- `assets`: instrumentos financieros con nombre, ticker, tipo, moneda y asignacion objetivo.
- `transactions`: movimientos de compra/venta relacionados a un activo.

El script completo esta en `supabase/schema.sql` e incluye claves primarias, claves foraneas, constraints, indices, RLS y datos semilla.

## Instalacion local

```bash
git clone <url-del-repo>
cd vault-aranguri
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000`.

## Configurar Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar `supabase/schema.sql` en el SQL Editor.
3. Copiar Project URL y anon public key.
4. Completar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Sin esas variables, la app corre en modo demo con datos locales para facilitar la revision visual.

## Tests y calidad

```bash
npm test
npm run build
```

La suite cubre la logica de holdings, ventas parciales, capital invertido y metricas principales.

## Orquestacion de IA

La IA se uso para acelerar discovery, arquitectura, generacion inicial de componentes, schema SQL, servicios y documentacion. El criterio humano estuvo en recortar alcance, elegir una tematica con buen impacto visual, revisar errores de integracion, mantener la app navegable y agregar QA propio.

El detalle esta en `docs/AI_PROCESS.md`.

## Deploy

Recomendado: Vercel.

- Framework preset: Next.js
- Build command: `npm run build`
- Variables: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Commits sugeridos

```bash
git add supabase package.json src/types src/lib src/services
git commit -m "feat: add Supabase portfolio domain"

git add src/app src/components
git commit -m "feat: build Vault dashboard and CRUD views"

git add tests docs README.md .github
git commit -m "test: add QA coverage and delivery docs"
```
