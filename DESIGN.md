# Yarn — Card Game Design Document

> Working document. Updated incrementally as the design is fleshed out.

---

## 1. Core Concepts

### 1.1 Emergent Story Generator
Yarn is designed as an **emergent story generator**. Rather than a scripted narrative, each play session is shaped by the combination of sets the players choose. A **Quest Set** defines the goal; a **Location Set** defines the world. Any Quest Set can be paired with any Location Set, enabling wildly different narrative combinations (e.g. *Defeat the Alien Infestation* played in *The Fairy Woods*).

### 1.2 Modularity Principle
Sets are designed to be **mix-and-match**. Generic cards within a set should not assume the presence of cards from another set. Hard-coded cross-card references are the intentional exception, used only for deliberate narrative coupling within a single set (see §1.3).

### 1.3 Card Tiers
Each set's cards split into two tiers:

| Tier | Placement at Setup | Characteristics |
|---|---|---|
| **Generic** | Shuffled into the draw area | Interchangeable, replayable, no guaranteed appearance |
| **Named** | Placed in the set-aside area | Retrievable by name/ID, always present, narrative anchors |

Named variants per card type:

| Card Type | Generic | Named (Set-Aside) |
|---|---|---|
| Location | Generic Location | **Setpiece** |
| Character | Generic Character | **Main Character** |
| Item | Generic Item | **Key Item** |
| Event | Generic Event | **Fated Event** |
| Quest | Side Quest | **Key Quest** |

> **Main Quest Cards** are unique per act and always set-aside. They sit outside the Generic/Named split — there is only ever one per act, always present, never pooled.

**Narrative clusters:** Named cards form self-contained narrative clusters — groups of tightly coupled cards from the same set that reference each other by ID. Example:
- *Find the Hermit's Shack* (Objective) triggers retrieval of the Setpiece *Hermit's Shack*
- *Hermit's Shack* On Reveal retrieves *The Hermit* (Main Character) from set-aside
- *Hermit's Shack* On Enter tucks *The Hermit's Staff* (Key Item) and two generic items under itself (see §1.4)

**Set identity spectrum:**
- **Quest / Side Quest Sets** → lean toward **story**: more named cards, tighter coupling, deliberate narrative beats
- **Location Sets** → lean toward **vibe**: more generic cards, atmosphere and setting, compatible with any quest

### 1.4 Play Areas
All cards in a session exist in one of four play areas at any given time:

| Area | Contents | Notes |
|---|---|---|
| **Tableau** | Persona Cards, equipped/carried Items, recruited Allies | Each player's personal active card area. The player's position on the map is represented by a token in the Game Area — tableau cards are always physically with the player. |
| **Game Area** | Active Locations, Characters in play, active Quest Cards, Items in play | The shared board state |
| **Set-Aside** | Setpieces, Main Characters, Key Items, Fated Events, Main Quest Cards, Key Quests, Side Quests | Named cards retrieved by ID via game effects; Main Quest Cards put into play at setup |
| **Draw Area** | Shuffled generic decks (Location, Character, Item, Event) | Drawn randomly when game effects call for a generic card. Each deck has an associated discard pile; when the deck empties it is reshuffled from the discard. |

Cards move between areas via game effects. These are physical play areas on the table, not digital UI concepts.

**Tucked cards:** A card (or set of cards) can be physically placed face-down under a parent card, forming a local pool that other effects can draw from. Tucked cards are not a separate play area — they remain part of whichever area their parent card occupies. Tucking is a runtime game state produced by effects, never instructed directly by setup.

