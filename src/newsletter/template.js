const mjml = require("mjml");

function createTemplate(feed) {
  return mjml(
    `<mjml>
        <mj-body>
            <mj-section>
                <mj-column align="center">
                    <mj-text align="center" font-size="20px"  font-family="helvetica" text-align="center">Reddit Newsletter</mj-text>
                    <mj-divider></mj-divider>

                </mj-column>
            </mj-section>
            ${feed.map(subredditSection).join("")}
        </mj-body>
    </mjml>`
  ).html;
}

function subredditSection(subreddit) {
  function postPreview(post) {
    return `
            ${
              post.preview
                ? `<mj-image src="${post.preview.images[0].source.url}" />`
                : ""
            }
            <mj-text><h3>${post.ups}</h3><h5>${post.title}</h5></mj-text>
        `;
  }

  return `
        <mj-section>
            <mj-column width="100%">
                <mj-text font-size="20px">
                <strong>${capitalize(subreddit.subreddit)}:  </strong>
                https://reddit.com/${subreddit.url}/top
                </mj-text>
                ${subreddit.posts.map(postPreview).join("")}
            </mj-column>
            <mj-divider></mj-divider>
        </mj-section>
    `;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = createTemplate;
