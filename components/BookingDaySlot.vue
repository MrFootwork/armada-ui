<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'
import useSlot from '@/composables/slot'

const props = defineProps<{
  dayIndex: number,
  slotTime: Day['halls'][number]['slots'][number]
}>()

// build router path with query
const basePath = useRoute().path
const paramDayIndex = `dayIndex=${props.dayIndex}`
const paramHall = `hallName=${props.slotTime.hall}`
const paramSlotStart = `start=${useDate(props.slotTime.start).time}`

const slotPath = `${basePath}/slot?${paramDayIndex}&${paramHall}&${paramSlotStart}`

function navigateToSlot() {
  return navigateTo(slotPath)
}

// id and label
const hallAndSlot = props.slotTime.hall + props.slotTime.start
// seats in current slot taken
const seatsTaken = useSlot(props.slotTime).seatsTaken
// free seats in current slot
const seatsFree = props.slotTime.limit - seatsTaken

</script>

<template>
  <div class="button slot" @click="navigateToSlot" :id="hallAndSlot">
    <label :for="hallAndSlot" class="time">
      {{ useDate(slotTime.start).time }} - {{ useDate(slotTime.end).time }}
    </label>
    <div class="divider"></div>
    <p class="">{{ `${seatsFree} of ${slotTime.limit}` }}</p>
  </div>
</template>

<style scoped lang="scss">
.button.slot {

  border: .5rem solid $card-color;
  border-radius: 1rem;
  margin: 1rem;
  width: 35vw;
  max-width: 15rem;
  cursor: pointer;

  text-align: center;

  box-shadow:
    4px 4px 5px -2px #111,
    -2px -2px 7px -4px #ccc;

  &:active {
    transform: translateY(2px);
  }

  label.time {
    display: block;
    box-sizing: content-box;
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;

  }

  .divider {
    border: .125rem solid $card-color;
  }

  p {
    margin: 0;
    padding: 1rem;
  }
}
</style>