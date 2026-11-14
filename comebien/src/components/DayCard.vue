
<script setup>
defineProps({
  day: {
    type: String,
    required: true
  },
  meals: {
    type: Array,
    default: () => []
  },
  favorites: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'edit',
  'delete',
  'toggle-favorite'
])

const mealTypes = [
  { value: 'comida', label: '☀️ Comida' },
  { value: 'cena', label: '🌙 Cena' }
]

function mealsForType(type, meals) {
  return meals.filter(meal => meal.type === type)
}

function isFavorite(meal, favorites) {
  return favorites.some(
    favorite => favorite.name.toLowerCase() === meal.name.toLowerCase()
  )
}
</script>

<template>
  <article class="day-card">
    <h3>{{ day }}</h3>

    <div
      v-for="type in mealTypes"
      :key="type.value"
      class="meal-section"
    >
      <h4>{{ type.label }}</h4>

      <div
        v-if="mealsForType(type.value, meals).length === 0"
        class="no-meals"
      >
        Sin platos programados
      </div>

      <div
        v-for="meal in mealsForType(type.value, meals)"
        :key="meal.id"
        class="meal-item"
      >
        <div class="meal-name">
          <span>{{ meal.name }}</span>
        </div>

        <div class="meal-actions">
          <button
            type="button"
            class="action-btn favorite-btn"
            :class="{ active: isFavorite(meal, favorites) }"
            :title="isFavorite(meal, favorites)
              ? 'Quitar de favoritos'
              : 'Marcar como favorito'"
            @click="emit('toggle-favorite', meal)"
          >
            {{ isFavorite(meal, favorites) ? '❤️' : '🤍' }}
          </button>

          <button
            type="button"
            class="action-btn"
            title="Editar"
            @click="emit('edit', meal)"
          >
            ✏️
          </button>

          <button
            type="button"
            class="action-btn delete-btn"
            title="Eliminar"
            @click="emit('delete', meal.id)"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.day-card {
  background: white;
  border: 1px solid #e8ede8;
  border-radius: 14px;
  padding: 18px;
  min-width: 0;
}

.day-card > h3 {
  margin: 0 0 20px;
  color: #27744b;
  font-size: 19px;
}

.meal-section {
  margin-bottom: 18px;
}

.meal-section:last-child {
  margin-bottom: 0;
}

.meal-section h4 {
  margin: 0 0 10px;
  font-size: 13px;
  color: #78847c;
}

.no-meals {
  color: #a0aaa2;
  font-size: 12px;
  padding: 8px 0;
}

.meal-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid #f0f2ef;
}

.meal-name {
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.meal-actions {
  display: flex;
  gap: 3px;
  flex-shrink: 0;
}

.action-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  font-size: 14px;
}

.action-btn:hover {
  background: #f0f5f0;
}

.delete-btn:hover {
  background: #fff0f0;
}
</style>
