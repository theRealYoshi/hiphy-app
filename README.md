# Hiphy

[Hiphy][hiphy] - Search for San Francisco / Bay Area themed gifs and share.

[hiphy]: https://hiphy-app.herokuapp.com/

## Key Features

- Search instantaneously with tag search and album search.
  - Each keystroke logs an ajax request to the server which filters based on a
    SQL "LIKE" query
    - Tag Search:
      ![image_search]
    - Album Search:
      ![album_search]
    - Search from any page on the website:
      ![any_search]
- Hover to play the gif
  - Simple as switching from a .png file to .gif file using Cloudinary's image
    transformation service and switching the hovered state from false to true in
    the React Component.
  - ```javascript
    _onHover: function(){
      this.setState({
        hovered: true
      });
    }
    ```
  - On hover:
    - ![hover]
- Randomized image sizing on main page


## Minimum Viable Product

Hiphy is a web application inspired by [giphy.com][giphy] built on Ruby on Rails
and React.js. Hiphy allows users to:

[giphy]: http://www.giphy.com/

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create an account
- [x] Log in / Log out
- [x] Upload gifs
- [x] Tag gifs with multiple tags and search gifs by tag
- [x] Share, tag gifs
- [x] Organize gifs within Albums
- [x] View on hover gifs on the main page
- [ ] Share through gifs on facebook messenger



[image_search]: https://cloud.githubusercontent.com/assets/1275250/10827123/725f757e-7e2a-11e5-8309-cb16072398b4.gif
[album_search]: https://cloud.githubusercontent.com/assets/1275250/10827390/e56d9c48-7e2b-11e5-833e-5f047b119996.gif
[any_search]: https://cloud.githubusercontent.com/assets/1275250/10827518/b27bfd24-7e2c-11e5-8560-4157ef14ee6e.gif
[hover]: https://cloud.githubusercontent.com/assets/1275250/10827687/7df345ac-7e2d-11e5-9493-126578be8f6a.gif


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
and Tags. Use Cloudinary to upload the Gifs

[Details][phase-one]

### Phase 2: Flux Architecture, Gif CRUD (2 days)

Phase 2 is focused on setting up the Flux architecture. After the basic Flux
architecture has been set up, a Gif store will be set up. I will create the
basic index view for all Gifs for the index page and a individual Gif view
for all show pages. I will start using basic bootstrap for styling.

[Details][phase-two]

### Phase 3: Search (1.5 days)

Phase 3 adds organization to the Gifs. Search index based on an input in the
search field. A search index will have it's own view, and component.

[Details][phase-three]

### Phase 4: Collections (1.5 days)

Gifs belong to a collection and each collection has its own
`Index` view. Create React View for Collection. Collection
is a term for a group of gifs within one category but not Tag.

[Details][phase-four]

### Phase 5: Shortlink that plays in Facebook Messenger (1.5 days)

Phase 5 adds hiphy's main functionality, which is a shortlink that will play the
gif in Facebook's messenger service. If a shortlink is not able to be created
we will use Giphy's api to share links on facebook

[Details][phase-five]

### Phase 6:  Allow Complex Styling of Gifs and Sharing (1.5 days)

Phase 6 will focus on making the site look and feel like giphy.com with css and
React. Here are the examples of changes implemented:
- On hover Gif will play (using css)
- On show page play Gif automatically
- Show page for each Gif will feature share link with unique tag, that links
back to the show page.
- Tidy up all design across site
- Add more seed data

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Voting System for each Gif (Call it Thizz)
- [ ] Pagination / infinite scroll for gifs Index
- [ ] Gif converter from video
- [ ] Share through gifs on slack
- [ ] Use javascript library for cleaner tag selection
- [ ] User favorites


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase5.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
