import "./styles.css";

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

const heroes = [
  {
    id: "viper",
    name: "Viper",
    title: "The Toxic Emperor",
    role: "Carry",
    rating: 98,
    origin: "Toxic Wastes",
    accent: "#9de25a",
    portrait: asset("viper-portrait.png"),
    tagline: "One throne. Three names. Eternal legacy.",
    summary:
      "A venomous dragon of ancient dominion. Corrosion is his breath, attrition his law, and the battlefield bends under toxic reign.",
    stats: {
      durability: 72,
      offense: 83,
      mobility: 48
    },
    abilities: [
      { name: "Poison Breath", type: "Cone", text: "Blinds the front line in a rolling corrosive fog." },
      { name: "Nethertoxin", type: "Passive", text: "Corrodes armor and punishes drawn-out engagements." },
      { name: "Corrosive Skin", type: "Passive", text: "Retaliates against aggressors with venom burn." },
      { name: "Viper Strike", type: "Ultimate", text: "Drops from above to cripple a chosen target." }
    ]
  },
  {
    id: "drow",
    name: "Drow",
    title: "The Moon Veil Huntress",
    role: "Precision",
    rating: 95,
    origin: "Frostveil Ramparts",
    accent: "#9a7dff",
    portrait: asset("drow-portrait.png"),
    tagline: "Silence in the dark. Judgment in a heartbeat.",
    summary:
      "A sovereign archer who turns moonlight into execution. She owns the long lane, picks impossible angles, and erases hesitation with a single draw.",
    stats: {
      durability: 41,
      offense: 92,
      mobility: 67
    },
    abilities: [
      { name: "Frost Volley", type: "Burst", text: "Pins opponents in place with spectral arrow rain." },
      { name: "Shadow Aim", type: "Passive", text: "Extends range and sharpens finishing pressure." },
      { name: "Moon Mantle", type: "Escape", text: "Slips into cover behind a veil of violet mist." },
      { name: "Black Crown", type: "Ultimate", text: "Channels a charged shot that ruptures the backline." }
    ]
  },
  {
    id: "lion",
    name: "Lion",
    title: "The Crimson Hierophant",
    role: "Control",
    rating: 97,
    origin: "Ember Sanctum",
    accent: "#ff7448",
    portrait: asset("lion-portrait.png"),
    tagline: "Hellfire counsel. A throne won by terror.",
    summary:
      "An infernal warlock king crowned in ruin. He dictates pace through fear, stuns the faithful, and turns one perfect cast into total collapse.",
    stats: {
      durability: 58,
      offense: 89,
      mobility: 53
    },
    abilities: [
      { name: "Hex of Kings", type: "Control", text: "Twists enemies into helpless sacrificial forms." },
      { name: "Abyss Spike", type: "Burst", text: "Rips jagged hellfire through clustered ranks." },
      { name: "Soul Drain", type: "Sustain", text: "Feeds on panic to recover strength and mana." },
      { name: "Demon Verdict", type: "Ultimate", text: "Executes a marked foe in a single crimson surge." }
    ]
  }
];

const featureCards = [
  {
    kicker: "01",
    title: "Hero Interactions",
    text: "Dynamic rivalries and synergies shape every clash. Choose your champion and define your destiny.",
    image: asset("hero-interactions.png")
  },
  {
    kicker: "02",
    title: "Skill Showcase",
    text: "Master iconic abilities and devastating combos. Precision, timing, and nerve decide all.",
    image: asset("skill-showcase.png")
  },
  {
    kicker: "03",
    title: "Battlefield Lore",
    text: "Uncover a shattered realm where every war leaves a scar and every legend leaves a mark.",
    image: asset("battlefield-lore.png")
  }
];

let currentHeroIndex = 0;
let activeTab = "overview";

const app = document.querySelector("#app");

function statRow(label, value, accent) {
  return `
    <div class="meter">
      <div class="meter__label-row">
        <span>${label}</span>
        <span>${value}</span>
      </div>
      <div class="meter__track">
        <div class="meter__fill" style="width:${value}%; background:${accent}; box-shadow:0 0 18px ${accent};"></div>
      </div>
    </div>
  `;
}