When a parent card leaves play, its tucked cards are sent to the discard pile of their origin pool (named cards return to set-aside; generic cards go to their deck's discard).

> *Example:* An *On Enter* effect reads "Tuck 1 Main Character (hard-coded: *The Butler*) and 2 generic Character Cards under this card." A *Search* action on the same card reads "On success: retrieve 1 card from tucked cards."

### 1.5 Game Setup
A play session is configured by combining:
- One **Quest Set** — acts, main win conditions, narrative arc, pacing
- One **Location Set** — the world
- Zero or more **Side Quest Sets** — additional side objectives

Cards are distributed into the four play areas (§1.4). Main Quest Cards and Script Cards are put into play immediately. Setup instructions may also direct that certain cards be revealed; this fires their On Reveal effects normally, which may result in tucking or other game state changes.

> **Design principle:** Edge cases in setup and card interaction should be resolved through correct setup instructions and smart card design, not systemic exceptions.

---

## 2. Universal Card Properties

All cards share the following base properties regardless of type:

| Property | Required | Description |
|---|---|---|
| Title | Yes | The card's name |
| Image | Yes | Artwork |
| Subtitle | No | Secondary name or classification label |
| Flavor Text | No | Lore/narrative text, no mechanical effect |

All card-type-specific properties are in addition to these.

---

## 3. Card Types

### 3.1 Persona Cards
Cards that make up a player's action tableau, selected before the session begins. Player-owned — not part of any set's card pool.

**Play area:** Tableau

**Subtypes:** Each Persona Card carries two layers of subtyping:
- **Role** — one of Constitution, Zeal, or Path. Mirrors the Core Persona roles; the primary restriction axis for slot assignment.
- **Trait** — a secondary thematic tag (e.g. Skill, Instinct). Allows finer-grained slot restrictions without changing role identity. Example: Zeal can represent both a scientist's knowledge and a paladin's religious fervor — same role, different trait. Specific traits are open-ended and defined by the card designer.

**Properties:**
- Life Point Slots — physical spaces on the card, each visually overlapping one or more **damageable elements**. When a damage token is placed on a slot, all covered elements become unavailable. Total life points are summed across all Persona Cards in the tableau.

  **Damageable elements** — any of the following on a tableau card (including Allies):
  - A single passive effect
  - A single triggered effect (including actions)
  - A named group of passive and/or triggered effects
  - An entire card (e.g. an Ally card in the tableau)

  The specific elements covered by each slot are a deliberate card design decision. Visual treatment for each damageable element type is defined in the card editor spec.
- Passive Effects — always-on effects while the card is in the tableau (see §4.1). Includes die grants, persistent modifiers, and any other always-active property.
- Actions (see §4.4)

**Damage assignment:** When taking damage, the player places a token on any life point slot of their choosing across their Persona Cards, unless an effect specifies otherwise. This makes damage a strategic spatial decision — the player chooses which properties to sacrifice.

> *Example effect: Peak Performance* — damage must be assigned to this card first, representing a card that absorbs hits before others can be affected.

---

### 3.2 Core Persona Cards
A special subset of Persona Cards. Every player must have exactly three, one of each role. Core Persona Cards define the player's persona slots — the framework into which all other Persona Cards are placed.

**Additional Properties:**
- Core Role — one of:
  - **Constitution** — the character's physique
  - **Zeal** — the character's motivation
  - **Path** — the character's history/background
- Persona Slots — list of slot definitions, each with:
  - Count — how many cards may fill this slot
  - Allowed Subtypes — which Persona Card role/trait combinations are valid (empty = unrestricted)

> **Path** Core Persona Cards may grant starting items and/or starting allies — placed directly into the player's tableau at setup.

---

### 3.3 Location Cards
A discrete place characters can occupy (e.g. *Open Field*, *Castle Gate*, *Local Inn*).

**Play area:** Game Area (when in play). Draw Area (generic, before drawn). Set-Aside (Setpieces).

**Reveal state:** A Location Card in the Game Area is either **face-down** (in play but unrevealed) or **face-up** (revealed). This is a runtime state, not a card property.

- When a player moves to a face-down location, an implicit effect flips it face-up, firing **On Reveal** followed by **On Enter** (trigger priority — see §7).
- When a location enters play already face-up (e.g. via a connection effect), **On Reveal** fires but **On Enter** does not — no player has moved there.
- **On Enter** fires only when a player moves onto the location, regardless of its reveal state at time of entry.

> The key distinction: **On Reveal** reacts to the card becoming face-up; **On Enter** reacts to a player arriving. They coincide on a player's first visit, but are otherwise independent.

**Properties:**
- Actions (see §4.4)
- Connections — up to four, one per cardinal direction. When a location is revealed, its connections resolve: each connected location is drawn (or retrieved if hard-coded) and placed adjacent to the revealed location. Each connection has:
  - Target: **abstract** (draw from the location deck) or **hard-coded** (specific card ID, within the same set)
  - Entry State: **Face-down** or **Face-up** — determines how the placed location enters play. Face-up immediately fires the placed location's On Reveal effects.
- On Reveal triggered effect (see §4.5)
- On Enter triggered effect (see §4.5)
- On Leave triggered effect (see §4.5)

> **Visual design intent:** Connections are represented as arrows on each side of the card. A solid black arrow places the adjacent location face-down; a white (hollow) arrow places it face-up.

**Setpieces** — named locations central to the narrative. Same properties; distinguished by set-aside placement.

---

### 3.4 Character Cards
Characters inhabiting a location — allies, neutral, or enemies.

**Play area:** Game Area (when in play). Draw Area (generic). Set-Aside (Main Characters).

**Properties:**
- Alignment — Ally | Neutral | Enemy
- Initiative — determines order in the Character Phase (see §6.2)
- Actions (see §4.4)
- On Reveal triggered effect (see §4.5)
- Character Phase triggered effect (see §4.5)

**Main Characters** — named individuals central to the narrative. Same properties; set-aside.

**Allies:** A Character Card may have a dual mode — **Character mode** (while in the Game Area) and **Ally mode** (once recruited into a player's Tableau). The two modes have entirely separate actions, triggers, and passive properties, all represented on the same card. A Character Card with no Ally mode cannot be recruited. When recruited, the card moves permanently from the Game Area to the player's Tableau.

> **Conditions** (e.g. Poisoned, Blessed) can be modelled as Persona Cards entering the tableau — no dedicated card type needed.

---

### 3.5 Item Cards
Physical objects characters can carry and use.

**Play area:** Tableau (when carried). Game Area (when placed in the world). Draw Area (generic). Set-Aside (Key Items). Also appear as tucked cards.

**Properties:**
- Actions — available while the item is in the tableau (see §4.4)
- Passive Effects — always-on effects while in the tableau (see §4.1). Includes die grants, persistent modifiers, and any other always-active property.
- *(Any combination; a card may have none, one, or all)*

**Equipped vs. consumable:** Expressed through the action track system. Consumable items use a use track (finite charges); equipped items use standard cooldown tracks. No special property needed.

**Acquisition — how items enter play:**
- Drawn from a Location Card's tucked pool (e.g. *Search the Room* action)
- Retrieved from set-aside via a game effect
- Drawn from the generic item pool via a game effect
- Triggered effect on a Character Card (e.g. character drops an item on defeat)
- On Complete trigger of an objective (see §4.5)
- Starting inventory via Path Core Persona Card

**Key Items** — named objects central to the narrative. Often tucked under Setpieces or Main Characters. Same properties; set-aside.

---

### 3.6 Event Cards
The main antagonistic force in the game. Drawn during the Event Phase and resolved immediately via their implicit On Reveal effect. Can put enemies into play, harm players, introduce quests, and more.

**Play area:** Draw Area (generic). Set-Aside (Fated Events).

**Variants:**
- **Generic Event** — drawn from the event deck during the Event Phase. Simpler effects.
- **Fated Event** — named, set-aside. Retrieved by the active Script Card. Acts as a plot twist; typically more complex than generic events.

> **Design principle:** Events are always discarded after their On Reveal effect resolves. Persistent consequences should be designed by having the event put other card types into play — not by keeping the event card in play.

---

### 3.7 Main Quest Cards
The win condition for one act. Exclusively in Quest Sets. Unique per act — always set-aside, put into play at setup.

**Play area:** Game Area (active throughout the act).

**Properties:**
- Act — which act this governs (ordered within the Quest Set)
- Objectives — one or more entries, each with:
  - **Title** — short label (e.g. *Reach the Hermit's Tower*)
  - **Description** — conditions to meet
  - **On Complete** triggered effect *(optional)* — fires when this objective is completed (see §4.5)
- Completion condition — all objectives met = act complete; final act complete = session win

---

### 3.8 Side Quest Cards
Optional quest cards that enter play dynamically via game effects. Can belong to any set type.

**Variants:**
- **Side Quest** — generic, pooled in set-aside. Retrieved randomly when a game effect calls for a side quest.
- **Key Quest** — named, set-aside. Tightly coupled to a narrative cluster; retrieved by ID.

**Play area:** Set-Aside (retrieved by game effects). Game Area (once in play).

**Properties:**
- Objectives — one or more entries (same structure as §3.7, including optional On Complete trigger)
- Mandatory *(optional)* — if set, this quest must be completed before the current act's Main Quest can be completed

> **Modularity note:** Side Quest Cards carry no knowledge of their own reveal trigger. The trigger lives on the card that reveals them, keeping Side Quests portable across sets.

---

### 3.9 Script Cards
Define the turn-by-turn pacing and escalation of the game. The sole mechanism through which Fated Events enter play.

**Play area:** Game Area (active throughout the session, put into play at setup).

**Belongs to:** Quest Sets. A Quest Set may contain multiple Script Cards, typically one per act.

**Structure:** A sequence of turn entries, each defining:
- Number of generic Event Cards to draw during the Event Phase
- Fated Event *(optional)* — either hard-coded by ID (within the Quest Set only) or drawn randomly from the shared Fated Events pool in set-aside. The pool draw is the indirect mechanism through which Fated Events from other sets — such as the Location Set — can enter play.

**Modes:**
- **Timed** — finite turn sequence. Reaching the end without completing the act's Main Quest is a loss condition.
- **Infinite** — finite sequence followed by a repeating final pattern that loops until the session ends. Typically escalating and punishing in tone.

---

## 4. Effects & Actions

### 4.1 Effect Variants
Effects come in four variants:

| Variant | Trigger required | Resolution |
|---|---|---|
| **Passive** | No | Always-on while the card is in play in the relevant area. Includes die grants, persistent modifiers, and any always-active property. |
| **Fixed** | Yes | No roll; fires unconditionally when the trigger condition is met. |
| **Rolled** | Yes | Dice rolled; success count selects an outcome from a tiered list defined by the effect. |
| **Complex** | Yes | Freeform scripted effect; used when the base system is insufficient. Defined as free text on the card. |

**Passive vs. triggered:** The framing distinction is **while** vs. **when**. A Passive effect uses *while* logic — it is continuously evaluated and applies whenever its condition (if any) is met. A triggered effect (Fixed, Rolled, or Complex) uses *when* logic — it fires in response to a named event. Example: *"While no Allies are in your tableau, roll 2 extra Zeal dice"* is passive. *"When revealed, place this character in the Game Area"* is triggered Fixed.

**Complex effects** are strongly discouraged on actions and passive effects — continuously evaluated or single-fire freeform rules are hard to parse cleanly — but not forbidden. A condition card that defines a complex always-on rule is a valid design. Any card may carry any combination of effect variants.

### 4.2 Effect Outcomes
The outcome of any effect can instruct any game state change, including moving cards between play areas (see §1.4 for tucked cards).

### 4.3 Effect Chaining
Actions and triggers form chains: a player-initiated action produces an effect, that effect changes game state, the state change may fire one or more triggers, each producing further effects, and so on. There is no special chaining mechanic — it is a natural consequence of effects changing state and state firing triggers.

> *Example:* The player initiates a *Search* action on their current Location Card. A dice roll produces 2 successes, revealing 1 card from the location's tucked pool. The revealed card is a Key Item required by an active objective — satisfying the completion condition fires the objective's **On Complete** trigger, granting the player an additional Zeal die.

### 4.4 Actions
Actions are **user-initiated triggers** — the player deliberately fires them by placing an action token on the activation marker. They fall fully within the triggered effects framework (§4.5) and follow the same effect variant rules: Fixed and Rolled are the norm; Complex is strongly discouraged but not forbidden.

Present on Persona, Location, Character, and Item Cards. Actions on Location and Character Cards represent interactions available while the player is at that location or in the presence of that character.

**Initiating an action:** The player places an **action token** on the action's activation marker. This fires the action's triggered effect and marks the action as unavailable until the token clears.

**Action tokens:** Each player has a pool of action tokens replenished each Refresh Phase. The number of tokens received is determined by the player's tableau cards.

#### Action Token Tracks
Each action has a track that governs its availability. Tokens advance one space along the track each Refresh Phase. When a token progresses past the last marker, the action becomes available again.

Every track consists of two distinct marker types:
- **Activation Marker** — where the player places a token to initiate the action and fire its effect.
- **Flow Markers** — subsequent spaces the token passes through each Refresh Phase. Each may carry an **On Flow Marker** triggered effect (see §4.5), or be empty (acting as a pure delay).

**Track types:**

| Track | Description |
|---|---|
| **Basic** | One activation marker, no flow markers. One use per round — token clears on the next Refresh Phase. |
| **Multi-turn** | One activation marker, one or more flow markers. Token travels through flow markers over multiple Refresh Phases. Enables windup attacks, spell charging, and similar multi-turn mechanics via On Flow Marker triggers. |
| **Multi-use** | Multiple activation slots, each independently typed (basic or multi-turn). The action can be used once per slot per round. Slots track their own tokens independently. |
| **AND** | A single track shared across two or more actions. Begins progressing only when ALL linked activation markers are filled. No action in the group clears until all have been used. |
| **OR** | A single track shared across two or more actions. Using any one action fills the shared track and blocks all others until it clears. Enforces mutually exclusive choice. |
| **Use** | Slots come pre-filled with tokens by an implicit trigger (e.g. On Reveal, On Enter) — not from the player's token pool. Each activation removes one token. When all slots are empty the action is permanently unavailable unless explicitly refilled. The number of initial charges is defined by the number of slots printed on the card. Typically used on items (consumables) or locations (finite resources). |

### 4.5 Triggered Effects
Condition-initiated effects that fire automatically when the named condition is met.

| Trigger | Condition | Typical Use |
|---|---|---|
| **Action** | Player places a token on the activation marker | Persona, Location, Character, and Item Cards |
| **On Reveal** | Card flipped face-up | Any card type. Implicit on Event Cards. |
| **On Enter** | A player moves onto this location | Location Cards |
| **On Leave** | A player moves off this location | Location Cards |
| **Character Phase** | Character Phase begins | Character Cards |
| **On Complete** | A specific objective is completed | Objective entries (Main & Side Quest Cards) |
| **On Flow Marker** | Action token advances onto this marker during Refresh Phase | Flow markers on action tracks |

> No trigger is restricted to a specific card type by default. The "Typical Use" column reflects common design patterns, not hard rules — card designers are trusted to apply triggers where they make sense.

---

## 5. Dice System

### 5.1 Die Types

| Type | Description |
|---|---|
| **Constitution** | Corresponds to the Constitution Core Persona role |
| **Zeal** | Corresponds to the Zeal Core Persona role |
| **Path** | Corresponds to the Path Core Persona role |
| **Golden** | Wildcard — can be used for any test. Successes count as any type (Constitution, Zeal, or Path), chosen at the time of rolling. |

### 5.2 Die Levels
All dice come in levels (standard d6s with different face distributions). Higher level = more Success faces. Level affects face distribution only, not the number of faces.

### 5.3 Dice Pool
Assembled at the start of each roll from all dice-granting passive effects across Persona Cards (including Core Persona Cards) and Items in the tableau.

### 5.4 Die Faces

| Face | Effect |
|---|---|
| **Blank** | No effect |
| **Exhaust** | May be spent to convert to a Success |
| **Success** | Counts as one success of this die's type |

### 5.5 Rolling & Resolution
The player rolls their dice pool, optionally spends Exhaust faces, then counts successes. The outcome is determined by the effect's tier list — there is no global tier structure. Tiers are defined per effect and may:
- Require successes of a specific type (e.g. "3 Constitution successes")
- Require a combination of types (e.g. "5 Constitution and 3 Zeal successes")
- Be type-agnostic
- Be graduated rather than binary (e.g. 0 successes = fail, 1 = partial, 3+ = full)

---

## 6. Game Structure

### 6.1 Set Types

| Set | Contains | Purpose |
|---|---|---|
| **Location Set** | Generic Locations, Setpieces, Generic Characters, Main Characters, Generic Items, Key Items, Side Quests, Key Quests, Generic Events, Fated Events | Defines the world |
| **Quest Set** | Main Quest Cards (one per act), Script Cards (one or more), Side Quests, Key Quests, supporting cards | Defines the narrative arc and pacing |
| **Side Quest Set** | Side Quests, Key Quests, supporting cards | Optional additional objectives; fully independent |

### 6.2 Turn Structure
Each turn proceeds through four phases in order:

| # | Phase | Description |
|---|---|---|
| 1 | **Action Phase** | Players spend action tokens to initiate actions |
| 2 | **Character Phase** | Character Cards resolve Character Phase effects in ascending initiative order. Players do not act during this phase. |
| 3 | **Event Phase** | Event Cards drawn and resolved per the active Script Card |
| 4 | **Refresh Phase** | Action tokens on tracks advance one space; players receive new action tokens from their tableau |

### 6.3 Acts
A session is divided into one or more **acts**, each governed by one Main Quest Card and one Script Card. Acts complete sequentially. The session is won when the final act is complete.

---

## 7. Open Questions

- [ ] Trigger priority: exact resolution rules TBD, but priority order must be represented in the card's visual layout — the order triggers appear on the card defines the order they resolve.
