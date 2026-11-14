
<script setup>
import DayCard from './DayCard.vue'

const props = defineProps({
  days: {
    type: Array,
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

function mealsForDay(day) {
  return props.meals.filter(meal => meal.day === day)
}
</script>

<template>
  <div class="week-grid">
    <DayCard
      v-for="day in days"
      :key="day"
      :day="day"
      :meals="mealsForDay(day)"
      :favorites="favorites"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
      @toggle-favorite="emit('toggle-favorite', $event)"
    />
  </div>
</template>

<style scoped>
.week-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 850px) {
  .week-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 550px) {
  .week-grid {
    grid-template-columns: 1fr;
  }
}
</style>
