import type { App } from 'vue';

// Importar componentes
import ChartLine from './stories/Charts/Line/ChartLine.vue';

// Importar estilos
import './style.css';
import './stories/Charts/Line/chartLine.css';

// Exportar componentes individuales
export { ChartLine };

// Exportar versión default para instalación como plugin
export default {
  install(app: App) {
    app.component('KiutChartLine', ChartLine);
  }
};

// Exportar todo como objeto para uso directo
export const KiutUI = {
  ChartLine
};
