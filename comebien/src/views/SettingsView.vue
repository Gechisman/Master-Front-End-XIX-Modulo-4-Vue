
<script setup>
import { useMealsStore } from '@/stores/meals'

const mealsStore = useMealsStore()

function clearAllData() {
  const confirmed = window.confirm(
    '¿Quieres borrar todos los platos y favoritos? Esta acción no se puede deshacer.'
  )

  if (confirmed) {
    mealsStore.meals = []
    mealsStore.favorites = []
    mealsStore.nextId = 1
  }
}
</script>

<template>
  <section>
    <span class="eyebrow">PERSONALIZA TU EXPERIENCIA</span>
    <h1>Configuración</h1>
    <p class="description">
      Gestiona los datos de tu aplicación ComeBien.
    </p>

    <article class="settings-card">
      <h2>💾 Almacenamiento</h2>
      <p>
        Tus comidas y favoritos se guardan automáticamente en este
        navegador mediante localStorage.
      </p>
      <div class="storage-status">
        <span class="status-dot"></span>
        Persistencia activada
      </div>
    </article>

    <article class="settings-card">
      <h2>📊 Resumen de datos</h2>

      <div class="data-row">
        <span>Platos planificados</span>
        <strong>{{ mealsStore.mealCount }}</strong>
      </div>

      <div class="data-row">
        <span>Platos favoritos</span>
        <strong>{{ mealsStore.favoriteCount }}</strong>
      </div>
    </article>

    <article class="settings-card danger-card">
      <h2>🗑️ Zona de mantenimiento</h2>
      <p>
        Puedes eliminar todos los datos almacenados en la aplicación.
      </p>

      <button
        type="button"
        class="danger-button"
        @click="clearAllData"
      >
        Borrar todos los datos
      </button>
    </article>
  </section>
</template>

<style scoped>
.eyebrow {
  color: #48a66c;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.description {
  color: #78847c;
  margin-bottom: 25px;
}

.settings-card {
  background: white;
  border: 1px solid #e8ede8;
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 18px;
}

.settings-card h2 {
  font-size: 18px;
  margin: 0 0 12px;
}

.settings-card p {
  color: #78847c;
  font-size: 14px;
  line-height: 1.6;
}

.storage-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #27744b;
  margin-top: 15px;
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #48a66c;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #edf0ed;
  font-size: 14px;
}

.data-row:last-child {
  border-bottom: none;
}

.danger-button {
  background: #fff0f0;
  color: #c34b4b;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.danger-button:hover {
  background: #ffe0e0;
}
</style>
