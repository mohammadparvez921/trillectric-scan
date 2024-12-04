<script >
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
export default {
  components:{
    NavBar
  },
data() {
  return {
    data:[
      [
      "Tiger Nixon",
      "System Architect",
      "Edinburgh",
      "5421",
      "2011/04/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
  ]
  
]
  };
},
mounted: async function () {

   if(!localStorage.getItem("devices")){
    localStorage.setItem("devices",JSON.stringify(this.data));
  }
},

}
</script>

<template>
  <NavBar/>
  <notifications position="top right" width="200"/>
  <!-- <notifications group="app" position="bottom right" /> -->

  <RouterView/>
</template>

<style >

.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
    color: #161616;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
