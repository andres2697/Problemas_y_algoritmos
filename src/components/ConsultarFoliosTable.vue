<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6"></th>
          <th scope="col" class="py-3 px-6">Folio</th>
          <th scope="col" class="py-3 px-6">Tipo</th>
          <th scope="col" class="py-3 px-6">Ubicación</th>
          <th scope="col" class="py-3 px-6">Detalle</th>
          <th scope="col" class="py-3 px-6">ETA</th>
          <th scope="col" class="py-3 px-6">SLA</th>
          <th scope="col" class="py-3 px-6">Estatus</th>
          <th scope="col" class="py-3 px-6">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            Apple MacBook Pro 17"
          </th>
          <td class="py-4 px-6">Sliver</td>
          <td class="py-4 px-6">Laptop</td>
          <td class="py-4 px-6">$2999</td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit</a
            >
          </td>
        </tr>
        <tr
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            Microsoft Surface Pro
          </th>
          <td class="py-4 px-6">White</td>
          <td class="py-4 px-6">Laptop PC</td>
          <td class="py-4 px-6">$1999</td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit</a
            >
          </td>
        </tr>
        <tr
          class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            Magic Mouse 2
          </th>
          <td class="py-4 px-6">Black</td>
          <td class="py-4 px-6">Accessories</td>
          <td class="py-4 px-6">$99</td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup></script>
