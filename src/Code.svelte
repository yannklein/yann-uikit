<script>
  import Prism from 'prismjs';
  import { writable } from 'svelte/store';
  
  export let code;

  const styledCode = {};
  Object.keys(code).forEach((lang) => {
    styledCode[lang] = Prism.highlight(code[lang], Prism.languages[lang.toLowerCase()], lang.toLowerCase());
  });
  const currentLang = writable(Object.keys(code)[0]);
</script>

<div class="tab">
  {#each Object.keys(code) as lang}
    <h3 on:click={currentLang.set(lang)}>{lang}</h3>
  {/each}
</div>
<div class="code">
  <pre>
    <code>
      {@html styledCode[$currentLang]}
    </code>
  </pre> 
</div> 

<style>
  .code {
    height: calc(100% - 32px);
    overflow-y: auto;
  }
  .tab {
    display: flex;
    gap: 4px;
  }
  .tab h3 {
    border-radius: 4px;
    background-color: #F4F2F0;
    padding: 4px 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
</style>