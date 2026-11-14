
<script setup>
import { reactive, watch } from 'vue'

import { useMealsStore } from '@/stores/meals'

const mealsStore = useMealsStore()

const days = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

// Opciones para reutilizar cada favorito
const selections = reactive({})

// Crear opciones para los favoritos existentes
watch(
  () => mealsStore.favorites.map(favorite => favorite.id),
  (ids) => {
    ids.forEach(id => {
      if (!selections[id]) {
        selections[id] = {
          day: 'Lunes',
          type: 'comida'
        }
      }
    })
  },
  { immediate: true }
)

// Añadir un favorito al calendario
function addToPlan(favorite) {
  const selection = selections[favorite.id]

  mealsStore.addFavoriteToPlan(
    favorite,
    selection.day,
    selection.type
  )

  alert(`${favorite.name} se ha añadido a tu plan semanal.`)
}

// Eliminar un favorito
function deleteFavorite(id) {
  mealsStore.deleteFavorite(id)
}
</script>

<template>
  <section>
    <div class="favorites-heading">
      <span class="eyebrow">TUS RECETAS PREFERIDAS</span>
      <h1>Mis platos favoritos ❤️</h1>
      <p>
        Guarda tus platos preferidos y reutilízalos cuando quieras.
      </p>
    </div>

    <div v-if="mealsStore.favorites.length === 0" class="empty-state">
      <span class="empty-icon">❤️</span>
      <h2>Aún no tienes favoritos</h2>
      <p>
        Ve al plan semanal y marca algún plato con el corazón.
      </p>
      <RouterLink to="/" class="btn btn-primary">
        Ir al plan semanal
      </RouterLink>
    </div>

    <div v-else class="favorites-grid">
      <article
        v-for="favorite in mealsStore.favorites"
        :key="favorite.id"
        class="favorite-card"
      >
        <div class="favorite-title">
          <div>
            <span class="favorite-icon">❤️</span>
            <h3>{{ favorite.name }}</h3>
          </div>

          <button
            type="button"
            class="delete-favorite"
            title="Eliminar favorito"
            @click="deleteFavorite(favorite.id)"
          >
            🗑️
          </button>
        </div>

        <div class="favorite-options">
          <div class="form-group">
            <label :for="`day-${favorite.id}`">Día</label>

            <select
              :id="`day-${favorite.id}`"
              v-model="selections[favorite.id].day"
            >
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label :for="`type-${favorite.id}`">Tipo</label>

            <select
              :id="`type-${favorite.id}`"
              v-model="selections[favorite.id].type"
            >
              <option value="comida">☀️ Comida</option>
              <option value="cena">🌙 Cena</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary add-favorite"
          @click="addToPlan(favorite)"
        >
          + Añadir al plan
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.favorites-heading {
  margin-bottom: 30px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #48a66c;
}

.favorites-heading h1 {
  margin-top: 8px;
}

.favorites-heading p {
  color: #78847c;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.favorite-card {
  background: white;
  border: 1px solid #e8ede8;
  border-radius: 14px;
  padding: 20px;
}

.favorite-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.favorite-title > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.favorite-title h3 {
  font-size: 16px;
  margin: 0;
  overflow-wrap: anywhere;
}

.favorite-icon {
  font-size: 22px;
}

.delete-favorite {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 7px;
  border-radius: 6px;
}

.delete-favorite:hover {
  background: #fff0f0;
}

.favorite-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
}

.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dce4dc;
  border-radius: 8px;
  background: white;
}

.add-favorite {
  width: 100%;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}

.btn-primary {
  background: #27744b;
  color: white;
}

.btn-primary:hover {
  background: #1c5d3a;
}

.empty-state .btn {
  display: inline-block;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
