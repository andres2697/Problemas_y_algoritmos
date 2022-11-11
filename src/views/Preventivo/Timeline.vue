<template>
    <div class="flex justify-center h-[15%] w-full mt-10">
        <div class="flex w-full h-[100%] shadow-customized rounded-lg justify-center">
            <div class="flex flex-col items-center w-1/3 justify-center">
                <div 
                    class="bg-[#D9D9D9] w-10 h-10 rounded-full"
                    :class="[props.state == 1 ? '-mt-[13%]' : '-mt-[12%]']"
                ></div>
                Hora de inicio
                <div class="flex w-full justify-center pt-5">
                    <div 
                        class="flex w-[60%]"
                        :class="[props.state == 1 ? 'border-solid border-b-4 border-black' : '']"
                    ></div>
                </div>
            </div>
            <div class="flex flex-col items-center w-1/3 justify-center">
                <div 
                    class="bg-[#D9D9D9] w-10 h-10 rounded-full"
                    :class="[props.state == 2 ? '-mt-[13%]' : '-mt-[12%]']"
                ></div>
                Hora de llegada
                <div class="flex w-full justify-center pt-5">
                    <div 
                        class="flex w-[60%]"
                        :class="[props.state == 2 ? 'border-solid border-b-4 border-black' : '']"
                    ></div>
                </div>
            </div>
            <div class="flex flex-col items-center w-1/3 justify-center">
                <div 
                    class="bg-[#D9D9D9] w-10 h-10 rounded-full"
                    :class="[props.state == 3 ? '-mt-[13%]' : '-mt-[12%]']"
                ></div>
                Hora de cierre
                <div class="flex w-full justify-center pt-5">
                    <div 
                        class="flex w-[60%]"
                        :class="[props.state == 3 ? 'border-solid border-b-4 border-black' : '']"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    const props = defineProps(['state']);
</script>
