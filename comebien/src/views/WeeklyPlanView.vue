
<script setup>
import { ref } from 'vue'

import { useMealsStore } from '@/stores/meals'

import MealForm from '@/components/MealForm.vue'
import MealList from '@/components/MealList.vue'

// Conectamos con Pinia
const mealsStore = useMealsStore()

// Días de la semana
const days = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

// Plato que estamos editando
const editingMeal = ref(null)

// Guardar un plato nuevo o modificar uno existente
function saveMeal(meal) {
  if (editingMeal.value) {
    mealsStore.editMeal(editingMeal.value.id, meal)
    editingMeal.value = null
  } else {
    mealsStore.addMeal(meal)
  }
}

// Preparar un plato para editarlo
function editMeal(meal) {
  editingMeal.value = { ...meal }
}

// Cancelar la edición
function cancelEdit() {
  editingMeal.value = null
}

// Eliminar un plato
function deleteMeal(id) {
  mealsStore.deleteMeal(id)
}

// Añadir o quitar de favoritos
function toggleFavorite(meal) {
  mealsStore.toggleFavorite(meal)
}

// Limpiar el plan semanal con confirmación
function clearPlan() {
  if (mealsStore.mealCount === 0) return

  const confirmed = window.confirm(
    '¿Estás seguro de que quieres eliminar todos los platos del plan semanal?'
  )

  if (confirmed) {
    mealsStore.clearPlan()
    editingMeal.value = null
  }
}
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <span class="eyebrow">ORGANIZA TU ALIMENTACIÓN</span>
        <h1>Mi plan semanal</h1>
        <p>Organiza tus comidas y cenas de toda la semana.</p>
      </div>

      <div class="stats">
        <div class="stat">
          <strong>{{ mealsStore.mealCount }}</strong>
          <span>Platos planificados</span>
        </div>

        <div class="stat">
          <strong>{{ mealsStore.favoriteCount }}</strong>
          <span>Favoritos</span>
        </div>
      </div>
    </div>

    <MealForm
      :meal-to-edit="editingMeal"
      @save="saveMeal"
      @cancel="cancelEdit"
    />

    <div class="list-heading">
      <div>
        <h2>Tu semana</h2>
        <p>Consulta lo que tienes previsto cada día.</p>
      </div>

      <button
        type="button"
        class="btn btn-danger"
        :disabled="mealsStore.mealCount === 0"
        @click="clearPlan"
      >
        Limpiar semana
      </button>
    </div>

    <MealList
      :days="days"
      :meals="mealsStore.meals"
      :favorites="mealsStore.favorites"
      @edit="editMeal"
      @delete="deleteMeal"
      @toggle-favorite="toggleFavorite"
    />
  </section>
</template>

<style scoped>
.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #48a66c;
}

.page-heading h1 {
  margin-top: 8px;
}

.page-heading p,
.list-heading p {
  color: #78847c;
  margin: 0;
  font-size: 14px;
}

.stats {
  display: flex;
  gap: 12px;
}

.stat {
  background: white;
  border: 1px solid #e8ede8;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  min-width: 115px;
}

.stat strong {
  font-size: 22px;
  color: #27744b;
}

.stat span {
  font-size: 11px;
  color: #78847c;
}

.list-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin: 35px 0 18px;
}

.list-heading h2 {
  margin: 0 0 5px;
  font-size: 21px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: 0.2s;
}

.btn-danger {
  background: #fff0f0;
  color: #c34b4b;
}

.btn-danger:hover:not(:disabled) {
  background: #ffe0e0;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 650px) {
  .page-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats {
    width: 100%;
  }

  .stat {
    flex: 1;
  }

  .list-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
