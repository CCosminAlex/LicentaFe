// pages/api/post-login.js

export default async function postLogin(req, res) {
  const { user, client } = req.body; // Assuming you're passing the user and client data in the request body
  const userId = user.user_id;

  if (
    user.email &&
    user.email.endsWith("@example.com") &&
    client.name === "My SPA"
  ) {
    return res
      .status(403)
      .json({ error: `Access to ${client.name} is not allowed.` });
  }

  // Use the userId as needed
  console.log(userId);

  // Handle further logic or send response
  return res
    .status(200)
    .json({ message: "Post-login API request handled successfully." });
}
