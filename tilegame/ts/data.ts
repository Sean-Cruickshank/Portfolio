export const backgroundData = [
  {
    wall: 'background: radial-gradient(green, rgb(0, 77, 0))',
    floor: 'background-image: url(/images/tilegame/grass.png)'
  },{
    wall: 'background: radial-gradient(rgb(90,90,120), rgb(120,120,150))',
    floor: 'background-image: url(/images/tilegame/dirt.png)'
  },{
    wall: 'background: radial-gradient(rgb(140, 140, 220), rgb(100, 100, 180))',
    floor: 'background-image: url(/images/tilegame/ice.png)'
  },{
    wall: 'background: radial-gradient(rgb(255, 106, 0), rgb(255, 38, 0))',
    floor: 'background-image: url(/images/tilegame/rock.png)'
  },{
    wall: 'background: radial-gradient(rgb(138, 0, 145), rgb(81, 0, 44))',
    floor: 'background-image: url(/images/tilegame/space.png)'
  },

]

export const aboutData = [
  `
    <p>The goal of the game is to collect as many keys as you can before the timer ends</p>
    <div
      class="plate key about-dummy"
      style="background-image: url(/images/tilegame/key.png);"
    ></div>
    <p>Reaching higher scores allows you to unlock new backgrounds and customisation options!</p>
  `,
  `
    <p>The player icon can be moved between tiles either with the arrow keys, by swiping with your 
    touchscreen, or by activating the touchpad from the settings menu</p>
    <div
        class="plate player-icon about-dummy"
        style="
          background-color: #3F48CC;
          background-image: url(/images/tilegame/player-template-gold.png);
        "
    ></div>
    <p>You can customise your player icon by clicking the icon above the scoreboard!
  `,
  `
    <p>Collect timers to extend the length of a match and score more points</p>
    <div class="about-clocks">
      <div>
        <div class="plate clock about-dummy" style="background-image: url(/images/tilegame/clock-2.png);"></div>
        <p>+2s</p>
      </div>
        <div>
        <div class="plate clock about-dummy" style="background-image: url(/images/tilegame/clock-3.png);"></div>
      <p>+3s</p>
      </div>
      <div>
        <div class="plate clock about-dummy" style="background-image: url(/images/tilegame/clock-5.png);"></div>
        <p>+5s</p>
      </div>
    </div>
  `,
  `
    <p>Each level is randomly generated, so you may sometimes encounter a level where the key is inaccessible</p>
    <p>Reset the board at any time by hitting the 'Enter' key or by pressing the reset button!</p>
  `
]

export const popupData = [
  {
    mode: 'settings',
    content: `
      <h2>Settings</h2>
      <button class="reset-score-button">Reset Highscore</button>
      <button class="toggle-touchpad-button">Toggle Touchpad</button>
    `
  }, {
    mode: 'about',
    content: `
      <div class="about-section">
        <button class="about-section-left"><</button>
        <h2>How to Play!</h2>
        <div class="about-content">

        </div>
        <button class="about-section-right">></button>
      </div>
    `
  }, {
    mode: 'customiser',
    content: `
      <h2>Customisation Settings</h2>
      <div class="customiser-option">
        <p>Colour:</p>
        <select class="colour-select" name="colour" id="colour-select">
          <option title="Blue" value="#3F48CC">Blue</option>
          <option title="Red" value="#ED1C24">Red</option>
          <option title="Yellow" value="#FFF200">Yellow</option>
          <option title="Green" value="#22B14C">Green</option>
          <option title="Teal" value="#21A7B1">Teal</option>
          <option title="Orange" value="#FF7F27">Orange</option>
          <option title="Custom" value="#EEE">Custom</option>
          
        </select>
      </div>

      <div class="customiser-option">
        <p>Frame:</p>
        <select class="arrow-select" name="arrow" id="arrow-select">
          <option title="Black" value="black">Black</option>
          <option title="White" value="white">White</option>
          <option title="Gold" value="gold">Gold</option>
        </select>
      </div>
      <input class="colour-input" type="color" />
    `
  }
]