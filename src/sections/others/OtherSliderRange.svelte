<p>A pure CSS slider with updating value</p>
<div class="others-slider-range">
  <input class="slider" type="range" value="70" min="0" max="100" id="range" oninput="rangenumber.value=value"/>
  <input class="rangenumber" type="number" id="rangenumber" min="0" max="100" value="70" oninput="range.value=value">
</div>

<style>
  p {
    margin-bottom: 16px;
    text-align: center;
    width: 100%;
  }
  .others-slider-range {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
  }
  .others-slider-range .slider {
    accent-color: rgb(2, 92, 165);
    flex-grow: 1;
  }
  .others-slider-range .rangenumber {
    border: 2px solid rgb(2, 92, 165);
    border-radius: 4px;
    text-align: center;
    background-color: pink;
    color: rgb(2, 92, 165);
  }
</style>