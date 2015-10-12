# Hiphy

[Hiphy][hiphy] - A SF/ Bay Area themed gif viewer and sharer.

[hiphy]: https://hiphy-app.herokuapp.com/

## Minimum Viable Product

Hiphy is a web application inspired by [giphy.com][giphy] built using Ruby on Rails
and React.js. Hiphy allows users to:

[giphy]: http://www.giphy.com/

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Upload gifs
- [ ] Tag gifs with multiple tags and search gifs by tag
- [ ] Share, tag gifs on the show page
- [ ] Organize gifs within Collections
- [ ] View on hover gifs on the index page
- [ ] Share through gifs on facebook messenger

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Gif/Tag Model and JSON API (1.5 days)

In Phase 1, I will begin by setting up user login and authentication area on the
index page. There will be one model that holds the Gifs, one model that holds
tags and one model called Taggings that holds the relationships between Gifs
and Tags.
[Details][phase-one]

### Phase 2: Flux Architecture, Gif CRUD (2 days)

Phase 2 is focused on setting up the Flux architecture. After the basic Flux
architecture has been set up, a Gif store will be set up. I will create the
basic index view for all Gifs for the index page and a individual Gif view
for all show pages. I will start using basic bootstrap for styling.

[Details][phase-two]

### Phase 3: Collections and Search (2 days)

Phase 3 adds organization to the Gifs. Gifs belong to a collection and each
collection has its own `Index` view. Create React View for Collection. Collection
is a term for a group of gifs within one category but not Tag. Create a Search
index which will have its own view, index and react component

[Details][phase-three]

### Phase 4: Shortlink that plays in Facebook Messenger (1.5 days)

Phase 4 adds hiphy's main functionality, which is a shortlink that will play the
gif in Facebook's messenger service. If a shortlink is not able to be created
we will use Giphy's api to share links on facebook

[Details][phase-four]

### Phase 5:  Allow Complex Styling of Gifs and Sharing (2 days)

Phase 5 will focus on making the site look and feel like giphy.com with css and
React. Here are the examples of changes implemented:
- On hover Gif will play (using css)
- On show page play Gif automatically
- Show page for each Gif will feature share link with unique tag, that links
back to the show page.
- Tidy up all design across site
- Add more seed data

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Pagination / infinite scroll for gifs Index
- [ ] Gif converter from video
- [ ] Share through gifs on slack
- [ ] Use javascript library for cleaner tag selection
- [ ] User favorites


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
