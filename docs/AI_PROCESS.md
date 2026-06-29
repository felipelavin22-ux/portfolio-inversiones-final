# Orquestacion de IA

Este proyecto se construyo usando IA como copiloto activo de desarrollo, tal como solicita el challenge.

## Como se uso

- Interpretacion del PDF y conversion de requisitos en backlog tecnico.
- Evaluacion de ideas y seleccion de Vault por balance entre alcance, impacto visual y complejidad real.
- Generacion inicial del schema SQL, componentes, servicios y documentacion.
- Auditoria del resultado para mantener una app acotada, navegable y sin placeholders vacios.

## Criterio tecnico aplicado

- Se mantuvieron 3 vistas claras: tablero, activos y movimientos.
- Se agrego modo demo para que la UI pueda revisarse incluso antes de configurar Supabase.
- Se aislo la integracion con Supabase en servicios para facilitar cambios y testing.
- Se cubrio la logica critica de calculo de holdings con tests unitarios.
- Se documento el camino de despliegue y la configuracion local.

## Decision consciente

El foco no fue construir una plataforma financiera enorme, sino una experiencia completa, entendible y robusta que demuestre frontend, backend/BaaS, modelado de datos, QA y criterio de producto.
