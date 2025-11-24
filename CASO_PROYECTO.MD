El proyecto consiste en una página web de votaciones que permitirá a los usuarios registrarse,
iniciar sesión, votar por candidatos y consultar los resultados en tiempo real.
Nace de la idea de hacer más fácil y segura la forma en que se realizan las votaciones. En
muchos colegios, universidades o empresas todavía se hacen de manera manual, lo que puede
causar errores, pérdida de información o simplemente demora en los resultados.
Con esta página web buscamos ofrecer una alternativa práctica y moderna que permita a las
personas registrarse, votar y ver los resultados al instante, sin complicaciones y desde
cualquier dispositivo.

La meta es tener una plataforma que se pueda adaptar a diferentes tipos de votaciones y que,
además, garantice la transparencia y la protección de los datos de cada usuario.
El diseño del sistema busca responder a tres necesidades principales:
• Contar con una interfaz dinámica y adaptable, que funcione correctamente en
computadores, tablets y celulares.
• Garantizar la seguridad y confiabilidad de la información, evitando alteraciones en
los datos.
• Ofrecer una estructura escalable, que facilite la incorporación de nuevas funciones
sin rehacer el sistema completo.

La página funcionará como una plataforma flexible de votaciones, que podrá personalizarse
según el tipo de proceso: elecciones políticas, escolares, universitarias o encuestas internas
en empresas u organizaciones.
Cada institución podrá configurar sus propios candidatos, reglas de votación y periodos de
tiempo sin necesidad de desarrollar un sistema nuevo desde cero.
Objetivo general
Desarrollar una página web de votaciones en línea segura, modular y adaptable, que
permita el registro de usuarios, emisión de votos y visualización de resultados en tiempo
real.

Objetivos específicos
• Implementar una arquitectura basada en componentes reutilizables con React y
Next.js.
• Garantizar la integridad de los datos mediante el uso del framework Django y
Django REST Framework.
• Mejorar la experiencia del usuario con una interfaz intuitiva y responsiva.
• Asegurar la autenticación confiable de los usuarios mediante Firebase Auth o
django-allauth.
• Integrar el frontend y backend de manera eficiente a través de APIs seguras.

Requerimientos de la pagina web
Requerimientos funcionales
• El usuario puede registrarse e iniciar sesión.
• El sistema permite votar por uno de los candidatos disponibles.
• El usuario puede ver los resultados en tiempo real.
• Los administradores pueden gestionar candidatos y periodos de votación.
• Se puede consultar el historial de votaciones.

Requerimientos no funcionales
• La página debe ser responsiva y funcionar en diferentes dispositivos.
• El sistema debe tener tiempos de carga rápidos (optimizados con Next.js).
• Se debe garantizar la seguridad y privacidad de los datos.
• El diseño debe mantener una apariencia moderna y consistente (Material UI).
• El código debe ser modular y mantenible.

Diseño general de la pagina web
• Frontend (React + Next.js):
Se encarga de la interfaz de usuario, mostrando formularios, botones, resultados y
gráficos.
Utiliza componentes reutilizables y un diseño adaptativo.
• Backend (Django + Django REST Framework):
Administra los datos (usuarios, votos, candidatos) y maneja la lógica interna.
Proporciona una API REST para la comunicación con el frontend

• Base de datos:
Gestiona toda la información estructurada (por ejemplo, en PostgreSQL o SQLite
durante el desarrollo).
• Autenticación:
Implementada con Firebase Auth o django-allauth para proteger el acceso de los
usuarios.
Mapa de la página web

1. Inicio: Presentación general del sistema.
2. Registro/Login: Permite a los usuarios ingresar al sistema.
3. Panel de votación: Muestra los candidatos y permite registrar el voto.
4. Resultados: Muestra los datos de la votación en tiempo real.
5. Administración (solo para administradores): Gestión de candidatos y usuarios.
Resultados esperados
Con el desarrollo del sistema se espera obtener:
• Una página web funcional para realizar votaciones en línea.
• Un diseño moderno, intuitivo y adaptable a diferentes dispositivos.
• Un sistema que garantice la seguridad e integridad de los datos.
• Una plataforma flexible que pueda usarse en diferentes tipos de elecciones

