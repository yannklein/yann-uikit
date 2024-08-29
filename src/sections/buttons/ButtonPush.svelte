<div class="button-push">
  <a href="https://yannklein.dev/">PUSH</a>
</div>

<style>
  :root {
    --main-bg-color: pink;
    --main-color: rgb(1, 113, 206);
    --main-text-color: rgb(2, 92, 165);
  }
  .button-push {
    margin: 16px;
    align-self: center;
    transform: translate(-4px, -4px);
    transition: 0.3s;
  }
  .button-push:hover {
    transform: translate(0px, 0px);
  }
  .button-push:active {
    transform: translate(4px, 4px);
  }
  .button-push a {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    font-size: 24px;
    font-weight: 600;
    padding: 8px 24px;
    border-radius: 8px;
    border: 4px solid var(--main-color);
    position: relative;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
  }
  .button-push a:after {
    content: '';
    z-index: -1;
    background-color: var(--main-color);
    border-radius: 8px;
    border: 4px solid var(--main-bg-color);
    position: absolute;
    top: 8px;
    left: 8px;
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }
  .button-push:hover a:after {
    top: 4px;
    left: 4px;
  }
  .button-push:active a:after {
    top: 0px;
    left: 0px;
  }
</style>
