<script>
  let isFlipped = false;
  const toggleFlip = () => isFlipped = !isFlipped;
</script>

<div class="item-flip" on:click={toggleFlip} class:flipped={isFlipped}>
  <div class="item-flip-inner">
    <div class="item-flip-front">
      <div class="item-flip-content">
        <h2>The flipping item</h2>
        <p>Hover it (or click it on mobile) to display...</p>
      </div>
    </div>
    <div class="item-flip-back">
      <div class="item-flip-content">
        <p>The back of the card!</p>
      </div>
    </div>
  </div>
</div>

<style>
  .item-flip {
  /*customizable*/
  height: 120px;
  width: 100%;
}

.item-flip-inner {
  /*fixed*/
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.item-flip h2 {
  /*customizable*/
  margin: 0;
}

.item-flip p {
  /*customizable*/
  margin: 0;
}

.item-flip-front, .item-flip-back {
  /*fixed*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /*customizable*/
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
  background-color: rgb(250,250,250);
}

.item-flip-content {
  padding-left: 24px;
}

.item-flip-back {
  transform: rotateX(180deg);
}

.item-flip.flipped .item-flip-inner {
  transform: rotateX(180deg);
}

/* De-activate card hover style for mobiles */
@media (min-width: 1100px) {
  .item-flip:hover .item-flip-inner {
    transform: rotateX(180deg);
  }
}
</style>