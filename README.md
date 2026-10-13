# google-sheet

Aplicación Express/Pug para consultar y añadir filas en Google Sheets.

1. Ejecutar `npm ci`.
2. Configurar la hoja en `src/spreadsheet.js` y credenciales propias en `src/json/credenciales.json`; compartir la hoja con la cuenta de servicio. No reutilizar ni publicar credenciales.
3. Ejecutar `npm run dev`.

Pruebas de controladores sin llamadas a Google: `npm test`. Licencia: [MIT](LICENSE).
