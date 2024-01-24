<template>
    <div class="dropdown editor-button b3-tooltips b3-tooltips__e fn__flex"   :style="{ textDecoration: selectedOption }">
      <button class="dropdown-button editor-button" @click="toggleMenu">
       A
      </button>

      <teleport to="body">
        <div class="dropdown-content b3-menu" 
        v-show="isOpen" 
        :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
          <span 
            v-for="option in options" 
            :key="option" 
            @click="selectOption(option)" 
            class="dropdown-option"
            :style="{ textDecoration: option }"
          >
            {{ option }}
          </span>

        </div>
      </teleport>
    </div>
  </template>
  <script>
  import eventBus from "eventBus"

  export default {
    data() {
      return {
        isOpen: false,
        selectedOption: 'none',
        options: ['none', 'underline', 'overline', 'line-through'],
        menuTop: 0,
        menuLeft: 0
      }
    },
    methods: {
      toggleMenu(event) {
        this.menuTop = event.clientY;
        this.menuLeft = event.clientX;
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.isOpen = false;
        eventBus.emit('css-props-change',{textDecoration:this.selectedOption})
      }
    }
  }
  </script>
  
  <style scoped>

  .dropdown-content {
    position: fixed;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1000;
  }
  
  .dropdown-content .dropdown-option {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-button {
    border: none;
    cursor: pointer;
  }
  </style>