<div class="button-before-after" data-before="I'm before 👹" data-after="I'm after 😈">I'm the content</div>

<style>
  :root {
    --after-color: pink;
    --before-color: rgb(1, 113, 206);
    --main-text-color: rgb(2, 92, 165);
  }
  .button-before-after {
    margin: 16px;
    width: 160px;
    height: 60px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    font-size: 24px;
  }

  .button-before-after:after {
    color: var(--before-color);
    background-color: var(--after-color);
    content: attr(data-after);
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height 0.3s;
    overflow: hidden;
  }

  .button-before-after:before {
    background-color: var(--before-color);
    content: attr(data-before);
    color: var(--after-color);
    position: absolute;
    width: 100%;
    height: 0%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height 0.3s;
    overflow: hidden;
  }

  .button-before-after:hover:before {
    height: 100%;
  }

  .button-before-after:hover:after {
    height: 0%;
  }
</style>
