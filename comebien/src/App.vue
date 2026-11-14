<script setup></script>

<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <RouterLink to="/" class="logo"> 🍽️ ComeBien </RouterLink>

        <nav class="navigation">
          <RouterLink to="/">Plan semanal</RouterLink>
          <RouterLink to="/favoritos">Favoritos</RouterLink>
          <RouterLink to="/configuracion">Configuración</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container main-content">
      <RouterView />
    </main>
  </div>
</template>
