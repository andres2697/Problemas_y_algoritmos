<template>
  <header class="w-full bg-white shadow justify-center items-center">
    <div class="flex flex-col w-full h-full content-center justify-center mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-center text-3xl font-bold leading-tight text-gray-900">
        Página no encontrada
      </h1>
      <h3 class="flex text-center justify-center items-center cursor-pointer underline underline-offset-3 text-blue-700 hover:text-blue-500" @click="$router.push('/dashboard')">Dashboard</h3>
    </div>
  </header>
</template>
