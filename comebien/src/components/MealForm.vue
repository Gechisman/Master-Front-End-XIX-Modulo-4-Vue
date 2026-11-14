
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  mealToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const days = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

const form = ref({
  name: '',
  day: 'Lunes',
  type: 'comida'
})

// Detectar si estamos editando un plato
watch(
  () => props.mealToEdit,
  (meal) => {
    if (meal) {
      form.value = {
        name: meal.name,
        day: meal.day,
        type: meal.type
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function resetForm() {
  form.value = {
    name: '',
    day: 'Lunes',
    type: 'comida'
  }
}

function submitForm() {
  const name = form.value.name.trim()

  if (!name) return

  emit('save', {
    name,
    day: form.value.day,
    type: form.value.type
  })

  if (!props.mealToEdit) {
    resetForm()
  }
}

function cancelEdit() {
  emit('cancel')
}
</script>

<template>
  <form class="meal-form" @submit.prevent="submitForm">
    <div class="form-heading">
      <h2>
        {{ mealToEdit ? 'Editar plato' : 'Añadir un plato' }}
      </h2>
      <p>
        {{ mealToEdit
          ? 'Modifica los datos del plato.'
          : 'Organiza tu próxima comida.' }}
      </p>
    </div>

    <div class="form-fields">
      <div class="form-group">
        <label for="meal-name">Nombre del plato</label>
        <input
          id="meal-name"
          v-model="form.name"
          type="text"
          placeholder="Ej. Tortilla de patatas"
          required
          maxlength="80"
        />
      </div>

      <div class="form-group">
        <label for="meal-day">Día de la semana</label>
        <select id="meal-day" v-model="form.day">
          <option v-for="day in days" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Tipo de comida</label>

        <div class="radio-options">
          <label class="radio-option">
            <input
              v-model="form.type"
              type="radio"
              value="comida"
            />
            ☀️ Comida
          </label>

          <label class="radio-option">
            <input
              v-model="form.type"
              type="radio"
              value="cena"
            />
            🌙 Cena
          </label>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        {{ mealToEdit ? 'Guardar cambios' : 'Agregar plato' }}
      </button>

      <button
        v-if="mealToEdit"
        type="button"
        class="btn btn-secondary"
        @click="cancelEdit"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.meal-form {
  background: white;
  border: 1px solid #e8ede8;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 30px;
}

.form-heading h2 {
  margin: 0 0 5px;
  font-size: 20px;
}

.form-heading p {
  margin: 0 0 22px;
  color: #78847c;
  font-size: 14px;
}

.form-fields {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.form-group > label {
  font-size: 13px;
  font-weight: 700;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #dce4dc;
  border-radius: 8px;
  background: white;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #48a66c;
}

.radio-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}

@media (max-width: 700px) {
  .form-fields {
    grid-template-columns: 1fr;
  }
}
</style>
