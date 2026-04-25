# 📜 TTRPG Wiki — Setup Guide

A step-by-step guide to get your campaign wiki online.  
No coding experience required — just follow the steps in order.

---

## What you'll install (all free)

| Tool | What it does |
|------|-------------|
| **Node.js** | Lets your computer run the wiki builder |
| **Git** | Saves your work and syncs it online |
| **GitHub account** | Stores your wiki files in the cloud |
| **Netlify account** | Publishes your wiki with a password |

---

## PART 1 — Install the tools

### Step 1 · Install Node.js

1. Go to **https://nodejs.org**
2. Click the big **"LTS"** download button (the left one)
3. Run the installer, click Next through everything
4. When done, open your **Terminal** (Mac) or **Command Prompt** (Windows)
5. Type this and press Enter:
   ```
   node --version
   ```
   You should see something like `v20.11.0` — any number is fine.

### Step 2 · Install Git

1. Go to **https://git-scm.com/downloads**
2. Download for your system and install it
3. In the terminal, type:
   ```
   git --version
   ```
   You should see a version number.

### Step 3 · Create a GitHub account

1. Go to **https://github.com** and sign up for a free account
2. Verify your email

### Step 4 · Create a Netlify account

1. Go to **https://netlify.com**
2. Click **Sign up** → choose **Sign up with GitHub**
3. This links them together — you'll need it later

---

## PART 2 — Set up your wiki folder

### Step 5 · Put the wiki folder somewhere sensible

Move the `ttrpg-wiki` folder you received to somewhere easy to find,  
like your **Documents** folder.

### Step 6 · Open the folder in your terminal

**On Mac:**
- Open Terminal
- Type `cd ` (with a space after), then drag the `ttrpg-wiki` folder into the terminal window
- Press Enter

**On Windows:**
- Open the `ttrpg-wiki` folder in File Explorer
- Click the address bar at the top, type `cmd`, press Enter

### Step 7 · Install the wiki builder

In the terminal, type:
```
npm install
```
Wait for it to finish (it downloads some files — takes ~30 seconds).

### Step 8 · Test it locally

Type:
```
npm start
```

Open your browser and go to **http://localhost:8080**

🎉 You should see your wiki! It works on your computer only for now.

Press `Ctrl+C` in the terminal to stop it when done.

---

## PART 3 — Put it on GitHub

### Step 9 · Create a new GitHub repository

1. Go to **https://github.com/new**
2. Name it `ttrpg-wiki` (or whatever you like)
3. Set it to **Private** ← important, keep it private
4. Click **Create repository**
5. GitHub will show you a page with some commands — leave it open

### Step 10 · Connect your folder to GitHub

In your terminal (in the ttrpg-wiki folder), type these one at a time:

```
git init
git add .
git commit -m "first commit"
git branch -M main
```

Then copy the line from GitHub that starts with `git remote add origin ...` and paste + run it.

Then:
```
git push -u origin main
```

Your files are now on GitHub. Refresh the GitHub page to see them.

---

## PART 4 — Publish with Netlify

### Step 11 · Deploy to Netlify

1. Go to **https://app.netlify.com**
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Find and select your `ttrpg-wiki` repository
5. Netlify will auto-detect the settings from `netlify.toml` — don't change anything
6. Click **Deploy site**

Wait ~1 minute. Your site will get a random URL like `sparkly-llama-123.netlify.app`.  
You can rename it in Site settings → Domain management.

### Step 12 · Add a password

1. In Netlify, go to **Site configuration** → **Access control**
2. Click **Password protection** (or **Visitor access**)
3. Enable it and set a password
4. Share the password with your players

That's it — your wiki is live and private! 🎉

---

## PART 5 — Using your wiki day to day

### Adding a session log

1. Open the `src/sessions/` folder
2. Copy `session-01.md` and rename it (e.g. `session-02.md`)
3. Edit the top section:
   ```
   ---
   title: "Session 02: The Mill at Dawn"
   date: 2024-03-22
   description: "Short one-line summary for the home page"
   ---
   ```
4. Write the session below using Markdown (see cheatsheet below)

### Adding an NPC

1. Open `src/npcs/`
2. Copy `greta-stobbe.md`, rename it (e.g. `the-innkeeper.md`)
3. Edit the title, role, status at the top
4. Write the NPC details below

### Adding a location

Same process — copy from `src/locations/millhaven.md`

### Adding a downloadable file

1. Drop the file (PDF, image, etc.) into `src/downloads/`
2. Open `src/downloads/index.md`
3. Copy an existing download box and change the filename and label

### Publishing changes

Every time you want to update the live site:

```
git add .
git commit -m "added session 02"
git push
```

Netlify will automatically rebuild and update the site in ~1 minute.

---

## Markdown cheatsheet

Markdown is how you format text in these files. It's very simple:

```markdown
# Big heading
## Medium heading
### Small heading

Normal paragraph text just goes here.

**bold text**
*italic text*

- bullet point
- another bullet

[Link text](/npcs/greta-stobbe/)

> This is a blockquote — good for in-world quotes
```

---

## Folder structure reference

```
ttrpg-wiki/
├── src/
│   ├── _includes/
│   │   └── base.njk        ← the page template (design lives here)
│   ├── sessions/           ← one .md file per session
│   ├── npcs/               ← one .md file per NPC
│   ├── locations/          ← one .md file per location
│   ├── downloads/          ← your PDF/image files go here
│   │   └── index.md        ← the downloads page
│   └── index.md            ← home page
├── .eleventy.js            ← wiki builder config (don't touch)
├── netlify.toml            ← Netlify config (don't touch)
└── package.json            ← project info (don't touch)
```

---

## Customising the look

All the visual design is in `src/_includes/base.njk`.

**To change the wiki name:**  
Open `src/index.md` and change `siteName: "The Iron Pact"` to your campaign name.

**To change colours:**  
Find the `:root {` section near the top of `base.njk` and edit the values.

**To change the sidebar links:**  
Find `<!-- SIDEBAR NAV -->` in `base.njk` and edit the `<a href>` lines.

---

## Troubleshooting

**`npm install` fails** → Make sure Node.js installed correctly. Re-run the installer.

**`npm start` shows an error** → Check you're in the right folder (you should see `package.json` if you type `ls` on Mac or `dir` on Windows).

**Site looks broken in browser** → Hard-refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).

**Changes not showing on Netlify** → Make sure you ran `git push`. Check the Netlify dashboard for build errors.

---

*Questions? Something not working? Bring the error message to your friendly neighbourhood Claude.*