function abilityMarkup(hero) {
  return hero.abilities
    .map(
      (ability, index) => `
        <article class="ability">
          <div class="ability__glyph" style="--ability-accent:${hero.accent}">${index + 1}</div>
          <div>
            <p class="ability__name">${ability.name}</p>
            <p class="ability__type">${ability.type}</p>
            <p class="ability__text">${ability.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function render() {
  const hero = heroes[currentHeroIndex];

  app.innerHTML = `
    <div class="page-shell" style="--hero-accent:${hero.accent}">
      <header class="topbar">
        <div class="brand">
          <div class="brand__crest">T115</div>
        </div>
        <nav class="topnav">
          <a class="topnav__item topnav__item--active" href="#hero">Home</a>
          <a class="topnav__item" href="#features">Heroes</a>
          <a class="topnav__item" href="#stage">Schedule</a>
          <a class="topnav__item" href="#stage">Tickets</a>
          <a class="topnav__item" href="#cta">News</a>
          <a class="topnav__item" href="#cta">About</a>
        </nav>
        <a class="button button--outline" href="#cta">Get Tickets</a>
      </header>

      <main>
        <section class="hero" id="hero">
          <div class="hero__backdrop">
            <img src="${asset("reference-crimson-throne.png")}" alt="" />
          </div>
          <div class="hero__veil"></div>
          <div class="hero__content">
            <div class="hero__copy">
              <p class="eyebrow">The throne awaits</p>
              <h1>T115</h1>
              <h2>${hero.tagline}</h2>
              <p class="hero__summary">
                T115 is where legends collide and only one reigns supreme. Witness the ultimate test of power,
                strategy, and will in a battle for immortality.
              </p>
              <div class="hero__actions">
                <a class="button button--solid" href="#stage">Watch Trailer</a>
                <button class="scroll-hint" type="button" data-jump="#features">Scroll to Discover</button>
              </div>
            </div>

            <aside class="selector">
              <p class="selector__eyebrow">Choose your champion</p>
              <div class="selector__list">
                ${heroes
                  .map(
                    (item, index) => `
                      <button
                        class="selector__item ${index === currentHeroIndex ? "selector__item--active" : ""}"
                        data-hero="${index}"
                        type="button"
                      >
                        <img src="${item.portrait}" alt="${item.name}" />
                        <span>${item.name}</span>
                      </button>
                    `
                  )
                  .join("")}
              </div>
            </aside>
          </div>

          <div class="hero-stats">
            <article>
              <span class="hero-stats__label">Role</span>
              <strong>${hero.role}</strong>
            </article>
            <article>
              <span class="hero-stats__label">Power Rating</span>
              <strong>${hero.rating}<small>/100</small></strong>
            </article>
            <article>
              <span class="hero-stats__label">Signature Style</span>
              <strong>${hero.abilities[0].name}</strong>
            </article>
            <article>
              <span class="hero-stats__label">Origin</span>
              <strong>${hero.origin}</strong>
            </article>
          </div>
        </section>

        <section class="features" id="features">
          ${featureCards
            .map(
              (card) => `
                <article class="feature-card" style="background-image:linear-gradient(180deg, rgba(6, 6, 8, 0.1), rgba(6, 6, 8, 0.88)), url('${card.image}')">
                  <p class="feature-card__kicker">${card.kicker}</p>
                  <h3>${card.title}</h3>
                  <p>${card.text}</p>
                  <a href="#stage">Explore More</a>
                </article>
              `
            )
            .join("")}
        </section>

        <section class="stage" id="stage">
          <div class="stage__frame"></div>
          <div class="stage__panel">
            <div class="stage__media">
              <img src="${hero.portrait}" alt="${hero.name}" />
            </div>

            <div class="stage__details">
              <div class="tabs">
                ${["overview", "abilities", "lore", "stats"]
                  .map(
                    (tab) => `
                      <button class="tabs__item ${activeTab === tab ? "tabs__item--active" : ""}" data-tab="${tab}" type="button">
                        ${tab}
                      </button>
                    `
                  )
                  .join("")}
              </div>

              <div class="stage__body">
                <div class="stage__headline">
                  <div>
                    <h3>${hero.name}</h3>
                    <p>${hero.title}</p>
                  </div>
                  <div class="seal">${hero.name.slice(0, 1)}</div>
                </div>

                ${
                  activeTab === "overview"
                    ? `<p class="stage__summary">${hero.summary}</p>`
                    : ""
                }

                ${
                  activeTab === "abilities"
                    ? `<div class="ability-stack">${abilityMarkup(hero)}</div>`
                    : ""
                }

                ${
                  activeTab === "lore"
                    ? `<div class="lore-block">
                        <p>Born beyond the ordinary lanes of war, ${hero.name} became a symbol of inevitability. Entire battalions measure morale against the sound of ${hero.abilities[0].name.toLowerCase()} and the omen of ${hero.origin.toLowerCase()}.</p>
                        <p>At T115, each champion enters not as a competitor but as a dynasty candidate. The arena only remembers those who leave with a claim on history.</p>
                      </div>`
                    : ""
                }

                ${
                  activeTab === "stats"
                    ? `<div class="meter-stack">
                        ${statRow("Durability", hero.stats.durability, hero.accent)}
                        ${statRow("Offense", hero.stats.offense, hero.accent)}
                        ${statRow("Mobility", hero.stats.mobility, hero.accent)}
                      </div>`
                    : `<div class="meter-stack">
                        ${statRow("Durability", hero.stats.durability, hero.accent)}
                        ${statRow("Offense", hero.stats.offense, hero.accent)}
                        ${statRow("Mobility", hero.stats.mobility, hero.accent)}
                      </div>`
                }

                <a class="button button--outline button--compact" href="#cta">View Full Profile</a>
              </div>
            </div>
          </div>

          <div class="abilities-bar">
            ${abilityMarkup(hero)}
          </div>

          <div class="carousel-controls">
            <button class="carousel-controls__button" data-cycle="-1" type="button">Prev</button>
            <div class="carousel-controls__dots">
              ${heroes
                .map(
                  (_, index) => `
                    <button
                      class="carousel-controls__dot ${index === currentHeroIndex ? "carousel-controls__dot--active" : ""}"
                      data-hero="${index}"
                      type="button"
                      aria-label="Show hero ${index + 1}"
                    ></button>
                  `
                )
                .join("")}
            </div>
            <button class="carousel-controls__button" data-cycle="1" type="button">Next</button>
          </div>
        </section>

        <section class="cta" id="cta">
          <div class="cta__image">
            <img src="${asset("battlefield-lore.png")}" alt="" />
          </div>
          <div class="cta__copy">
            <p class="eyebrow">Live at the T115 Arena</p>
            <h3>Aug 15-18, 2025</h3>
            <p>Four days. Three champions. One throne. Early access, championship seating, and archive drops open now.</p>
          </div>
          <a class="button button--solid" href="#hero">Get Tickets</a>
        </section>
      </main>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-hero]").forEach((button) => {
    button.addEventListener("click", () => {
      currentHeroIndex = Number(button.dataset.hero);
      render();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-cycle]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.cycle);
      currentHeroIndex = (currentHeroIndex + direction + heroes.length) % heroes.length;
      render();
    });
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.jump);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

render();
