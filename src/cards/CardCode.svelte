<script>
  import { fade } from 'svelte/transition';
  export let showCode;
</script>

<div class="code-popup" transition:fade="{{delay: 250, duration: 300}}">
  <div id="close" on:click={() => showCode(false)}>X</div>
  Hello!
</div>

<style>
  .code-popup {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background-color: white;
    position: fixed;
    width: 80vw;
    height: 80vh;
    box-shadow: 0 0 16px rgba(0,0,0,0.3);
  }
  #close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
</style>
