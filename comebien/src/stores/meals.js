
import { defineStore } from 'pinia'

export const useMealsStore = defineStore('meals', {
  state: () => ({
    meals: [],
    favorites: [],
    nextId: 1
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
    mealCount: (state) => state.meals.length
  },

  actions: {
    addMeal(meal) {
      this.meals.push({
        id: this.nextId++,
        name: meal.name,
        day: meal.day,
        type: meal.type
      })
    },

    deleteMeal(id) {
      this.meals = this.meals.filter(
        meal => meal.id !== id
      )
    },

    editMeal(id, updatedMeal) {
      const meal = this.meals.find(
        meal => meal.id === id
      )

      if (meal) {
        meal.name = updatedMeal.name
        meal.day = updatedMeal.day
        meal.type = updatedMeal.type
      }
    },

    toggleFavorite(meal) {
      const name = meal.name.trim().toLowerCase()

      const favorite = this.favorites.find(
        item => item.name.trim().toLowerCase() === name
      )

      if (favorite) {
        this.deleteFavorite(favorite.id)
      } else {
        this.favorites.push({
          id: this.nextId++,
          name: meal.name,
          day: meal.day,
          type: meal.type
        })
      }
    },

    deleteFavorite(id) {
      this.favorites = this.favorites.filter(
        favorite => favorite.id !== id
      )
    },

    addFavoriteToPlan(favorite, day, type) {
      this.addMeal({
        name: favorite.name,
        day,
        type
      })
    },

    clearPlan() {
      this.meals = []
    }
  },
  persist: true
})
