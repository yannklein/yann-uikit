<script>
  import Prism from 'prismjs';
  import { writable } from 'svelte/store';
  
  export let code;

  const styledCode = {};
  Object.keys(code).forEach((lang) => {
    styledCode[lang] = Prism.highlight(code[lang], Prism.languages[lang.toLowerCase()], lang.toLowerCase());
  });
  const currentLang = writable(Object.keys(code)[0]);

  let isCopied = false;
  const copyCode = () => {
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 1000);
    // copy(styledCode[$currentLang])
  }
</script>

<div class="tab">
  {#each Object.keys(code) as lang}
    <h3 on:click={currentLang.set(lang)}>{lang}</h3>
  {/each}
  <div class="copied" class:active={isCopied}>Copied!</div>
</div>
<div class="code" on:click={copyCode}>
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
    cursor: pointer;
  }
  .tab {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .copied {
    background-color: rgb(191, 238, 191);
    color: rgb(3, 65, 3);
    border: 2px solid rgb(209, 235, 209);
    border-radius: 4px;
    padding: 4px 8px;
    margin-left: 64px;
    opacity: 0;
  }
  .copied.active {
    animation: copied 1 1;
    opacity: 1;
    transition: opacity 1s;
  }

  .tab h3 {
    border-radius: 4px;
    background-color: #F4F2F0;
    padding: 4px 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
</style>