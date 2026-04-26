---
layout: base.njk
title: Home
siteName: "The Iron Pact"
---

<div class="ornament">⚔ ✦ ⚔</div>

<p><em>Welcome, adventurer. Within these pages lies the collected lore, records, and secrets of our campaign. Choose your path wisely.</em></p>

<div class="ornament">· · ·</div>

## Latest Sessions

<ul class="session-list">
{% for session in collections.sessions | first(3) %}
  <li>
    <span class="s-date">{{ session.date | readableDate }}</span>
    <a href="{{ session.url }}">{{ session.data.title }}</a>
    {% if session.data.description %}
    <div class="s-desc">{{ session.data.description }}</div>
    {% endif %}
  </li>
{% endfor %}
</ul>

[→ All session logs](/sessions/)

<div class="ornament">· · ·</div>

<img src="/downloads/TheNorth.png" alt="Il Nord, Forgotten Realms" style="max-width: 50%; border-radius: 6px;">

## Explore the World

<div class="card-grid">
  <a class="card" href="/npcs/">
    <h3>👤 Characters & NPCs</h3>
    <p>The faces you've met, the allies you've made, the enemies you've earned.</p>
    <span class="card-tag">PEOPLE</span>
  </a>
  <a class="card" href="/locations/">
    <h3>🗺 Locations</h3>
    <p>Cities, dungeons, taverns, and forgotten places across the realm.</p>
    <span class="card-tag">PLACES</span>
  </a>
  <a class="card" href="/downloads/">
    <h3>⬇ Downloads</h3>
    <p>Maps, character sheets, handouts, and other materials for the table.</p>
    <span class="card-tag">FILES</span>
  </a>
</div>
