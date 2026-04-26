---
layout: base.njk
title: Home
siteName: "Il grimorio"
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

[→ Log delle sessioni](/sessions/)

<div class="ornament">· · ·</div>

<img src="/downloads/TheNorth.png" alt="Il Nord, Forgotten Realms" style="max-width: 100%; border-radius: 6px;">

<div class="ornament">· · ·</div>

## Explore the World

<div class="card-grid">
  <a class="card" href="/src/downloads/index">
    <h3>Downloads</h3>
    <p>Materiali da scaricare</p>
    <span class="card-tag">Materiali</span>
  <a class="card" href="/downloads/">
    <h3>⬇ Downloads</h3>
    <p>Maps, character sheets, handouts, and other materials for the table.</p>
    <span class="card-tag">FILES</span>
  </a>
</div>
