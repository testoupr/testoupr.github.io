# Post templates

This folder starts with `_` **and** isn't a Jekyll collection, so Jekyll ignores
it — nothing here is ever published. It's just a stash of templates to copy from.

## To write a new post

1. Copy the template you want into `_posts/`, renamed with today's date:

   ```bash
   cp _templates/ctf-writeup.md "_posts/$(date +%F)-my-challenge.md"
   ```

   The filename **must** be `YYYY-MM-DD-title.md` — that's how Jekyll dates the post.

2. Edit the front matter (the `---` block at the top): set `title`, `date`,
   `categories`, `tags`, `description`. Delete any optional lines you don't need.

3. Write your content below the second `---`.

4. Preview: with `bundle exec jekyll serve` running, open <http://127.0.0.1:4000>.
   The site rebuilds on save.

5. Publish: `git add`, `git commit`, `git push` → GitHub Actions deploys it.

## Notes

- **Categories:** max 2, hierarchical → `[Top, Sub]` (e.g. `[CTF, Web]`).
- **Tags:** lowercase, any number.
- **Callouts:** put `{: .prompt-tip }` (or `.prompt-info` / `.prompt-warning` /
  `.prompt-danger`) on the line right after a `>` blockquote.
- **Code filename label:** put `` {: file="name.py" } `` on the line right after a
  fenced code block.
- **Drafts:** to keep something unpublished while you work, put it in a `_drafts/`
  folder (no date in the filename) and run `jekyll serve --drafts` to preview it.
