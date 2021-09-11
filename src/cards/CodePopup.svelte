<script>
  import { fade } from 'svelte/transition';
  import Code from '../Code.svelte';
  import Icon from 'fa-svelte'
  import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
  
  export let showCode, code;
</script>

<div class="code-popup" transition:fade="{{delay: 250, duration: 300}}">
  <div id="close" on:click={() => showCode(false)}><Icon icon={faTimes}/></div>
    <Code code={code}/>
</div>

<style>
  .code-popup {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background-color: white;
    border-radius: 4px;
    position: fixed;
    width: 50vw;
    height: 50vh;
    box-shadow: 0 0 16px rgba(0,0,0,0.1);
    overflow-y: scroll;
    overflow-wrap: normal;
    padding: 16px;
  }
  #close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    .code-popup {
      width: 80vw;
      height: 80vh;
    }
  }
</style>
